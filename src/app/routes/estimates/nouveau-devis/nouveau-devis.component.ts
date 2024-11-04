import {AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {PropositionDevisComponent} from "../proposition-devis/proposition-devis.component";
import {MatIconModule} from '@angular/material/icon';
import {
  ClientContact,
  DemandeClient,
  Devis,
  DevisService,
  PdfService,
  ClientContactService, ChiffrageService,
  DiscordService
} from '../../../shared';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {AsyncPipe, NgClass} from '@angular/common';
import {debounceTime, distinctUntilChanged, retry, Subject, Subscription, take, takeUntil} from 'rxjs';
import {PdfLoaderComponent} from "../../pdf-loader/pdf-loader.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {TooltipDirective, isEmptyValidator} from "../../../core";
import {NumbersOnlyDirective} from "../../../core/directives/numbersOnly.directive";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-nouveau-devis',
  standalone: true,
  templateUrl: './nouveau-devis.component.html',
  styleUrl: './nouveau-devis.component.scss',
  imports: [
    AsyncPipe,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    PropositionDevisComponent,
    PdfLoaderComponent,
    ReactiveFormsModule,
    MatTabsModule,
    TranslateModule,
    MatProgressBarModule,
    NgClass,
    TooltipDirective,
    NumbersOnlyDirective
  ]
})
export class NouveauDevisComponent implements AfterViewInit, OnDestroy{
  devis?: Devis;
  formGroupDescription: FormGroup;
  formGroupScenarios: FormGroup;
  waitingForService: boolean = false;
  waitingForCompletion: boolean = false;
  suggestions: { [key: string]: string[] } = {};
  stepperIndex = 0;
  private readonly pdfService: PdfService = inject(PdfService);
  private readonly contactService: ClientContactService = inject(ClientContactService);
  private readonly chiffrageService: ChiffrageService = inject(ChiffrageService);
  private readonly discordServie: DiscordService = inject(DiscordService);
  private readonly toastService: ToastrService = inject(ToastrService);
  private autocompleteSubscription?: Subscription;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private devisService: DevisService) {
    let data: ClientContact = this.contactService.getContact();
    this.formGroupDescription = this.formBuilder.group({
      fullname: [data?.fullname || '', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿ]+[ a-zA-ZÀ-ÖØ-öø-ÿ]+$')]],
      company: [data?.company || '', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÖØ-öø-ÿ]+([ a-zA-ZÀ-ÖØ-öø-ÿ])*$')]],
      email: [data?.email || '', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      tele: [data?.tele || '', [Validators.required, Validators.pattern('^(0[1-7]{1}(\\d{2}){4})$')]], //(\+33|0)
      coreBusiness: ['', [Validators.required, Validators.pattern('^[ÆæŒœaa-zA-ZÀ-ÖØ-öø-ÿ]+[ .,;:!-_ÆæŒœaa-zA-ZÀ-ÖØ-öø-ÿ]+$')]],
      concept: ['', [Validators.required, isEmptyValidator(), Validators.maxLength(2000), Validators.minLength(10)]]
    });
    this.formGroupScenarios = this.formBuilder.group({
      useCases: this.formBuilder.array([this.newUseCase()])
    });
  }

  ngAfterViewInit() {
    this.formGroupDescription.valueChanges.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: any) => {
        this.contactService.updateValue(value);
        this.contactService.updateValidStatus(this.formGroupDescription.valid);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get fullname() {
    return this.formGroupDescription.get('fullname');
  }

  get company() {
    return this.formGroupDescription.get('company');
  }

  get email() {
    return this.formGroupDescription.get('email');
  }

  get tele() {
    return this.formGroupDescription.get('tele');
  }

  get concept() {
    return this.formGroupDescription.get('concept');
  }

  get coreBusiness() {
    return this.formGroupDescription.get('coreBusiness');
  }

  getUseCaseError(index: number) {
    const control = this.useCases.at(index).get('useCase');
    return (control && control.errors) || {};
  }

  get useCases(): FormArray {
    return this.formGroupScenarios.get('useCases') as FormArray;
  }

  get canAddUseCase() {
    return this.useCases.controls.every((useCase) => useCase.value.useCase != "");
  }

  get demandeClient(): DemandeClient {
    return {
      coreBusiness: this.formGroupDescription.value.coreBusiness,
      concept: this.formGroupDescription.value.concept,
      useCases: this.formGroupScenarios.value.useCases.map((useCase: { useCase: string }) => useCase.useCase)
    };
  }

  newUseCase(value: string = '') {
    return this.formBuilder.group({useCase: [value, [Validators.required, isEmptyValidator,Validators.pattern('^[.,;:!-_\'"ÆæŒœa-zA-ZÀ-ÖØ-öø-ÿ]+[ .,;:!-_\'"a-zA-ZÀ-ÖØ-öø-ÿ]+$')]]})
  }

  addNewUseCase() {
    this.useCases.push(this.newUseCase());
  }

  removeSuggestions(fieldName?: string) {
    if (fieldName) {
      delete this.suggestions[fieldName];
    } else {
      this.suggestions = {};
    }
  }

  removeUseCase(index: number) {
    if (index >= 0 && index < this.useCases.length) {
      this.useCases.removeAt(index);
    }
  }

  removeAllUseCases() {
    while (this.useCases.length > 0) {
      this.removeUseCase(this.useCases.length - 1);
    }
    this.addNewUseCase();
  }

  onStepChange(event: any) {
    this.stepperIndex = event.selectedIndex;
    if (this.stepperIndex == 2) {
      this.buildDevis();
    }
  }

  buildDevis() {
    this.devis = undefined;
    this.waitingForService = true;
    this.devisService.genere(this.demandeClient, 20).pipe(
      retry(2)
    ).subscribe({
      next: devis => {
        this.waitingForService = false;
        this.devis = {...devis, dateOfEstimate: new Date().toLocaleDateString()};
        this.sendDiscordMessages();
      },
      error: (e) => {
        this.waitingForService = false;
        this.toastService.error("La demande était trop lourde. Les résultats seront envoyés par mail une fois les calculs effectués.");
        this.scheduleBuildDavis();
        console.log('Nouveau devis: buildDevis: ', e);
      }
    });
  }

  scheduleBuildDavis() {
    this.devisService.genereScheduled({
      clientData: this.contactData,
      demandeClient: this.demandeClient
    }, 5, 60).subscribe({
      next: () => {
        console.log('Devis generation scheduled succesfully');
      },
      error: (e) => console.log('Error scheduling devis generation.')
    });
  }

  get contactData() {
    return this.contactService.contactValue.value;
  }

  sendDiscordMessages() {
    if (!this.contactService.contactValid.value || !this.devis) {
      this.toastService.info("Les coordonnées ne sont pas valides, veuillez les vérifier à l'étape 1.");
      return;
    }

    let projet = this.chiffrageService.getEstimatedData(
      this.devis!.modules?.reduce(
        (acc, module) => acc +
          module.scenarios.reduce((acc, scenario) => acc + scenario.duree, 0)
        , 0) || 0
    ) || {};

    this.discordServie.sendNotificationMessages(this.contactData, this.devis, projet);
  }

  autocomplete() {
    this.waitingForCompletion = true;
    this.devisService.autocomplete(this.demandeClient).subscribe({
      next: (autocomplete) => {
        const validUseCasesControls = this.useCases.controls
          .filter(control => control.value && control.value['useCase'].trim().length > 0);

        const validUseCasesArray = new FormArray(
          validUseCasesControls.map(useCase => this.newUseCase(useCase.value['useCase']))
        );
        this.formGroupScenarios.setControl('useCases', validUseCasesArray);

        autocomplete.suggestions.forEach(suggestion => {
          const item = this.formBuilder.group({useCase: suggestion})
          this.useCases.push(item);
        });

        if (this.useCases.length === 0) {
          this.useCases.push(this.newUseCase());
        }

        this.waitingForCompletion = false;
      },
      error: (e) => {
        this.waitingForCompletion = false;
        console.log('Nouveau devis: autocomplete: ', e);
      }
    });
  }

  onOptionSelected(event: any, index: number) {
    const value = event.option.value;
    if (index == -1) {
      this.useCases.push(this.formBuilder.group({useCase: value}));
    }
    this.removeSuggestions(value);
  }

  inlineAutocomplete(event: KeyboardEvent, chunk: string, fieldName: string) {
    if (
      [
        "ArrowDown",
        "ArrowUp",
        "Enter",
        "Tab",
        "Shift",
        "Control",
        "Alt",
        "Meta",
        "CapsLock",
        "Escape",
        "PageUp",
        "PageDown",
        "End",
        "Home",
        "Insert",
        "Delete",
        "Dead"
      ].includes(event.key) || chunk.length < 3) {
      return
    }

    if (this.autocompleteSubscription) {
      this.autocompleteSubscription.unsubscribe();
    }

    this.autocompleteSubscription = this.devisService.inlineAutocomplete(this.demandeClient, chunk)
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(autocomplete => {
          this.suggestions[fieldName] = autocomplete.suggestions
        }
      );
  }

  sendPdfContent(content: string) {
    this.pdfService.toogleLoading();
    this.devisService.newDemandeClientFromRaw(content).pipe(take(1)).subscribe({
      next: (demandeClient: DemandeClient) => {
        try {
          if (demandeClient) {
            this.formGroupDescription.patchValue({
              coreBusiness: demandeClient.coreBusiness,
              concept: demandeClient.concept
            });
            Array.from({length: this.useCases.length}, (_) => this.useCases.removeAt(0));
            demandeClient.useCases.map(
              (useCase: string) => this.useCases.push(this.newUseCase(useCase))
            );
          }
        } finally {
          this.pdfService.toogleLoading();
        }
      },
      error: (error: any) => {
        this.pdfService.toogleLoading();
        console.log(error);
      }
    });
  }
}
