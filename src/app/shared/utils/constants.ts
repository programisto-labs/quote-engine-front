import {Menu} from "../../core";

export const CONTACT_INFO_KEY = 'programisto.quote-engine.contact_info';

export const menu: Menu[] = [
  {
    "route": "https://programisto.fr/expertise",
    "name": "Expertise",
    "type": "sub",
    "icon": '',
    "children": [{
      "route": "https://programisto.fr/expertise/consulting-technique",
      "name": "Consulting Technique",
      "type": "extTabLink"
    }, {
      "route": "https://programisto.fr/expertise/quality-assurance",
      "name": "Quality Assurance",
      "type": "extTabLink"
    }, {
      "route": "https://programisto.fr/expertise/product-management",
      "name": "Product Management",
      "type": "extTabLink"
    }, {
      "route": "https://programisto.fr/expertise/project-pmo",
      "name": "Project, PMO",
      "type": "extTabLink"
    }
    ]
  }, {
    "route": "https://programisto.fr/publications",
    "name": "Publications",
    "type": "extTabLink",
    "icon": ""
  }, {
    "route": "https://programisto.fr/a-propos/",
    "name": "Qui sommes-nous ?",
    "type": "extTabLink",
    "icon": ''
  }
];
