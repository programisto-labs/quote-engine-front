import { Injectable } from '@angular/core';
import { Chiffrage } from './chiffrage';
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
    }
  }
  estimeJours(jours?: number): Chiffrage {
    if (!jours) { jours = 0; }
    return {
      construction: this.constructionService.estimeJours(jours),
      conception: this.conceptionService.estimeJours(jours),
      recette: this.recetteService.estimeJours(jours),
      livraison: this.livraisonService.estimeJours(jours)
    }
  }


  estimeTotalCouts(chiffrageCout: any): number { return Object.keys(chiffrageCout).reduce((acc, key) => acc + chiffrageCout[key], 0); }
  estimeTotalJours(chiffrageJours: any): number { return Object.keys(chiffrageJours).reduce((acc, key) => acc + chiffrageJours[key], 0); }

}
