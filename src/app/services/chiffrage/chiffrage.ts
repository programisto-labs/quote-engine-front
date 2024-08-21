
export interface ChiffrageConception {
    etude: number;
    conceptionFonctionnelle: number;
    conceptionTechnique: number;
    conceptionCahierDeTests: number;
}

export interface ChiffrageConstruction {
    initialisation: number;
    developementAvecTests: number;
    relecture: number;
    supportTechnique: number;
    supportFonctionnel: number;
    suiviDeProjet: number;
}

export interface ChiffrageRecette {
    livraisonRecette: number;
    tests: number;
    corrections: number;
    relecture: number;
    supportTechnique: number;
}

export interface ChiffrageLivraison {
    redactionDMFX: number;
    livraison: number;
    accompagnement: number;
    garantie: number;
}

export interface Chiffrage {
    conception: ChiffrageConception;
    construction: ChiffrageConstruction;
    recette: ChiffrageRecette;
    livraison: ChiffrageLivraison;
}

export class CoutProfil {
    developpeur: number = 100;
    chefDeProjet: number = 500;
    leaderTechnique: number = 450;
}
