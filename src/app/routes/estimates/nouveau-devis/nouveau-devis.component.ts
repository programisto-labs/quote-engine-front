import {AfterViewInit, ChangeDetectorRef, Component, inject, OnDestroy} from '@angular/core';
import {PropositionDevisComponent} from "../proposition-devis/proposition-devis.component";
import {MatIconModule} from '@angular/material/icon';
import {ClientContact, defaultClientContact, DemandeClient, Devis, DevisService} from '../../../shared';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {AsyncPipe, NgClass} from '@angular/common';
import {debounceTime, distinctUntilChanged, Subject, Subscription, take, takeUntil} from 'rxjs';
import {PdfLoaderComponent} from "../../pdf-loader/pdf-loader.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {ClientContactComponent} from "../../client-contact/client-contact.component";
import {TooltipDirective} from "../../../core/directives/tooltip.directive";
import {ClientContactService} from "../../client-contact/client-contact.service";


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
    ClientContactComponent,
    TooltipDirective
  ]
})
export class NouveauDevisComponent implements AfterViewInit, OnDestroy{
  devis?: Devis;
  formGroupDescription: FormGroup;
  formGroupScenarios: FormGroup;
  contactFormValue: ClientContact = defaultClientContact;
  contactValid: boolean = false;
  waitingForService: boolean = false;
  waitingForCompletion: boolean = false;
  loadingPdf: boolean = false;
  suggestions: { [key: string]: string[] } = {};
  stepperIndex = 0;
  private readonly contactService: ClientContactService = inject(ClientContactService);
  private autocompleteSubscription?: Subscription;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private devisService: DevisService) {
    this.formGroupDescription = this.formBuilder.group({
      coreBusiness: ['', Validators.required],
      concept: ['', Validators.required]
    });
    this.formGroupScenarios = this.formBuilder.group({
      useCases: this.formBuilder.array([this.newUseCase()])
    });
  }

  ngAfterViewInit() {
    this.contactService.contactValid.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: boolean) => this.contactValid = value
    });
    this.contactService.contactValue.pipe(takeUntil(this.destroy$)).subscribe({
      next: (value: ClientContact) => this.contactFormValue = value
    })
  }

  ngOnDestroy() {
    this.destroy$.next();
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
    return this.formBuilder.group({useCase: [value, Validators.required]})
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

  buildDevis() {
    this.devis = undefined;
    this.waitingForService = true;
    this.devisService.genere(this.demandeClient).subscribe(devis => this.devis = devis);
  }

  autocomplete() {
    this.waitingForCompletion = true;
    this.devisService.autocomplete(this.demandeClient).subscribe(autocomplete => {
      autocomplete.suggestions.forEach(suggestion => {
        const item = this.formBuilder.group({useCase: suggestion})
        this.useCases.push(item);
      });
      this.waitingForCompletion = false;
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
    this.devisService.newDemandeClientFromRaw(content).pipe(take(1)).subscribe({
      next: (demandeClient: DemandeClient) => {
        if (demandeClient) {
          this.formGroupDescription.setValue({
            coreBusiness: demandeClient.coreBusiness,
            concept: demandeClient.concept
          });
          Array.from({length: this.useCases.length}, (_) => this.useCases.removeAt(0));
          demandeClient.useCases.map(
            (useCase: string) => this.useCases.push(this.newUseCase(useCase))
          );
          this.stepperIndex++;
        }
        this.loadingPdf = false;
      },
      error: (error: any) => {
        this.loadingPdf = false;
        console.log(error);
      }
    });
  }
}
