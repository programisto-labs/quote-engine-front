import {Module} from "./module";

export interface Devis {
  nom: string;
  modules: Module[];
  dateOfEstimate?: string;
}
