import { Routes } from '@angular/router';

import {NouveauDevisComponent} from "./nouveau-devis/nouveau-devis.component";
import {PropositionDevisComponent} from "./proposition-devis/proposition-devis.component";

export const routes: Routes = [
  { path: 'new', component: NouveauDevisComponent },
  { path: 'propositions', component: PropositionDevisComponent },
];
