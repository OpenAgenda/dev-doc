---
title: List the Authenticated Account's Agendas
description: An account can be a member of one or more agendas. This route allows you to list them
sidebar_position: 6
---

# List Agendas Where the Account is a Member

```bash
GET /v2/me/agendas
```

View agendas where the authenticated user is a member

## In Brief

* Read [authentication](/authentification) or access token authentication is required.

## Pagination

| Key            | Type     | Description                                                                                                   |
|----------------|----------|---------------------------------------------------------------------------------------------------------------|
| after          | integer | Key to provide to retrieve the next set. It is given in the response of the last received call              |
| limit          | integer   | Defines the number of items retrieved per call. Default value: **20**. Maximum possible value: **100**   |

## Response

| Key            | Type            | Description                                                                       |
|----------------|-----------------|-----------------------------------------------------------------------------------|
| total          | integer          | The total number of members                                                        |
| items          | object[]         | The list of agenda/member pairs                                                  |
| after          | integer          | Value to include in the next call to retrieve the next segment            |

For each item in the provided list, the following information is given:

| Key                   | Type            | Description                                           |
|-----------------------|-----------------|-------------------------------------------------------|
| uid                   | integer          | Agenda identifier                               |
| title                 | string           | Agenda title                                     |
| slug                  | string           | Agenda URL slug                                  |
| member.userUid        | integer          | Member identifier                                 |
| member.name           | string           | Username or name                              |
| member.email          | email        | Member's email                                    |
| member.phone          | phone       | Phone number                                   |
| member.organization   | string           | Represented organization                                  |
| member.role           | string           | Member's role: administrator, moderator, contributor |
