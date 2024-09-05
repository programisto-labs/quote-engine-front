import { Component } from '@angular/core';
import {PageHeaderComponent} from "../../shared";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    PageHeaderComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
