---
title: Deleting an event
description: Delete an event or remove it from an agenda
sidebar_position: 5
---

# Deleting an event

## Standard method

```bash
DELETE /v2/agendas/{agendaUID}/events/{eventUID}
```

### In brief

* `agendaUID` is the unique identifier of the agenda where the event is referenced, `eventUID` is its unique identifier
* A write [authentication](/authentification) via access token is required
* The response contains the values associated with the deleted event under an `event` key

Two scenarios exist:

1. The agenda is the _origin agenda_ of the event: the event is deleted if it was contributed on the agenda.
2. The agenda is not the _origin agenda_, the event was added by sharing or aggregation: it is then simply removed.

## Deletion by external identifier

```bash
DELETE /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

Go [here](/evenements/structure#external-identifiers) to learn more about external identifiers.
