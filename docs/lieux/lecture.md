---
title: Lecture de lieux
description: Lister ou consulter un lieu d'un agenda
sidebar_position: 2
---

# Lecture des lieux

## Lister

```bash
GET /v2/agendas/{agendaUID}/locations
```

### En bref

* `agendaUID` est l'identifiant unique de l'agenda où les lieux sont référencés
* Une [authentification](/authentification) en lecture ou par jeton d'accès est requise
* La réponse contient un segment du référentiel complet des lieux de l'agenda. Si le total excède le nombre de lieux rendus en un appel, une boucle de lecture devra être mise en place.

### Paramètres

#### Filtres

| Clé              | Type    | Description                                    | Valeurs possibles / Exemple                                |
| ---------------- | ------- | ---------------------------------------------- | ---------------------------------------------------------- |
| `updatedAt.gte` | date    | Retourne les lieux mis à jour après cette date | Format : `YYYY-MM-DD` ou `YYYY-MM-DDTHH:MM:SS+ZZZZ`        |
| `updatedAt.lte` | date    | Retourne les lieux mis à jour avant cette date | Idem                                                       |
| `createdAt.gte` | date    | Retourne les lieux créés après cette date      | Idem                                                       |
| `createdAt.lte` | date    | Retourne les lieux créés avant cette date      | Idem                                                       |
| `search`         | chaîne  | Requête de recherche textuelle sur les lieux   | Exemple : `"musée"`                                        |
| `state`          | entier  | Filtre par statut de vérification              | `0` (non vérifié), `1` (vérifié)                           |

#### Contenu

| Clé              | Type    | Description                                    | Valeurs possibles / Exemple                                |
| ---------------- | ------- | ---------------------------------------------- | ---------------------------------------------------------- |
| `detailed`       | booléen | Retourne tous les champs des lieux             | `true` ou `false`                                          |

#### Navigation

| Clé              | Type    | Description                                    | Valeurs possibles / Exemple                                |
| ---------------- | ------- | ---------------------------------------------- | ---------------------------------------------------------- |
| `size`           | entier  | Nombre maximum de lieux à retourner            | Exemple : `20`                                             |
| `after`          | chaîne  | Curseur pour pagination                        | Valeur fournie dans la réponse précédente (`after`)        |
| `order`          | chaîne  | Ordre de tri                                   | `name.asc`, `name.desc`, `createdAt.asc`, `createdAt.desc` |

### Réponse

Le corps de réponse présente trois clés:

* `locations` : liste des lieux correspondant aux critères.
* `total` : nombre total de résultats.
* `after` : valeur à utiliser pour la page suivante.

## Lire un lieu

### Par son identifiant unique (uid)

```bash
GET /v2/agendas/{agendaUID}/locations/{locationUID}
```

La réponse contiendra toutes les données disponibles sur le lieu.

**À noter**: pour se limiter à vérifier l'existence du lieu, utiliser la méthode `HEAD`, ce qui évitera un transfert de données inutile.

### Par un identifiant externe (extId)

1. Si aucune clé particulière n'est associée à l'identifiant externe (clé "default"):

```bash
/v2/agendas/{agendaUID}/locations/ext/{value}
```

2. Si l'identifiant externe est associé à une clé

```bash
/v2/agendas/{agendaUID}/locations/ext/{key}/{velue}
```