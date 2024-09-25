import {Component, inject, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
    imports: [
        MatFormField,
        MatInput,
        MatIcon,
        MatButton,
        ReactiveFormsModule,
        MatPrefix,
        TranslateModule
    ],
  encapsulation: ViewEncapsulation.Emulated
})
export class SearchComponent {
  private readonly fb = inject(FormBuilder);
  searchForm: FormGroup;

  constructor() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }
}
