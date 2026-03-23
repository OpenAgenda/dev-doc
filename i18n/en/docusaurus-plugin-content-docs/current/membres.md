---
sidebar_position: 5
---

# Agenda Members

## List

Retrieve the identifiers of an agenda's members along with their role and contact details.

```bash
GET /v2/agendas/{agendaUID}/members
```

## In Brief

* `agendaUID` is the unique identifier of the agenda where the members are referenced
* Read [authentication](/authentification) or access token authentication is required.
* The authenticated user must be a moderator or administrator of the agenda

## Pagination

| Key            | Type     | Description                                                                                                        |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------|
| after          | integer | Key to provide to retrieve the next set. It is given in the response of the last received call                 |
| limit          | integer   | Defines the number of members retrieved per call. Default value: **20**. Maximum possible value: **100**   |

## Response

| Key            | Type            | Description                                                                       |
|----------------|-----------------|-----------------------------------------------------------------------------------|
| total          | integer          | The total number of members                                                        |
| items          | object[]         | The list of members                                                              |
| after          | integer          | Value to include in the next call to retrieve the next segment of members |

For each item in the provided list, the following information is given.

| Key            | Type            | Description                                           |
|----------------|-----------------|-------------------------------------------------------|
| uid            | integer          | Member identifier                                 |
| name           | string           | Username or name                              |
| email          | email        | Member's email                                    |
| phone          | phone       | Phone number                                                      |
| organization   | string           | Represented organization                                  |
| role           | string           | Member's role: administrator, moderator, contributor |

## Invite

Invite users to become members of an agenda.

```http
POST /v2/agendas/{agendaUID}/members/invite
```

The following information must be placed in the request body:

* `role`: Required. Possible values are `contributor`, `moderator`, `administrator`
* `emails`: List of emails to invite
* `message`: Optional. The invitation message in markdown format.

### Response

| Key            | Type            | Description                                                                                                        |
|----------------|-----------------|--------------------------------------------------------------------------------------------------------------------|
| queued         | integer          | The total number of invitations to process. Beyond a certain number of emails, processing moves to a background task |
| processed      | object[]         | The list of invited members                                                                                       |

#### Example of an invited member

```
{
  "userUid": null,
  "deletedUser": false,
  "name": null,
  "phone": null,
  "email": "gaetan.la@tou.ch",
  "position": null,
  "organization": null,
  "role": "moderator",
}
```
