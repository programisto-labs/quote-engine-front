import {Directive, ElementRef, Input, HostListener, TemplateRef, ViewContainerRef} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[istoTooltip]',
  standalone: true,
})
export class TooltipDirective {
  private overlayRef: OverlayRef|undefined;

  @Input('istoTooltip') tooltipContent: TemplateRef<any>|undefined;

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef) {
  }

  @HostListener('mouseenter')
  show() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top'
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    const tooltipPortal = new TemplatePortal(this.tooltipContent!, this.viewContainerRef);
    this.overlayRef.attach(tooltipPortal);
  }

  @HostListener('mouseleave')
  hide() {
    this.overlayRef?.detach();
  }
}
