---
sidebar_position: 2
---

# Agenda Configuration

View the configuration, a content summary, and the schema of an agenda.

```bash
GET /v2/agendas/{agendaUID}
```

## In Brief

* The agenda identifier `agendaUID` is displayed at the bottom of the sidebar on its page at [https://openagenda.com](https://openagenda.com).
* [Authentication](/authentification) is required.
* The `?detailed=1` option allows you to retrieve the full details of an agenda's configuration.

## Properties

| Key              | Loaded with `detailed` | Type    | Description                                                                                                                                                                      |
|------------------|------------------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `uid`            |                        | integer  | Unique identifier                                                                                                                                                               |
| `title`          |                        | string   | Title                                                                                                                                                                            |
| `description`    |                        | string   | Description                                                                                                                                                                      |
| `slug`           |                        | string   | URL identifier                                                                                                                                                                  |
| `url`            |                        | link    | Link associated with the agenda, pointing to reference content such as the website of the organization represented by the agenda, instructions, or other context related to the agenda          |
| `official`       |                        | integer  | 1 if it is an official agenda, 0 otherwise                                                                                                                                      |
| `networkUid`     |                        | integer  | Identifier of the network linked to the agenda when defined                                                                                                                              |
| `locationSetUid` |                        | integer  | Identifier of the location set linked to the agenda when defined                                                                                                                        |
| `updatedAt`      |                        | date    | Date of the agenda's last update                                                                                                                                         |
| `createdAt`      |                        | date    | Date the agenda was created                                                                                                                                                     |
| `memberSchemaId` |                        | integer  | Identifier of the extended member form schema when defined                                                                                                                 |
| `officializedAt` |                        | date    | Date of officialization                                                                                                                                                             |
| `image`          |                        | link    | Link to the associated image                                                                                                                                                       |
| `private`        |                        | boolean | Whether the agenda is private. 1 if yes                                                                                                                                            |
| `indexed`        |                        | boolean | Indexation status of the agenda. 1 for indexed, 0 for not indexed                                                                                                                  |
| `settings`       |                        | object   | Various agenda configurations: tracking, filters, messaging, contribution settings                                                                                                   |
| `summary`        |                        | object   | Statistical data for the agenda, refreshed regularly, on associated keywords, upcoming published event counts, geographic bounding box, defined languages |
| `network`        | yes                    | object   | Information about the linked network when defined, such as the title (`title`), identifier (`uid`), network schema identifier (`formSchemaId`)                             |
| `locationSet`    | yes                    | object   | Information about the location set such as the identifier (`uid`), title (`title`)                                                                                           |
| `schema`         | yes                    | object   | Event schema specific to the agenda                                                                                                                                               |
