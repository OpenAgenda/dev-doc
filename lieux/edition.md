# Édition d'un lieu

```
[POST/PATCH] /v2/agendas/${agendaUID}/locations/${locationUID}
```

## En bref[​](#en-bref "Lien direct vers En bref")

* `agendaUID` est l'identifiant unique de l'agenda où le lieu est référencé, `locationUID` est l'identifiant unique du lieu
* Une [authentification](https://developers.openagenda.com/authentification.md) en écriture par jeton d'accès est requise
* Les données définissant le lieu sont à placer directement dans le corps de requête, elles sont détaillées [ici](https://developers.openagenda.com/lieux/structure.md). Le `Content-Type` doit être de type `application/json`.
* La réponse contient le détail du lieu mis à jour sous une clé `location`
* La méthode `POST` est à utiliser pour les mises à jour complètes, `PATCH` pour les mises à jour partielles
* Si une image est chargée avec le lieu, le `Content-Type` doit être de type `multipart/form-data`, auquel cas les données du lieux sont à encoder en JSON et placés sous une clé `data`, l'image étant un fichier placé sous la clé `image`.

## Exemples[​](#exemples "Lien direct vers Exemples")

### Mise à jour du nom d'un lieu[​](#mise-à-jour-du-nom-dun-lieu "Lien direct vers Mise à jour du nom d'un lieu")

Le `PATCH` permet de cibler les données à modifier.

#### node.js[​](#nodejs "Lien direct vers node.js")

```
import axios from 'axios';
import getImageURL from './getImageURL.js';
import getAccessToken from './getAccessToken.js';
import getAgendaUID from './getAgendaUID.js';
import getLocationUID from './getLocationUID.js';

const { data: { location: patchedLocation } } = await axios({
  method: 'patch',
  url: `https://api.openagenda.com/v2/agendas/${getAgendaUID()}/locations/${getLocationUID()}`,
  headers: {
    'access-token': getAccessToken(),
    'content-type': 'application/json'
  },
  data: {
    name: 'Maison des associations',
  },
});
```

### Mise à jour complète[​](#mise-à-jour-complète "Lien direct vers Mise à jour complète")

```
import axios from 'axios';
import getImageURL from './getImageURL.js';
import getAccessToken from './getAccessToken.js';
import getAgendaUID from './getAgendaUID.js';
import getLocationUID from './getLocationUID.js';

const { data: { location: updatedLocation } } = await axios({
  method: 'post',
  url: `https://api.openagenda.com/v2/agendas/${getAgendaUID()}/locations/${getLocationUID()}`,
  headers: {
    'access-token': getAccessToken(),
    'content-type': 'application/json'
  },
  data: {
    name: 'Site Gallo-Romain de la Croix-Guillaume',
    address: 'Saint-Quirin, 57560 Saint-Quirin, France',
    countryCode: 'FR',
    adminLevel1: 'Grand Est',
    adminLevel2: 'Moselle',
    adminLevel3: 'Communauté de communes Sarrebourg Moselle Sud',
    city: 'Saint-Quirin',
    postalCode: '57560',
    insee: '57003',
    latitude: 48.607757,
    longitude: 7.0963,
    timezone: 'Europe/Paris',
    description: {
      fr: 'Le site concentre sur un même plateau l\'ensemble des fonctions d\'un hameau antique : habitat, activités économiques, culte et nécropole. Il illustre l\'occupation des hauteurs vosgiennes à l\'époque gallo-romaine, du 1er au IIIe siècle après Jésus-Christ.',
      en: 'The site concentrates on the same plateau all the functions of an ancient hamlet: housing, economic activities, worship and necropolis. It illustrates the occupation of the Vosges heights during the Gallo-Roman period, from the 1st to the 3rd century AD.',
      it: 'Il sito concentra su un unico altopiano tutte le funzioni di un antico borgo: abitazione, attività economiche, culto e necropoli. Illustra l\'occupazione delle alture dei Vosgi in epoca gallo-romana, dal I al III secolo dopo Cristo.',
      de: 'Der Standort konzentriert auf einem einzigen Plateau alle Funktionen eines antiken Weilers: Wohnraum, wirtschaftliche Aktivitäten, Kult und Nekropole. Es veranschaulicht die Besetzung der Vogesen-Höhen in gallo-römischer Zeit, vom 1\\. bis zum 3\\. Jahrhundert nach Christus.',
      es: 'El sitio concentra en una misma meseta todas las funciones de un antiguo caserío: hábitat, actividades económicas, culto y necrópolis. Ilustra la ocupación de las alturas vosgiennes en la época galo-romana, del 1o al 3o siglo después de Cristo.'
    },
    website: 'https://www.tourisme-sarrebourg.fr/sit/848143929-la-croix-guillaume/',
    email: 'an@email.com',
    phone: '0378959056',
    links: [],
    access: {
      fr: 'Situé à quelques kilomètres à l\'est du village, dans la forêt domaniale de Saint-Quirin, le site est accessible en voiture (10 mn de marche), ou bien à pied (3/4 d\'heure de St-Quirin). A pied, au départ de la mairie, en direction du plan d\'eau, suivre le balisage "anneau jaune" (circulaire des 7 roses) jusqu’au carrefour de la "Croix Guillaume", puis le GR5 sur 200m. En voiture, direction Lettenbach, Abreschviller. Au col de "Deux-Croix", prendre la route des "4 chemins". Se garer à l\'entrée du chemin de la "Croix Guillaume" et suivre le balisage "anneau jaune" jusqu\'au carrefour de la Croix Guillaume" puis le GR5 sur 200m. Le site est fléché.',
      en: 'Located a few kilometers east of the village, in the forest of Saint-Quirin, the site is accessible by car (10 minutes walk), or on foot (3/4 hour from St-Quirin). On foot, starting from the town hall, in the direction of the lake, follow the "yellow ring" (circular with 7 roses) until the crossroads of the "Croix Guillaume", then the GR5 for 200m. By car, direction Lettenbach, Abreschviller. At the "Deux-Croix" pass, take the "4 paths" road. Park at the entrance of the path "Croix Guillaume" and follow the signs "yellow ring" until the crossroads of Croix Guillaume" then the GR5 on 200m. The site is signposted.',
      it: 'Situato a pochi chilometri a est del villaggio, nella foresta demaniale di Saint-Quirin, il sito è accessibile in auto (10 minuti a piedi) o a piedi (3/4 ora da St-Quirin). A piedi, dal municipio, in direzione del lago, seguire il cartello "anello giallo" (circolare delle 7 rose) fino all\'incrocio della "Croix Guillaume", poi il GR5 su 200m. In auto, direzione Lettenbach, Abreschviller. Al passo di "Deux-Croix", prendere la strada dei "4 sentieri". Parcheggiare all\'ingresso del percorso "Croix Guillaume" e seguire la segnaletica "anello giallo" fino al bivio della Croix Guillaume" poi il GR5 a 200m. Il sito è puntato.',
      de: 'Das Hotel liegt ein paar Kilometer östlich des Dorfes, im Wald von Saint-Quirin, der Standort ist mit dem Auto (10 Minuten zu Fuß) oder zu Fuß (3/4 Stunde von St-Quirin). Zu Fuß, vom Rathaus in Richtung Gewässer, folgen Sie der Beschilderung "gelber Ring" (Kreis von 7 Rosen) bis zur Kreuzung des "Croix Guillaume", dann GR5 auf 200m. Mit dem Auto in Richtung Lettenbach, Abreschviller. Am Col de "Deux-Croix" die Route der "4 Wege" nehmen. Parken am Eingang des Weges "Croix Guillaume" und folgen der Beschilderung "gelber Ring" bis zur Kreuzung von Croix Guillaume", dann GR5 auf 200m. Die Website ist markiert.',
      es: 'Situado a pocos kilómetros al este del pueblo, en el bosque de Saint-Quirin, el sitio es accesible en coche (10 minutos a pie), o a pie (3/4 hora de St-Quirin). A pie, desde el ayuntamiento, hacia el plan de agua, siga la señalización "anillo amarillo" (circular de 7 rosas) hasta el cruce de la "Croix Guillaume", luego el GR5 a 200 metros. En coche, dirección Lettenbach, Abreschviller. En el paso de "Deux-Croix", tomar la carretera de los "4 caminos". Aparcar en la entrada del camino de "Croix Guillaume" y seguir el letrero "anillo amarillo" hasta el cruce de la Croix Guillaume" y luego el GR5 a 200 metros. El sitio está marcado.'
    },
    state: 1
  },
});
```

## Édition par un identifiant externe à OpenAgenda[​](#édition-par-un-identifiant-externe-à-openagenda "Lien direct vers Édition par un identifiant externe à OpenAgenda")

```
PUT /v2/agendas/{agendaUID}/locations/ext/{key}/{value}
```

Documenté [ici](https://developers.openagenda.com/lieux/creation.md#cr%C3%A9ation-par-un-identifiant-externe-%C3%A0-openagenda).
