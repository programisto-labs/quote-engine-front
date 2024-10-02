import { inject, Injectable} from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { BehaviorSubject, concatAll, from, map, Observable, of, take} from 'rxjs';
import { TranslateService} from "@ngx-translate/core";
import { ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private readonly translateService: TranslateService = inject(TranslateService);
  private readonly toastService: ToastrService = inject(ToastrService);

  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();

  filename: string = '';
  content: string = '';
  pdfContent: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  }

  loadPdf(file: File): void {
    if (file) {
      this.filename = file.name;
      this.content = '';
      this.decodePdf(file).subscribe({
        next: (pdf) => {
          let pages = Array.from({length:pdf.numPages}, (_, i) => i+1);
          this.generateContent(pdf, pages);
        },
        error: (error) => {
          this.pdfContent.next('');
          this.showError();
          console.log(error);
        }
      });
    }
  }

  private generateContent(pdf: any, pages: number[]) {
    of(pages).pipe(concatAll()).pipe(
      map((pageNumber: number) => this.getPageText(pdf, pageNumber)),
      concatAll(),
    ).subscribe({
      next: (text: string) => {
        this.content += text;
      },
      complete: () => {
        this.pdfContent.next(this.content);
      },
      error: (error) => {
        console.log(error);
        this.showError();
      },
    });
  }

  private showError() {
    this.translateService.get('pdf_non_standard').pipe(take(1)).subscribe(
      (translation: string) => this.toastService.info(translation)
    )
  }

  decodePdf(file: File): Observable<any> {
    const reader = new FileReader();
    return new Observable((observer) => {
      reader.onload = () => {
        const typedArray = new Uint8Array(reader.result as ArrayBuffer);
        pdfjsLib.getDocument(typedArray).promise.then((pdf) => {
          observer.next(pdf);
          observer.complete();
        });
      };
      reader.onerror = (error) => observer.error(error);
      reader.readAsArrayBuffer(file);
    });
  }

  getPageText(pdf: any, pageNumber: number): Observable<string> {
    return from<string>(
      pdf.getPage(pageNumber).then((page: any) =>
        page.getTextContent().then((textContent: any) =>
          textContent.items.map((item: any) => item.str).join(' ')
        )
      )
    );
  }

  toogleLoading() {
    this.loading.next(!this.loading.value);
  }
}
