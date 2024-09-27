import {Directive, ElementRef, Input, HostListener, ViewContainerRef} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {TooltipTemplateService} from "./tooltip-template.service";

@Directive({
  selector: '[istoTooltip]',
  standalone: true,
})
export class TooltipDirective {
  private overlayRef: OverlayRef|undefined;

  @Input('tooltipIcon') tooltipIcon: 'info'|'none'|'config' = 'none';
  @Input('tooltipContent') tooltipContent: string = '';
  @Input('tooltipVerticalPosition')  vPosition: 'top'|'bottom' = 'bottom';
  @Input('tooltipHorizontalPosition')  hPosition: 'start'|'end' = 'start';

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private tooltipTemplateService: TooltipTemplateService
    ) {
  }

  @HostListener('mouseenter')
  show() {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: this.hPosition,
        originY: this.vPosition,
        overlayX: this.hPosition,
        overlayY: this.vPosition == 'top' ? 'bottom' : 'top'
      }]);

    this.overlayRef = this.overlay.create({ positionStrategy });

    const tooltipPortal = new TemplatePortal(
      this.tooltipTemplateService.getTemplate(),
      this.viewContainerRef,
      {tooltipIcon: this.tooltipIcon, tooltipContent: this.tooltipContent}
      );

    this.overlayRef.attach(tooltipPortal);
  }

  @HostListener('mouseleave')
  hide() {
    this.overlayRef?.detach();
  }
}
