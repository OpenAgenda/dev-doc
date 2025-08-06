---
sidebar_position: 4
---

# Lister les sources d'un agenda

```bash
GET /v2/agendas/{agendaUID}/sources
```
Récupérer les informations principales des agendas source d'un agenda

## En bref

* `agendaUID` est l'identifiant unique de l'agenda où les sources sont référencées.
* Une [authentification](/authentification) en lecture ou par jeton d'accès est requise.
* L'utilisateur authentifié doit être administrateur de l'agenda.

## Navigation

| Clé            | Type     | Description                                                                                                        |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------|
| after          | entier[] | Clé à fournir pour récupérer le jeu suivant. Elle est donnée dans la réponse du dernier appel reçu                 |
| size           | entier   | Définit le nombre d'événements récupérés par appel. Valeur par défaut: **20**. Valeur maximale possible: **100**   |

## Contenu

| Clé            | Type            | Description                                                                    |
|----------------|-----------------|--------------------------------------------------------------------------------|
| detailed       | booléen(0\|1)   | Si égal a 1, rend l'intégralité des données publiques liées à chaque source    |

## Réponse

| Clé            | Type            | Description                                                                       |
|----------------|-----------------|-----------------------------------------------------------------------------------|
| sources        | objet[]         | Segment de sources de l'agenda                                                    |
| after          | entier          | Valeur à placer dans l'appel suivant pour récupérer le segment de sources suivant |

Chaque source présente les valeurs suivantes:

| Clé            | Type            | Description                                                                       |
|----------------|-----------------|-----------------------------------------------------------------------------------|
| id             | entier          | Identifiant de la source                                                          |
| rules          | objet[]         | Rêgles d'agrégation associées à la source                                         |
| agenda         | objet           | Donnée publique de l'agenda source