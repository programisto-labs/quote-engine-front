import { Component } from '@angular/core';
import {PageHeaderComponent} from "../../shared";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    TranslateModule,
    MatButton,
    RouterLink
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

}
