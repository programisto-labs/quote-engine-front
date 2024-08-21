import { Injectable } from '@angular/core';
import { ChiffrageConstruction, CoutProfil } from './chiffrage';

@Injectable({
  providedIn: 'root'
})
export class ConstructionService {

  constructor() { }
  profils: CoutProfil = new CoutProfil();
  abaque: ChiffrageConstruction = {
    initialisation: 0.05,
    developementAvecTests: 1,
    relecture: 0.05,
    supportTechnique: 0.05,
    supportFonctionnel: 0.02,
    suiviDeProjet: 0.05
  }
  estimeCouts(jours: number): ChiffrageConstruction {
    const estimationJours = this.estimeJours(jours);
    return {
      initialisation: estimationJours.initialisation * this.profils.leaderTechnique,
      developementAvecTests: estimationJours.developementAvecTests * this.profils.developpeur,
      relecture: estimationJours.relecture * this.profils.leaderTechnique,
      supportTechnique: estimationJours.supportTechnique * this.profils.leaderTechnique,
      supportFonctionnel: estimationJours.supportFonctionnel * this.profils.chefDeProjet,
      suiviDeProjet: estimationJours.suiviDeProjet * this.profils.chefDeProjet
    }
  }

  estimeJours(jours: number): ChiffrageConstruction {
    return {
      initialisation: jours * this.abaque.initialisation,
      developementAvecTests: jours * this.abaque.developementAvecTests,
      relecture: jours * this.abaque.relecture,
      supportTechnique: jours * this.abaque.supportTechnique,
      supportFonctionnel: jours * this.abaque.supportFonctionnel,
      suiviDeProjet: jours * this.abaque.suiviDeProjet,
    }
  }
}
