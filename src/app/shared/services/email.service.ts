import {inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable, takeLast} from 'rxjs';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly toastService: ToastrService = inject(ToastrService);
  sendingEmailStatus = new BehaviorSubject<'idle'|'sending'|'sent'>('idle');
  devisRapideApiUrl = environment.devisRapideApiUrl;

  sendNotificationMessages(clientEmail: string, clientName: string, devis: any, projet: any) {
    this.sendingEmailStatus.next('sending');
    const clientData = this.buildClientData(clientEmail, clientName, devis, projet);

    this.sendEmail(clientData).pipe(takeLast(1)).subscribe({
      next: _ => {
        this.toastService.success('L\'e-mail a été envoyé avec succès.');
        this.sendingEmailStatus.next('sent');
      },
      error: () => {
        this.sendingEmailStatus.next('idle');
        this.toastService.error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail. Veuillez réessayer.');
      }
    });
  }

  private buildClientData(clientEmail: string, clientName: string, devis: any, projet: any) {
    return {
      clientEmail: clientEmail,
      clientName: clientName,
      subject: `Projet "${devis.nom}" estimé`,
      devis,
      projet
    };
  }

  public sendEmail(data: any): Observable<any> {
    return this.http.post<any>(`${this.devisRapideApiUrl}/sendEmail`, data, {headers: {'Content-Type': 'application/json',}});
  }
}
