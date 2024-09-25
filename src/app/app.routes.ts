import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './theme/admin-layout/admin-layout.component';
import {ContactComponent} from "./routes/contact/contact.component";
import {NouveauDevisComponent} from "./routes/estimates/nouveau-devis/nouveau-devis.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: NouveauDevisComponent },
      { path: 'team', component: ContactComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
