import {inject, Injectable} from '@angular/core';
import {concatAll, delay, Observable, takeLast} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {fromArrayLike} from "rxjs/internal/observable/innerFrom";
import {Autocomplete} from "./devis.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly toastService: ToastrService = inject(ToastrService);
  devisRapideApiUrl = environment.devisRapideApiUrl;

  sendNotificationMessages(clientData: any, salesData: any, discordData: any) {
    fromArrayLike([
      this.sendEmail(clientData).pipe(delay(5000)),
      this.sendEmail(salesData),
      this.sendDiscordMessage(discordData)
    ]).pipe(
      concatAll(),
      takeLast(1)
    ).subscribe({
      next: _ => this.toastService.success('L\'e-mail a été envoyé avec succès.'),
      error: () => {
        this.toastService.error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail. Veuillez réessayer.');
      }
    });
  }

  public sendEmail(data: any): Observable<any> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/sendEmail`, data, {headers: {'Content-Type': 'application/json',}});
  }

  public sendDiscordMessage(discordData: any): Observable<Autocomplete> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/discord/webhook/send`, discordData, {headers: {'Content-Type': 'application/json',}});
  }
}
