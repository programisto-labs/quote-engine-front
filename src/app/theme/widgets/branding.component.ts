import {AfterViewInit, Component, HostListener, Input} from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <a class="branding" href="/">
      <img [src]="src" class="branding-logo" alt="Programisto"/>
    </a>
  `,
  styles: `
    .branding {
      display: flex;
      align-items: center;
      margin: 0 0.5rem;
      text-decoration: none;
      white-space: nowrap;
      color: inherit;
      border-radius: 50rem;
    }

    .branding-logo {
      height: 2rem;
      border-radius: 50rem;
    }

    .branding-name {
      margin: 0 0.5rem;
      font-size: 1rem;
      font-weight: 500;
    }
  `,
  standalone: true,
})
export class BrandingComponent {
  src = 'images/logo.webp';

  @Input()
  set showName(value: boolean) {
    value ? this.src = 'images/programisto.webp' : this.src = 'images/logo.webp';
  }
}
