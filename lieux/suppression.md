# Suppression d'un lieu

```
DELETE /v2/agendas/{agendaUID}/locations/{locationUID}
```

## En bref[​](#en-bref "Lien direct vers En bref")

* `agendaUID` est l'identifiant unique de l'agenda où le lieu est référencé, `locationUID` est l'identifiant unique du lieu
* Une [authentification](https://developers.openagenda.com/authentification.md) en écriture par jeton d'accès est requise
* La réponse contient les valeurs associées au lieu supprimé sous une clé `location`

## Suppression par un identifiant externe à OpenAgenda[​](#suppression-par-un-identifiant-externe-à-openagenda "Lien direct vers Suppression par un identifiant externe à OpenAgenda")

```
DELETE /v2/agendas/{agendaUID}/locations/ext/{key}/{value}
```

Rendez vous [ici](https://developers.openagenda.com/lieux/structure.md#identifiants-externes) pour en savoir plus sur les identifiants externes.
