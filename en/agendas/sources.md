# List an Agenda's Sources

```
GET /v2/agendas/{agendaUID}/sources
```

Retrieve the main information of an agenda's source agendas

## In Brief[​](#in-brief "Direct link to In Brief")

* `agendaUID` is the unique identifier of the agenda where the sources are referenced.
* Read [authentication](https://developers.openagenda.com/en/en/authentification.md) or access token authentication is required.
* The authenticated user must be an administrator of the agenda.

## Pagination[​](#pagination "Direct link to Pagination")

| Key   | Type       | Description                                                                                             |
| ----- | ---------- | ------------------------------------------------------------------------------------------------------- |
| after | integer\[] | Key to provide to retrieve the next set. It is given in the response of the last received call          |
| size  | integer    | Defines the number of events retrieved per call. Default value: **20**. Maximum possible value: **100** |

## Content[​](#content "Direct link to Content")

| Key      | Type      | Description |
| -------- | --------- | ----------- |
| detailed | boolean(0 | 1)          |

## Response[​](#response "Direct link to Response")

| Key     | Type      | Description                                                               |
| ------- | --------- | ------------------------------------------------------------------------- |
| sources | object\[] | Segment of the agenda's sources                                           |
| after   | integer   | Value to include in the next call to retrieve the next segment of sources |

Each source presents the following values:

| Key    | Type      | Description                                  |
| ------ | --------- | -------------------------------------------- |
| id     | integer   | Source identifier                            |
| rules  | object\[] | Aggregation rules associated with the source |
| agenda | object    | Public data of the source agenda             |
