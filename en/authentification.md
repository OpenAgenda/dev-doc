# Authentication

How to authenticate before making API calls for reading or editing.

## In Brief[​](#in-brief "Direct link to In Brief")

Keys are created from [the API section](https://openagenda.com/settings/apiKey) of your OpenAgenda account settings. There are two kinds, and they do not see the same content:

| Key        | Prefix   | What it sees                                                                                                                             | Where to put it                              |
| ---------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Public** | `oa_pk_` | What a signed-out visitor sees: the **published** events of public agendas                                                               | Can be placed in a web page                  |
| **Secret** | `oa_sk_` | What you see when signed in, according to your role on each agenda (events to review, refused events, restricted fields). Can also write | **Server side only**, never in a page's code |

A public key does not act as you

Even if you administer an agenda, a public key reads it as an anonymous visitor. To read unpublished events, use a secret key.

The authentication procedure differs depending on whether you want to read or edit content. The procedure for editing will also work for reading.

## Read Only[​](#read-only "Direct link to Read Only")

Passing a key as a request header is sufficient for read operations.

An example:

```
curl -H "key: YOUR_API_KEY" https://api.openagenda.com/v2/agendas
```

**Note**:

* It is also possible to place the key in the query: `?key=yourkey`. This method is not recommended as it leaves traces of the key in logs and history. Never use it with a secret key.
* An **access token** obtained with an account's **secret key** can also be used for read operations.
* **Agenda keys** can be created from the *Advanced* tab of an agenda's administration. They read that agenda only, with an administrator's rights (unpublished events included): keep them server side.
* Keys **without a prefix** are keys carried over from the former key system. A public key without a prefix reads with its account's rights, unpublished events included: do not place it in a web page, generate an `oa_pk_` public key for that use instead.

## Editing[​](#editing "Direct link to Editing")

A secret key is required for editing content via the API.

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

## Key permissions[​](#key-permissions "Direct link to Key permissions")

Each key can carry an expiry date and a list of allowed operations, read or write, managed from [the API section](https://openagenda.com/settings/apiKey) of your settings. A request outside these permissions is refused. See [API key permissions](https://developers.openagenda.com/en/en/evolutions/cles-api.md).
