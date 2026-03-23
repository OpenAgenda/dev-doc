# Authentication

How to authenticate before making API calls for reading or editing.

## In Brief[​](#in-brief "Direct link to In Brief")

The keys needed for authentication are available from [the settings page](https://openagenda.com/settings/apiKey) of your OpenAgenda account.

The authentication procedure differs depending on whether you want to read or edit content. The procedure for editing will also work for reading.

## Read Only[​](#read-only "Direct link to Read Only")

Passing an OpenAgenda account's public key as a request header is sufficient for read operations.

An example:

```
curl -H "key: YOUR_API_KEY" https://api.openagenda.com/v2/agendas
```

**Note**:

* It is also possible to place the key in the query: `?key=yourkey`. This method is not recommended as it leaves traces of the key in logs and history.
* An **access token** obtained with an account's **secret key** can also be used for read operations.
* Read keys can also be created from the *Advanced* tab of an agenda's administration.

## Editing[​](#editing "Direct link to Editing")

A secret key is required for editing content via the API: it is granted upon simple request to <support@openagenda.com>

### Retrieving the Key[​](#retrieving-the-key "Direct link to Retrieving the Key")

1. Log in to your OpenAgenda account
2. Go to the ["API" section](https://openagenda.com/settings/apiKey) in your settings
3. If necessary, generate a new secret API key by clicking the action associated with the key display field.

### Usage[​](#usage "Direct link to Usage")

The secret key allows you to retrieve an access token with a limited lifespan that must be passed as a header in all subsequent requests:

#### Obtaining the Access Token[​](#obtaining-the-access-token "Direct link to Obtaining the Access Token")

A single `POST` request to the route `https://api.openagenda.com/v2/requestAccessToken` is needed, with the secret key placed under a `code` key in the body. Here are some examples:

##### bash[​](#bash "Direct link to bash")

```
curl -X POST "https://api.openagenda.com/v2/requestAccessToken" -H "Content-Type: application/json" -d'
{
  "code": VOTRE_CLE_SECRETE
}'
```

##### node.js[​](#nodejs "Direct link to node.js")

```
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

#### Using the Token[​](#using-the-token "Direct link to Using the Token")

Once you have the token, it should be passed as a request header under an `access-token` key as long as it has not expired. Once expired, a new token must be generated.

##### bash[​](#bash-1 "Direct link to bash")

```
curl -X GET "https://api.openagenda.com/v2/agendas" -H "Content-Type: application/json" -H "access-token: VOTRE_TOKEN"
```

##### node.js[​](#nodejs-1 "Direct link to node.js")

```
const response = await fetch('https://api.openagenda.com/v2/agendas', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'access-token': VOTRE_TOKEN
  }
});
```
