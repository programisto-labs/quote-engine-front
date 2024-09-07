import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './theme/admin-layout/admin-layout.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { HomeComponent } from "./routes/home/home.component";
import {ContactComponent} from "./routes/contact/contact.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'team', component: ContactComponent },
      { path: '403', component: Error403Component },
      { path: '404', component: Error404Component },
      { path: '500', component: Error500Component },
      {
        path: 'estimates',
        loadChildren: () => import('./routes/estimates/estimates.routes').then(m => m.routes),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
