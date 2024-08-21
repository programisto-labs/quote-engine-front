import { Injectable } from '@angular/core';
import { ChiffrageRecette, CoutProfil } from './chiffrage';

@Injectable({
  providedIn: 'root'
})
export class RecetteService {

  constructor() { }
  profils: CoutProfil = new CoutProfil();
  abaque: ChiffrageRecette = {
    livraisonRecette: 0.02,
    tests: 0.07,
    corrections: 0.10,
    relecture: 0.02,
    supportTechnique: 0.02
  }

  estimeCouts(jours: number): ChiffrageRecette {
    const estimationJours = this.estimeJours(jours);
    return {
      livraisonRecette: estimationJours.livraisonRecette * this.profils.leaderTechnique,
      tests: estimationJours.tests * this.profils.chefDeProjet,
      corrections: estimationJours.corrections * this.profils.developpeur,
      relecture: estimationJours.relecture * this.profils.leaderTechnique,
      supportTechnique: estimationJours.supportTechnique * this.profils.leaderTechnique
    }
  }

  estimeJours(jours: number): ChiffrageRecette {
    return {
      livraisonRecette: jours * this.abaque.livraisonRecette,
      tests: jours * this.abaque.tests,
      corrections: jours * this.abaque.corrections,
      relecture: jours * this.abaque.relecture,
      supportTechnique: jours * this.abaque.supportTechnique,
    }
  }
}
