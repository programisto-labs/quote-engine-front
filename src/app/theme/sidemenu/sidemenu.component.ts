import {
  ChangeDetectionStrategy,
  Component, inject, Input,
} from '@angular/core';

import {menu} from '../../shared';
import {MatAccordion, MatExpansionPanel, MatExpansionPanelHeader} from "@angular/material/expansion";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {TopmenuPanelComponent} from "../topmenu/topmenu-panel.component";
import {Menu, MenuChildrenItem, MenuService} from "../../core";
import {AsyncPipe, NgTemplateOutlet} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {MatButton} from "@angular/material/button";


@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    RouterLinkActive,
    TopmenuPanelComponent,
    RouterLink,
    NgTemplateOutlet,
    MatIconModule,
    TranslateModule,
    AsyncPipe,
    MatButton
  ],
})
export class SidemenuComponent {
  private readonly menuService: MenuService = inject(MenuService);

  @Input('menu')
  menu: Menu[]|MenuChildrenItem[] = menu;

  buildRoute = this.menuService.buildRoute;
}
