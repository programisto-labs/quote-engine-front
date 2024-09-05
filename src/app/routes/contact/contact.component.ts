import {Component} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';


@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatListModule, MatIconModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  collaborators = [
    {
      name: 'Florian Duport',
      occupation: 'CEO Programisto',
      oc_description: 'Créateur d\'expériences numériques, passionné de tech et de nature',
      avatar: 'https://programisto.fr/wp-content/uploads/2021/03/Florian-Duport-CEO-Programisto.webp'
    },
    {
      name: 'Tifenn Marquis',
      occupation: 'HEAD OF CONSULTING & ASSOCIATE',
      oc_description: 'J’accompagne les collaborateurs dès leur premier jour et tout au long de leur parcours.',
      avatar: 'https://programisto.fr/wp-content/uploads/2021/09/Tifenn-Marquis-HR-Partner-Programisto-280x280.webp'
    },
    {
      name: 'Cindy Tonon',
      occupation: 'HEAD OF FACTORY & ASSOCIATE',
      oc_description: 'De sa conception à sa concrétisation, je vous accompagne pour la réussite de votre projet.',
      avatar: 'https://programisto.fr/wp-content/uploads/2021/03/Cindy-Thonon-Project-Manager-Programisto.webp'
    },
    {
      name: 'Gauthier Depierre',
      occupation: 'HEAD OF MARKETING & ASSOCIATE',
      oc_description: 'Je me passionne pour nos / vos expertises et leur donne l’écho qu’elles méritent.',
      avatar: 'https://programisto.fr/wp-content/uploads/2021/03/Gauthier-Depierre-Chief-Marketing-Officer-Programisto.webp'
    },
    {
      name: 'Vincent Moret',
      occupation: 'STUDIO DIRECTOR AT BRUMISPHÈRE',
      oc_description: 'J\'accompagne la marque dans sa croissance sur le web tout en développant Brumisphère.',
      avatar: 'https://programisto.fr/wp-content/uploads/2021/05/Vincent-Directeur-Agence-Webmarketing-Brumisphe%CC%80re-Programisto-communaute%CC%81.webp'
    },
    {
      name: 'Camille Penaud',
      occupation: 'HEAD OF LEGAL & ASSOCIATE',
      oc_description: 'J\'accompagne les équipes de Programisto sur le plan administratif au quotidien.',
      avatar: 'https://programisto.fr/wp-content/uploads/2021/09/Camille-Penaud-pilotage-groupe-Programisto-280x280.webp'
    },
  ];
}
