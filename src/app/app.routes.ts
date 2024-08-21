import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { NouveauDevisComponent } from './nouveau-devis/nouveau-devis.component';

export const routes: Routes = [
    { path: 'nouveau-devis', component: NouveauDevisComponent },
    { path: 'home', component: HomeComponent },
    { path: '', component: HomeComponent },
    { path: 'contact', component: ContactComponent }
];
