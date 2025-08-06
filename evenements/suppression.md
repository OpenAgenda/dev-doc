# Suppression d'un événement

## Méthode usuelle[​](#méthode-usuelle "Lien direct vers Méthode usuelle")

```
DELETE /v2/agendas/{agendaUID}/events/{eventUID}
```

### En bref[​](#en-bref "Lien direct vers En bref")

* `agendaUID` est l'identifiant unique de l'agenda où l'événement est référencé, `eventUID` est son identifiant unique
* Une [authentification](https://developers.openagenda.com/authentification.md) en écriture par jeton d'accès est requise
* La réponse contient les valeurs associées au lieu supprimé sous une clé `event`

Deux cas de figure se présentent:

1. L'agenda est *l'agenda d'origine* de l'événement: l'événement est supprimé s'il a été contribué sur l'agenda.
2. L'agenda n'est pas *l'agenda d'origine*, l'événement a été ajouté par partage ou par agrégation: il est alors simplement retiré.

## Suppression par un identifiant externe à OpenAgenda[​](#suppression-par-un-identifiant-externe-à-openagenda "Lien direct vers Suppression par un identifiant externe à OpenAgenda")

```
DELETE /v2/agendas/{agendaUID}/events/ext/{key}/{value}
```

Rendez vous [ici](https://developers.openagenda.com/evenements/structure.md#identifiants-externes) pour en savoir plus sur les identifiants externes.
