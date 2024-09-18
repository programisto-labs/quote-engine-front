import {Scenario} from "./scenario";


export class Module {
  nom: string;
  scenarios: Scenario[];

  public moduleDuree() {
    return this.scenarios.reduce((acc, scenario) => acc + scenario.duree, 0);
  }
}
