import {
  Component,
  HostListener,
  inject,
  PLATFORM_ID,
  ViewEncapsulation
} from '@angular/core';

import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrl: './title.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class TitleComponent {
  private readonly platform = inject(PLATFORM_ID);
  show = true;

  constructor() {
    this.onResize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platform)) {
      // this.show = window.innerWidth > 600;
      this.show = true;
    }
  }

}
