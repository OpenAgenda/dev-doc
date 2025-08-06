---
sidebar_position: 2
---

# Authentification

Comment s'authentifier en amont des appels API en consultation ou en édition.

## En bref

Les clés utiles pour s'authentifier sont disponibles depuis [la page de paramètres](https://openagenda.com/settings/apiKey) de votre compte OpenAgenda.

La procédure d'authentification diffère selon si vous souhaitez lire ou éditer des contenus. La procédure pour les éditions fonctionnera pour les lectures.

## Consultation seule

Passer la clé publique d'un compte OpenAgenda en entête de requête suffit pour les opérations de consultation.

Un exemple:

```bash
curl -H "key: YOUR_API_KEY" https://api.openagenda.com/v2/agendas
```

**À noter**:

 * Il est également possible de placer la clé en query: `?key=votreclé`. Cette méthode n'est pas conseillée car elle laisse des traces de la clés dans des logs & historiques.
 * Un **token d'accès** obtenu avec **la clé secrète** d'un compte peut également servir pour les opérations de lecture.
 * Des clés de lecture peuvent également être créées depuis l'onglet *Avancé* de l'administration d'un agenda.

## Édition

Une clé secrète est nécessaire pour l'édition de contenus via API: elle est attribuée sur simple demande à [support@openagenda.com](mailto:support@openagenda.com)

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
curl -X GET "https://api.openagenda.com/v2/agendas" -H "Content-Type: application/json" -H "key: VOTRE_TOKEN"
```

##### node.js

```js
const response = await fetch('https://api.openagenda.com/v2/agendas', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'key': VOTRE_TOKEN
  }
});
```