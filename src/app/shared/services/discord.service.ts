import {inject, Injectable} from '@angular/core';
import {Observable, takeLast} from 'rxjs';
import {Autocomplete} from "./devis.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ClientContact, Devis} from "../interfaces";
import {DiscordDatatableBuilderService} from "./discord.datatable.builder.service";

@Injectable({
  providedIn: 'root',
})
export class DiscordService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly discordDatatableBuilderService = inject(DiscordDatatableBuilderService);
  devisRapideApiUrl = environment.devisRapideApiUrl;

  sendNotificationMessages(contactData: ClientContact, devis: any, projet: any) {
    let workflow_message = this.buildDiscordRawData(contactData, devis, projet, environment.workflow_webhook);
    this.sendDiscordRawMessage(workflow_message).pipe(
      takeLast(1)
    ).subscribe({
      error: (e) => {
        console.log('DiscordService: sendNotificationMessages ' + e);
      }
    });
  }

  private buildDiscordRawData(contact: any, devis: any, projet: any, webhook: string) {
    return {
      devis,
      projet,
      client: contact,
      webhook
    }
  }

  /*public sendDiscordMessage(discordData: any): Observable<Autocomplete> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/discord/webhook/send`, discordData, {headers: {'Content-Type': 'application/json',}});
  }*/

  public sendDiscordRawMessage(discordData: any): Observable<Autocomplete> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/discord/webhook/sendRaw`, discordData, {headers: {'Content-Type': 'application/json',}});
  }
}
