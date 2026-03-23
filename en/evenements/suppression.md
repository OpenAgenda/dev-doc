# Deleting an event

## Standard method[​](#standard-method "Direct link to Standard method")

```
DELETE /v2/agendas/{agendaUID}/events/{eventUID}
```

### In brief[​](#in-brief "Direct link to In brief")

* `agendaUID` is the unique identifier of the agenda where the event is referenced, `eventUID` is its unique identifier
* A write [authentication](https://developers.openagenda.com/en/en/authentification.md) via access token is required
* The response contains the values associated with the deleted event under an `event` key

Two scenarios exist:

1. The agenda is the *origin agenda* of the event: the event is deleted if it was contributed on the agenda.
2. The agenda is not the *origin agenda*, the event was added by sharing or aggregation: it is then simply removed.

## Deletion by external identifier[​](#deletion-by-external-identifier "Direct link to Deletion by external identifier")

```
DELETE /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

Go [here](https://developers.openagenda.com/en/en/evenements/structure.md#external-identifiers) to learn more about external identifiers.
