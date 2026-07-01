---
title: Évolutions à venir
description: Changements prévus ou en cours de discussion
sidebar_position: 6
toc_min_heading_level: 2
toc_max_heading_level: 5
---

# Intégration des données de billetterie: les offres

Cette spécification décrit une extension à venir de l'API OpenAgenda pour exposer les tarifs et disponibilités structurés des événements. Elle est partagée aux intégrateurs et partenaires billetterie pour recueillir leurs retours **avant** ouverture en production. La spécification reste susceptible d'évoluer en fonction des retours collectés.

Les nouveaux champs (`offers`) sont **additifs**. Les champs existants (`registration`, `conditions`, etc.) restent en place sans changement de format. Les informations tarifaires viendront **compléter** ces champs, pas les remplacer.

Pour en savoir plus sur le contexte de cette évolution, rendez-vous [ici](https://doc.openagenda.com/fr/article/integration-des-infos-de-billetteries-1rwtkhr/)

Contactez-nous par courriel pour toute remarque ou demande à [support@openagenda.com](mailto:support@openagenda.com).

## Vue d'ensemble

Trois nouveaux champs sur l'événement :

```jsonc
{
  "uid": 12345,
  "title": { "fr": "Festival Untel — Édition 2026" },

  "offers": [
    /* catalogue : qui vend, à quels tarifs */
  ],
  "offersAggregate": {
    /* résumé serveur pour les listes d'événements */
  },

  "timings": [
    {
      "id": "20Sro",
      "begin": "...",
      "end": "...",
      "availability": [
        /* statut par billetterie pour cette plage horaire */
      ],
      "offers": [
        /* surcharge si tarif spécifique à cette plage horaire */
      ],
    },
  ],
}
```

- `offers` est une **liste**: un même événement peut être vendu sur plusieurs billetteries.
- `offersAggregate` est **dérivé** des `offers`, résumé présent sur les routes listant des événements. Il expose des champs structurés (`pricing`, `availability.status`, `availability.nextAvailable`). Le prix « à partir de X € » se dérive des `offers[].tiers`.
- `timings[].availability` porte le statut volatile (disponible, complet, dernières places) par plage horaire et par billetterie.

## Lecture

L'extension est **additive et opt-in à la consommation** : les événements existants sans `offers` ne sont pas affectés.

Points exposant `offers`, `offersAggregate`, `timings[].availability`, `timings[].id`, `timings[].offers` :

| Endpoint                                   | Notes                                                                                                                                             |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET /agendas/:agendaUid/events/:eventUid` | Détail événement — tous les champs                                                                                                                |
| `GET /agendas/:agendaUid/events`           | Liste d'événements — `offers` + `offersAggregate` ; pas de `timings[].availability` par défaut |
| `GET /events/ext/:extKey/:extId`           | Accès par identifiant externe — comportement identique                                                                                            |

## Le champ `offers` — catalogue par billetterie

La liste des champs constitutifs de `offers`:

| Champ           | Type     | Notes                                                                                              |
| --------------- | -------- | -------------------------------------------------------------------------------------------------- |
| `provider`      | enum     | Ex: `billetweb` \| `eventbrite` \| `mapado` \| `weezevent` | ...
| `currency`      | ISO 4217 | Hérité par tous les tiers de cette source. Une source = une devise.                                |
| `pricing`       | enum     | `free` \| `paid` \| `donation` \| `mixed` \| `unknown`                                             |
| `tiers[]`       | liste    | ≤ 50 tarifs par source — porte tous les prix (pas de `priceRanges` en v1). Voir détail ci-dessous. |
| `source`        | objet    | `ref` est l'identifiant côté billetterie ; `url` est le lien public de réservation.                |
| `syncedAt`      | ISO 8601 | Dernière synchronisation réussie.                                                                  |

Un exemple:

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

### `tiers[]` — un tarif individuel

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

| Champ                   | Notes                                                                                                                                                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                 | Objet multilingue (i18n). Toujours présent. Une seule langue remplie suffit.                                                                                                              |
| `priceCents`            | **Entier en unités mineures** (centimes).|
| `sourceRef`             | Identifiant du tarif côté billetterie.                                                                                                                                                    |
| `offerType`             | `standard` (défaut) \| `donation` \| `membership`.                                                                                                                                        |
| `saleStart` / `saleEnd` | ISO 8601 **avec offset explicite obligatoire**. Pour l'affichage (séquençage early-bird → regular) ; le statut courant est dans `availability`.                                           |

### `pricing` — règles

- `free` : tous les tiers sont `standard` avec `priceCents` ∈ `{0, absent}`
- `paid` : tous les tiers payants (`priceCents > 0`)
- `donation` : ≥ 1 tier `donation` et aucun tier payant
- `mixed` : combinaison (e.g. un tier gratuit + un tier payant)
- `unknown` : aucun tier exploitable


## `offersAggregate` — pour les listings

Dérivé du `offers`, présent **sur le détail ET sur les listings**. C'est le champ à privilégier pour les présentation résumées des événements.

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

- `pricing` : agrégation des sources. `mixed` si elles divergent.
- Pour afficher « à partir de X € », dérivez le minimum depuis `offers[].tiers` (présent aussi sur les listings) — il n'y a pas de champ `priceRanges` stocké.
- `availability.status` : enum élargi `available` \| `limited` \| `soldOut` \| `notYetOnSale` \| `salesClosed` \| `mixed` \| `unknown`. `mixed` n'existe qu'au niveau agrégé.
- `availability.nextAvailable` : début de la prochaine plage horaire encore réservable — le pendant « réservable » de `nextTiming`. **Dérivé à la lecture**, non stocké : recalculé à chaque requête, donc jamais périmé.

### Règles de dérivation

```
status =
  available    si ≥ 1 plage horaire future "available"
  limited      si toutes les plages horaires réservables sont "limited"
  soldOut      si toutes "soldOut"
  notYetOnSale si toutes "notYetOnSale"
  salesClosed  si toutes "salesClosed"
  mixed        autres états terminaux mélangés
  unknown      sinon
```

## `timings[].id` — identité de plage horaire

Nouveauté structurelle. Chaque plage horaire reçoit un identifiant stable :

```jsonc
"timings": [
  { "id": "20Sro", "begin": "2026-06-15T20:00:00+02:00", "end": "2026-06-15T23:00:00+02:00" }
]
```

- **Format** : 5 caractères base62 (e.g. `20Sro`).
- **Stable** : préservé sur les modifications d'événement, survit aux reports tant que la plage horaire est conservée.
- **Optionnel en lecture pendant la transition** : les événements existants reçoivent leur `id` à la prochaine écriture (alimentation paresseuse). Pendant cette période, `id` peut être absent.

C'est cet `id` qui sert de **clé pour adresser une plage horaire** dans le PATCH availability et pour générer les URLs JSON-LD par plage horaire.

## Surcharge tarifaire par plage horaire — `timing.offers[]`

Cas d'usage : un même tarif coûte 18 € en semaine et 25 € le week-end. Plutôt que dupliquer le catalogue complet, chaque plage horaire peut porter une **surcharge** ne contenant que les champs qui diffèrent :

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
    "// surcharge pour le samedi": null,
    "offers": [
      {
        "provider": "billetweb",
        "tiers": [{ "label": {"fr":"Plein"}, "priceCents": 2500, "sourceRef": "T1", "offerType": "standard" }]
      }
    ]
  }
]
```

### Règles

- La surcharge est **par `(plage horaire, provider)`** et **partielle** : on n'envoie que les champs qui diffèrent de `event.offers[provider]`.
- Résolution : `effective = { ...event.offers[provider], ...timing.offers[(timing,provider)] }`.
- Remplacement **complet** au niveau du sous-objet `tiers` : envoyer un `tiers` partiel ne fait pas une fusion profonde.
- Seuls `tiers` et `bookingUrl` peuvent être surchargés en v1.

**Pour les consommateurs** : si vous voyez un événement sans `timing.offers`, c'est que toutes les plages horaires appliquent le même catalogue. Pas d'erreur, juste l'absence de surcharge.

## `timings[].availability` — statuts des offres

Une liste par plage horaire, **une entrée par billetterie** :

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

### Champs

| Champ                          | Notes                                                                                 |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| `provider`                     | Quelle billetterie ce statut concerne                                                 |
| `status`                       | `available` \| `limited` \| `soldOut` \| `notYetOnSale` \| `salesClosed` \| `unknown` |
| `onSaleFrom` / `onSaleThrough` | Fenêtre de vente absolue (ISO 8601 avec décalage horaire)                             |
| `sourceRef`                    | Identifiant de la plage horaire côté billetterie                                      |
| `syncedAt`                     | Dernière synchronisation                                                              |

### Statut — comment c'est dérivé

```
si maintenant < onSaleFrom              → notYetOnSale
si maintenant > onSaleThrough           → salesClosed
si la billetterie dit "fermé/terminé"   → salesClosed
si stock connu et épuisé                → soldOut
si stock connu et bas (seuil connecteur) → limited
sinon                                    → available
```

### Compteur de fraîcheur

Au niveau du document événement, un champ `availabilityUpdatedAt` est exposé qui permet aux consommateurs de filtrer les événements ayant changé de disponibilité **sans** changer de catalogue. Le champ `updatedAt` standard ne bouge **pas** quand seule la disponibilité change:

```jsonc
"availabilityUpdatedAt": "2026-05-28T09:05:00Z"
```

## Cohabitation avec `registration` et `conditions`

Le champ `registration` (lien, téléphone, email) et le champ `conditions` (texte libre) **restent en place sans changement de format**. Ils continueront d'être largement utilisés sur OpenAgenda :

- Pour les événements **sans billetterie connectée**, l'organisateur saisit ses informations comme aujourd'hui dans `registration` et `conditions`. Rien ne change.
- Pour les événements **avec billetterie connectée** (Billetweb, Eventbrite, etc.), `offers` est rempli automatiquement par le connecteur, et les informations tarifaires sont disponibles à la fois sous forme structurée (dans `offers`) et sous forme de lien (projeté dans `registration`).

Concrètement, pour un événement avec `offers`, le lien public de réservation issu d'`offers[].source.url` est **automatiquement ajouté** dans `registration` au moment de la lecture :

```jsonc
"registration": [
  { "type": "email", "value": "contact@orga.com" },         // saisie explicite par l'organisateur
  { "type": "link", "value": "https://billetweb.fr/event/12345" }   // ← projeté depuis offers
]
```

Règles :

- Projection à la lecture uniquement, pas de duplication en stockage.
- Dédupliqué sur URL normalisée.
- Les entrées explicites (`email`, `phone`) **gagnent** sur les entrées projetées.
- Les surcharges par plage horaire (`timing.offers[].bookingUrl`) **ne sont pas** repliées dans `registration` — elles apparaissent uniquement dans `timing.offers`.

**Impact pour vous** : si votre intégration lit aujourd'hui `registration` pour le bouton "Réserver", **rien ne change**. Lire `offers` en complément vous donne accès aux nouvelles informations structurées (prix, disponibilité par plage horaire, JSON-LD enrichi), mais reste optionnel.

## Écriture (API)

La charge utile est étendue sur les routes existantes:

```
POST /agendas/:agendaUid/events
PUT  /agendas/:agendaUid/events/:eventUid
POST /agendas/:agendaUid/events/ext/:extKey/:extId
```

Le corps de la requête inclut `offers` et optionnellement `timings[].offers`. Validation :

- `currency`: ISO 4217.
- `priceCents`/`minAmountCents` sont des entiers ≥ 0.
- ≤ 50 tarifs par source.
- `label` est un objet multilingue même quand une seule langue est remplie.

## JSON-LD

Pour chaque événement ayant des `offers`, la page publique OpenAgenda émet un graphe `schema.org/Event` enrichi, **un Event par plage horaire** :

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
        /* Place ou VirtualLocation */
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
    { "@type": "Event", "...": "second timing" },
  ],
}
```

## Implémentation

1. **Adaptation et ajustements du modèle après retours** (cette spécification + relecture) — été 2026
2. en parallèle, **Implémentation de premiers connecteurs** pour démonstration et mesures
3. publication d'une documentation API pour faciliter les intégrations/synchronisations
4. Saisie directe sur les formulaires

Tout commentaire, demandes sont les bienvenues par email à `support@openagenda.com` si possible avant la **fin août 2026**. Toute remarque, même mineure, est bienvenue. Les choix structurants sont **encore mobiles** sur le format API.

---

## Annexes

### A. Exemple complet — événement multi-source multi-date

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

### B. Exemple — événement gratuit 

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

### C. Exemple — événement avec participation libre

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
          "// priceCents absent : prix libre, minAmountCents = plancher": null,
        },
      ],
      "source": { "ref": "form-collecte", "url": "https://mapado.com/..." },
      "syncedAt": "...",
    },
  ],
}
```


