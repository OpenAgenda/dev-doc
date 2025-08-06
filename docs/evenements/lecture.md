---
title: Lecture d'événements
description: Lister ou consulter un événement d'un agenda
sidebar_position: 2
---

# Lecture d'événements d'un agenda

## Lister

```bash
GET /v2/agendas/{agendaUID}/events
```

### En bref
* `agendaUID` est l'identifiant unique de l'agenda où les événements sont référencés.
* Une [authentification](/authentification) en lecture ou par jeton d'accès est requise.
* La réponse contient un segment d'événement plutôt que la liste complète. Si le total excède le nombre de lieux rendus en un appel, une boucle de lecture devra être mise en place.

### Paramètres

#### Filtres standards

Les paramètres suivant agissent sur la sélection des événements rendus par un appel.

| Clé            | Type               | Description                                                                                                                                                                                                                                                                                                        |
|----------------|--------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| removed        | booléen(0\|1|null) | Par défaut, les événements ayant été retirés ou supprimés ne sont plus présentés dans l'agenda. Ce paramètre précisé à `1` en fera remonter l'identifiant `uid` et le moment du retrait `updatedAt`. Ceci permet aux traitements de synchronisation de suivre les retraits entre deux intervalles de suppressions. |
| city           | texte[]            | Filtrer par ville.<br/>Exemple: `?city[]=Lausanne&city[]=Genève`                                                                                                                                                                                                                                                   |
| department     | texte[]            | ...par Département.<br/>Exemple: `?department[]=Hauts-de-Seine`                                                                                                                                                                                                                                                    |
| region         | texte[]            | ...par Région.<br/>Exemple: `?region=Normandie`                                                                                                                                                                                                                                                                    |
| timings[gte]   | date               | ...par horaire supérieur à ...<br/>Exemple: `?timings[gte]=2025-...:00:00.000Z`                                                                                                                                                                                                                                    |
| timings[lte]   | date               | Filtre par horaire inférieur à ...<br/>Exemple: `?timings[lte]=2021-02-18T...00Z`                                                                                                                                                                                                                                  |
| updatedAt[gte] | date               | Mis à jour après le ...<br/>Exemple: `?updatedAt[gte]=2021-02-1...:00.000Z`                                                                                                                                                                                                                                        |
| updatedAt[lte] | date               | Mis à jour avant le ...<br/>Exemple: `?updatedAt[lte]=2021-02-...00.000Z`                                                                                                                                                                                                                                          |
| search         | texte[]            | Recherche synthaxique<br/>Exemple: `?search=Concert`                                                                                                                                                                                                                                                               |
| uid            | texte[]            | Filtre par identifiant<br/>Exemple: `?uid[]=56158955&uid[]=55895615`                                                                                                                                                                                                                                               |
| slug           | texte[]            | Filtre par code url<br/>Exemple: `?slug=festival-dete`                                                                                                                                                                                                                                                             |
| featured       | texte[]            | En une<br/>Exemple: `?featured=1` (en une) vs `?featured=0` (pas en une)                                                                                                                                                                                                                                           |
| relative       | texte[]            | Passé / En cours / A venir<br/>Exemple: `?relative[]=passed` (événements passés), `?relative[]=upcoming` (événements à venir), `?relative[]=current`(événements en cours: avec plages horaires passées ET à venir)                                                                                                 |
| state          | texte[]            | Statut sur l'agenda<br/>Exemple: `?state=2` (publié - valeur par défaut), `?state=1` (prêt à publier), `?state=0` (à contrôler), `?state=-1` (réfusé). Les événements non publiés ne sont accessibles que par les utilisateurs modérateurs ou administrateurs.                                                     |
| keyword        | texte[]            | Mots clés<br/>Exemple: `?keyword[]=gratuit&keyword[]=exposition` fonction en `ET` logique                                                                                                                                                                                                                          |
| geo            | texte[]            | Filtrer sur un carré géographique<br/>Exemple: `?geo[northEast][lat]=48.9527&geo[northEast][lng]=2.4484&geo[southWest][lat]=48.8560&geo[southWest][lng]=2.1801`                                                                                                                                                    |
| locationUid    | texte[]            | Filtre par identifiant de lieu<br/>Exemple: `?locationUid[]=123&locationUid[]=456`                                                                                                                                                                                                                                 |
| accessibility  | texte[]            | Filtrer par accessibilité particulière<br/>Exemple: `?accessibility[]=hi&accessibility[]=vi`                                                                                                                                                                                                                       |
| status         | texte[]            | Filtrer par état<br/>Exemple: `?status[]=1`                                                                                                                                                                                                                                                                        |

#### Filtres de champs additionnels

Les champs additionnels de types à choix (checkbox, radio, select) peuvent également servir de base aux filtres. La clé est alors le code du champ concerné, les valeurs sont les identifiants à sélectionner.

Un exemple pour un champ additionnel Catégories Métropolitaines dont le code serait `categories-metropolitaines`:

```bash
GET /v2/agendas/{agendaUID}/events?categories-metropolitaines[]=2
```

Le fonctionnement des champs additionnels est détaillé [ici](/agendas/schemas)

#### Contenu

| Clé                   | Type          |  Description                                                                                                                                                                                                                                                                                                                             |
|-----------------------|---------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| detailed              | booléen(0\|1) | Si égal a 1, rend l'intégralité des données publiques liées à chaque événement. |
| monolingual           | texte         | Préciser un code langue (fr, en, it, de) pour ne renvoyer qu'une seule langue pour les champs multilingues ou les labels de champs additionnels. Si la langue choisie n'est pas définie, une langue disponible sera utilisée.                                                                                                            |
| longDescriptionFormat | texte         | `markdown` par défaut. `HTML`: le contenu du champ longDescription est rendu au format HTML. `HTMLWithEmbeds`: le contenu du champ longDescription est rendu au format HTML et tout lien pointant vers des contenus multimédias de plateformes connues (Youtube, Soundcloud, Eventbrite, Pixlr...) sera remplacé par un contenu intégré. |
| includeLabels         | booléen(0\|1) | Inclure les labels dans les champs additionnels à choix.<br/>Exemple: `{"categorie": 1}` devient `{"categorie": {"id": 1, "label": {"fr": "Spectacle"}}}`.                                                                                                                                                                                        |
| includeFields         | texte[]       | Précise les données à remonter pour chaque événement; utile à des fins d'optimisation de temps de réponse et de bande passante. Variante courte: `if[]=` Ex: `if[]=uid&if[]=location.city`                                                                                                                                           |

_**Pro tip**_: utilisez `detailed` en développement et `includeFields` en production pour réduire le volume de données qui transitent et améliorer les temps de réponse.

#### Navigation

| Clé                   | Type    |  Description                                                                                                                                                                                                                      |
|-----------------------|---------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| after                 | texte[] | Sert à récupérer les résultats suivants le premier jeu d'événements rendu, lorsque le total résultant des filtres actifs est supérieur au total du segment rendu.                                                                 |
| from                  | entier  | Alternative à `after`. Permet de récupérer les résultats à partir du n-ième événement. Préférer l'utilisation de la clé after pour de meilleures performances, en particulier pour les lectures plus complètes (> 500 événements) |
| size                  | entier  | Définit le nombre d'événements récupérés par appel. Valeur par défaut: **20**. Valeur maximale possible: **300**                                                                                                                  |
| sort                  | texte   | Choix du tri à appliquer

##### Tris

Les tris suivants sont possibles. Il sont à placer dans un paramètre `sort`:

| Valeur                     | Description                                                                                                                                                                                                                                                             |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| timingsWithFeatured.asc    | Tri par défaut. Evénéments en une en premier, puis tri chronologique en fonction de la prochaine plage horaire à venir.                                                                                                                                                 |
| timings.asc                | Tri chronologique en fonction de la prochaine plage horaire à venir. Les événements aux plages horaires à venir les plus proches d'abord jusqu'au plus lointaines à venir, suivi des événements aux plages horaires les plus proches dans le passé aux plus lointaines. |
| lastTiming.asc             | Tri chronologique en fonction de la dernière plage horaire à venir, suivi des événements aux plages horaires les plus proches dans le passé aux plus lointaines.                                                                                                        |
| lastTimingWithFeatured.asc | Comme lastTiming.asc mais avec les événements en une en premier.                                                                                                                                                                                                        |
| updatedAt.desc             | Evénements mis à jour le plus récemment en premier                                                                                                                                                                                                                      |
| updatedAt.asc              | Evénements mis à jour le plus récemment en dernier 


#### Réponse                                                                                                                                                                                                  |

La réponse présente les données sous les clés suivantes:

| Clé            | Type            | Description                                                                          |
|----------------|-----------------|--------------------------------------------------------------------------------------|
| total          | entier          | Le nombre total de membres                                                           |
| events         | objet[]         | Segment d'événements correspondants aux filtres                                      |
| sort           | texte           | Tri effectif                                                                         |
| after          | textes[]        | Valeurs à placer dans l'appel suivant pour récupérer le segment d'événements suivant |

Les événements sont présentés selon la structure détaillée [ici](/evenements/structure).

### Quelques cas d'usage

#### Récupérer tous les événements à venir publiés sur un agenda

Dans le cas où l'objectif est de reprendre l'intégralité des événements correspondant à un filtre donné, une suite d'appels sera nécessaire lorsque le total excède la taille maximale d'événements récupérables en un appel (`300`).

Pour cet exemple, le souhait est de récupérer tous les événements en cours et à venir publiés sur l'agenda: le filtre `relative` sert dans ce cas. Un premier appel est fait pour récupérer le premier segment des résultats:

```bash
GET /v2/agendas/{agendaUID}/events?relative[]=current&relative[]=upcoming
```

Le résultat rendu a la forme suivante, il fournit les 20 premiers événements des 872 événements correspondants au filtre demandé:

```json
{
  "total": 872,
  "events": [...],
  "after": ["0", "000001758268800", "1758472200000", "5335740"]
}
```

Les valeurs fournies sous la clé `after` permettent de récupérer les 20 événements suivants:

```bash
GET /v2/agendas/{agendaUID}/events?relative[]=current&relative[]=upcoming&after[]=0&after[]=000001758268800&after[]=1758472200000&after[]=5335740
```

Et ainsi de suite jusqu'à arriver aux derniers événements. La dernière réponse fournira un `after` à `null` indiquant qu'il n'y a plus d'autres événements à récupérer.

```json
{
  "total": 872,
  "events": [...],
  "after": null
}
```

---

#### Synchroniser une base de données événementielle

Un script synchronisant la programmation d'un agenda avec une base tiers à intervalle régulier peut fonctionner en récupérant l'intégralité de la programmation lors de sa première execution puis en se **limitant** au traitement des **ajouts, modifications et suppressions** entre chaque nouvelle execution. Les paramètres suivants sont utiles pour y parvenir:

* **updatedAt[gte]**: préciser la dernière execution du script pour limiter la sélection aux événements mis à jour depuis
* **removed**: `null` pour **inclure** les événements qui ont été retirés de la programmation
* **sort**: `updatedAt.asc`: optionnellement, trier la sélection suivant l'ordre des mise à jour pour simplifier la lecture

... et dans cet exemple, nous ne nous intéressons qu'aux textes français.

```bash
GET /v2/agendas/{agendaUID}/events?updatedAt[gte]=2025-07-11T13:49:58.000Z&removed=null&monolingual=fr
```

Le résultat ressemblera à ceci:

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

Les identifiants des événements retirés suffisent pour répercuter l'opération de retrait sur la base synchronisée, les autres événements peuvent être soit créés, soit mis à jour

### Export JSON

L'export JSON anciennement proposé sur la modale d'export des agendas OpenAgenda est **en fin de vie**. La documentation de cet export [est consultable ici](/evenements/export-json), une aide pour migrer les synchronisations [est proposée ici](/evenements/export-json-migration).

## Consulter un événement

### Par son identifiant unique (uid)

```bash
GET /v2/agendas/{agendaUID}/events/{eventUID}
```

#### En bref
* `agendaUID` est l'identifiant unique de l'agenda où l'événement est référencé, `eventUID` son identifiant unique.
* Une [authentification](/authentification) en lecture ou par jeton d'accès est requise.

### Par un identifiant externe à OpenAgenda (extId)

```bash
GET /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

#### En bref
* `agendaUID` est l'identifiant unique de l'agenda où l'événement est référencé, `key` est le code de l'identifiant externe et `value` sa valeur.
* Une [authentification](/authentification) en lecture ou par jeton d'accès est requise.

#### Paramètres

| Clé                   | Type         |  Description                                                                                                                                                                                                                                                                                                                             |
|-----------------------|--------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| longDescriptionFormat | texte        | `markdown` par défaut. `HTML`: le contenu du champ longDescription est rendu au format HTML. `HTMLWithEmbeds`: le contenu du champ longDescription est rendu au format HTML et tout lien pointant vers des contenus multimédias de plateformes connues (Youtube, Soundcloud, Eventbrite, Pixlr...) sera remplacé par un contenu intégré. |
| includeLabels         | booléen(0\|1) | Inclure les labels dans les champs additionnels à choix.<br/>Exemple: `{"categorie": 1}` devient `{"categorie": {"id": 1, "label": {"fr": "Spectacle"}}}`.                                                                                                                                                                              |