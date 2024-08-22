import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DemandeClient } from '../demande-client';
import { environment } from '../../environments/environment';


export interface Scenario {
  nom: string;
  complexite: string;
  duree: number;
}

export interface Module {
  nom: string;
  scenarios: Scenario[];
}

export interface Devis {
  nom: string;
  modules: Module[];
}

export interface Autocomplete {
  suggestions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class DevisService {

  constructor(private http: HttpClient) { }

  get devisRapideApiUrl() { return environment.devisRapideApiUrl; }


  public genere(demandeClient: DemandeClient): Observable<Devis> {
    if (!environment.production) { console.log(JSON.stringify(demandeClient, null, 2)) }
    console.log(JSON.stringify(environment, null, 2));

    return this.http.post<Devis>(`${this.devisRapideApiUrl}/genere`, demandeClient, { headers: { 'Content-Type': 'application/json', } });
  }

  public autocomplete(demandeClient: DemandeClient): Observable<Autocomplete> {
    return this.http.post<Autocomplete>(`${this.devisRapideApiUrl}/scenario/autocomplete`, demandeClient, { headers: { 'Content-Type': 'application/json', } });
  }

  public inlineAutocomplete(demandeClient: DemandeClient, chunk: string) {
    return this.http.post<Autocomplete>(
      `${this.devisRapideApiUrl}/scenario/autocomplete/inline`,
      {
        demandeClient,
        chunk
      },
      { headers: { 'Content-Type': 'application/json', } });
  }

  public newDemandeClientFromRaw(raw: string): Observable<DemandeClient> {
    return this.http.post<DemandeClient>(`${this.devisRapideApiUrl}/demande/new`, { raw }, { headers: { 'Content-Type': 'application/json', } });
  }
}

