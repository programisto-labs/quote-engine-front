import { Injectable } from '@angular/core';
import { ChiffrageConception, CoutProfil } from './chiffrage';

@Injectable({
  providedIn: 'root'
})
export class ConceptionService {
  constructor() { }
  profils: CoutProfil = new CoutProfil();
  abaque: ChiffrageConception = {
    etude: 0.02,
    conceptionFonctionnelle: 0.07,
    conceptionTechnique: 0.05,
    conceptionCahierDeTests: 0.05
  }
  estimeCouts(jours: number): ChiffrageConception {
    const estimationJours = this.estimeJours(jours);
    return {
      etude: estimationJours.etude * this.profils.chefDeProjet,
      conceptionFonctionnelle: estimationJours.conceptionFonctionnelle * this.profils.chefDeProjet,
      conceptionTechnique: estimationJours.conceptionTechnique * this.profils.leaderTechnique,
      conceptionCahierDeTests: estimationJours.conceptionCahierDeTests * this.profils.chefDeProjet
    }
  }
  estimeJours(jours: number): ChiffrageConception {
    return {
      etude: jours * this.abaque.etude,
      conceptionFonctionnelle: jours * this.abaque.conceptionFonctionnelle,
      conceptionTechnique: jours * this.abaque.conceptionTechnique,
      conceptionCahierDeTests: jours * this.abaque.conceptionCahierDeTests,
    }
  }

}
