import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { PdfService } from '../../shared';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-pdf-loader',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    TranslateModule,
    MatButton,
    MatIcon,
    FormsModule,
    MatError,
    MatFormField,
    MatHint,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './pdf-loader.component.html',
})
export class PdfLoaderComponent {

  @Input() loading = false;
  @Output() sendContent = new EventEmitter<string>();

  pdfContent: string = '';
  filename: string = '';
  selectedFile: File | null = null;

  constructor(private pdfService: PdfService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    //this.loadPdf();
  }

}
