# Reading locations

## List[​](#list "Direct link to List")

```
GET /v2/agendas/{agendaUID}/locations
```

### In brief[​](#in-brief "Direct link to In brief")

* `agendaUID` is the unique identifier of the agenda where the locations are referenced
* Read [authentication](https://developers.openagenda.com/en/en/authentification.md) or access token authentication is required
* The response contains a segment of the complete location directory of the agenda. If the total exceeds the number of locations returned in a single call, a read loop will need to be implemented.

### Parameters[​](#parameters "Direct link to Parameters")

#### Filters[​](#filters "Direct link to Filters")

| Key             | Type    | Description                                | Possible values / Example                          |
| --------------- | ------- | ------------------------------------------ | -------------------------------------------------- |
| `updatedAt.gte` | date    | Returns locations updated after this date  | Format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS+ZZZZ` |
| `updatedAt.lte` | date    | Returns locations updated before this date | Same                                               |
| `createdAt.gte` | date    | Returns locations created after this date  | Same                                               |
| `createdAt.lte` | date    | Returns locations created before this date | Same                                               |
| `search`        | string  | Text search query on locations             | Example: `"musée"`                                 |
| `state`         | integer | Filter by verification status              | `0` (unverified), `1` (verified)                   |

#### Content[​](#content "Direct link to Content")

| Key        | Type    | Description                      | Possible values / Example |
| ---------- | ------- | -------------------------------- | ------------------------- |
| `detailed` | boolean | Returns all fields for locations | `true` or `false`         |

#### Navigation[​](#navigation "Direct link to Navigation")

| Key     | Type    | Description                           | Possible values / Example                                  |
| ------- | ------- | ------------------------------------- | ---------------------------------------------------------- |
| `size`  | integer | Maximum number of locations to return | Example: `20`                                              |
| `after` | string  | Cursor for pagination                 | Value provided in the previous response (`after`)          |
| `order` | string  | Sort order                            | `name.asc`, `name.desc`, `createdAt.asc`, `createdAt.desc` |

### Response[​](#response "Direct link to Response")

The response body has three keys:

* `locations`: list of locations matching the criteria.
* `total`: total number of results.
* `after`: value to use for the next page.

## Read a location[​](#read-a-location "Direct link to Read a location")

### By its unique identifier (uid)[​](#by-its-unique-identifier-uid "Direct link to By its unique identifier (uid)")

```
GET /v2/agendas/{agendaUID}/locations/{locationUID}
```

The response will contain all available data for the location.

**Note**: to simply check whether the location exists, use the `HEAD` method, which will avoid unnecessary data transfer.

### By an external identifier (extId)[​](#by-an-external-identifier-extid "Direct link to By an external identifier (extId)")

1. If no specific key is associated with the external identifier ("default" key):

```
/v2/agendas/{agendaUID}/locations/ext/{value}
```

2. If the external identifier is associated with a key

```
/v2/agendas/{agendaUID}/locations/ext/{key}/{velue}
```
