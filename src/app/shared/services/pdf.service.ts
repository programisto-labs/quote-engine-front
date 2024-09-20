import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as pdfjsLib from 'pdfjs-dist';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  constructor(private http: HttpClient) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
  }

  loadPdf(file: File): Observable<any> {
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
}
