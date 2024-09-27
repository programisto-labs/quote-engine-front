import { Injectable, TemplateRef, ViewChild } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipTemplateService {
  tooltipTemplate!: TemplateRef<any>;

  constructor() { }

  public setTemplate(template: TemplateRef<any>): TemplateRef<any> {
    return this.tooltipTemplate = template;
  }

  public getTemplate(): TemplateRef<any> {
    return this.tooltipTemplate;
  }
}
