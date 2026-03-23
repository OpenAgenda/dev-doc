---
title: Editing an event
description: Update an event on an agenda using the standard method or with an external identifier
sidebar_position: 4
---

# Editing an event

## Standard method

```bash
[POST/PATCH] /v2/agendas/${agendaUID}/events/${eventUID}
```

### In brief

This route allows updating an event **in the context of an agenda**. This means that beyond the values of the event's [standard fields](/evenements/structure#standard-fields), the values associated with the agenda's additional fields can be updated, as well as the state (published, to moderate...) or its featured status.

* `agendaUID` is the unique identifier of the agenda where the event is referenced, `eventUID` is the unique identifier of the event
* A write [authentication](/authentification) via access token is required
* A `lang` parameter can be specified in the header (`lang:fr`) to simplify formatting for monolingual events
* The response contains the details of the updated event under an `event` key
* The `POST` method should be used for full updates, `PATCH` for partial updates
* The data defining the event must be placed under a `data` key in the request body.

## Update by external identifier

An event can be updated via an [external identifier](/evenements/structure#external-identifiers) external to OpenAgenda. The same route also serves for creations when an event does not exist for the given identifier.

```bash
PUT /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

### In brief
* `key` is the name of the identifier, `value` is its value
* If the event already exists, it will be updated
* An event can be associated with multiple external identifiers
* An event associated with one or more external identifiers retains a unique OpenAgenda `UID` identifier.
