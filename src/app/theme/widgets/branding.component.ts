import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="p-y-16 align-content-center h-full">
      <a class="branding" href="https://programisto.fr" target="_blank">
        <img [src]="src" alt="Programisto" [width]="width"/>
      </a>
    </div>
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
  `,
  standalone: true,
})
export class BrandingComponent {
  src = 'images/logo_black.png';

  @Input() width: number = 142;
  @Input() color: 'black'|'white' = 'black';

  @Input()
  set showName(value: boolean) {
    this.src = this.getPath(this.color, value);
  }

  private getPath(color: 'black'|'white', showName: boolean) {
    return showName ? `images/programisto_${color}.png`
                    : `images/logo_${color}.png`;
  }
}
