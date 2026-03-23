# Search

List and search for agendas published and indexed on OpenAgenda

```
GET /v2/agendas
```

## Parameters[​](#parameters "Direct link to Parameters")

### Filters[​](#filters "Direct link to Filters")

| Key             | Type       | Description                                                                                                  | Values                                                                              |
| --------------- | ---------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `official`      | boolean    | Filter by whether agendas are official or not                                                                | Undefined by default. `0` to filter on non-official agendas, `1` for official ones. |
| `search`        | string     | Syntactic search on the title and key terms of an agenda, derived from published events: geography, keywords | Examples: `?search=Festival` or `search=Loiret`                                     |
| `network`       | integer    | Filter by the identifier of the desired agenda network                                                       | Example: `?network=34480426`                                                        |
| `locationSet`   | integer    | Filter by the identifier of the desired location set                                                         | Example: `?locationSet=3892749`                                                     |
| `updatedAt.gte` | timestamp  | Filter on agendas updated after a given moment. The `updatedAt.lte` variant is also available.               | Example: `?updatedAt.gte=2025-07-16T12:19:00.000Z`                                  |
| `uid`           | integer\[] | Filter on one or more agendas by their unique identifiers.                                                   | Example: `?uid=123` or `?uid[]=123&uid[]=456`                                       |
| `slug`          | string\[]  | Filter on one or more agendas by their URL slugs                                                             | Example: `?slug=loiret` or `slug[]=cite-des-sciences&slug[]=versailles`             |

### Content[​](#content "Direct link to Content")

| Key             | Variant | Type      | Description                                                                                          | Values                                                                                                                             |
| --------------- | ------- | --------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `includeFields` | `if`    | string\[] | List of fields to retrieve. Useful for limiting the volume of transferred data to what is necessary. | `uid`, `title`, `image`, `description`, `official`, `slug`, `summary`, `schema`, `network`, `createdAt`, `locationSet`, `settings` |

### Pagination[​](#pagination "Direct link to Pagination")

| Key     | Type       | Description                                                           | Values                                                                                                                                                                                                           |
| ------- | ---------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `after` | integer\[] | Key to provide to retrieve the next set. It is given in the response. | Example: `?after[]=1&after[]=36668061`                                                                                                                                                                           |
| `size`  | integer    | Number of agendas to retrieve per call. Maximum: 100.                 | Example: `?size=20`                                                                                                                                                                                              |
| `sort`  | string     | Sort agendas                                                          | `createdAt.desc` or `recentlyAddedEvents.desc`. If undefined and a `search` criterion is set, sorting will be by relevance, otherwise by ascending identifier. The default sort order may change in the future\` |

## Examples[​](#examples "Direct link to Examples")

### curl[​](#curl "Direct link to curl")

```
curl -H "key: VOTRE_CLE_PUBLIQUE" \
  "https://api.openagenda.com/v2/agendas?size=2&official=1"
```

...gives:

```
{
  "after": [1, 125325],
  "agendas": [
    {
      "uid": 62695,
      "image": "https://cdn.openagenda.com/main/agenda62695.jpg",
      "description": "Retrouvez tous les événements du patrimoine sur Grand Châtellerault",
      "official": true,
      "title": "Patrimoine Grand Châtellerault",
      "slug": "patrimoine-grand-chatellerault"
    },
    {
      "uid": 125325,
      "image": "https://cdn.openagenda.com/main/agenda125325.jpg",
      "description": "EPCC pour la connaissance, la valorisation, la conservation et la restauration des patrimoines ethnologique et muséographique en Normandie.",
      "official": true,
      "title": "La Fabrique de patrimoines en Normandie",
      "slug": "fabrique"
    }
  ],
  "total": 3886
}
```

And:

```
curl -H "key: VOTRE_CLE_PUBLIQUE" \
  "https://api.openagenda.com/v2/agendas?size=2&official=1&after[]=1&after[]=125325"
```

... to retrieve the next set of results.
