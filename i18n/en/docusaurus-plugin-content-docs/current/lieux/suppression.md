---
title: Delete a location
description: Permanently delete a location from an agenda
sidebar_position: 5
---

# Deleting a location

```bash
DELETE /v2/agendas/{agendaUID}/locations/{locationUID}
```

## In brief

* `agendaUID` is the unique identifier of the agenda where the location is referenced, `locationUID` is the unique identifier of the location
* Write [authentication](/authentification) via access token is required
* The response contains the values associated with the deleted location under a `location` key

## Deletion using an external identifier

```bash
DELETE /v2/agendas/{agendaUID}/locations/ext/{key}/{value}
```

Go [here](/lieux/structure#external-identifiers) to learn more about external identifiers.
