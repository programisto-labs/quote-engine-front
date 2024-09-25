import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  Output,
  PLATFORM_ID,
  ViewEncapsulation
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BrandingComponent } from '../widgets/branding.component';
import { GithubButtonComponent } from '../widgets/github.component';
import { NotificationComponent } from '../widgets/notification.component';
import { TranslateComponent } from '../widgets/translate.component';
import {isPlatformBrowser} from "@angular/common";
import {SearchComponent} from "../search/search.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  host: {
    class: 'matero-header',
  },
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    BrandingComponent,
    GithubButtonComponent,
    NotificationComponent,
    TranslateComponent,
    SearchComponent,
  ],
})
export class HeaderComponent {
  private readonly platform = inject(PLATFORM_ID);
  src = 'images/hand_writing.webp';
  showBrandName = true;
  brandWidth = 142;

  @Input() showToggle = false;
  @Input() showBranding = true;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platform)) {
      window.innerWidth > 960 ? this.showBrandName = this.showBranding : this.showBrandName = false;
      this.showBrandName ? this.brandWidth = 142 : this.brandWidth = 32;
    }
  }
}
