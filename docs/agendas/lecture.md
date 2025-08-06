---
sidebar_position: 2
---

# Configuration d'un agenda

Consulter la configuration, un résumé du contenu et le schéma d'un agenda;

```bash
GET /v2/agendas/{agendaUID}
```

## En bref

* L'identifiant d'un agenda `agendaUID` est présenté en pied de barre latérale sur sa page sur [https://openagenda.com](https://openagenda.com).
* Une [authentification](/authentification) est nécessaire.
* L'option `?detailed=1` permet de récupérer le détail de la configuration d'un agenda.

## Propriétés

| Clé              | Chargé avec `detailed` | Type    | Description                                                                                                                                                                      |
|------------------|------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `uid`            |                        | entier  | Identifiant unique                                                                                                                                                               |
| `title`          |                        | texte   | Titre                                                                                                                                                                            |
| `description`    |                        | texte   | Description                                                                                                                                                                      |
| `slug`           |                        | texte   | Identifiant URL                                                                                                                                                                  |
| `url`            |                        | lien    | Lien associé à l'agenda, pointant vers un contenu de référence, comme le site de l'organisme représenté par l'agenda, des instructions ou autre contexte lié à l'agenda          |
| `official`       |                        | entier  | 1 s'il s'agit d'un agenda officiel, 0 sinon                                                                                                                                      |
| `networkUid`     |                        | entier  | Identifiant du réseau lié à l'agenda lorsque défini                                                                                                                              |
| `locationSetUid` |                        | entier  | Identifiant du jeu de lieux lié à l'agenda lorsque défini                                                                                                                        |
| `updatedAt`      |                        | date    | Date de dernière mise à jour de l'agenda                                                                                                                                         |
| `createdAt`      |                        | date    | Date de création de l'agenda                                                                                                                                                     |
| `memberSchemaId` |                        | entier  | Identifiant du schéma étendu du formulaire membre lorsque défini                                                                                                                 |
| `officializedAt` |                        | date    | Date d'offialisation                                                                                                                                                             |
| `image`          |                        | lien    | lien vers l'image associée                                                                                                                                                       |
| `private`        |                        | booléen | Caractère privé de l'agenda. 1 si oui                                                                                                                                            |
| `indexed`        |                        | booléen | État d'indexation de l'agenda. 1 pour indexé, 0 pour non indexé                                                                                                                  |
| `settings`       |                        | objet   | Configurations diverses de l'agenda: tracking, filtres, messagerie, paramètres de contribution                                                                                   |
| `summary`        |                        | objet   | Données statistiques de l'agenda, rafraichies régulièrement, sur les mots clés associés, les décomptes d'événements publiés à venir, le carré géographique, les langues définies |
| `network`        | oui                    | objet   | Informations relatives au réseau lié lorsque défini comme le titre (`title`), l'identifiant (`uid`), l'identifiant du schéma réseau (`formSchemaId`)                             |
| `locationSet`    | oui                    | objet   | Informations relatives au jeu de lieux comme l'identifiant (`uid`), le titre (`title`)                                                                                           |
| `schema`         | oui                    | objet   | Schéma événement propre à l'agenda                                                                                                                                               |


## Exemple

```json
{
    "uid": 4443516,
    "title": "Service Culturel - Université de Rennes",
    "description": "Découvrez les événements culturelles de l'université. Spectacles, expositions, projets arts & sciences, patrimoine scientifique et artistique…",
    "slug": "culture-univ-rennes",
    "url": "https://culture.univ-rennes.fr/",
    "official": 1,
    "networkUid": 18279479,
    "locationSetUid": 2447036,
    "updatedAt": "2025-07-22T09:09:38.000Z",
    "createdAt": "2020-07-08T08:25:10.000Z",
    "officializedAt": "2022-05-06T10:36:43.000Z",
    "image": "https://cdn.openagenda.com/main/agenda4443516.jpg",
    "settings": {
        "contribution": {
            "type": 2,
            "defaultState": 2,
            "canPublish": [
                "administrators",
                "moderators"
            ],
            "moderateOnChangeBy": [],
            "defaultLang": null,
            "allowLocationCreate": true,
            "messages": {
                "instructions": null,
                "complete": null,
                "publication": null,
                "GDPRInformation": null
            },
            "useFields": false
        }
    },
    "summary": {
        "keywords": [
            "Rennes",
            "Paimpont",
            "Brélévenez",
            "Saint-Malo",
            "Ille-et-Vilaine",
            "Côtes-d'Armor",
            "Bretagne",
            "cinéma",
            "Cinéma",
            "sciences",
            "concert",
            "patrimoine",
            "Science",
            "théâtre",
            "collections",
            "Concert",
            "Patrimoine"
        ],
        "publishedEvents": {
            "current": 0,
            "passed": 408,
            "upcoming": 14
        },
        "languages": {
            "fr": 422,
            "de": 3,
            "en": 3,
            "es": 3,
            "it": 3
        },
        "recentlyAddedEvents": {
            "contribution": 5,
            "shared": 0,
            "aggregation": 0
        },
        "viewport": {
            "topLeft": {
                "latitude": 48.72958996798843,
                "longitude": -3.462547017261386
            },
            "bottomRight": {
                "latitude": 48.00230098888278,
                "longitude": -1.6339340060949326
            }
        }
    },
    "network": {
        "uid": 18279479,
        "formSchemaId": 23982,
        "title": "Université Rennes"
    },
    "locationSet": {
        "uid": 2447036,
        "title": "Lieux de l'université de Rennes 1"
    },
    "schema": {
        "fields": [
            {
                "field": "thematique",
                "label": {
                    "fr": "Thématique"
                },
                "optional": true,
                "display": true,
                "enable": true,
                "enableWith": null,
                "optionalWith": null,
                "min": null,
                "max": null,
                "options": [
                    {
                        "id": 2,
                        "value": "culture",
                        "label": {
                            "fr": "Culture"
                        },
                        "info": null,
                        "display": true
                    },
                    {
                        "id": 6,
                        "value": "formation-orientation",
                        "label": {
                            "fr": "Formation / Orientation"
                        },
                        "info": null,
                        "display": true
                    },
                    ...
                ],
                "fieldType": "checkbox",
                "schemaId": 23982,
                "schemaType": "network"
            },
            ...
        ]
    }
}
```