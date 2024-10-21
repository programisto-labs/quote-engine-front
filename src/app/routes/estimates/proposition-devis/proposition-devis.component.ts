import { ChangeDetectionStrategy, Component, Input, OnDestroy, viewChild } from '@angular/core';
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
  Devis,
  Module,
  Scenario
} from '../../../shared';
import { DecimalPipe } from '@angular/common';
import { ChiffrageComponent } from "./chiffrage/chiffrage.component";
import { Subject } from "rxjs";
import {TooltipDirective} from "../../../core";


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
    TooltipDirective
  ],
  templateUrl: './proposition-devis.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropositionDevisComponent implements OnDestroy {

  accordion = viewChild.required(MatAccordion);

  private destroy$ = new Subject();

  @Input() devis?: Devis;
  @Input() waitingForService: boolean = false;

  get estimationJours(): number { return this.devis ? this.devis.modules.reduce((acc, module) => acc + module.scenarios.reduce((acc, scenario) => acc + scenario.duree, 0), 0) : 0; }
  get scenarioCount(): number { return this.devis ? this.devis.modules.reduce((acc, module) => acc + module.scenarios.length, 0) : 0; }
  get multipleScenarios(): boolean { return this.scenarioCount > 1; }
  get mutlipleJours(): boolean { return this.estimationJours > 1; }

  computeModuleDuration = (module: Module): string => `${Module.moduleDuree(module)} jour${Module.moduleDuree(module) > 1 ? "s" : ""}`;
  computeScenarioDuration = (scenario: Scenario): string => `${scenario.duree} jour${scenario.duree > 1 ? "s" : ""}`;
  computeModuleCount = (module: Module): string => `${module.scenarios.length} scénario${module.scenarios.length > 1 ? "s" : ""}`;
  computeDevisDuration = (): string => `${this.estimationJours} jour${this.mutlipleJours ? "s" : ""}`;
  computeDevisCount = (): string => `${this.scenarioCount} scénario${this.multipleScenarios ? "s" : ""}`;

  ngOnDestroy() {
    this.destroy$.next(0);
  }

}
