import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './theme/admin-layout/admin-layout.component';
import {ContactComponent} from "./routes/contact/contact.component";
import {NouveauDevisComponent} from "./routes/estimates/nouveau-devis/nouveau-devis.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', component: NouveauDevisComponent, pathMatch: 'full' },
      { path: 'team', component: ContactComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
