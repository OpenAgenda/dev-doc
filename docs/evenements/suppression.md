---
title: Suppression d'un événement
description: Supprimer un événement ou le retirer d'un agenda
sidebar_position: 5
---

# Suppression d'un événement

## Méthode usuelle

```bash
DELETE /v2/agendas/{agendaUID}/events/{eventUID}
```

### En bref

* `agendaUID` est l'identifiant unique de l'agenda où l'événement est référencé, `eventUID` est son identifiant unique
* Une [authentification](/authentification) en écriture par jeton d'accès est requise
* La réponse contient les valeurs associées au lieu supprimé sous une clé `event`

Deux cas de figure se présentent:

1. L'agenda est _l'agenda d'origine_ de l'événement: l'événement est supprimé s'il a été contribué sur l'agenda.
2. L'agenda n'est pas _l'agenda d'origine_, l'événement a été ajouté par partage ou par agrégation: il est alors simplement retiré.

## Suppression par un identifiant externe à OpenAgenda

```bash
DELETE /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

Rendez vous [ici](/evenements/structure#identifiants-externes) pour en savoir plus sur les identifiants externes.