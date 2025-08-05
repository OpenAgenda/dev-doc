# Recherche transverse d'événements

Lister les événements récents et à venir publiés sur des agendas OpenAgenda. Cette fonction est en expérimentation. Vous souhaitez la tester? Contactez-nous en envoyant un email à support@openagenda.com

```bash
GET /v2/events
```

## En bref

* Une [authentification](/authentification) en lecture ou par jeton d'accès est requise.
* Les paramètres pour cette route sont les mêmes que [ceux proposés pour la lecture d'événements d'un agenda](/agendas/lecture). Seules les valeurs propres aux agendas (statut, champs additionnels, mise en une) n'ont pas d'equivalence dans la recherche transverse. Les données en réponse sont également structurées de la même manière