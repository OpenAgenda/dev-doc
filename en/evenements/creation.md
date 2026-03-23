# Creating an event

## Standard method[​](#standard-method "Direct link to Standard method")

```
POST /v2/agendas/{agendaUID}/events
```

### In brief[​](#in-brief "Direct link to In brief")

This route allows creating an event **in the context of an agenda**. This means that beyond the values of the event's [standard fields](https://developers.openagenda.com/en/en/evenements/structure.md#standard-fields), the values associated with the agenda's additional fields can be defined.

* `agendaUID` is the unique identifier of the agenda where the events are referenced
* A write [authentication](https://developers.openagenda.com/en/en/authentification.md) via access token is required
* A `lang` parameter can be specified in the header (`lang:fr`) to simplify formatting for monolingual events
* For [in-person/on-site](https://developers.openagenda.com/en/en/evenements/structure.md#attendance-mode) events, they must be linked to a location by its identifier. This identifier must be known at the time of event creation.
* The data defining the event must be placed under a `data` key in the request body.

### Examples[​](#examples "Direct link to Examples")

#### Most basic case[​](#most-basic-case "Direct link to Most basic case")

At minimum, an event must have the following information defined: a title, a short description, a time slot, a location.

##### node.js[​](#nodejs "Direct link to node.js")

```
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

#### A multilingual event[​](#a-multilingual-event "Direct link to A multilingual event")

The `title`, `description`, `longDescription`, `keywords` and `conditions` fields are multilingual. Each language variant should be placed behind keys corresponding to the language code.

##### node.js[​](#nodejs-1 "Direct link to node.js")

```
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

#### An event with additional fields[​](#an-event-with-additional-fields "Direct link to An event with additional fields")

[See here](https://developers.openagenda.com/en/en/agendas/schemas.md) for details on how additional fields work.

For this example, the agenda has the following additional field defined:

```
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

The created event must be associated with the `Culture` theme:

#####

```
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

#### Event with image provided by file[​](#event-with-image-provided-by-file "Direct link to Event with image provided by file")

##### node.js & axios[​](#nodejs--axios "Direct link to node.js & axios")

```
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import getAccessToken from './getAccessToken.js';
import getAgendaUID from './getAgendaUID.js';

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

## Creation by external identifier[​](#creation-by-external-identifier "Direct link to Creation by external identifier")

An event can be created via an [external identifier](https://developers.openagenda.com/en/en/evenements/structure.md#external-identifiers) external to OpenAgenda. The same route also serves for updates, when an event already exists for the given identifier:

```
PUT /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

### In brief[​](#in-brief-1 "Direct link to In brief")

* `key` is the name of the identifier, `value` is its value
* If the event already exists, it will be updated
* An event can be associated with multiple external identifiers
* An event associated with one or more external identifiers retains a unique OpenAgenda `UID` identifier.
