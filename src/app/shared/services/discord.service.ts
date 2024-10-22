import {inject, Injectable} from '@angular/core';
import {concatAll, Observable, takeLast} from 'rxjs';
import {fromArrayLike} from "rxjs/internal/observable/innerFrom";
import {Autocomplete} from "./devis.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Devis} from "../interfaces";
import {DiscordDatatableBuilderService} from "./discord.datatable.builder.service";

@Injectable({
  providedIn: 'root',
})
export class DiscordService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly discordDatatableBuilderService = inject(DiscordDatatableBuilderService);
  devisRapideApiUrl = environment.devisRapideApiUrl;

  sendNotificationMessages(clientEmail: string, clientName: string, devis: any, projet: any) {
    let discord_message = this.buildDiscordData(clientEmail, clientName, devis, projet, environment.discord_webhook);
    let workflow_message = this.buildDiscordData(clientEmail, clientName, devis, projet, environment.workflow_webhook);


    fromArrayLike([
      this.sendDiscordRawMessage(workflow_message),
      this.sendDiscordMessage(discord_message)
    ]).pipe(
      concatAll(),
      takeLast(1)
    ).subscribe({
      error: (e) => {
        console.log('DiscordService: sendNotificationMessages ' + e);
      }
    });
  }

  private buildDiscordData(clientEmail: string, clientName: string, devis: any, projet: any, webhook: string) {
    return {
      content: `Le client ${clientName} a envoyé un projet\\ndans sa boîte mail (${clientEmail})!!!`,
      embeds: this.discordDatatableBuilderService.buildDiscordTable(devis as Devis, projet),
      devis,
      projet,
      webhook
    }
  }

  public sendDiscordMessage(discordData: any): Observable<Autocomplete> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/discord/webhook/send`, discordData, {headers: {'Content-Type': 'application/json',}});
  }

  public sendDiscordRawMessage(discordData: any): Observable<Autocomplete> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/discord/webhook/sendRaw`, discordData, {headers: {'Content-Type': 'application/json',}});
  }
}
