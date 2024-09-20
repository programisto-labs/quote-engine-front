import {Scenario} from "./scenario";


export class Module {
  nom: string = '';
  scenarios: Scenario[] = [];

  public static moduleDuree(module: Module): number {
    return module.scenarios.reduce((acc, scenario) => acc + scenario.duree, 0);
  }
}
