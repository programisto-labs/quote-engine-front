import {Component, EventEmitter, inject, OnDestroy, OnInit, Output} from '@angular/core';
import { PdfService } from '../../shared';
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AsyncPipe, NgClass} from "@angular/common";
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
    MatProgressBar,
    AsyncPipe
  ],
  templateUrl: './pdf-loader.component.html',
  styles: [
    `.invisible { visibility: hidden; }`
  ]
})
export class PdfLoaderComponent implements OnInit, OnDestroy {
  private pdfService: PdfService = inject(PdfService);
  private destroy$: Subject<void> = new Subject<void>();

  loadingPdf = this.pdfService.loading$;
  @Output() sendContent = new EventEmitter<string>();

  ngOnInit() {
    this.pdfService.pdfContent.pipe(takeUntil(this.destroy$)).subscribe({
      next: (content: string) => {
        if(!content) return;
        this.sendContent.emit(content);
      },
      error: (error: any) => {
        console.log(error);
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
