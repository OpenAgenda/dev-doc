---
sidebar_position: 4
---

# Édition d'un événement

## Méthode usuelle

```bash
[POST/PATCH] /v2/agendas/${agendaUID}/events/${eventUID}
```

### En bref

Cette route permet la mise à jour d'un événement **dans le contexte d'un agenda**. Ceci signifie qu'au delà des valeurs des [champs standard](/evenements/structure#champs-standards) de l'événement, les valeurs associées aux champs additionnels de l'agenda peuvent être mises à jour, ainsi que le statut (publié, à modérer...) ou encore sa mise en une.

* `agendaUID` est l'identifiant unique de l'agenda où l'événement est référencé, `eventUID` est l'identifiant unique de l'événement
* Une [authentification](/authentification) en écriture par jeton d'accès est requise
* Un paramètre `lang` peut être précisé en entête (`lang:fr`) pour simplifier le formatage d'événements monolingues
* La réponse contient le détail de l'événement mis à jour sous une clé `event`
* La méthode `POST` est à utiliser pour les mises à jour complètes, `PATCH` pour les mises à jour partielles
* Les données définissant l'événement doivent être placées sous une clé `data` en corps de requête.

## Mise à jour par identifiant externe

Un événement peut être mis à jour via un [identifiant externe](/evenements/structure#identifiants-externes) à OpenAgenda. La même route sert également pour les créations lorsqu'un événement n'existe pas pour l'identifiant donné.

```bash
PUT /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

### En bref
* `key` est le nom de l'identifiant, `value` sa valeur
* Si l'événement existe déjà, il sera mis à jour
* Un événement peut être associé à plusieurs identifiants externes
* Un événement associé à un ou plusieurs identifiants externes garde un identifiant OpenAgenda unique `UID`.