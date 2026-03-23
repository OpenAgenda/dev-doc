---
sidebar_position: 1
---

# Preparing a data source

Best practices for setting up an export that will serve as the primary data source for synchronization to an OpenAgenda.

The API makes it possible to synchronize the agenda of your site/information system with one or more agendas on OpenAgenda. The following points are important to consider so that the import of a program is as complete as possible.

The data presented on your OpenAgenda will be distributed to other OpenAgendas and other sites; overly rough approximations - though necessary when the data source is not detailed enough - will reduce the readability of your events.

The **usual structured formats** can be processed by a synchronization: the JSON format is by far the most common.

## Main fields

Each event is defined at minimum by a **title**, a **description**, and **a list of time slots**. For _in-person_ events (not online-only), **a physical location** must be provided.

Descriptive fields (title, short description, long description, keywords, conditions) can be **multilingual**.

**Description variants**: two description fields exist in the standard OpenAgenda schema. A mandatory short description used for compact event displays (e.g. in a list view), and a long one for detail views.

The format of the long description is _[markdown](https://fr.wikipedia.org/wiki/Markdown)_: HTML or text formats are accepted and will be converted during synchronization.

Find the list of fields that make up an event [by clicking here](https://developers.openagenda.com/00-structure-evenement/).

**An illustration** is not mandatory but is important for the visibility of the event: a URL can be used by the synchronization which will make a copy on OpenAgenda. Whenever possible, include credits to avoid potential disputes.

## Time slots

On OpenAgenda, an event can be described by one or more time slots. Each time slot has a start and an end. A time slot cannot exceed 24 hours.

```json
[{ begin: '2024-05-07T10:00:00+0200', end: '2024-05-07T12:00:00+0200' }]
```

If the data source cannot achieve this level of detail, approximations will need to be established when processing events.

Here are common approximations:

*   The end time is not known: if the event duration is not known, a default duration will be defined.
*   Only a date is well-formatted, times are entered freely: extracting times is only possible if the format in the source data is sufficiently regular (e.g. from 2pm to 5pm). It becomes difficult with too variable entries. In this case, the event cannot be imported without a significant approximation on the time: a general start and end time will be used.

## Location

Depending on the participation mode, an OpenAgenda event is linked to a location which is a separate object: an OpenAgenda is associated with its own location directory or one shared between multiple OpenAgendas.

A location is defined at minimum by a name and a full postal address. The API then handles geocoding to place it on a map. Example of a name: _Salle polyvalente Corraze ..._ and a full postal address: _3 bis, rue Raymond Corraze, 31500 Toulouse_

If more location-related information is available, it will be included: geolocation, a description, access details, an illustration, phone numbers, email, and website.

Ideally, a separate data source listing locations is made available and linked to a second data source listing events.

The details of the fields that make up a location on OpenAgenda are given [here](https://developers.openagenda.com/10-structure-lieu/).

### More complete events

Whenever possible, as much information as possible should be included during synchronization. The details of the fields defining an event on OpenAgenda can be found here. Here are the most common ones:

**Conditions**: A field (optionally multilingual) receiving text detailing event access conditions. E.g.: Paid, free, registration required, pricing.

**Registration tools**: a list of values allowing the public to register for the event. These are either hyperlinks, phone numbers, or emails.

**Keywords**: a list of short texts (optionally multilingual) to qualify events, useful for search and page indexing (meta tags)

Beyond that, filling in as many of the fields detailed [here](https://developers.openagenda.com/00-structure-evenement/) as possible will improve the quality of the event description.

## Additional fields

Fields specific to certain agendas or agenda networks allow adding categorization details or specificities particular to certain event types. Most often, this is a discrete list of themes/event types/categories. The details of possible values are given by an API call on [the agenda configuration](https://developers.openagenda.com/agenda/lecture).

If these fields have been defined as required, the synchronization script will need to assign them a value to allow adding events to the target OpenAgenda. In this case, the data source must present data that enables matching with the values offered by the additional fields.

For example, the agenda network of the Toulouse metropolitan area requires entering one or more _Metropolitan themes_ whose possible values are _Culture, Economy, Education, Employment, Leisure, Nature - Environment, Civic participation, Heritage, Social - Health, Sports_. The data source must provide a similar categorization for each event.

## Questions?

For any questions regarding setting up an export, contact us either:

*   via the chat tool available at the bottom right of this page
*   by email: support@openagenda.com

In addition to answering your questions, your inquiries will help us better understand your constraints and adapt this documentation accordingly.
