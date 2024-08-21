import { Injectable } from '@angular/core';
import { ChiffrageLivraison, CoutProfil } from './chiffrage';

@Injectable({
  providedIn: 'root'
})
export class LivraisonService {

  constructor() { }
  profils: CoutProfil = new CoutProfil();
  abaque: ChiffrageLivraison = {
    redactionDMFX: 0.01,
    livraison: 0.04,
    accompagnement: 0.02,
    garantie: 0.10
  }

  estimeCouts(jours: number): ChiffrageLivraison {
    const estimationJours = this.estimeJours(jours);
    return {
      redactionDMFX: estimationJours.redactionDMFX * this.profils.leaderTechnique,
      livraison: estimationJours.livraison * this.profils.leaderTechnique,
      accompagnement: estimationJours.accompagnement * this.profils.chefDeProjet,
      garantie: estimationJours.garantie * this.profils.developpeur
    }
  }
  estimeJours(jours: number): ChiffrageLivraison {
    return {
      redactionDMFX: jours * this.abaque.redactionDMFX,
      livraison: jours * this.abaque.livraison,
      accompagnement: jours * this.abaque.accompagnement,
      garantie: jours * this.abaque.garantie,
    }
  }
}
