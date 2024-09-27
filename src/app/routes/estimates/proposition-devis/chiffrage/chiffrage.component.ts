import { DecimalPipe } from '@angular/common';
import {Component, inject, Input, viewChild} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardFooter, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatLineModule } from '@angular/material/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { Chiffrage, ChiffrageService } from '../../../../shared';
import {TooltipDirective} from "../../../../core/directives/tooltip.directive";

@Component({
  selector: 'app-chiffrage',
  standalone: true,
  imports: [

    MatButton, MatListModule, MatIconModule, MatSelectModule, MatInputModule, MatFormFieldModule,
    MatCard, MatCardTitle, MatCardSubtitle, MatCardActions, MatCardContent, MatCardHeader, MatCardFooter,
    MatChipsModule, MatLineModule, MatCardModule, MatExpansionModule, MatGridListModule, MatBadgeModule, DecimalPipe, TooltipDirective
  ],
  templateUrl: './chiffrage.component.html',
})
export class ChiffrageComponent {
  private readonly chiffrageService = inject(ChiffrageService);

  @Input() estimationJours?: number;

  accordion = viewChild.required(MatAccordion);

  get chiffrageJours(): Chiffrage { return this.chiffrageService.estimeJours(this.estimationJours); }
  get chiffrageCouts(): Chiffrage { return this.chiffrageService.estimeCouts(this.estimationJours); }

  get totalJoursConception(): number { return this.chiffrageService.estimeTotalJours(this.chiffrageJours.conception); }
  get totalCoutsConception(): number { return this.chiffrageService.estimeTotalCouts(this.chiffrageCouts.conception); }

  get totalJoursConstruction(): number { return this.chiffrageService.estimeTotalJours(this.chiffrageJours.construction); }
  get totalCoutsConstruction(): number { return this.chiffrageService.estimeTotalCouts(this.chiffrageCouts.construction); }

  get totalJoursRecette(): number { return this.chiffrageService.estimeTotalJours(this.chiffrageJours.recette); }
  get totalCoutsRecette(): number { return this.chiffrageService.estimeTotalCouts(this.chiffrageCouts.recette); }

  get totalJoursLivraison(): number { return this.chiffrageService.estimeTotalJours(this.chiffrageJours.livraison); }
  get totalCoutsLivraison(): number { return this.chiffrageService.estimeTotalCouts(this.chiffrageCouts.livraison); }

  get totalJours(): number { return this.totalJoursConception + this.totalJoursConstruction + this.totalJoursRecette + this.totalJoursLivraison; }
  get totalCouts(): number {
    return this.totalCoutsConception + this.totalCoutsConstruction + this.totalCoutsRecette + this.totalCoutsLivraison;
  }
}
