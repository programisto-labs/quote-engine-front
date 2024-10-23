import {AfterViewInit, Component, inject, Input, OnDestroy, viewChild} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import {
  ChiffrageService, ClientContactService,
  Devis, EmailService,
  Module,
  Scenario
} from '../../../shared';
import { DecimalPipe } from '@angular/common';
import { ChiffrageComponent } from "./chiffrage/chiffrage.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-proposition-devis',
  standalone: true,
  imports: [
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatLineModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    DecimalPipe,
    ChiffrageComponent,
    TranslateModule
  ],
  templateUrl: './proposition-devis.component.html',
  styles: [`
    .title { font-family: "Degular Bold", sans-serif;}
  `]
})
export class PropositionDevisComponent implements AfterViewInit, OnDestroy{

  accordion = viewChild.required(MatAccordion);

  private readonly chiffrageService: ChiffrageService = inject(ChiffrageService);
  private readonly emailService: EmailService = inject(EmailService);
  private readonly contactService: ClientContactService = inject(ClientContactService);
  private readonly translate: TranslateService = inject(TranslateService);
  private destroy$ = new Subject<void>();

  emailButtonLabel = this.translate.instant('dialogs.send_by_email');
  emailSent = false;

  _devis?: Devis;

  @Input()
  set devis(value: Devis|undefined) {
    this._devis = value || undefined;
    this.emailSent = false;
    this.emailButtonLabel = this.translate.instant('dialogs.send_by_email');
  };
  @Input() waitingForService: boolean = false;

  ngAfterViewInit() {
    this.emailService.sendingEmailStatus.pipe(takeUntil(this.destroy$)).subscribe({
      next: status => {
        if (status === 'sending') {
          this.emailButtonLabel = this.translate.instant('dialogs.sending_email');
          this.emailSent = true;
        }
        if (status === 'sent') {
          this.emailButtonLabel = this.translate.instant('dialogs.email_sent');
          this.emailSent = true;
        }
      },
      error: (e: any) => {
        this.emailButtonLabel = this.translate.instant('dialogs.send_by_sent');
        this.emailSent = false;
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  get devis() { return this._devis }
  get contactValid() { return this.contactService.contactValid.value}
  get estimationJours(): number { return this.devis ? this.devis.modules.reduce((acc, module) => acc + module.scenarios.reduce((acc, scenario) => acc + scenario.duree, 0), 0) : 0; }
  get modulesCount(): number { return this.devis && this.devis.modules ? this.devis.modules.length : 0 }
  get multipleModules(): boolean { return this.modulesCount > 1; }
  get mutlipleJours(): boolean { return this.estimationJours > 1; }

  computeModuleDuration = (module: Module): string => `${Module.moduleDuree(module)} jour${Module.moduleDuree(module) > 1 ? "s" : ""}`;
  computeScenarioDuration = (scenario: Scenario): string => `${scenario.duree} jour${scenario.duree > 1 ? "s" : ""}`;
  computeModuleCount = (module: Module): string => `${module.scenarios.length} scénario${module.scenarios.length > 1 ? "s" : ""}`;
  computeDevisDuration = (): string => `${this.estimationJours} jour${this.mutlipleJours ? "s" : ""}`;
  computeDevisCount = (): string => `${this.modulesCount} module${this.multipleModules ? "s" : ""}`;

  sendEmail() {
    let devis = this.devis || {};
    let projet = this.chiffrageService.getEstimatedData(this.estimationJours) || {}

    const contactData = this.contactService.contactValue.value;

    this.emailService.sendNotificationMessages(contactData.email, contactData.fullname, devis, projet);
  }
}
