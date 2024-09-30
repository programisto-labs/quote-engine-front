import {inject, Injectable} from '@angular/core';
import {Menu, MenuService} from './menu.service';
import {menu} from "../../shared";


@Injectable({
  providedIn: 'root',
})
export class StartupService {
  private readonly menuService = inject(MenuService);

  load() {
    this.setMenu(menu);
  }

  private setMenu(menu: Menu[]) {
    this.menuService.set(menu);
  }
}
