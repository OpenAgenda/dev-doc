# Creating a location

```
POST /v2/agendas/{agendaUID}/locations
```

## In brief[​](#in-brief "Direct link to In brief")

* `agendaUID` is the unique identifier of the agenda where the location is referenced
* Write [authentication](https://developers.openagenda.com/en/en/authentification.md) via access token is required
* If the location coordinates are not specified, geocoding will be performed before the location creation operation.
* The data defining the location should be placed directly in the request body, they are detailed [here](https://developers.openagenda.com/en/en/lieux/structure.md). The `Content-Type` must be `application/json`.
* The response contains the details of the created location under a `location` key
* If an image is uploaded with the location, the `Content-Type` must be `multipart/form-data`, in which case the location data should be JSON-encoded and placed under a `data` key, with the image file placed under the `image` key.

## Examples[​](#examples "Direct link to Examples")

### Creation with image[​](#creation-with-image "Direct link to Creation with image")

#### node.js[​](#nodejs "Direct link to node.js")

Example with `POST` using `multipart/form-data` encoding where an image is uploaded with the location:

```
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

### Creation without image[​](#creation-without-image "Direct link to Creation without image")

#### node.js[​](#nodejs-1 "Direct link to node.js")

Example with `POST` using `application/json` encoding:

```
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

## Creation using an external identifier[​](#creation-using-an-external-identifier "Direct link to Creation using an external identifier")

```
PUT /v2/agendas/{agendaUID}/locations/ext/{key}/{value}
```

### In brief[​](#in-brief-1 "Direct link to In brief")

* `key` is the name of the identifier, `value` is its value
* If the location already exists, it will be updated
* A location can be associated with multiple external identifiers
* A location associated with one or more external identifiers retains a unique OpenAgenda identifier (UID).

### Examples[​](#examples-1 "Direct link to Examples")

#### node.js[​](#nodejs-2 "Direct link to node.js")

```
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
