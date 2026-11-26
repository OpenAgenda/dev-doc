# Ticketing data integration: offers

The API exposes the prices and availability of events sold on a ticketing platform. This page describes how the v2 API works **today**.

The feature is in production and is **enabled agenda by agenda**, on request, during the test phase. Data is currently fed by sync connectors that write through the API. On an agenda where it is not enabled, a ticketing write is refused (`422 offers.disabled`, see [Writing](#writing)).

The ticketing fields are **additive**: `registration`, `conditions` and the other existing fields keep their format. An event without ticketing is unchanged.

For more on the context of this change, see [here](https://doc.openagenda.com/fr/article/integration-des-infos-de-billetteries-1rwtkhr/). Comments are welcome at <support@openagenda.com>.

## Overview[​](#overview "Direct link to Overview")

```
{
  "uid": 31148791,
  "title": { "fr": "INCONSTANCE" },

  "offers": [ /* catalogue: who sells it, at which prices */ ],
  "offersAggregate": { /* summary computed at read time */ },
  "availabilityUpdatedAt": "2026-11-25T13:00:31.000Z",

  "timings": [
    {
      "id": "6G3S74",
      "begin": "2027-02-18T20:00:00+01:00",
      "end": "2027-02-18T21:15:00+01:00",
      "availability": [ /* state of the sale, one row per ticketing platform */ ]
    }
  ]
}
```

* `offers` is a **list**: the same event can be sold on several platforms (at most 10 sources).
* `offersAggregate` sums the event up for a short display: availability, price category, price range, booking links.
* `timings[].availability` tells, for each date and each platform, whether it can be booked.
* `availabilityUpdatedAt` lets you follow availability changes without re-reading the whole agenda.

## Reading[​](#reading "Direct link to Reading")

| Route                                                     | What it serves                                                                |
| --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `GET /v2/agendas/{agendaUID}/events/{eventUID}`           | Every field, tier labels included                                             |
| `GET /v2/agendas/{agendaUID}/events/ext/{key}/{value}`    | Same as above, by external identifier                                         |
| `GET /v2/agendas/{agendaUID}/events?detailed=1`           | `offers` **without tier labels**, `offersAggregate`, `timings[].availability` |
| `GET /v2/agendas/{agendaUID}/events` (without `detailed`) | No ticketing field                                                            |

Tier labels (`offers[].tiers[].label`) are only served when a single event is read. They make up most of a catalogue's weight, and a listing does not need them: that is what `offersAggregate` is for. To display the full price grid, read the event itself.

With `includeFields[]`, naming `offers`, `offersAggregate` or `timings` is not enough: add `registration` as well, which is what loads the catalogue. Without it, the ticketing fields and the `timings[].availability` rows are not served.

The `firstTiming`, `lastTiming` and `nextTiming` copies do not carry the inventory: read it in `timings[]`.

## `offers` — the catalogue per platform[​](#offers--the-catalogue-per-platform "Direct link to offers--the-catalogue-per-platform")

A real example (cut down to two tiers):

```
"offers": [
  {
    "provider": "mapado",
    "currency": "EUR",
    "pricing": "paid",
    "syncedAt": "2026-11-19T13:30:00.099Z",
    "source": {
      "ref": "842800",
      "url": "https://billetterie-ligeria.sainte-luce-loire.com/event/842800-inconstance"
    },
    "tiers": [
      {
        "sourceRef": "28503608",
        "label": { "fr": "Tarif solidaire" },
        "offerType": "standard",
        "priceCents": 1700,
        "saleStart": "2026-06-23T12:00:00+02:00"
      },
      {
        "sourceRef": "28503580",
        "label": { "fr": "Plein tarif" },
        "offerType": "standard",
        "priceCents": 2500,
        "saleStart": "2026-06-23T10:00:00+02:00"
      }
    ]
  }
]
```

| Field                                                | Notes                                                                                                                                                                                |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `provider`                                           | `billetweb` \| `eventbrite` \| `helloasso` \| `mapado` \| `weezevent` \| `passculture` \| `manual`                                                                                   |
| `currency`                                           | ISO 4217 code. One source = one currency.                                                                                                                                            |
| `pricing`                                            | Category declared by the source: `free` \| `paid` \| `donation` \| `mixed` \| `unknown`                                                                                              |
| `source.ref`                                         | The event's identifier on the platform                                                                                                                                               |
| `source.url`                                         | Public booking page                                                                                                                                                                  |
| `syncedAt`                                           | Last sync of the catalogue (not of the inventory, which has its own `syncedAt` per row)                                                                                              |
| `onSaleFromBeforeBegin` / `onSaleThroughBeforeBegin` | Optional. Sale window relative to each date, as an ISO 8601 duration (e.g. `P30D`: opens 30 days before). Already applied to `availability`: read it as a rule, do not recompute it. |
| `tiers[]`                                            | The price grid, at most 50 per source. Absent when the source has not sent one yet, `[]` when it was cleared.                                                                        |

### `tiers[]` — one tier[​](#tiers--one-tier "Direct link to tiers--one-tier")

| Field                   | Notes                                                                                                           |
| ----------------------- | --------------------------------------------------------------------------------------------------------------- |
| `sourceRef`             | The tier's identifier on the platform. Required.                                                                |
| `label`                 | Multilingual object, at least one language filled. **Only served when a single event is read.**                 |
| `offerType`             | `standard` (default) \| `donation` \| `membership`                                                              |
| `priceCents`            | Integer, in the currency's minor unit (`1700` = €17.00)                                                         |
| `minAmountCents`        | Floor of a `donation` (pay-what-you-want) tier, when it has one. A `donation` tier does not carry `priceCents`. |
| `saleStart` / `saleEnd` | For display ("on sale until 12 November"). Not used to compute `availability`.                                  |

## `offersAggregate` — the summary[​](#offersaggregate--the-summary "Direct link to offersaggregate--the-summary")

Computed on every read, present on any event that has a catalogue. This is the field to use for a card or a list.

```
"offersAggregate": {
  "availability": "available",
  "pricing": "paid",
  "price": { "minCents": 1700, "maxCents": 2500, "currency": "EUR" },
  "links": [
    {
      "provider": "mapado",
      "url": "https://billetterie-ligeria.sainte-luce-loire.com/event/842800-inconstance"
    }
  ]
}
```

| Field          | Notes                                                                                                                                                                                                                                                                                       |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `availability` | A string: `available` \| `limited` \| `notYetOnSale` \| `soldOut` \| `salesClosed` \| `unknown` \| `mixed`, or `null` when nothing can be said (every date past, no usable row).                                                                                                            |
| `pricing`      | Category rolled up over sources and dates. `mixed` when they disagree (one date free, another paid).                                                                                                                                                                                        |
| `price`        | Price range, in minor units. `null` when it cannot be computed over the whole grid: a source without tiers, a `membership` tier without a price, sources in different currencies. A partial range would be wrong. `maxCents: null` means **no ceiling** (pay what you want), not "unknown". |
| `links`        | One entry per platform that has a booking URL, in catalogue order. `null` when none does, and on a cancelled event.                                                                                                                                                                         |

`price` takes date-specific prices into account (see [Per-date override](#per-date-override--timingsoffers)), which the `offers` grid does not show. For "from €X", use `price.minCents`.

### How `availability` is rolled up[​](#how-availability-is-rolled-up "Direct link to how-availability-is-rolled-up")

Only dates **that have not ended** and have at least one row count. Each date is first summed up from its rows (resolved statuses, see below):

```
available     if a platform sells the date
limited       otherwise, if a platform has few seats left
notYetOnSale  otherwise, if a platform has not opened its sale yet
soldOut       if every platform is sold out
salesClosed   if sales are closed on every platform
unknown       otherwise (e.g. one platform sold out, another closed)
```

Then the event, from its dates:

```
available     if at least one date is available
limited       otherwise, if at least one date is limited
soldOut       if every date is soldOut
notYetOnSale  if every date is notYetOnSale
salesClosed   if every date is salesClosed
unknown       if every date is unknown
mixed         otherwise: the dates disagree (display it as "see dates")
```

`null` when no upcoming date has a row. The event's own status comes before the rows: a **full** event is `soldOut`, a **cancelled** event is `salesClosed`.

## `timings[].id` — the date identifier[​](#timingsid--the-date-identifier "Direct link to timingsid--the-date-identifier")

```
{ "id": "6G3S74", "sourceRef": "3200414", "begin": "2027-02-18T20:00:00+01:00", "end": "2027-02-18T21:15:00+01:00" }
```

* **Format**: 6 characters, digits and upper-case letters without `I`, `L`, `O`, `U` (`^[0-9ABCDEFGHJKMNPQRSTVWXYZ]{6}$`).
* **Stable**: kept from one write to the next. A date sent without an `id` is matched to a stored date by its `sourceRef`, then by its start time; a date that matches nothing receives a fresh `id`. An `id` sent in the right format is kept as sent. The server never moves an `id` to another date.
* **Absent** on a date that has not received one yet (an old event never rewritten).
* `sourceRef` (optional) is your own key for the date. On the next sync, a date sent with the same `sourceRef` keeps its `id` even if its times changed: this is how a connector follows a rescheduled performance.

This `id` addresses a date on the inventory route (see [Writing](#writing)).

## `timings[].availability` — the inventory[​](#timingsavailability--the-inventory "Direct link to timingsavailability--the-inventory")

One list per date, **one row per platform**: the same date can be sold out on pass Culture and open to the general public.

```
"availability": [
  {
    "provider": "mapado",
    "status": "available",
    "sourceRef": "3200414",
    "syncedAt": "2026-11-25T13:00:00.112Z",
    "onSaleThrough": "2027-02-18T21:00:00+01:00"
  }
]
```

| Field                          | Notes                                                                                                                                                      |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`                     | The platform concerned                                                                                                                                     |
| `status`                       | `available` \| `limited` \| `soldOut` \| `notYetOnSale` \| `salesClosed` \| `unknown` (`mixed` only exists on the aggregate)                               |
| `syncedAt`                     | When the connector read this status on the platform                                                                                                        |
| `sourceRef`                    | The performance's identifier on the platform                                                                                                               |
| `onSaleFrom` / `onSaleThrough` | Absolute sale window, with a UTC offset                                                                                                                    |
| `closedBySource`               | Served with `salesClosed` only: `true` when something other than the end of the window closed the sale (the platform itself, or the event being cancelled) |
| `bookingUrl`                   | Booking page specific to this date and this platform, when the connector provided one (see [Per-date override](#per-date-override--timingsoffers))         |

### The status is served resolved[​](#the-status-is-served-resolved "Direct link to The status is served resolved")

The connector writes the platform's **raw** status. The read serves a **resolved** status, as of the request:

```
event cancelled                           → salesClosed (closedBySource: true, no sale window)
event full                                → soldOut
platform status unknown                   → unknown
before onSaleFrom                         → notYetOnSale
after onSaleThrough                       → salesClosed
soldOut or limited                        → unchanged
notYetOnSale, onSaleFrom passed           → available
salesClosed by the window, reopened       → available  (closedBySource: false, onSaleThrough ahead)
otherwise                                 → the platform's status
```

The catalogue's relative windows (`onSaleFromBeforeBegin`…) apply the same way. Take the status you receive as final: do not re-apply `onSaleFrom` / `onSaleThrough` yourself. To know whether a status comes from the event itself (full, cancelled), read the event's `status` field.

### Following changes: `availabilityUpdatedAt`[​](#following-changes-availabilityupdatedat "Direct link to following-changes-availabilityupdatedat")

An inventory write does **not** change `updatedAt`: "3 seats left" is not a content change. It moves `availabilityUpdatedAt` forward, which has its own filter and sort:

```
GET /v2/agendas/{agendaUID}/events?detailed=1&availabilityUpdatedAt[gte]=2026-11-25T12:55:00.000Z&sort=availabilityUpdatedAt.asc
```

* It also moves when the event becomes **full** or **cancelled**, or stops being so.
* It is absent from events that never had any inventory: the `[gte]` filter leaves them out naturally.
* It does not move when an event is deleted or unpublished: follow `updatedAt` as well to see departures.
* Indexing follows the write closely but not always in order: restart a few minutes before the last value you saw, and deduplicate.

## Per-date override — `timings[].offers`[​](#per-date-override--timingsoffers "Direct link to per-date-override--timingsoffers")

A connector can give a date a booking page or a price grid that differ from the event's (keys `provider`, `tiers`, `bookingUrl`).

This override **is not served** as such. Its effect shows elsewhere:

* its booking page in `timings[].availability[].bookingUrl`, on the row of the same platform (if the date has no row for that platform, the page is served nowhere);
* its prices in `offersAggregate.price` and `offersAggregate.pricing`.

## Coexistence with `registration`[​](#coexistence-with-registration "Direct link to coexistence-with-registration")

`registration` (link, phone, email) and `conditions` keep their format. For an event that has a catalogue, each `offers[].source.url` is **added at read time** to `registration`, as a link:

```
"registration": [
  { "type": "email", "value": "contact@orga.fr" },  // entered by the organiser
  { "type": "link", "value": "https://billetterie-ligeria.sainte-luce-loire.com/event/842800-inconstance" }  // added from offers
]
```

* Added at read time only, never stored.
* Deduplicated on the normalised URL: a link the organiser already entered does not appear twice.
* The organiser's entries come first, in their order, then the ticketing links.
* Date-specific booking pages are not added.
* A **cancelled** event gets no ticketing link; what the organiser entered stays.

If your integration reads `registration` for its "Book" button, nothing changes.

## Writing[​](#writing "Direct link to Writing")

### The catalogue, with the event[​](#the-catalogue-with-the-event "Direct link to The catalogue, with the event")

`offers` is written in the body of the usual write routes:

```
POST  /v2/agendas/{agendaUID}/events
POST  /v2/agendas/{agendaUID}/events/{eventUID}
PATCH /v2/agendas/{agendaUID}/events/{eventUID}
PUT   /v2/agendas/{agendaUID}/events/ext/{key}/{value}
PATCH /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

* Ticketing must be enabled on the agenda, otherwise `422 offers.disabled` (only `offers: []` is accepted everywhere).

* Writing `offers` **replaces** the catalogue. Leaving the field out keeps it; `offers: null` is the same as leaving it out.

* Validation:

  <!-- -->

  * `currency` ISO 4217; amounts are integers ≥ 0;
  * at most 50 tiers per source and 10 sources per event; two sources cannot share the same platform and the same `source.ref`;
  * `label` is multilingual even when only one language is filled;
  * dates with an explicit UTC offset;
  * `syncedAt` is required; on an inventory row, it cannot be in the future;
  * a `free` or `donation` source cannot carry a paid tier (`offers.pricing.contradicts`).

### The inventory, through its own route[​](#the-inventory-through-its-own-route "Direct link to The inventory, through its own route")

```
PATCH /v2/agendas/{agendaUID}/events/{eventUID}/availability
Content-Type: application/json
```

```
{
  "6G3S74": {
    "mapado": {
      "status": "available",
      "syncedAt": "2026-11-25T13:00:00.112Z",
      "sourceRef": "3200414",
      "onSaleThrough": "2027-02-18T21:00:00+01:00"
    }
  },
  "6G3S75": { "mapado": null }
}
```

* The body is keyed by **date `id`**, then by platform. Only the pairs named change; `null` removes that platform's row for that date.
* Send the platform's **raw** status with its sale window: the read applies it.
* This route moves `availabilityUpdatedAt` forward and does not change `updatedAt`, unless it has to assign an `id` to a date that had none yet.
* Authentication: an access token allowed to write, **in a header** (`access-token` or `Authorization: Bearer …`), not in the body. It needs the right to edit the event, and ticketing enabled on the agenda (`422 offers.disabled` otherwise).
* **Read the response body, not only the HTTP status.** The response is `200` with `{ success, applied, written, errors }`, even when nothing was written. An unknown date is reported in `errors` without blocking the others; `success` is `false` as soon as there is one error. `applied` lists the pairs written (`"6G3S74.mapado"`).

### And inventory sent with the event?[​](#and-inventory-sent-with-the-event "Direct link to And inventory sent with the event?")

An ordinary write **carries** the inventory, it does not write it: for a date the event already has (matched by its `id`, its `sourceRef` or its start time, see [`timings[].id`](#timingsid--the-date-identifier)), the `availability` rows in the body are ignored and the stored rows are kept. A client that reads an event and sends it back therefore cannot overwrite the inventory a connector has just written.

* **Simplest: do not send `availability` back.** A date whose entry does not mention the field keeps its rows. Do not drop the date itself, though: `timings` is replaced as a whole, and a missing date is deleted along with its inventory.
* **A date the event does not have yet** is the exception: the rows sent with it are stored. An event can thus be created with its inventory in a single call.
* **`availabilityAuthority`**: a connector that wants to write the inventory in the event body declares the platforms it is authoritative for, e.g. `"availabilityAuthority": ["mapado"]`. For those, on each date whose entry carries an `availability` array, the body is law: a row present is written, a row absent is removed. A date that does not mention the field keeps its rows, and other platforms' rows are left untouched. This field is not stored.

## JSON-LD[​](#json-ld "Direct link to JSON-LD")

The public page of an OpenAgenda event emits one `schema.org/Event` **per upcoming date** (at most 20). When the event has a catalogue, each `Event` carries an `Offer`, unless the event is cancelled or postponed:

```
{
  "@type": "Event",
  "name": "INCONSTANCE",
  "startDate": "2027-02-18T20:00:00+01:00",
  "endDate": "2027-02-18T21:15:00+01:00",
  "offers": {
    "@type": "Offer",
    "url": "https://billetterie-ligeria.sainte-luce-loire.com/event/842800-inconstance",
    "price": 17,
    "priceCurrency": "EUR",
    "availability": "https://schema.org/InStock"
  }
}
```

* `price` is the minimum price (`offersAggregate.price.minCents`). It is omitted when the range is unknown, and when it is 0 on an event that is not free.
* `availability`: `InStock` when a platform sells the date (available or few seats left), `SoldOut` when all are sold out or the event is full. Otherwise the property is omitted.
* `url`: the booking page of the platform selling the date (the date's own page if it has one, else that platform's page for the event). If the date has no row, the platform's page when there is only one, else the link entered by the organiser.

## Appendix[​](#appendix "Direct link to Appendix")

### A. Free event[​](#a-free-event "Direct link to A. Free event")

```
"offers": [
  {
    "provider": "mapado",
    "currency": "EUR",
    "pricing": "free",
    "tiers": [
      { "sourceRef": "tier-42", "label": { "fr": "Entrée libre" }, "offerType": "standard", "priceCents": 0 }
    ],
    "source": { "ref": "form-soiree-printemps", "url": "https://mapado.com/..." },
    "syncedAt": "2026-11-20T09:00:00+01:00"
  }
]
```

### B. Pay what you want[​](#b-pay-what-you-want "Direct link to B. Pay what you want")

```
"offers": [
  {
    "provider": "helloasso",
    "currency": "EUR",
    "pricing": "donation",
    "tiers": [
      { "sourceRef": "tier-don", "label": { "fr": "Participation libre" }, "offerType": "donation", "minAmountCents": 500 }
    ],
    "source": { "ref": "form-collecte", "url": "https://www.helloasso.com/..." },
    "syncedAt": "2026-11-20T09:00:00+01:00"
  }
]
```

`offersAggregate.price` is then `{ "minCents": 500, "maxCents": null, "currency": "EUR" }`: a floor, no ceiling.
