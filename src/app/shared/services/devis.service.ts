import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DemandeClient, Devis} from '../interfaces';
import {environment} from '../../../environments/environment';

export interface Autocomplete {
  suggestions: string[];
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
    return this.http.post<Devis>(`${this.devisRapideApiUrl}/genere`, demandeClient, {headers: {'Content-Type': 'application/json',}});
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

  public sendEmailToClient(data: any): Observable<any> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/mail/toClient`, data, {headers: {'Content-Type': 'application/json',}});
  }

  public sendEmailToSales(data: any): Observable<any> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/mail/toSales`, data, {headers: {'Content-Type': 'application/json',}});
  }

  public sendDiscordMessage(message: string): Observable<Autocomplete> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/discord/webhook/send`, {message}, {headers: {'Content-Type': 'application/json',}});
  }

  public newDemandeClientFromRaw(raw: string): Observable<DemandeClient> {
    return this.http.post<DemandeClient>(`${this.devisRapideApiUrl}/demande/new`, {raw}, {headers: {'Content-Type': 'application/json',}});
  }
}

