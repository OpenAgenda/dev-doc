---
sidebar_position: 2
---

# Authentification

Comment s'authentifier en amont des appels API en consultation ou en édition.

## En bref

Les clés se créent depuis [la section API](https://openagenda.com/settings/apiKey) des paramètres de votre compte OpenAgenda. Il en existe deux sortes, qui ne voient pas les mêmes contenus :

| Clé | Préfixe | Ce qu'elle voit | Où la placer |
|---|---|---|---|
| **Publique** | `oa_pk_` | Ce que voit un visiteur non connecté : les événements **publiés** des agendas publics | Peut figurer dans une page web |
| **Secrète** | `oa_sk_` | Ce que vous voyez une fois connecté, selon votre rôle sur chaque agenda (événements à contrôler, refusés, champs réservés). Permet aussi d'écrire | **Côté serveur uniquement**, jamais dans le code d'une page |

:::caution Une clé publique ne vous représente pas
Même si vous administrez un agenda, une clé publique le lit comme un visiteur anonyme. Pour lire des événements non publiés, utilisez une clé secrète.
:::

La procédure d'authentification diffère selon si vous souhaitez lire ou éditer des contenus. La procédure pour les éditions fonctionnera pour les lectures.

## Consultation seule

Passer une clé en entête de requête suffit pour les opérations de consultation.

Un exemple:

```bash
curl -H "key: VOTRE_CLE" https://api.openagenda.com/v2/agendas
```

**À noter**:

 * Il est également possible de placer la clé en query: `?key=votreclé`. Cette méthode n'est pas conseillée car elle laisse des traces de la clé dans des logs & historiques. Ne l'utilisez jamais avec une clé secrète.
 * Un **token d'accès** obtenu avec **la clé secrète** d'un compte peut également servir pour les opérations de lecture.
 * Des **clés d'agenda** peuvent être créées depuis l'onglet *Avancé* de l'administration d'un agenda. Elles lisent cet agenda seulement, avec les droits d'un administrateur (événements non publiés compris) : elles sont à garder côté serveur.
 * Les clés **sans préfixe** sont les clés reprises de l'ancien système de clés. Une clé publique sans préfixe lit avec les droits de son compte, événements non publiés compris : ne la placez pas dans une page web, générez plutôt une clé publique `oa_pk_` pour cet usage.

## Édition

Une clé secrète est nécessaire pour l'édition de contenus via API.

### Récupération de la clé

1. Connectez-vous à votre compte OpenAgenda
2. Accédez à la [section "API"](https://openagenda.com/settings/apiKey) dans vos paramètres
3. Si nécessaire, générez une nouvelle clé API secrète en cliquant sur l'action liée au champ de présentation de la clé.

### Utilisation

La clé secrète permet la récupération d'un token d'accès à la durée de vie limitée et qui devra être passé en entête de toutes les requêtes suivantes:

#### Obtention du token d'accès

Il suffit d'une requête `POST` sur la route `https://api.openagenda.com/v2/requestAccessToken` avec en entête, la clé secrète placée en face d'une clé `code`. Voici quelques exemples:

##### bash

```bash
curl -X POST "https://api.openagenda.com/v2/requestAccessToken" -H "Content-Type: application/json" -d'
{
  "code": VOTRE_CLE_SECRETE
}'
```

##### node.js

```js
const response = await fetch('https://api.openagenda.com/v2/requestAccessToken', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    code: VOTRE_CLE_SECRETE
  }),
});

const {
  access_token,
  expires_in
} = await response.json();
```

#### Utilisation du token

Une fois le token en main, il est à passer en entête de requête sous une clé `access-token` tant que celui-ci n'est pas expiré. Une fois arrivé à expiration, un nouveau token doit être généré.

##### bash

```bash
curl -X GET "https://api.openagenda.com/v2/agendas" -H "Content-Type: application/json" -H "access-token: VOTRE_TOKEN"
```

##### node.js

```js
const response = await fetch('https://api.openagenda.com/v2/agendas', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'access-token': VOTRE_TOKEN
  }
});
```

## Droits des clés

Chaque clé peut porter une date d'expiration et une liste d'opérations autorisées, en lecture ou en écriture, réglables depuis [la section API](https://openagenda.com/settings/apiKey) de vos paramètres. Une requête qui sort de ces autorisations est refusée. Voir [Droits des clés API](/evolutions/cles-api).
