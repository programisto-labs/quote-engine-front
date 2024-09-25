import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatCardContent} from "@angular/material/card";
import {BrandingComponent} from "../widgets/branding.component";
import {MatDivider} from "@angular/material/divider";
import {MatList, MatListItem} from "@angular/material/list";
import {TranslateModule} from "@ngx-translate/core";
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {MatButton} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatError, MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    MatToolbar,
    MatCardContent,
    BrandingComponent,
    MatDivider,
    MatList,
    MatListItem,
    TranslateModule,
    MatIcon,
    RouterLink,
    MatButton,
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatSuffix,
    ReactiveFormsModule
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
