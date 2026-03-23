# Deleting a location

```
DELETE /v2/agendas/{agendaUID}/locations/{locationUID}
```

## In brief[​](#in-brief "Direct link to In brief")

* `agendaUID` is the unique identifier of the agenda where the location is referenced, `locationUID` is the unique identifier of the location
* Write [authentication](https://developers.openagenda.com/en/en/authentification.md) via access token is required
* The response contains the values associated with the deleted location under a `location` key

## Deletion using an external identifier[​](#deletion-using-an-external-identifier "Direct link to Deletion using an external identifier")

```
DELETE /v2/agendas/{agendaUID}/locations/ext/{key}/{value}
```

Go [here](https://developers.openagenda.com/en/en/lieux/structure.md#external-identifiers) to learn more about external identifiers.
