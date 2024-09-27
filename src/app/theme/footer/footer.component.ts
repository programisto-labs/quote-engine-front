import {Component, HostListener, inject, PLATFORM_ID} from '@angular/core';
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
import {isPlatformBrowser, NgStyle} from "@angular/common";

const MAX_PET_WIDTH = 300;
const CONTENT_WIDTH = 880;
const PET_PADDING = 4;

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
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  private readonly platform = inject(PLATFORM_ID);
  petStyles: any = {display: 'none'};

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platform)) {
      if (window.innerWidth > 1024) {
        const width = this.getWidth(window.innerWidth);
        this.petStyles = {
          position: 'absolute',
          display: 'block',
          width: `${width - PET_PADDING / 2}px`,
          right: `${this.getRight(window.innerWidth, width) - PET_PADDING}px`,
          top: `-${width - PET_PADDING / 2}px`
        }
      } else {
          this.petStyles = { display: 'none'};
      }

    }
  }

  private getWidth(windowWidth: number): number {
    return windowWidth > (2 * MAX_PET_WIDTH + CONTENT_WIDTH) ?
      MAX_PET_WIDTH : (windowWidth - CONTENT_WIDTH) / 2;
  }

  private getRight(windowWidth: number, width: number): number {
    return (windowWidth - CONTENT_WIDTH) / 2 - width;
  }

}
