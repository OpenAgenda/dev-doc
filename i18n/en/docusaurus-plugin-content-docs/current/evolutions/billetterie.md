---
title: 'Ticketing: offers'
description: Structured pricing and availability for events
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Ticketing data integration: offers

**Period: July to September 2026**

This specification describes an upcoming extension to the OpenAgenda API that exposes structured pricing and availability for events. It is shared with integrators and ticketing partners to gather their feedback **before** production rollout. The specification is still subject to change based on the feedback collected.

The new fields (`offers`) are **additive**. Existing fields (`registration`, `conditions`, etc.) stay in place with no format change. Pricing information will **complement** these fields, not replace them.

For more on the context of this change, see [here](https://doc.openagenda.com/fr/article/integration-des-infos-de-billetteries-1rwtkhr/)

Contact us by email with any comment or request at [support@openagenda.com](mailto:support@openagenda.com).

## Overview

Three new fields on the event:

```jsonc
{
  "uid": 12345,
  "title": { "fr": "Festival Untel — Édition 2026" },

  "offers": [
    /* catalog: who sells, at what prices */
  ],
  "offersAggregate": {
    /* server-side summary for event lists */
  },

  "timings": [
    {
      "id": "20Sro",
      "begin": "...",
      "end": "...",
      "availability": [
        /* status per ticketing provider for this time slot */
      ],
      "offers": [
        /* override if the price is specific to this time slot */
      ],
    },
  ],
}
```

- `offers` is a **list**: the same event can be sold through several ticketing providers.
- `offersAggregate` is **derived** from `offers`, a summary present on the routes that list events. It exposes structured fields (`pricing`, `availability.status`, `availability.nextAvailable`). The "from X €" price is derived from `offers[].tiers`.
- `timings[].availability` carries the volatile status (available, sold out, last seats) per time slot and per ticketing provider.

## Reading

The extension is **additive and opt-in on consumption**: existing events without `offers` are not affected.

Points exposing `offers`, `offersAggregate`, `timings[].availability`, `timings[].id`, `timings[].offers`:

| Endpoint                                   | Notes                                                                                          |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| `GET /agendas/:agendaUid/events/:eventUid` | Event detail — all fields                                                                       |
| `GET /agendas/:agendaUid/events`           | Event list — `offers` + `offersAggregate`; no `timings[].availability` by default              |
| `GET /events/ext/:extKey/:extId`           | Access by external identifier — identical behavior                                              |

Versioning: these fields appear on the OpenAgenda v3 API. No new API header required. The `Content-Type` stays `application/json`.

## The `offers` field — catalog per ticketing provider

The list of fields that make up `offers`:

| Field           | Type     | Notes                                                                                              |
| --------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `provider`      | enum     | e.g. `billetweb` \| `eventbrite` \| `mapado` \| `weezevent` | ...                                  |
| `currency`      | ISO 4217 | Inherited by every tier of this source. One source = one currency.                                 |
| `pricing`       | enum     | `free` \| `paid` \| `donation` \| `mixed` \| `unknown`                                             |
| `tiers[]`       | list     | ≤ 50 price tiers per source — carries all prices (no `priceRanges` in v1). See details below.      |
| `source`        | object   | `ref` is the identifier on the ticketing side; `url` is the public booking link.                   |
| `syncedAt`      | ISO 8601 | Last successful synchronization.                                                                   |

An example:

```jsonc
{
  ...
  "offers": [
    {
      "provider": "billetweb",
      "currency": "EUR",
      "pricing": "paid",
      "tiers": [
        { "label": { "fr": "Plein", "en": "Standard" }, "priceCents": 2500, "sourceRef": "T1", "offerType": "standard" },
        { "label": { "fr": "Réduit" }, "priceCents": 1800, "sourceRef": "T2", "offerType": "standard" }
      ],
      "source": {
        "ref": "bw-12345",
        "url": "https://billetweb.fr/event/12345"
      },
      "syncedAt": "2026-05-28T09:00:00Z"
    }
  ],
  ...
}
```

### `tiers[]` — an individual price tier

```jsonc
{
  "label": { "fr": "Plein", "en": "Standard" },
  "priceCents": 2500,
  "sourceRef": "T1",
  "offerType": "standard",
  "saleStart": "2026-04-01T00:00:00+02:00",
  "saleEnd": "2026-06-15T19:00:00+02:00",
}
```

| Field                   | Notes                                                                                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                 | Multilingual object (i18n). Always present. A single filled language is enough.                                                                                                          |
| `priceCents`            | **Integer in minor units** (cents). Absent → free tier or pay-what-you-want. **Never divide by 100 in code**: use the ISO 4217 exponent table (EUR/USD=2, JPY/KRW=0, BHD=3).             |
| `sourceRef`             | Tier identifier on the ticketing side.                                                                                                                                                   |
| `offerType`             | `standard` (default) \| `donation` \| `membership`.                                                                                                                                      |
| `saleStart` / `saleEnd` | ISO 8601 **with a mandatory explicit offset**. For display (early-bird → regular sequencing); the current status lives in `availability`.                                                |

### `pricing` — rules

- `free`: all tiers are `standard` with `priceCents` ∈ `{0, absent}`
- `paid`: all tiers paid (`priceCents > 0`)
- `donation`: ≥ 1 `donation` tier and no paid tier
- `mixed`: a combination (e.g. a free tier + a paid tier)
- `unknown`: no usable tier


## `offersAggregate` — for listings

Derived from `offers`, present **on both the detail AND the listings**. This is the field to favor for condensed event presentations.

```jsonc
"offersAggregate": {
  "pricing": "paid",
  "availability": {
    "status": "available",
    "occurrencesAvailable": 1,
    "occurrencesTotal": 2,
    "nextAvailable": "2026-06-15T20:00:00+02:00"
  }
}
```

- `pricing`: aggregation of the sources. `mixed` if they diverge.
- To display "from X €", derive the minimum from `offers[].tiers` (also present on listings) — there is no stored `priceRanges` field.
- `availability.status`: extended enum `available` \| `limited` \| `soldOut` \| `notYetOnSale` \| `salesClosed` \| `mixed` \| `unknown`. `mixed` exists only at the aggregate level.
- `availability.nextAvailable`: start of the next still-bookable time slot — the "bookable" counterpart of `nextTiming`. **Derived at read time**, not stored: recomputed on every request, so never stale.

### Derivation rules

```
status =
  available    if ≥ 1 future time slot "available"
  limited      if all bookable time slots are "limited"
  soldOut      if all "soldOut"
  notYetOnSale if all "notYetOnSale"
  salesClosed  if all "salesClosed"
  mixed        other mixed terminal states
  unknown      otherwise
```

## `timings[].id` — time slot identity

A structural addition. Each time slot receives a stable identifier:

```jsonc
"timings": [
  { "id": "20Sro", "begin": "2026-06-15T20:00:00+02:00", "end": "2026-06-15T23:00:00+02:00" }
]
```

- **Format**: 5 base62 characters (e.g. `20Sro`).
- **Stable**: preserved across event edits, survives reschedules as long as the time slot is kept.
- **Optional on read during the transition**: existing events receive their `id` on the next write (lazy population). During this period, `id` may be absent.

This `id` is what serves as the **key to address a time slot** in the availability PATCH and to generate the per-time-slot JSON-LD URLs.

## Per-time-slot price override — `timing.offers[]`

Use case: the same tier costs 18 € on weekdays and 25 € on weekends. Rather than duplicate the full catalog, each time slot can carry an **override** containing only the fields that differ:

```jsonc
"offers": [
  {
    "provider": "billetweb",
    "currency": "EUR",
    "tiers": [{ "label": {"fr":"Plein"}, "priceCents": 1800, "sourceRef": "T1", "offerType": "standard" }],
    "source": { "ref": "bw-123", "url": "..." },
    "syncedAt": "..."
  }
],
"timings": [
  {
    "id": "20Sro",
    "begin": "2026-06-16T20:00:00+02:00",
    "// override for Saturday": null,
    "offers": [
      {
        "provider": "billetweb",
        "tiers": [{ "label": {"fr":"Plein"}, "priceCents": 2500, "sourceRef": "T1", "offerType": "standard" }]
      }
    ]
  }
]
```

### Rules

- The override is **per `(time slot, provider)`** and **partial**: you only send the fields that differ from `event.offers[provider]`.
- Resolution: `effective = { ...event.offers[provider], ...timing.offers[(timing,provider)] }`.
- **Full replacement** at the `tiers` sub-object level: sending a partial `tiers` does not do a deep merge.
- Only `tiers` and `bookingUrl` can be overridden in v1.

**For consumers**: if you see an event with no `timing.offers`, it means all time slots apply the same catalog. Not an error, just the absence of an override.

## `timings[].availability` — offer statuses

One list per time slot, **one entry per ticketing provider**:

```jsonc
"availability": [
  {
    "provider": "billetweb",
    "status": "available",
    "onSaleThrough": "2026-06-15T19:00:00+02:00",
    "sourceRef": "sess-1",
    "syncedAt": "2026-05-28T09:05:00Z"
  },
  {
    "provider": "mapado",
    "status": "soldOut",
    "sourceRef": "stock-9981",
    "syncedAt": "2026-05-28T09:05:00Z"
  }
]
```

### Fields

| Field                          | Notes                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| `provider`                     | Which ticketing provider this status concerns                                         |
| `status`                       | `available` \| `limited` \| `soldOut` \| `notYetOnSale` \| `salesClosed` \| `unknown` |
| `onSaleFrom` / `onSaleThrough` | Absolute sales window (ISO 8601 with time offset)                                     |
| `sourceRef`                    | Time slot identifier on the ticketing side                                            |
| `syncedAt`                     | Last synchronization                                                                  |

### Status — how it is derived

```
if now < onSaleFrom                  → notYetOnSale
if now > onSaleThrough               → salesClosed
if the ticketing says "closed/ended" → salesClosed
if stock known and exhausted         → soldOut
if stock known and low (connector threshold) → limited
otherwise                            → available
```

### Freshness counter

At the event-document level, an `availabilityUpdatedAt` field is exposed that lets consumers filter events whose availability changed **without** a catalog change. The standard `updatedAt` field does **not** move when only availability changes:

```jsonc
"availabilityUpdatedAt": "2026-05-28T09:05:00Z"
```

## Coexistence with `registration` and `conditions`

The `registration` field (link, phone, email) and the `conditions` field (free text) **stay in place with no format change**. They will keep being widely used on OpenAgenda:

- For events **without connected ticketing**, the organizer enters their information as today in `registration` and `conditions`. Nothing changes.
- For events **with connected ticketing** (Billetweb, Eventbrite, etc.), `offers` is filled automatically by the connector, and pricing information is available both in structured form (in `offers`) and as a link (projected into `registration`).

Concretely, for an event with `offers`, the public booking link from `offers[].source.url` is **automatically added** to `registration` at read time:

```jsonc
"registration": [
  { "type": "email", "value": "contact@orga.com" },         // explicitly entered by the organizer
  { "type": "link", "value": "https://billetweb.fr/event/12345" }   // ← projected from offers
]
```

Rules:

- Projection at read time only, no duplication in storage.
- Deduplicated on the normalized URL.
- Explicit entries (`email`, `phone`) **win** over projected entries.
- Per-time-slot overrides (`timing.offers[].bookingUrl`) are **not** folded into `registration` — they appear only in `timing.offers`.

**Impact for you**: if your integration reads `registration` today for the "Book" button, **nothing changes**. Reading `offers` in addition gives you access to the new structured information (price, availability per time slot, enriched JSON-LD), but remains optional.

## Writing (API)

The payload is extended on the existing routes:

```
POST /agendas/:agendaUid/events
PUT  /agendas/:agendaUid/events/:eventUid
POST /agendas/:agendaUid/events/ext/:extKey/:extId
```

The request body includes `offers` and optionally `timings[].offers`. Validation:

- `currency`: ISO 4217.
- `priceCents`/`minAmountCents` are integers ≥ 0.
- ≤ 50 price tiers per source.
- `label` is a multilingual object even when a single language is filled.

## JSON-LD

For every event that has `offers`, the OpenAgenda public page emits an enriched `schema.org/Event` graph, **one Event per time slot**:

```jsonc
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Event",
      "name": "Festival Untel — Édition 2026",
      "startDate": "2026-06-15T20:00:00+02:00",
      "endDate": "2026-06-15T23:00:00+02:00",
      "location": {
        /* Place or VirtualLocation */
      },
      "offers": [
        {
          "@type": "AggregateOffer",
          "lowPrice": "18.00",
          "highPrice": "45.00",
          "priceCurrency": "EUR",
          "offerCount": 2,
          "availability": "https://schema.org/InStock",
          "url": "https://billetweb.fr/event/12345",
          "validThrough": "2026-06-15T19:00:00+02:00",
        },
      ],
    },
    { "@type": "Event", "...": "second time slot" },
  ],
}
```

## Implementation

The rollout is progressive over the summer of 2026, for a setup that is complete and tested by the end of September 2026.

1. **Model adaptation and adjustments after feedback** (this specification + review) — summer 2026
2. in parallel, **implementation of the first connectors** for demonstration and measurement
3. publication of API documentation to ease integrations/synchronizations
4. Direct entry via the forms

Any comment or request is welcome by email at `support@openagenda.com`. Any remark, however minor, is welcome. The structural choices are **still open** on the API format.

---

## Appendices

### A. Full example — multi-source, multi-date event

```jsonc
{
  "uid": 12345,
  "slug": "festival-untel-2026",
  "title": { "fr": "Festival Untel — Édition 2026" },
  "registration": [
    { "type": "email", "value": "contact@festival-untel.fr" },
    { "type": "link", "value": "https://billetweb.fr/event/12345" },
  ],
  "offers": [
    {
      "provider": "billetweb",
      "currency": "EUR",
      "pricing": "paid",
      "tiers": [
        {
          "label": { "fr": "Plein" },
          "priceCents": 2500,
          "sourceRef": "T1",
          "offerType": "standard",
        },
        {
          "label": { "fr": "Réduit" },
          "priceCents": 1800,
          "sourceRef": "T2",
          "offerType": "standard",
        },
        {
          "label": { "fr": "Pass 2 jours" },
          "priceCents": 4500,
          "sourceRef": "T3",
          "offerType": "standard",
        },
      ],
      "source": {
        "ref": "bw-12345",
        "url": "https://billetweb.fr/event/12345",
      },
      "syncedAt": "2026-05-28T09:00:00Z",
    }
  ],
  "offersAggregate": {
    "pricing": "paid",
    "availability": {
      "status": "available",
      "occurrencesAvailable": 1,
      "occurrencesTotal": 2,
      "nextAvailable": "2026-06-15T20:00:00+02:00",
    },
  },
  "availabilityUpdatedAt": "2026-05-28T09:05:00Z",
  "timings": [
    {
      "id": "20Sro",
      "begin": "2026-06-15T20:00:00+02:00",
      "end": "2026-06-15T23:00:00+02:00",
      "availability": [
        {
          "provider": "billetweb",
          "status": "available",
          "onSaleThrough": "2026-06-15T19:00:00+02:00",
          "sourceRef": "sess-1",
          "syncedAt": "2026-05-28T09:05:00Z",
        }
      ],
    },
    {
      "id": "20Srp",
      "begin": "2026-06-16T20:00:00+02:00",
      "end": "2026-06-16T23:00:00+02:00",
      "availability": [
        {
          "provider": "billetweb",
          "status": "soldOut",
          "sourceRef": "sess-2",
          "syncedAt": "2026-05-28T09:05:00Z",
        },
      ],
    },
  ],
}
```

### B. Example — free event

```jsonc
{
  "offers": [
    {
      "provider": "mapado",
      "currency": "EUR",
      "pricing": "free",
      "tiers": [
        {
          "label": { "fr": "Entrée libre" },
          "priceCents": 0,
          "sourceRef": "tier-42",
          "offerType": "standard",
        },
      ],
      "source": {
        "ref": "form-soiree-printemps",
        "url": "https://mapado.com/...",
      },
      "syncedAt": "...",
    },
  ],
}
```

### C. Example — pay-what-you-want event

```jsonc
{
  "offers": [
    {
      "provider": "mapado",
      "currency": "EUR",
      "pricing": "donation",
      "tiers": [
        {
          "label": { "fr": "Participation libre" },
          "offerType": "donation",
          "minAmountCents": 500,
          "sourceRef": "tier-don",
          "// priceCents absent: pay-what-you-want, minAmountCents = floor": null,
        },
      ],
      "source": { "ref": "form-collecte", "url": "https://mapado.com/..." },
      "syncedAt": "...",
    },
  ],
}
```
