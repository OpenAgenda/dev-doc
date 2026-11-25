---
title: 'Billetterie: les offres'
description: Tarifs et disponibilités structurés des événements
sidebar_position: 2
toc_min_heading_level: 2
toc_max_heading_level: 4
---

# Intégration des données de billetterie: les offres

L'API expose les tarifs et les disponibilités des événements vendus sur une billetterie. Cette page décrit le fonctionnement **actuel** de l'API v2.

La fonctionnalité est en production et **s'active agenda par agenda**, sur demande, pendant la phase de test. Aujourd'hui, les données sont alimentées par des connecteurs de synchronisation qui écrivent par l'API. Sur un agenda où elle n'est pas activée, une écriture de billetterie est refusée (`422 offers.disabled`, voir [Écriture](#écriture)).

Les champs de billetterie sont **additifs** : `registration`, `conditions` et les autres champs existants gardent leur format. Un événement sans billetterie n'est pas modifié.

Pour le contexte de cette évolution, rendez-vous [ici](https://doc.openagenda.com/fr/article/integration-des-infos-de-billetteries-1rwtkhr/). Pour toute remarque : [support@openagenda.com](mailto:support@openagenda.com).

## Vue d'ensemble

```jsonc
{
  "uid": 31148791,
  "title": { "fr": "INCONSTANCE" },

  "offers": [ /* catalogue : qui vend, à quels tarifs */ ],
  "offersAggregate": { /* résumé calculé à la lecture */ },
  "availabilityUpdatedAt": "2026-11-25T13:00:31.000Z",

  "timings": [
    {
      "id": "6G3S74",
      "begin": "2027-02-18T20:00:00+01:00",
      "end": "2027-02-18T21:15:00+01:00",
      "availability": [ /* état de la vente, une ligne par billetterie */ ]
    }
  ]
}
```

- `offers` est une **liste** : un même événement peut être vendu sur plusieurs billetteries (10 sources au maximum).
- `offersAggregate` résume l'événement pour un affichage court : disponibilité, catégorie de prix, fourchette de prix, liens de réservation.
- `timings[].availability` dit, pour chaque date et chaque billetterie, si l'on peut réserver.
- `availabilityUpdatedAt` permet de suivre les changements de disponibilité sans relire tout l'agenda.

## Lecture

| Route | Ce qu'elle sert |
| --- | --- |
| `GET /v2/agendas/{agendaUID}/events/{eventUID}` | Tous les champs, y compris les libellés des tarifs |
| `GET /v2/agendas/{agendaUID}/events/ext/{key}/{value}` | Comme la précédente, par identifiant externe |
| `GET /v2/agendas/{agendaUID}/events?detailed=1` | `offers` **sans les libellés des tarifs**, `offersAggregate`, `timings[].availability` |
| `GET /v2/agendas/{agendaUID}/events` (sans `detailed`) | Aucun champ de billetterie |

Les libellés de tarifs (`offers[].tiers[].label`) ne sont servis que sur la lecture d'un seul événement. Ils représentent l'essentiel du poids d'un catalogue, et un listing n'en a pas besoin : `offersAggregate` est fait pour cela. Pour afficher la grille complète, lisez la fiche de l'événement.

Avec `includeFields[]`, nommer `offers`, `offersAggregate` ou `timings` ne suffit pas : ajoutez aussi `registration`, c'est lui qui déclenche le chargement du catalogue. Sans lui, les champs de billetterie et les lignes `timings[].availability` ne sont pas servis.

Les copies `firstTiming`, `lastTiming` et `nextTiming` ne portent pas l'inventaire : lisez-le dans `timings[]`.

## `offers` — le catalogue par billetterie

Exemple réel (réduit à deux tarifs) :

```jsonc
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

| Champ | Notes |
| --- | --- |
| `provider` | `billetweb` \| `eventbrite` \| `helloasso` \| `mapado` \| `weezevent` \| `passculture` \| `manual` |
| `currency` | Code ISO 4217. Une source = une devise. |
| `pricing` | Catégorie déclarée par la source : `free` \| `paid` \| `donation` \| `mixed` \| `unknown` |
| `source.ref` | Identifiant de l'événement côté billetterie |
| `source.url` | Page publique de réservation |
| `syncedAt` | Dernière synchronisation du catalogue (pas de l'inventaire, qui a son propre `syncedAt` par ligne) |
| `onSaleFromBeforeBegin` / `onSaleThroughBeforeBegin` | Optionnels. Fenêtre de vente relative à chaque date, en durée ISO 8601 (ex. `P30D` : ouverture 30 jours avant). Déjà appliquée à `availability` : à lire comme une règle, pas à recalculer. |
| `tiers[]` | La grille de tarifs, 50 au maximum par source. Absent si la source n'en a pas encore envoyé, `[]` si elle a été vidée. |

### `tiers[]` — un tarif

| Champ | Notes |
| --- | --- |
| `sourceRef` | Identifiant du tarif côté billetterie. Obligatoire. |
| `label` | Objet multilingue, au moins une langue remplie. **Servi seulement sur la lecture d'un seul événement.** |
| `offerType` | `standard` (par défaut) \| `donation` \| `membership` |
| `priceCents` | Entier, en unité mineure de la devise (`1700` = 17,00 €) |
| `minAmountCents` | Plancher d'un tarif `donation` (prix libre), s'il en a un. Un tarif `donation` ne porte pas `priceCents`. |
| `saleStart` / `saleEnd` | Pour l'affichage (« en vente jusqu'au 12 novembre »). N'entrent pas dans le calcul de `availability`. |

## `offersAggregate` — le résumé

Calculé à chaque lecture, présent sur tout événement qui a un catalogue. C'est le champ à utiliser pour une carte ou une liste.

```jsonc
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

| Champ | Notes |
| --- | --- |
| `availability` | Une chaîne : `available` \| `limited` \| `notYetOnSale` \| `soldOut` \| `salesClosed` \| `unknown` \| `mixed`, ou `null` quand rien ne peut être dit (toutes les dates passées, aucune ligne exploitable). |
| `pricing` | Catégorie consolidée sur les sources et les dates. `mixed` si elles divergent (une date gratuite, une autre payante). |
| `price` | Fourchette de prix, en unité mineure. `null` quand elle ne peut pas être calculée sur toute la grille : une source sans tarifs, un tarif `membership` sans prix, des sources de devises différentes. Une fourchette partielle serait fausse. `maxCents: null` veut dire **sans plafond** (prix libre), pas « inconnu ». |
| `links` | Une entrée par billetterie qui a une URL de réservation, dans l'ordre du catalogue. `null` s'il n'y en a aucune, et sur un événement annulé. |

`price` tient compte des tarifs propres à une date (voir [Surcharge par date](#surcharge-par-date--timingsoffers)), ce que la grille `offers` ne montre pas. Pour « à partir de X € », utilisez `price.minCents`.

### Comment `availability` est consolidé

Seules comptent les dates **qui ne sont pas terminées** et qui ont au moins une ligne. Chaque date est d'abord résumée à partir de ses lignes (statuts résolus, voir plus bas) :

```
available     si une billetterie vend la date
limited       sinon, si une billetterie a peu de places
notYetOnSale  sinon, si une billetterie n'a pas encore ouvert la vente
soldOut       si toutes les billetteries sont complètes
salesClosed   si la vente est fermée chez toutes
unknown       sinon (par exemple une billetterie complète et une fermée)
```

Puis l'événement, à partir de ses dates :

```
available     si au moins une date est available
limited       sinon, si au moins une date est limited
soldOut       si toutes les dates sont soldOut
notYetOnSale  si toutes les dates sont notYetOnSale
salesClosed   si toutes les dates sont salesClosed
unknown       si toutes les dates sont unknown
mixed         sinon : les dates ne disent pas la même chose (à afficher « voir les dates »)
```

`null` s'il ne reste aucune date à venir avec une ligne. Le statut de l'événement passe avant les lignes : un événement **complet** est `soldOut`, un événement **annulé** est `salesClosed`.

## `timings[].id` — l'identifiant de date

```jsonc
{ "id": "6G3S74", "sourceRef": "3200414", "begin": "2027-02-18T20:00:00+01:00", "end": "2027-02-18T21:15:00+01:00" }
```

- **Format** : 6 caractères, chiffres et majuscules sans `I`, `L`, `O`, `U` (`^[0-9ABCDEFGHJKMNPQRSTVWXYZ]{6}$`).
- **Stable** : conservé d'une écriture à l'autre. Une date envoyée sans `id` est rapprochée d'une date stockée par son `sourceRef`, puis par son horaire de début ; une date qu'aucun rapprochement ne retrouve reçoit un nouvel `id`. Un `id` envoyé au bon format est conservé tel quel. Le serveur ne déplace jamais un `id` vers une autre date.
- **Absent** sur une date qui n'en a pas encore reçu (un événement ancien jamais réécrit).
- `sourceRef` (optionnel) est votre propre clé pour la date. À la synchronisation suivante, une date envoyée avec le même `sourceRef` garde son `id` même si ses horaires ont changé : c'est ce qui permet à un connecteur de suivre une séance reportée.

C'est cet `id` qui adresse une date dans la route d'inventaire (voir [Écriture](#écriture)).

## `timings[].availability` — l'inventaire

Une liste par date, **une ligne par billetterie** : la même date peut être complète sur le pass Culture et ouverte au grand public.

```jsonc
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

| Champ | Notes |
| --- | --- |
| `provider` | La billetterie concernée |
| `status` | `available` \| `limited` \| `soldOut` \| `notYetOnSale` \| `salesClosed` \| `unknown` (`mixed` n'existe que dans l'agrégat) |
| `syncedAt` | Moment où le connecteur a lu ce statut chez la billetterie |
| `sourceRef` | Identifiant de la séance côté billetterie |
| `onSaleFrom` / `onSaleThrough` | Fenêtre de vente absolue, avec décalage horaire |
| `closedBySource` | Servi uniquement avec `salesClosed` : `true` si la vente a été fermée par autre chose que la fin de la fenêtre (la billetterie elle-même, ou l'annulation de l'événement) |
| `bookingUrl` | Page de réservation propre à cette date et à cette billetterie, quand le connecteur en a fourni une (voir [Surcharge par date](#surcharge-par-date--timingsoffers)) |

### Le statut est servi résolu

Le connecteur écrit le statut **brut** de la billetterie. La lecture sert un statut **résolu**, au moment de la requête :

```
événement annulé                          → salesClosed (closedBySource: true, sans fenêtre de vente)
événement complet                         → soldOut
statut de la billetterie unknown          → unknown
avant onSaleFrom                          → notYetOnSale
après onSaleThrough                       → salesClosed
soldOut ou limited                        → inchangé
notYetOnSale, onSaleFrom passé            → available
salesClosed par la fenêtre, rouverte      → available  (closedBySource: false, onSaleThrough à venir)
sinon                                     → le statut de la billetterie
```

Les fenêtres relatives du catalogue (`onSaleFromBeforeBegin`…) s'appliquent de la même manière. Prenez le statut reçu tel quel : ne réappliquez pas vous-même `onSaleFrom` / `onSaleThrough`. Pour savoir si un statut vient de l'événement lui-même (complet, annulé), lisez le champ `status` de l'événement.

### Suivre les changements : `availabilityUpdatedAt`

Une écriture d'inventaire ne modifie **pas** `updatedAt` : un « il reste 3 places » n'est pas une modification du contenu. Elle avance `availabilityUpdatedAt`, qui a son propre filtre et son propre tri :

```
GET /v2/agendas/{agendaUID}/events?detailed=1&availabilityUpdatedAt[gte]=2026-11-25T12:55:00.000Z&sort=availabilityUpdatedAt.asc
```

- Il avance aussi quand l'événement devient **complet** ou **annulé**, ou cesse de l'être.
- Il est absent des événements qui n'ont jamais eu d'inventaire : le filtre `[gte]` les écarte naturellement.
- Il ne bouge pas quand un événement est supprimé ou dépublié : suivez aussi `updatedAt` pour voir les départs.
- L'indexation suit l'écriture de peu, et pas toujours dans l'ordre : repartez de quelques minutes avant la dernière valeur vue et dédoublonnez.

## Surcharge par date — `timings[].offers`

Un connecteur peut donner à une date une page de réservation ou une grille de tarifs différentes de celles de l'événement (clés `provider`, `tiers`, `bookingUrl`).

Cette surcharge **n'est pas servie** telle quelle. Son effet se lit ailleurs :

- sa page de réservation dans `timings[].availability[].bookingUrl`, sur la ligne de la même billetterie (si la date n'a pas de ligne pour cette billetterie, la page n'est servie nulle part) ;
- ses tarifs dans `offersAggregate.price` et `offersAggregate.pricing`.

## Cohabitation avec `registration`

`registration` (lien, téléphone, courriel) et `conditions` gardent leur format. Pour un événement qui a un catalogue, chaque `offers[].source.url` est **ajouté à la lecture** dans `registration`, sous la forme d'un lien :

```jsonc
"registration": [
  { "type": "email", "value": "contact@orga.fr" },  // saisi par l'organisateur
  { "type": "link", "value": "https://billetterie-ligeria.sainte-luce-loire.com/event/842800-inconstance" }  // ajouté depuis offers
]
```

- Ajouté à la lecture seulement, jamais stocké.
- Dédoublonné sur l'URL normalisée : un lien déjà saisi par l'organisateur n'apparaît pas deux fois.
- Les entrées de l'organisateur viennent d'abord, dans leur ordre, puis les liens de billetterie.
- Les pages de réservation propres à une date n'y sont pas ajoutées.
- Un événement **annulé** ne reçoit aucun lien de billetterie ; ce que l'organisateur a saisi reste.

Si votre intégration lit `registration` pour son bouton « Réserver », rien ne change.

## Écriture

### Le catalogue, avec l'événement

`offers` s'écrit dans le corps des routes d'écriture habituelles :

```
POST  /v2/agendas/{agendaUID}/events
POST  /v2/agendas/{agendaUID}/events/{eventUID}
PATCH /v2/agendas/{agendaUID}/events/{eventUID}
PUT   /v2/agendas/{agendaUID}/events/ext/{key}/{value}
PATCH /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

- La billetterie doit être activée sur l'agenda, sinon `422 offers.disabled` (seul `offers: []` est accepté partout).
- Une écriture de `offers` **remplace** le catalogue. Ne pas envoyer le champ le conserve ; `offers: null` équivaut à ne pas l'envoyer.
- Validation :
  - `currency` ISO 4217 ; montants entiers ≥ 0 ;
  - 50 tarifs par source, 10 sources par événement au maximum ; deux sources ne peuvent pas avoir la même billetterie et la même `source.ref` ;
  - `label` multilingue même quand une seule langue est remplie ;
  - dates avec décalage horaire explicite ;
  - `syncedAt` obligatoire ; sur une ligne d'inventaire, il ne peut pas être dans le futur ;
  - une source `free` ou `donation` ne peut pas porter de tarif payant (`offers.pricing.contradicts`).

### L'inventaire, par sa propre route

```
PATCH /v2/agendas/{agendaUID}/events/{eventUID}/availability
Content-Type: application/json
```

```jsonc
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

- Le corps est indexé par **`id` de date**, puis par billetterie. Seules les paires nommées changent ; `null` retire la ligne de cette billetterie pour cette date.
- Envoyez le statut **brut** de la billetterie avec sa fenêtre de vente : la lecture se charge de l'appliquer.
- Cette route avance `availabilityUpdatedAt` et ne modifie pas `updatedAt`, sauf si elle doit attribuer un `id` à une date qui n'en avait pas encore.
- Authentification : jeton d'accès avec le droit d'écrire, **dans un en-tête** (`access-token` ou `Authorization: Bearer …`), pas dans le corps. Il faut le droit de modifier l'événement, et la billetterie activée sur l'agenda (`422 offers.disabled` sinon).
- **Lisez le corps de la réponse, pas seulement le code HTTP.** La réponse est `200` avec `{ success, applied, written, errors }`, même quand rien n'a été écrit. Une date inconnue est signalée dans `errors` sans bloquer les autres ; `success` vaut `false` dès qu'il y a une erreur. `applied` liste les paires écrites (`"6G3S74.mapado"`).

### Et l'inventaire envoyé avec l'événement ?

Une écriture ordinaire **transporte** l'inventaire, elle ne l'écrit pas : pour une date que l'événement a déjà (retrouvée par son `id`, son `sourceRef` ou son horaire de début, voir [`timings[].id`](#timingsid--lidentifiant-de-date)), les lignes `availability` du corps sont ignorées et les lignes stockées sont conservées. Un client qui relit un événement et le renvoie ne peut donc pas écraser l'inventaire qu'un connecteur vient d'écrire.

- **Le plus simple : ne renvoyez pas `availability`.** Une date dont l'entrée ne mentionne pas le champ garde ses lignes. En revanche, ne retirez pas la date elle-même : `timings` est remplacé en entier, et une date absente est supprimée avec son inventaire.
- **Une date que l'événement n'a pas encore** est l'exception : les lignes envoyées avec elle sont enregistrées. On peut donc créer un événement avec son inventaire en un seul appel.
- **`availabilityAuthority`** : un connecteur qui veut écrire l'inventaire dans le corps de l'événement déclare les billetteries dont il fait autorité, par exemple `"availabilityAuthority": ["mapado"]`. Pour celles-ci, sur chaque date dont l'entrée porte un tableau `availability`, le corps fait foi : une ligne présente est écrite, une ligne absente est retirée. Une date qui ne mentionne pas le champ garde ses lignes, et celles des autres billetteries restent intactes. Ce champ n'est pas stocké.

## JSON-LD

La page publique d'un événement OpenAgenda émet un `schema.org/Event` **par date à venir** (20 au maximum). Quand l'événement a un catalogue, chaque `Event` porte une `Offer`, sauf si l'événement est annulé ou reporté :

```jsonc
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

- `price` est le prix minimum (`offersAggregate.price.minCents`). Il est omis quand la fourchette est inconnue, et quand il vaut 0 sur un événement qui n'est pas gratuit.
- `availability` : `InStock` si une billetterie vend la date (disponible ou peu de places), `SoldOut` si toutes sont complètes ou l'événement complet. Sinon, la propriété est omise.
- `url` : la page de réservation de la billetterie qui vend la date (celle de la date si elle en a une, sinon celle de l'événement chez cette billetterie). Si la date n'a pas de ligne, la page de la billetterie quand il n'y en a qu'une, sinon le lien saisi par l'organisateur.

## Annexes

### A. Événement gratuit

```jsonc
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

### B. Participation libre

```jsonc
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

`offersAggregate.price` vaut alors `{ "minCents": 500, "maxCents": null, "currency": "EUR" }` : un plancher, sans plafond.
