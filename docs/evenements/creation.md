---
title: Création d'un événement
description: Créer un nouvel événement sur un agenda en suivant la méthode usuelle ou avec un identifiant externe à OpenAgenda
sidebar_position: 3
---

# Création d'un événement

## Méthode usuelle

```bash
POST /v2/agendas/{agendaUID}/events
```

### En bref

Cette route permet la création d'un événement **dans le contexte d'un agenda**. Ceci signifie qu'au delà des valeurs des [champs standard](/evenements/structure#champs-standards) de l'événement, les valeurs associées aux champs additionnels de l'agenda peuvent être définis.

* `agendaUID` est l'identifiant unique de l'agenda où les événements sont référencés
* Une [authentification](/authentification) en écriture par jeton d'accès est requise
* Un paramètre `lang` peut être précisé en entête (`lang:fr`) pour simplifier le formatage d'événements monolingues
* Pour les événements [physiques/in situ](/evenements/structure#mode-de-participation), il est nécessaire de les lier à un lieu par son identifiant. Ce dernier doit être connu au moment de la création de l'événement.
* Les données définissant l'événement doivent être placées sous une clé `data` en corps de requête.

### Exemples

#### Cas le plus basique

À minima, un événement doit avoir les informations suivantes de définies: un titre, une description courte, une plage horaire, un lieu.

##### node.js

```js
import axios from 'axios';
import getImageURL from './getImageURL.js';
import getAccessToken from './getAccessToken.js';
import getAgendaUID from './getAgendaUID.js';
import getLocationUID from './getLocationUID.js';

const {
  data: {
    event: createdEvent,
  },
} = await axios({
  method: 'post',
  url: `https://api.openagenda.com/v2/agendas/${getAgendaUID()}/events`,
  headers: {
    'access-token': getAccessToken(),
    'content-type': 'application/json',
    'lang': 'fr',
  },
  data: {
    title: 'Un été au ciné, cinéma en plein air - Donne moi des ailes',
    description: 'De Nicolas Vanier - 2019 / 1h53 - Avec Louis Vazquez, Jean-Paul Rouve, Mélanie Doutey',
    locationUid: getLocationUID(),
    timings: [{
      begin: '2025-08-06T21:30:00.000+0200',
      end: '2025-08-06T23:30:00.000+0200'
    }],
  }
});
```

#### Un événement multilingue

Les champs `title`, `description`, `longDescription`, `keywords` et `conditions` sont multilingues. Les variantes de chaque langue sont à placer derrière des clés correspondant au code langue.

##### node.js

```js
...

const {
  data: {
    event: createdEvent,
  },
} = await axios({
  method: 'post',
  url: `https://api.openagenda.com/v2/agendas/${getAgendaUID()}/events`,
  headers: {
    'access-token': getAccessToken(),
    'content-type': 'application/json',
  },
  data: {
    title: {
      fr: 'Un été au ciné, cinéma en plein air - Donne moi des ailes',
      en: 'A summer at the movies, open-air cinema - Give me wings',
    },
    description: {
      fr: 'De Nicolas Vanier - 2019 / 1h53 - Avec Louis Vazquez, Jean-Paul Rouve, Mélanie Doutey',
      en: 'From Nicola Vanier - 2019 / 1h53 - With Louis Vazquez, Jean-Paul Rouve, Mélanie Doutey',
    },
    keywords: {
      fr: ['ciné', 'projection'],
      en: ['movies', 'projection'],
    },
    ...
  },
});
```

#### Un événement avec champs additionnels

[Voir ici](/agendas/schemas) pour des détails sur le fonctionnement des champs additionnels.

Pour cet exemple, l'agenda à le champ additionnel suivant de défini:

```json
{
  "field": "thematique",
  "label": "Thématique",
  "optional": false,
  "options": [
      {
          "id": 15,
          "value": "vie-associative",
          "label": "Vie associative"
      },
      {
          "id": 8,
          "value": "numerique",
          "label": "Numérique"
      },
      {
          "id": 61,
          "value": "culture",
          "label": "Culture"
      },
      ...
  ],
  "fieldType": "checkbox",
  "schemaType": "network"
},
```

L'événement créé doit être associé à la thématique `Culture`:

#####

```js
...

const {
  data: {
    event: createdEvent,
  },
} = await axios({
  method: 'post',
  url: `https://api.openagenda.com/v2/agendas/${getAgendaUID()}/events`,
  headers: {
    'access-token': getAccessToken(),
    'content-type': 'application/json',
  },
  data: {
    title: {
      fr: 'Un été au ciné, cinéma en plein air - Donne moi des ailes',
    },
    ...,
    thematique: [61],
  },
});
```

#### Événement avec image fournie par fichier

##### node.js & axios

```js
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import getAccessToken from './getAccessToken.js';
import getAgendaUID from './getAgendaUID.js';

const getAccessToken = createAccessTokenGetter(secret);

const imageStream = fs.createReadStream(path.resolve('./image.png'));

const form = new FormData();

form.append('data', JSON.stringify({
  title: `Titre de l'événement`,
  description: `Description courte de l'événement`,
  attendanceMode: 2,
  onlineAccessLink: 'https://openagenda.com',
  timings: [{
    begin: '2025-08-30T10:00:00+0200',
    end: '2025-08-30T11:00:00+0200',
  }]
));
form.append('image', imageStream);

await axios({
  method: 'POST',
  url: `https://api.openagenda.com/v2/agendas/${getAgendaUID()}/events`,
  headers: {
    ...form.getHeaders(),
    'access-token': await getAccessToken(),
  },
  data: form,
});
```

## Création par identifiant externe

Un événement peut être créé via un [identifiant externe](/evenements/structure#identifiants-externes) à OpenAgenda. La même route sert également pour les mise à jour, lorsqu'un événement existe déjà pour l'identifiant donné:

```bash
PUT /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

### En bref

* `key` est le nom de l'identifiant, `value` sa valeur
* Si l'événement existe déjà, il sera mis à jour
* Un événement peut être associé à plusieurs identifiants externes
* Un événement associé à un ou plusieurs identifiants externes garde un identifiant OpenAgenda unique `UID`.