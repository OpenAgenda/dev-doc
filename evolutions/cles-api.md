# Droits des clés API

**Période: septembre 2026 - déployé**

Les clés associées aux comptes utilisateurs se gèrent désormais depuis [la section API](https://openagenda.com/settings/apiKey) des paramètres. Il est possible de :

1. définir une date d'expiration pour une clé donnée ;
2. définir les opérations autorisées, en lecture ou en écriture.

## Les clés publiques ne lisent que les contenus publiés[​](#les-clés-publiques-ne-lisent-que-les-contenus-publiés "Lien direct vers Les clés publiques ne lisent que les contenus publiés")

Une clé publique (préfixe `oa_pk_`) lit comme un visiteur non connecté : elle ne voit que les événements publiés des agendas publics, quel que soit le rôle de son compte. Elle peut ainsi être placée dans une page web.

Pour lire des événements non publiés (à contrôler, refusés), il faut une clé secrète (préfixe `oa_sk_`), à garder côté serveur. Avec une clé publique, le filtre `state` est ignoré et seuls les événements publiés sont renvoyés.

## Clés existantes[​](#clés-existantes "Lien direct vers Clés existantes")

Les clés reprises de l'ancien système (sans préfixe) conservent leur comportement : une clé publique sans préfixe lit toujours avec les droits de son compte. Pour un usage dans une page web, générez une clé publique `oa_pk_`.

Voir [Authentification](https://developers.openagenda.com/authentification.md) pour l'usage des clés.
