import { Routes } from '@angular/router';
import { authGuard } from './core';
import { AdminLayoutComponent } from './theme/admin-layout/admin-layout.component';
import { Error403Component } from './routes/sessions/403.component';
import { Error404Component } from './routes/sessions/404.component';
import { Error500Component } from './routes/sessions/500.component';
import { HomeComponent } from "./routes/home/home.component";
import {AuthLayoutComponent} from "./theme/auth-layout/auth-layout.component";
import {LoginComponent} from "./routes/sessions/login/login.component";
import {RegisterComponent} from "./routes/sessions/register/register.component";
import {ContactComponent} from "./routes/contact/contact.component";

export const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    canActivateChild: [authGuard],
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
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
