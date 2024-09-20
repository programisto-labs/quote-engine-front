import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import { PdfService } from '../../shared';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {ToastrService} from "ngx-toastr";
import {concatAll, map, of, take} from "rxjs";
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
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly toastService: ToastrService = inject(ToastrService);

  @Input() loading = false;
  @Output() sendContent = new EventEmitter<string>();

  pdfContent: string = '';
  filename: string = '';
  selectedFile: File | null = null;

  constructor(private pdfService: PdfService) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.loadPdf();
  }

  loadPdf(): void {
    if (this.selectedFile) {
      this.filename = this.selectedFile.name;
      this.pdfService.loadPdf(this.selectedFile).subscribe({
        next: (pdf) => {
          let pages = Array.from({length:pdf.numPages}, (_, i) => i+1);
          this.generateContent(pdf, pages);
        },
        error: (error) => {
          this.pdfContent = '';
          this.showError();
          console.log(error);
        }
      });
    }
  }

  private generateContent(pdf: any, pages: number[]) {
    of(pages).pipe(concatAll()).pipe(
      map((pageNumber: number) => this.pdfService.getPageText(pdf, pageNumber)),
      concatAll(),
    ).subscribe({
      next: (text: string) => {
        this.pdfContent += text;
        this.sendContent.emit(this.pdfContent);
      },
      error: (error) => console.log(error),
    });
  }

  private showError() {
    this.translateService.get('pdf_non_standard').pipe(take(1)).subscribe(
      (translation: string) => this.toastService.info(translation)
    )
  }
}
