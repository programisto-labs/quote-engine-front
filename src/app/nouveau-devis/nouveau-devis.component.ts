import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { PropositionDevisComponent } from "../proposition-devis/proposition-devis.component";
import { MatIconModule } from '@angular/material/icon';
import { Devis, DevisService } from '../services/devis.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { AbstractControl, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DemandeClient } from '../demande-client';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MOCK_DEVIS } from '../MOCK_DEVIS';
import { AsyncPipe } from '@angular/common';
import { debounceTime, Subscription } from 'rxjs';
@Component({
  selector: 'app-nouveau-devis',
  standalone: true,
  imports: [
    PropositionDevisComponent,
    MatStepperModule,
    FormsModule,
    MatFormField,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatLabel,
    MatIconModule,
    HttpClientModule,
    MatAutocompleteModule,
    AsyncPipe
  ],
  providers: [DevisService],
  templateUrl: './nouveau-devis.component.html',
  styleUrls: ['./nouveau-devis.component.css']
})
export class NouveauDevisComponent {
  devis?: Devis;
  formGroupDescription: FormGroup;
  formGroupScenarios: FormGroup;
  waitingForService: boolean = false;
  waitingForCompletion: boolean = false;
  suggestions: { [key: string]: string[] } = {}; @ViewChildren('useCaseInput') useCaseInputs!: QueryList<ElementRef>;

  private autocompleteSubscription?: Subscription; get useCases(): FormArray { return this.formGroupScenarios.get('useCases') as FormArray; }
  get lastUseCaseInput() { return this.useCaseInputs.last; }
  get lastUseCase() { return this.useCases.at(this.useCases.length - 1); }
  get canAddUseCase() { return this.useCases.controls.every((useCase) => useCase.value.useCase != ""); }
  get demandeClient(): DemandeClient {
    return {
      coreBusiness: this.formGroupDescription.value.coreBusiness,
      concept: this.formGroupDescription.value.concept,
      useCases: this.formGroupScenarios.value.useCases.map((useCase: { useCase: string }) => useCase.useCase)
    };
  }
  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef, private devisService: DevisService) {
    this.formGroupDescription = this.formBuilder.group({
      coreBusiness: ['', Validators.required],
      concept: ['', Validators.required]
    });
    this.formGroupScenarios = this.formBuilder.group({
      useCases: this.formBuilder.array([this.newUseCaseValidator()])
    });
    // this.mockDemandeClient();
    // this.mockDevis();
  }
  ngAfterViewInit() { this.useCaseInputs.changes.subscribe(() => { this.focusLastUseCaseInput(); }); }
  newUseCaseValidator() { return this.formBuilder.group({ useCase: ['', Validators.required] }) }
  newUseCase(event?: Event) {
    if (event) { event.preventDefault(); }
    this.removeSuggestions();
    this.removeEmptyUseCases();
    this.useCases.push(this.newUseCaseValidator());
  }

  removeSuggestions(fieldName?: string) {
    if (fieldName) {
      delete this.suggestions[fieldName];
    } else {
      this.suggestions = {};
    }
  }
  removeLastUseCase() { this.removeUseCase(this.useCases.at(this.useCases.length - 1)); }
  removeEmptyUseCases() { this.useCases.controls.forEach((useCase, index) => { if (useCase.value.useCase == "") { this.removeUseCase(useCase); } }); }
  getUseCaseIndex(useCase: AbstractControl) { return this.useCases.controls.indexOf(useCase); }
  removeUseCase(useCase: AbstractControl, event?: Event) {
    const canRemoveUseCase = !event || (event && useCase.value.useCase.match(/^\s*$/))
    if (canRemoveUseCase) { this.useCases.removeAt(this.getUseCaseIndex(useCase)); }
  }
  focusLastUseCaseInput() {
    this.removeSuggestions();
    if (this.lastUseCaseInput) {
      this.lastUseCaseInput.nativeElement.focus();
      this.cdr.detectChanges();
    }
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

        const item = this.formBuilder.group({ useCase: suggestion })
        item.disable();
        setTimeout(() => { item.enable(); }, 500);
        this.useCases.push(item);
      });
      this.waitingForCompletion = false;
    });
  }

  onOptionSelected(event: any) {
    const value = event.option.value;
    const index = this.useCases.controls.findIndex((useCase) => useCase.value.useCase == value);
    if (index == -1) {
      this.useCases.push(this.formBuilder.group({ useCase: value }));
    }
    this.removeSuggestions();
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
      .pipe(debounceTime(500))
      .subscribe(autocomplete => {
        this.suggestions[fieldName] = autocomplete.suggestions
      }
      );
  }

  mockDemandeClient() {
    this.useCases.clear();
    const useCasesValues = [
      { useCase: "Enroll in Courses" },
      { useCase: "Track Learning Progress" },
      { useCase: "Administer Online Exams" },
      { useCase: "Issue Digital Certificates" }
    ];
    useCasesValues.forEach(value => {
      this.useCases.push(this.formBuilder.group(value));
    });
    this.formGroupDescription.setValue({
      coreBusiness: "Education",
      concept: "Learning Management System"
    });
  }
  mockDevis() { this.devis = MOCK_DEVIS; }
}
