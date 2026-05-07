---
title: Reading events
description: List or view an event from an agenda
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Reading events

## List events of an agenda

```bash
GET /v2/agendas/{agendaUID}/events
```

**In brief**
* `agendaUID` is the unique identifier of the agenda where the events are referenced.
* A read [authentication](/authentification) or access token is required.
* The response contains a segment of events rather than the complete list. If the total exceeds the number of events returned in a single call, a read loop must be implemented.

### Filters

#### Standard filters

The following parameters affect the selection of events returned by a call.

| Key            | Type               | Description                                                                                                                                                                                                                                                                                                         |
|----------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| removed        | boolean(0\|1\|null) | By default, events that have been removed or deleted are no longer shown in the agenda. Setting this parameter to `1` will return their identifier `uid` and the removal timestamp `updatedAt`. This allows synchronization processes to track removals between two deletion intervals. |
| adminLevel4    | string[]            | Filter by city.<br/>Example: `?adminLevel4[]=Lausanne&city[]=Genève`                                                                                                                                                                                                                                             |
| adminLevel2    | string[]            | ...by Department (in France).<br/>Example: `?adminLevel2[]=Hauts-de-Seine`                                                                                                                                                                                                                                        |
| adminLevel1    | string[]            | ...by Region (in France).<br/>Example: `?adminLevel1=Normandie`                                                                                                                                                                                                                                                    |
| timings[gte]   | date               | ...by timing greater than...<br/>Example: `?timings[gte]=2025-...:00:00.000Z`                                                                                                                                                                                                                                     |
| timings[lte]   | date               | Filter by timing less than...<br/>Example: `?timings[lte]=2021-02-18T...00Z`                                                                                                                                                                                                                                   |
| updatedAt[gte] | date               | Updated after...<br/>Example: `?updatedAt[gte]=2021-02-1...:00.000Z`                                                                                                                                                                                                                                         |
| updatedAt[lte] | date               | Updated before...<br/>Example: `?updatedAt[lte]=2021-02-...00.000Z`                                                                                                                                                                                                                                           |
| search         | string[]            | Syntax search<br/>Example: `?search=Concert`                                                                                                                                                                                                                                                                |
| uid            | string[]            | Filter by identifier<br/>Example: `?uid[]=56158955&uid[]=55895615`                                                                                                                                                                                                                                                |
| slug           | string[]            | Filter by URL code<br/>Example: `?slug=festival-dete`                                                                                                                                                                                                                                                              |
| featured       | string[]            | Featured<br/>Example: `?featured=1` (featured) vs `?featured=0` (not featured)                                                                                                                                                                                                                                            |
| relative       | string[]            | Past / Current / Upcoming<br/>Example: `?relative[]=passed` (past events), `?relative[]=upcoming` (upcoming events), `?relative[]=current` (current events: with both past AND upcoming time slots)                                                                                                  |
| state          | string[]            | State on the agenda<br/>Example: `?state=2` (published - default value), `?state=1` (ready to publish), `?state=0` (to review), `?state=-1` (refused). Unpublished events are only accessible to moderator or administrator users.                                                      |
| keyword        | string[]            | Keywords<br/>Example: `?keyword[]=gratuit&keyword[]=exposition` works as logical `AND`                                                                                                                                                                                                                           |
| geo            | string[]            | Filter on a geographic bounding box<br/>Example: `?geo[northEast][lat]=48.9527&geo[northEast][lng]=2.4484&geo[southWest][lat]=48.8560&geo[southWest][lng]=2.1801`                                                                                                                                                     |
| locationUid    | string[]            | Filter by location identifier<br/>Example: `?locationUid[]=123&locationUid[]=456`                                                                                                                                                                                                                                  |
| accessibility  | string[]            | Filter by specific accessibility<br/>Example: `?accessibility[]=hi&accessibility[]=vi`                                                                                                                                                                                                                        |
| status         | string[]            | Filter by status<br/>Example: `?status[]=1`                                                                                                                                                                                                                                                                         |
| age[gte]       | integer             | Filter by age range: only returns events whose maximum age is greater than or equal to the given value.<br/>Example: `?age[gte]=6`                                                                                                                                                                                 |
| age[lte]       | integer             | Filter by age range: only returns events whose minimum age is less than or equal to the given value.<br/>Example: `?age[lte]=12`. Combined with `age[gte]`, lets you target events whose age range overlaps a given interval (e.g. `?age[gte]=6&age[lte]=12`).                                                   |

#### Additional field filters

Additional fields of choice types (checkbox, radio, select) can also serve as filter bases. The key is the code of the relevant field, the values are the identifiers to select.

An example for an additional field Metropolitan Categories whose code would be `categories-metropolitaines`:

```bash
GET /v2/agendas/{agendaUID}/events?categories-metropolitaines[]=2
```

The functioning of additional fields is detailed [here](/agendas/schemas)

### Content

| Key                   | Type          |  Description                                                                                                                                                                                                                                                                                                                             |
|-----------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| detailed              | boolean(0\|1) | If set to 1, returns all public data related to each event. |
| monolingual           | string         | Specify a language code (fr, en, it, de) to return only a single language for multilingual fields or additional field labels. If the chosen language is not defined, an available language will be used.                                                                                                            |
| longDescriptionFormat | string         | `markdown` by default. `HTML`: the longDescription field content is rendered in HTML format. `HTMLWithEmbeds`: the longDescription field content is rendered in HTML format and any link pointing to multimedia content from known platforms (Youtube, Soundcloud, Eventbrite, Pixlr...) will be replaced by embedded content. |
| includeLabels         | boolean(0\|1) | Include labels in choice-based additional fields.<br/>Example: `{"categorie": 1}` becomes `{"categorie": {"id": 1, "label": {"fr": "Spectacle"}}}`.                                                                                                                                                                                        |
| includeFields         | string[]       | Specifies which data to return for each event; useful for optimizing response time and bandwidth. Short variant: `if[]=` Ex: `if[]=uid&if[]=location.city`                                                                                                                                           |
| includeSort           | boolean(0\|1) | Include sort values for each event. Helps understand why events appear in a given order.<br/>Example: `?includeSort=1`                                                                                                                                                                        |

_**Pro tip**_: use `detailed` during development and `includeFields` in production to reduce the volume of data transferred and improve response times.

### Navigation

| Key                   | Type    |  Description                                                                                                                                                                                                                      |
|-----------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| after                 | string[] | Used to retrieve results following the first set of returned events, when the total matching active filters exceeds the total of the returned segment.                                                                 |
| from                  | integer  | Alternative to `after`. Allows retrieving results starting from the nth event. Prefer using the after key for better performance, especially for larger reads (> 500 events) |
| size                  | integer  | Defines the number of events retrieved per call. Default value: **20**. Maximum possible value: **300**                                                                                                                  |
| sort                  | string   | Sort order to apply

#### Sorts

The following sorts are available. They should be placed in a `sort` parameter:

| Value                      | Description                                                                                                                                                                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timingsWithFeatured.asc    | Default sort. Featured events first, then chronological sort based on the next upcoming time slot.                                                                                                                                 |
| timings.asc                | Chronological sort based on the next upcoming time slot. Events with the nearest upcoming time slots first, through to the most distant upcoming, followed by events with the nearest past time slots through to the most distant past. |
| lastTiming.asc             | Chronological sort based on the last upcoming time slot, followed by events with the nearest past time slots through to the most distant past.                                                                                                        |
| lastTimingWithFeatured.asc | Same as lastTiming.asc but with featured events first.                                                                                                                                                                                                        |
| updatedAt.desc             | Most recently updated events first                                                                                                                                                                                                      |
| updatedAt.asc              | Most recently updated events last

##### Understanding result order with includeSort

The `includeSort` parameter provides a detailed explanation of the order in which events are returned. When enabled, each event in the response includes a `sort` field containing the values used for sorting.


**Interpreting the values**

| Key              | Description                                                                                           |
|------------------|-------------------------------------------------------------------------------------------------------|
| featured         | `true` if the event is featured, `false` otherwise                                                    |
| relative         | Temporal position: `'upcoming'` (upcoming), `'passed'` (past)                                         |
| lastTiming       | Date of the last time slot, in ISO format (e.g.: `2025-09-07T20:00:00.000Z`)                          |
| firstTiming      | Date of the first time slot, in ISO format                                                            |
| location.*       | Location values (e.g.: `location.adminLevel1` for the region, `location.adminLevel4` for the city)    |
| search           | Text search relevance score (decimal number)                                                          |
| updatedAt        | Last update date                                                                                      |

**Usage example**

For a sort by location then by date:

```bash
GET /v2/agendas/{agendaUID}/events?sort[]=location.region.asc&sort[]=location.region.asc&sort[]=timings.asc&includeSort=1
```

Response:

```json
{
  "total": 45,
  "sort": ["location.region.asc", "location.region.asc", "timings.asc"]
  "events": [
    {
      "uid": 78901,
      "title": "Festival de musique",
      "location": {
        "city": "Lyon",
        "region": "Auvergne-Rhône-Alpes"
      },
      "sort": [
        { "key": "location.adminLevel1", "value": "Auvergne-Rhône-Alpes" },
        { "key": "location.adminLevel4", "value": "Lyon" },
        { "key": "relative", "value": "upcoming" },
        { "key": "lastTiming", "value": "2025-08-15T22:00:00.000Z" }
      ],
      ...
    },
    {
      "uid": 78902,
      "title": "Exposition d'art",
      "location": {
        "city": "Villeurbanne",
        "region": "Auvergne-Rhône-Alpes"
      },
      "sort": [
        { "key": "location.adminLevel1", "value": "Auvergne-Rhône-Alpes" },
        { "key": "location.adminLevel4", "value": "Villeurbanne" },
        { "key": "relative", "value": "upcoming" },
        { "key": "lastTiming", "value": "2025-08-20T18:00:00.000Z" }
      ],
      ...
    }
  ]
}
```

In this example, we can clearly see that events are first grouped by region (`Auvergne-Rhône-Alpes`), then sorted by city (`Lyon` before `Villeurbanne`), and finally by date.


###  Response

The response presents data under the following keys:

| Key            | Type            | Description                                                                          |
|----------------|-----------------|--------------------------------------------------------------------------------------|
| total          | integer          | The total number of members                                                          |
| events         | object[]         | Segment of events matching the filters                                               |
| sort           | string           | Effective sort                                                                       |
| after          | string[]        | Values to place in the next call to retrieve the next segment of events              |

Events are presented according to the structure detailed [here](/evenements/structure).

### Some use cases

#### Retrieve all upcoming published events on an agenda

When the goal is to retrieve all events matching a given filter, a series of calls will be necessary when the total exceeds the maximum number of events retrievable in a single call (`300`).

For this example, the goal is to retrieve all current and upcoming events published on the agenda: the `relative` filter is used for this purpose. A first call is made to retrieve the first segment of results:

```bash
GET /v2/agendas/{agendaUID}/events?relative[]=current&relative[]=upcoming
```

The returned result has the following form, providing the first 20 events out of 872 events matching the requested filter:

```json
{
  "total": 872,
  "events": [...],
  "after": ["0", "000001758268800", "1758472200000", "5335740"]
}
```

The values provided under the `after` key allow retrieving the next 20 events:

```bash
GET /v2/agendas/{agendaUID}/events?relative[]=current&relative[]=upcoming&after[]=0&after[]=000001758268800&after[]=1758472200000&after[]=5335740
```

And so on until reaching the last events. The final response will provide an `after` value of `null` indicating there are no more events to retrieve.

```json
{
  "total": 872,
  "events": [...],
  "after": null
}
```

---

#### Synchronize an event database

A script synchronizing an agenda's programming with a third-party database at regular intervals can work by retrieving the entire programming on its first execution, then **limiting** itself to processing **additions, modifications and deletions** between each new execution. The following parameters are useful for achieving this:

* **updatedAt[gte]**: specify the last script execution time to limit the selection to events updated since then
* **removed**: `null` to **include** events that have been removed from the programming
* **sort**: `updatedAt.asc`: optionally, sort the selection by update order to simplify reading

... and in this example, we are only interested in French texts.

```bash
GET /v2/agendas/{agendaUID}/events?updatedAt[gte]=2025-07-11T13:49:58.000Z&removed=null&monolingual=fr
```

The result will look like this:

```json
{
  "total": 462,
  "events": [
    {
      "uid": 50976230,
      "removed": true,
      "updatedAt": "2025-07-11T13:49:59.024Z"
    },
    {
      "uid": 1325588,
      "removed": false,
      "updatedAt": "2025-07-11T13:52:05.000Z",
      "createdAt": "2025-07-11T13:52:05.000Z",
      "title": "Visite de l'Hôtel de ville de Belfort",
      ...
    },
    ...
  ],
  "after": ["1753800986069", "43733206"]
}
```

The identifiers of removed events are sufficient to propagate the removal operation to the synchronized database; the other events can be either created or updated.

### JSON Export

The JSON export previously offered on the export modal of OpenAgenda agendas is **end-of-life**. The documentation for this export [is available here](/evenements/export-json), a migration guide [is available here](/evenements/export-json-migration).

## View a single event

### Unique identifier

```bash
GET /v2/agendas/{agendaUID}/events/{eventUID}
```

**In brief**
* `agendaUID` is the unique identifier of the agenda where the event is referenced, `eventUID` is its unique identifier (uid).
* A read [authentication](/authentification) or access token is required.

### External identifier

```bash
GET /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

**In brief**
* `agendaUID` is the unique identifier of the agenda where the event is referenced, `key` is the code of the external identifier (extId) and `value` is its value.
* A read [authentication](/authentification) or access token is required.

### Parameters

| Key                   | Type         |  Description                                                                                                                                                                                                                                                                                                                             |
|-----------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| longDescriptionFormat | string        | `markdown` by default. `HTML`: the longDescription field content is rendered in HTML format. `HTMLWithEmbeds`: the longDescription field content is rendered in HTML format and any link pointing to multimedia content from known platforms (Youtube, Soundcloud, Eventbrite, Pixlr...) will be replaced by embedded content. |
| includeLabels         | boolean(0\|1) | Include labels in choice-based additional fields.<br/>Example: `{"categorie": 1}` becomes `{"categorie": {"id": 1, "label": {"fr": "Spectacle"}}}`.                                                                                                                                                                              |

## Cross-agenda reading

Allows listing recent and upcoming events published on public agendas indexed on OpenAgenda. This feature is experimental. To test it, contact us by sending an email to support@openagenda.com

```bash
GET /v2/events
```

**In brief**

* A read [authentication](/authentification) or access token is required.
* The parameters for this route are the same as [those offered for reading events from an agenda](/evenements/lecture#list-events-of-an-agenda). Only agenda-specific values (state, additional fields, featured) have no equivalent in cross-agenda search. The response data is also structured in the same way.
* Past events are regularly removed from the cross-agenda index. The `relative` filter is useful for excluding them from reads: `?relative[]=current&relative[]=upcoming`.
* This feature is experimental. The data structure and access conditions are subject to change.
