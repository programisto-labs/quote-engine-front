import {DOCUMENT, isPlatformBrowser} from '@angular/common';
import {Injectable, inject, PLATFORM_ID} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PreloaderService {
  private readonly platform = inject(PLATFORM_ID);
  private readonly document = inject(DOCUMENT);

  private readonly selector = 'globalLoader';

  private getElement() {
    return isPlatformBrowser(this.platform) ? this.document.getElementById(this.selector) : undefined;
  }

  hide() {
    const el = this.getElement();
    if (el) {
      el.addEventListener('transitionend', () => {
        el.className = 'global-loader-hidden';
      });

      if (!el.classList.contains('global-loader-hidden')) {
        el.className += ' global-loader-fade-out';
      }
    }
  }
}
