import {inject, Injectable} from "@angular/core";
import {Devis, Module} from "../interfaces";
import {ChiffrageService} from "./chiffrage";

const LINE_LENGTH = 56;
const TITLE_LENGTH = 30;
const TIME_LENGTH = 13;
const COST_LENGTH = 13;

@Injectable({
  providedIn: 'root'
})
export class DiscordDatatableBuilderService {
  private readonly chiffrageService = inject(ChiffrageService);

  buildDiscordTable(devis: Devis, projet: any): string {
    let table = [];
    table.push(this.buildTitleLine(devis.nom) + this.buildString(COST_LENGTH + TIME_LENGTH));
    devis.modules.forEach((module: any) => {
      table.push(
        this.buildTitleLine(module.nom) +
        this.buildScenariosLine(module) +
        this.buildTimeLine(module)
      )
    })
    table.push(this.buildString(LINE_LENGTH, '-'))
    table.push('Projet' + this.buildString(LINE_LENGTH - 6));
    table.push(this.buildString(LINE_LENGTH, '-'))
    const stages: string[] = Object.keys(projet);
    let costs: any = {};
    let hours: any = {};
    stages.forEach(stage => {
      costs[stage] = this.chiffrageService.estimeStageTotalCouts(projet[stage.toLowerCase()]);
      hours[stage] = this.chiffrageService.estimeStageTotalJours(projet[stage.toLowerCase()]);
      table.push(
        this.buildTitleLine(stage.at(0)!.toUpperCase() + stage.substring(1)) +
        this.buildCostLine(costs[stage]) +
        this.buildHoursLine(hours[stage])
      );
    });

    table.push(this.buildString(LINE_LENGTH, '-'))
    table.push('Total' + this.buildString(LINE_LENGTH - 5));
    table.push(
      this.buildTitleLine('Coût total') +
      this.buildCostLine((Object.values(costs) as number[]).reduce((acc: number, value: number) => acc + value)) +
      this.buildString(TIME_LENGTH)
    );
    table.push(
      this.buildTitleLine('Durée totale') +
      this.buildCostLine((Object.values(hours) as number[]).reduce((acc: number, value: number) => acc + value))
        .replace('€', 'jours') +
      this.buildString(TIME_LENGTH)
    );

    return "```plaintext\\n" + table.join("\\n") + "\\n```";
  }

  private computeModuleDuration = (module: Module): string => `${Module.moduleDuree(module)} jour${Module.moduleDuree(module) > 1 ? "s" : " "}`;

  private computeModuleCount = (module: Module): string => `${module.scenarios.length} scénario${module.scenarios.length > 1 ? "s" : " "}`;

  private buildTitleLine(title: string): string {
    const l = title.length;
    if (l >= TITLE_LENGTH) {
      return title.substring(0, TITLE_LENGTH);
    }
    return title + this.buildString(TITLE_LENGTH - l);
  }

  private buildScenariosLine(module: any): string {
    let str = this.computeModuleCount(module);
    return this.buildString(COST_LENGTH - str.length || 0) + str;
  }

  private buildCostLine(price: number): string {
    let str = new Intl.NumberFormat(
      'fr-FR', { style: 'currency', currency: 'EUR' }
    ).format(price);
    return this.buildString(COST_LENGTH - str.length || 0) + str;
  }

  private buildHoursLine(hours: number): string {
    let str = new Intl.NumberFormat('fr-FR', {style: 'decimal',minimumIntegerDigits:1, minimumFractionDigits:1, maximumFractionDigits:1}).format(hours);
    str += ' jours';
    return this.buildString(TIME_LENGTH - str.length || 0) + str;
  }

  private buildTimeLine(module: any): string {
    let str = this.computeModuleDuration(module);
    return this.buildString(TIME_LENGTH - str.length || 0) + str;
  }

  private buildString(count: number, character: string = ' '): string {
    return character.repeat(count);
  }
}
