# Schemas and Additional Fields

Details on how the event schema of an agenda and additional fields work.

## The Event Schema of an Agenda[​](#the-event-schema-of-an-agenda "Direct link to The Event Schema of an Agenda")

An agenda offers at creation an event form derived from a standardized event schema on the platform. The fields that make up this schema are defined under the `schema.fields` key of [an agenda's configuration](https://developers.openagenda.com/en/en/agendas/lecture.md).

```
{
  "title": ...,
  "summary": {...},
  "settings": {...},
  ...,
  "schema": {
    "fields": [
      ...
    ]
  },
  ...
}
```

Each field is described by the following keys:

| Keys                                  | Type      | Description                                                                                                                                                                                                | Values                                                                                                               |
| ------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `field`                               | string    | The field code, derived from the initial label                                                                                                                                                             | Example: `thematiques`                                                                                               |
| `fieldType`                           | string    | The field type                                                                                                                                                                                             | Examples: `checkbox`, `radio`, `select`, `multiselect`, `integer`, `multilingual`, `textarea`, `markdown`, `text`... |
| `label`, `info`, `placeholder`, `sub` | string    | Text or multilingual. Label values used for displaying the field on the form.                                                                                                                              | Example: `{ "fr": "Thématiques" }`                                                                                   |
| `optional`                            | boolean   | `true` by default. Whether the field is optional. If set to `false`, the field must be filled in for any event creation or update.                                                                         |                                                                                                                      |
| `options`                             | object\[] | List of options for choice fields (e.g.: `radio`, `checkbox`, `select`...). For event creation/updates, it is the option's `id` sub-key that must be specified in the request body next to the field name. | Example: `[{"id": 1, "label": {"fr": "Musique"}, "value": "musique"}]`                                               |
| `schemaType`                          | string    | The schema type the field originates from: `event` for standard fields, `agenda` or `network` for additional fields.                                                                                       |                                                                                                                      |
| `languages`                           | string\[] | The list of languages for multilingual text fields. Empty list for fields where language choices are free                                                                                                  | Example `["fr", "de"]`                                                                                               |

For example, an event's title is described as follows:

```
{
  "languages": [],
  "field": "title",
  "fieldType": "text",
  "optional": false,
  "max": 150,
  "label": {
    "fr": "Titre",
    "en": "Title",
    "it": "Titolo",
    "de": "Titel",
    "es": "Título"
  },
  "placeholder": {
    "fr": "Le titre de votre événement",
    "en": "Title of your event",
    "it": "Il titolo del tuo evento",
    "de": "Titel Ihrer Veranstaltung",
    "es": "El título de su evento"
  },
  "purpose": {
    "fr": "Titre de l'événement",
    "en": "Title of the event",
    "es": "Nombre del evento"
  },
  "schemaType": "event"
}
```

## Additional Fields[​](#additional-fields "Direct link to Additional Fields")

The standard event schema can be supplemented with so-called additional fields, defined either at the agenda level or at the network level. When this is the case, these fields appear in the `schema` configuration and have a `schemaType` that specifies the origin of this addition: `agenda` or `network`.

### Types[​](#types "Direct link to Types")

Each field's type is specified under the `fieldType` key. A type mainly falls into three categories:

* **Text fields**: simple text, multi-line text, HTML, markdown, multilingual. In these cases, values are directly associated with the field's "field" keys without any particular conversion.
* **Option fields**: single choice list, multiple choice, select or multi-select. The values associated with the keys in this case are the identifiers of the selected options (see example below).
* **File fields**: these cannot be manipulated via the API

Here is the complete list:

| Type        | Key         | Has options | Multilingual support |
| ----------- | ----------- | ----------- | -------------------- |
| Radio       | radio       | x           |                      |
| Checkbox    | checkbox    | x           |                      |
| Select      | select      | x           |                      |
| Multiselect | multiselect | x           |                      |
| Integer     | integer     |             |                      |
| Number      | number      |             |                      |
| Text        | text        |             | x                    |
| Textarea    | textearea   |             | x                    |
| Markdown    | markdown    |             | x                    |
| HTML        | html        |             | x                    |
| Image       | image       |             |                      |
| File        | file        |             |                      |

### Example[​](#example "Direct link to Example")

The most common case is that a standard event form is supplemented with a categories or themes field: a choice field of type `radio` or `checkbox`:

```
{
  "field": "categories",
  "label": "Catégories",
  "optional": false,
  "options": [
      {
          "id": 1,
          "value": "balade-decouverte-visite",
          "label": "Balade - découverte - visite"
      },
      {
          "id": 2,
          "value": "conference-rencontre-debat",
          "label": "Conférence - rencontre - débat"
      },
      {
          "id": 3,
          "value": "exposition",
          "label": "Exposition"
      },
      {
          "id": 4,
          "value": "fete-salon-marche",
          "label": "Fête - salon - marché"
      },
      {
          "id": 5,
          "value": "musique",
          "label": "Musique"
      },
      ...
  ],
  "fieldType": "checkbox",
  "schemaType": "network"
}
```

Events entered and read in the agenda will have their data supplemented with a key using the additional field name: `categories`:

```
{
  "title": { "fr": "Festival d'été" },
  ...
  "categories": [4],
  ...
}
```
