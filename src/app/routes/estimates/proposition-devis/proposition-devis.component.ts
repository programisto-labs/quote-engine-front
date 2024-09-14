import {ChangeDetectionStrategy, Component, inject, Input, viewChild} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatLineModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';

import {ChiffrageService, DemandeClient, Devis, DevisService, Module, Scenario} from '../../../shared';
import { DecimalPipe } from '@angular/common';
import { ChiffrageComponent } from "./chiffrage/chiffrage.component";
import {forkJoin, tap} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-proposition-devis',
  standalone: true,
  imports: [
    MatButton, MatListModule, MatIconModule, MatSelectModule, MatInputModule, MatFormFieldModule,
    MatCard, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardContent, MatCardHeader, MatCardFooter,
    MatChipsModule, MatLineModule, MatCardModule, MatListModule, MatExpansionModule, MatGridListModule, MatBadgeModule, DecimalPipe,
    ChiffrageComponent, MatProgressBarModule
  ],
  templateUrl: './proposition-devis.component.html',
  styleUrl: './proposition-devis.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropositionDevisComponent {
  accordion = viewChild.required(MatAccordion);

  private readonly chiffrageService: ChiffrageService = inject(ChiffrageService);
  private readonly devisService: DevisService = inject(DevisService);
  private readonly toastService = inject(ToastrService);

  @Input() devis?: Devis;
  @Input() demandeClient?: DemandeClient;
  @Input() waitingForService: boolean = false;
  estimationCouts: number = 0;

  get estimationJours(): number { return this.devis ? this.devis.modules.reduce((acc, module) => acc + module.scenarios.reduce((acc, scenario) => acc + scenario.duree, 0), 0) : 0; }
  get scenarioCount(): number { return this.devis ? this.devis.modules.reduce((acc, module) => acc + module.scenarios.length, 0) : 0; }

  get multipleScenarios(): boolean { return this.scenarioCount > 1; }
  get mutlipleJours(): boolean { return this.estimationJours > 1; }


  computeModuleDuration = (module: Module): string => `${module.scenarios.reduce((acc, scenario) => acc + scenario.duree, 0)} jour${module.scenarios.reduce((acc, scenario) => acc + scenario.duree, 0) > 1 ? "s" : ""}`;
  computeScenarioDuration = (scenario: Scenario): string => `${scenario.duree} jour${scenario.duree > 1 ? "s" : ""}`;
  computeModuleCount = (module: Module): string => `${module.scenarios.length} scénario${module.scenarios.length > 1 ? "s" : ""}`;
  computeDevisDuration = (): string => `${this.estimationJours} jour${this.mutlipleJours ? "s" : ""}`;
  computeDevisCount = (): string => `${this.scenarioCount} scénario${this.multipleScenarios ? "s" : ""}`;

  sendEmail() {
    const clientName = 'Jhon Doe';
    const clientEmail = 'aramis.stalin@gmail.com';
    const clientData = this.buildClientData(clientEmail);
    const salesData = this.buildSalesData(clientName, clientEmail);

    forkJoin([
      this.devisService.sendEmailToClient(clientData),
      this.devisService.sendEmailToSales(salesData)
    ]).pipe(
      tap(_ => this.devisService.sendDiscordMessage(`Le client ${clientName} a envoyé un projet dans sa boîte mail (${clientEmail})!!!`))
    ).subscribe({
      next: _ => this.toastService.success('L\'e-mail a été envoyé avec succès.'),
      error: (error) => {
        this.toastService.error('Une erreur s\'est produite lors de l\'envoi de l\'e-mail. Veuillez réessayer.');
        console.log(error);
      }
    });
  }

  private buildSalesData(clientName: string, clientEmail: string) {
    return {
      to: environment.salesEmail,
      subject: 'Prospect envoyé quote',
      body: `Le prospect ${clientName} s'est envoyé le projet à sa adresse e-mail (${clientEmail}).`

    }
  }

  private buildClientData(clientEmail: string) {
    return {
      to: clientEmail,
      subject: 'Planification du projet : durée et coûts détaillés.',
      devis: this.devis || {},
      projet: this.chiffrageService.getEstimatedData(this.estimationJours) || {}
    };
  }
}
