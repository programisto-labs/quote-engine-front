import {Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { PdfService } from '../../shared';
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgClass} from "@angular/common";
import {MatProgressBar} from "@angular/material/progress-bar";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-pdf-loader',
  standalone: true,
    imports: [
        TranslateModule,
        MatButton,
        MatIcon,
        MatInput,
        MatLabel,
        NgClass,
        MatProgressBar
    ],
  templateUrl: './pdf-loader.component.html',
  styles: [
    `.invisible { visibility: hidden; }`
  ]
})
export class PdfLoaderComponent implements OnInit, OnDestroy {
  private pdfService: PdfService = inject(PdfService);
  private destroy$: Subject<void> = new Subject<void>();

  @Input() loadingPdf = false;
  @Output() sendContent = new EventEmitter<string>();

  ngOnInit() {
    this.pdfService.pdfContent.pipe(takeUntil(this.destroy$)).subscribe({
      next: (content: string) => {
        if(!content) return;
        this.loadingPdf = true;
        this.sendContent.emit(content);
      },
      error: (error: any) => {
        console.log(error);
        this.loadingPdf = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  loadPdf(event: any) {
    const file = event.target.files[0];
    if (file) this.pdfService.loadPdf(file);
  }
}
