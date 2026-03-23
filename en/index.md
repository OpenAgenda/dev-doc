# Introduction

OpenAgenda provides a REST API for reading and editing event content programmatically.

Data from published agendas is available under an [open license](http://www.data.gouv.fr/fr/faq/). Exports are available in several formats: PDF, spreadsheet, ICS, text.

Although the API is free to use, it requires authentication for both read and write operations. This constraint allows us to more effectively combat abusive usage.

To learn more about authentication, [go here](https://developers.openagenda.com/en/en/authentification.md)

## Main Entities[​](#main-entities "Direct link to Main Entities")

### Agendas[​](#agendas "Direct link to Agendas")

OpenAgenda allows you to manage event content within agendas. These agendas are administered by a community of moderators or administrators who decide on the input form configuration, the contribution workflow to be followed by contributors with whom they can communicate via a messaging system specific to the agenda. Agendas can be discovered via the following route:

```
https://api.openagenda.com/v2/agendas
```

An agenda's configuration can be viewed via the following route:

```
https://api.openagenda.com/v2/agendas/{agendaUID}
```

[Go here](https://developers.openagenda.com/en/en/agendas.md) for more details.

### Events[​](#events "Direct link to Events")

An agenda's events can be viewed, edited, published, and searched via the following group of routes:

```
https://api.openagenda.com/v2/agendas/{uid}/events
```

[Go here](https://developers.openagenda.com/en/en/evenements.md) for more details.

### Locations[​](#locations "Direct link to Locations")

An agenda's locations can be viewed, edited, and deleted via the following group of routes:

```
https://api.openagenda.com/v2/agendas/{uid}/locations
```

[Go here](https://developers.openagenda.com/en/en/lieux.md) for more details.

## Getting Started[​](#getting-started "Direct link to Getting Started")

To start using the OpenAgenda API:

1. [Create an account](https://openagenda.com/signup) if you don't have one
2. Retrieve your API key from your [settings](https://openagenda.com/settings/apiKey)
3. Check the [Authentication](https://developers.openagenda.com/en/en/authentification.md) section to learn how to use your key
4. Explore the [Agendas](https://developers.openagenda.com/en/en/agendas.md) section to see how to view and edit agendas
5. Explore the [Events](https://developers.openagenda.com/en/en/evenements.md) section to see how to view and edit events published on agendas
