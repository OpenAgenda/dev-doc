# License and Terms of Use

Data read through the OpenAgenda API is published by agendas under a license that governs its reuse. When you display this data on a website, an application or any other platform, you must comply with the terms of that license.

To help you, exported data carries a `rights` key that specifies the applicable license as well as the licensor and the publisher of the data.

## In brief[​](#in-brief "Direct link to In brief")

* Every event read through the API carries a `rights` key describing its license, licensor and publisher.
* The `rights` key is read-only: it cannot be set through the create or update routes.
* Before displaying or redistributing data, check the license given in `rights.license` and comply with its terms.

## The `rights` key[​](#the-rights-key "Direct link to the-rights-key")

### Example[​](#example "Direct link to Example")

```
{
  ...
  "rights": {
    "license": {
      "name": "Licence Ouverte 2.0",
      "id": "etalab-2.0",
      "url": "https://www.data.gouv.fr/pages/legal/licences/etalab-2.0/"
    },
    "licensor": {
      "agendaUid": 6862496,
      "name": "RNCAP",
      "url": "https://rncap.org/"
    },
    "publisher": {
      "agendaUid": 6862496,
      "name": "RNCAP",
      "url": "https://rncap.org/"
    }
  },
  ...
}
```

### Detail[​](#detail "Direct link to Detail")

| Key                   | Type    | Description                                                                                         |
| --------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `license`             | object  | The license under which the data is distributed                                                     |
| `license.name`        | text    | Human-readable license name, to display in attributions                                             |
| `license.id`          | text    | Stable license identifier (e.g. `etalab-2.0`), to use in your code                                  |
| `license.url`         | link    | Link to the license text                                                                            |
| `licensor`            | object  | The licensor: the entity that holds the rights to the data and makes it available under the license |
| `licensor.agendaUid`  | integer | Identifier of the licensor's agenda                                                                 |
| `licensor.name`       | text    | Licensor name, to credit as the source of the data                                                  |
| `licensor.url`        | link    | Licensor website                                                                                    |
| `publisher`           | object  | The publisher: the entity that publishes the data on OpenAgenda                                     |
| `publisher.agendaUid` | integer | Identifier of the publisher's agenda                                                                |
| `publisher.name`      | text    | Publisher name                                                                                      |
| `publisher.url`       | link    | Publisher website                                                                                   |

### Licensor and publisher[​](#licensor-and-publisher "Direct link to Licensor and publisher")

The licensor (`licensor`) and the publisher (`publisher`) are often the same entity, as in the example above. They can however differ, for instance when an agenda redistributes events produced by another agenda. In that case, the **licensor** is the one to credit as the source of the data.

Data from a single agenda may come from several licensors. Read the `rights` key event by event rather than assuming a single license for a whole agenda.

## Licence Ouverte 2.0[​](#licence-ouverte-20 "Direct link to Licence Ouverte 2.0")

The [Licence Ouverte / Open Licence 2.0](https://www.data.gouv.fr/pages/legal/licences/etalab-2.0/) (identifier `etalab-2.0`) is the reference license for public data in France. It is compatible with the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), [Open Government Licence](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) and [ODC-BY](https://opendatacommons.org/licenses/by/) licenses.

### What it allows[​](#what-it-allows "Direct link to What it allows")

The license freely allows, including for commercial purposes:

* reproducing and copying the data;
* adapting, modifying, extracting and transforming it, in particular to create derived data;
* communicating and distributing it;
* exploiting it, in particular by combining it with other data or including it in a product or service.

### What it requires[​](#what-it-requires "Direct link to What it requires")

Reuse is conditional on **attributing** the data, which must state:

* the **source** of the data, at least the licensor's name (`rights.licensor.name`), for instance as a link to its website (`rights.licensor.url`);
* the **date of the last update** of the data, available in the event's `updatedAt` field.

This attribution must neither give an official character to your reuse nor suggest any endorsement by the licensor.

### Attribution example[​](#attribution-example "Direct link to Attribution example")

```
<p class="event-credits">
  Source: <a href="https://rncap.org/">RNCAP</a>
  — <a href="https://www.data.gouv.fr/pages/legal/licences/etalab-2.0/">Licence Ouverte 2.0</a>
  — updated on 2026-10-12
</p>
```

## Display best practices[​](#display-best-practices "Direct link to Display best practices")

* **Display attributions close to the data**: on the event page or next to each event in a list. If all displayed events share the same license and licensor, a single attribution visible on the page is enough.
* **Keep attributions up to date**: the `rights` key may change. If you sync the data into your own database, refresh it at every sync, along with the rest of the event.
* **Keep image credits**: images have their own credits, given in the [`imageCredits`](https://developers.openagenda.com/en/en/evenements/structure.md#image-credits) field. They come in addition to the license attribution and must be displayed with the image.

## API terms of use[​](#api-terms-of-use "Direct link to API terms of use")

* The API is free to use. It requires [authentication](https://developers.openagenda.com/en/en/authentification.md) for both read and write operations, which helps combat abusive usage.
* By reusing data read through the API, you agree to comply with the license of each piece of data, as given by the `rights` key.
* Data is provided as published by the agendas. Its accuracy is the responsibility of its publishers.
