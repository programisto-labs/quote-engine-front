import {AfterViewInit, Component, inject, TemplateRef, ViewChild} from "@angular/core";
import {MatIconModule} from "@angular/material/icon";
import {TooltipTemplateService} from "./tooltip-template.service";

@Component({
  selector: 'isto-tooltip',
  standalone: true,
  template: `
    <ng-template #tooltipTemplate let-tooltipIcon="tooltipIcon" let-tooltipContent="tooltipContent">
      <div class="custom-tooltip">
        <mat-icon class="tooltip-icon">{{tooltipIcon}}</mat-icon>
        <span>{{tooltipContent}}</span>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .custom-tooltip {
        display: flex;
        background-color: black;
        color: white;
        padding: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        align-items: center;
      }

      .tooltip-icon {
        display: flex;
        font-size: medium;
        color: #F2D275;
        align-items: baseline;
        height: 20px;
      }
    `
  ],
  imports: [MatIconModule]
})
export class TooltipComponent implements AfterViewInit{
  private readonly tooltipTemplateService: TooltipTemplateService = inject(TooltipTemplateService);

  @ViewChild('tooltipTemplate', { static: true }) template!: TemplateRef<any>;

  ngAfterViewInit() {
    this.tooltipTemplateService.setTemplate(this.template);
  }
}
