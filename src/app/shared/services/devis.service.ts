import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { tap, map } from 'rxjs/operators'
import {HttpClient} from '@angular/common/http';
import {DemandeClient, Devis} from '../interfaces';
import {environment} from '../../../environments/environment';

export interface Autocomplete {
  suggestions: string[];
}

declare global {
  interface Window {
    dataLayer?: any[]; // Declare dataLayer on the window object
  }
}

@Injectable({
  providedIn: 'root'
})
export class DevisService {
  private readonly http = inject(HttpClient);

  get devisRapideApiUrl() {
    return environment.devisRapideApiUrl;
  }


  public genere(demandeClient: DemandeClient): Observable<Devis> {
    return this.http.post<Devis>(`${this.devisRapideApiUrl}/genere`, demandeClient, {
      headers: { 'Content-Type': 'application/json' },
      observe: 'response'
    }).pipe(
      tap(response => {
        if (response.status === 200) {
          this.triggerSimpleGTMEventWithDelay();
        }
      }),
      map(response => response.body as Devis) // Return only the Devis object
    );
  }
  
  // Define the simple GTM trigger function
  private triggerSimpleGTMEventWithDelay(): void {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []; // Ensure dataLayer exists
      setTimeout(() => {
        window.dataLayer?.push({
          event: 'quoteGenerateSuccess' // Minimal custom GTM event
        });
      }, 1000); // Delay of 1000ms (1 second)
    }
  }
  
  
  public autocomplete(demandeClient: DemandeClient): Observable<Autocomplete> {
    return this.http.post<Autocomplete>(`${this.devisRapideApiUrl}/scenario/autocomplete`, demandeClient, {headers: {'Content-Type': 'application/json',}});
  }

  public inlineAutocomplete(demandeClient: DemandeClient, chunk: string) {
    return this.http.post<Autocomplete>(
      `${this.devisRapideApiUrl}/scenario/autocomplete/inline`,
      {
        demandeClient,
        chunk
      },
      {headers: {'Content-Type': 'application/json',}});
  }

  public newDemandeClientFromRaw(raw: string): Observable<DemandeClient> {
    return this.http.post<DemandeClient>(`${this.devisRapideApiUrl}/demande/new`, {raw}, {headers: {'Content-Type': 'application/json',}});
  }
}

