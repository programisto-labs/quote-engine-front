import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Injectable, inject, PLATFORM_ID} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  hide() {
    console.log('Preloading...');
  }
}
