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
import {isPlatformBrowser} from "@angular/common";
import {TopmenuComponent} from "../topmenu/topmenu.component";

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
    TopmenuComponent,
  ],
})
export class HeaderComponent {
  private readonly platform = inject(PLATFORM_ID);
  showBrandName = true;
  brandWidth = 142;

  @Input() showToggle = true;
  @Input() showBranding = true;

  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleSidenavNotice = new EventEmitter<void>();

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platform)) {
      this.showToggle = window.innerWidth < 700;
    }
  }
}
