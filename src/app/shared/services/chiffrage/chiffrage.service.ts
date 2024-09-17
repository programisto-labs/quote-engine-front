import { Injectable } from '@angular/core';
import { Chiffrage } from '../../interfaces';
import { ConstructionService } from './construction.service';
import { ConceptionService } from './conception.service';
import { RecetteService } from './recette.service';
import { LivraisonService } from './livraison.service';


@Injectable({
  providedIn: 'root'
})
export class ChiffrageService {

  constructor(
    private constructionService: ConstructionService,
    private conceptionService: ConceptionService,
    private recetteService: RecetteService,
    private livraisonService: LivraisonService
  ) { }

  estimeCouts(jours?: number): Chiffrage {
    if (!jours) { jours = 0; }
    return {
      construction: this.constructionService.estimeCouts(jours),
      conception: this.conceptionService.estimeCouts(jours),
      recette: this.recetteService.estimeCouts(jours),
      livraison: this.livraisonService.estimeCouts(jours),
    } as Chiffrage;
  }

  estimeJours(jours?: number): Chiffrage {
    if (!jours) { jours = 0; }
    return {
      construction: this.constructionService.estimeJours(jours),
      conception: this.conceptionService.estimeJours(jours),
      recette: this.recetteService.estimeJours(jours),
      livraison: this.livraisonService.estimeJours(jours)
    } as Chiffrage;
  }

  estimeTotalCouts(chiffrageCout: any): number { return Object.keys(chiffrageCout).reduce((acc, key) => acc + chiffrageCout[key], 0); }

  estimeTotalJours(chiffrageJours: any): number { return Object.keys(chiffrageJours).reduce((acc, key) => acc + chiffrageJours[key], 0); }

  estimeStageTotalJours(stage: any): number { return Object.keys(stage).reduce((acc, key) => acc + stage[key]['jours'], 0); }

  estimeStageTotalCouts(stage: any): number { return Object.keys(stage).reduce((acc, key) => acc + stage[key]['couts'], 0); }

  getEstimatedData(jours: number) {
    if (jours <= 0) {
      return {};
    }

    return this.buildProjetData(jours);
  }

  private buildProjetData(estimeJours: number) {
    let projet: any = {};

    let couts: any = this.conceptionService.estimeCouts(estimeJours);
    let jours: any = this.conceptionService.estimeJours(estimeJours);
    projet['conception'] = this.buildStageData(couts, jours);

    couts = this.constructionService.estimeCouts(estimeJours);
    jours = this.constructionService.estimeJours(estimeJours);
    projet['construction'] = this.buildStageData(couts, jours);

    couts = this.recetteService.estimeCouts(estimeJours);
    jours = this.recetteService.estimeJours(estimeJours);
    projet['recette'] = this.buildStageData(couts, jours);

    couts = this.livraisonService.estimeCouts(estimeJours);
    jours = this.livraisonService.estimeJours(estimeJours);
    projet['livraison'] = this.buildStageData(couts, jours);

    return projet;
  }

  private buildStageData(couts: Object, jours: Object) {
    let construction: any = {};
    Object.keys(couts).forEach((key) => {
      construction[key] = this.buildProperty(couts, jours, key);
    }, this);

    return construction;
  }

  private buildProperty(coust: any, jours: any, key: string) {
    return {
      couts: coust[key],
      jours: jours[key]
    };
  }

}
