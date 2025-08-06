---
title: Création d'un lieu
description: Créer un lieu sur un agenda en suivant la méthode usuelle ou avec un identifiant externe à OpenAgenda
sidebar_position: 3
---

# Création d'un lieu

```bash
POST /v2/agendas/{agendaUID}/locations
```

## En bref
* `agendaUID` est l'identifiant unique de l'agenda où le lieu est référencé
* Une [authentification](/authentification) en écriture par jeton d'accès est requise
* Si les coordonnées du lieu ne sont pas précisées, un géocodage sera effectué en amont de l'opération de création du lieu.
* Les données définissant le lieu sont à placer directement dans le corps de requête, elles sont détaillées [ici](/lieux/structure). Le `Content-Type` doit être de type `application/json`.
* La réponse contient le détail du lieu créé sous une clé `location`
* Si une image est chargée avec le lieu, le `Content-Type` doit être de type `multipart/form-data`, auquel cas les données du lieux sont à encoder en JSON et placés sous une clé `data`, l'image étant un fichier placé sous la clé `image`.

## Exemples

### Création avec image

#### node.js

Exemple avec `POST` en encodage `multipart/form-data` où une image est chargée avec le lieu:

```js
import FormData from 'form-data';
import axios from 'axios';
import getImageURL from './getImageURL.js';
import getAccessToken from './getAccessToken.js';
import getAgendaUID from './getAgendaUID.js';

const form = new FormData();
const imageURL = getImageURL();
const accessToken = getAccessToken();
const agendaUID = getAgendaUID();

form.append('data', JSON.stringify({
  name: 'Théâtre Beaulieu',
  address: '9 bis Bd François Blancho, 44200 Nantes',
  countryCode: 'FR',
  imageCredits: `Le nom de l'auteur`,
}));

const { data: imageStream } = await axios({
  method: 'get',
  url: getURLEncoded(imageURL)  ,
  responseType: 'stream',
});

form.append('image', imageStream);

const { data: { location: createdLocation } } = await axios({
  method: 'post',
  url: `https://api.openagenda.com/v2/agendas/${agendaUID}/locations`,
  headers: {
    ...form.getHeaders(),
    'access-token': accessToken,
  },
  data: form,
});
```

### Création sans image

#### node.js

Exemple avec `POST` en encodage `application/json`:

```js
import axios from 'axios';
import getImageURL from './getImageURL.js';
import getAccessToken from './getAccessToken.js';
import getAgendaUID from './getAgendaUID.js';

const { data: { location: createdLocation } } = await axios({
  method: 'post',
  url: `https://api.openagenda.com/v2/agendas/${getAgendaUID()}/locations`,
  headers: {
    'access-token': getAccessToken(),
    'content-type': 'application/json'
  },
  data: {
    name: 'Théâtre Beaulieu',
    address: '9 bis Bd François Blancho, 44200 Nantes',
    countryCode: 'FR',
    imageCredits: `Le nom de l'auteur`,
  },
});
```


## Création par un identifiant externe à OpenAgenda

```bash
PUT /v2/agendas/{agendaUID}/locations/ext/{key}/{value}
```

### En bref

* `key` est le nom de l'identifiant, `value` sa valeur
* Si le lieu existe déjà, il sera mis à jour
* Un lieu peut être associé à plusieurs identifiants externes
* Un lieu associé à un ou plusieurs identifiants externes garde un identifiant OpenAgenda unique (UID).

### Exemples

#### node.js

```js
import axios from 'axios';
import getImageURL from './getImageURL.js';
import getAccessToken from './getAccessToken.js';
import getAgendaUID from './getAgendaUID.js';
import getInfoNantesID from './getInfoNantesID.js';

const { data: { location: createdLocation } } = await axios({
  method: 'put',
  url: `https://api.openagenda.com/v2/agendas/${getAgendaUID()}/locations/ext/infonantes/${getInfoNantesID()}`,
  headers: {
    'access-token': getAccessToken(),
    'content-type': 'application/json'
  },
  data: {
    name: 'Théâtre Beaulieu',
    address: '9 bis Bd François Blancho, 44200 Nantes',
    countryCode: 'FR',
    imageCredits: `Le nom de l'auteur`,
  },
});
```
