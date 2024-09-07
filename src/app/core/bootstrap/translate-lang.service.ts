import { Injectable, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from './settings.service';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root',
})
export class TranslateLangService {
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly settings = inject(SettingsService);

  load() {
    return new Promise<void>(resolve => {
      let defaultLang = 'fr-Fr';

      if (isPlatformBrowser(this.document)) {
        const browserLang = navigator.language;
        defaultLang =
          browserLang.match(/en|en-US|en-GB|en-AU|en-CA|en-IN|en-NZ|en-ZA|en-IE|en-SG/) ? 'en-US' :
            browserLang.match(/es-AR|es-BO|es-CL|es-CO|es-CR|es-DO|es-EC|es-ES|es-GT|es-HN|es-MX|es-NI|es-PA|es-PE|es-PR|es-PY|es-SA|es-US|es-UY|es-VE/) ? 'es-Es' :
              'fr-Fr';
      } else {
        defaultLang = this.translate.defaultLang;
      }

      this.settings.setLanguage(defaultLang);
      this.translate.setDefaultLang(defaultLang);
      this.translate.use(defaultLang).subscribe({
        next: () => console.log(`Successfully initialized '${defaultLang}' language.'`),
        error: () => console.error(`Problem with '${defaultLang}' language initialization.'`),
        complete: () => resolve(),
      });
    });
  }
}
