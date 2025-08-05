---
sidebar_position: 3
---

# Schémas et champs additionnels

## Le schéma événement d'un agenda

Un agenda propose à sa création un formulaire événement dérivant d'un schéma événement standardisé sur la plateforme. Les champs constitutifs de ce schema sont définis sous la clé `schema.fields` de [la configuration d'un agenda](/agendas/lecture).

```json
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

Chaque champ est détaillé par les clés suivantes:

| Clés                                 | Type       | Description                                                                                                                                                                                                                                           | Valeurs                                                                                                               |
|--------------------------------------|------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| `field`                              | texte      | Le code du champ, dérive du label initial                                                                                                                                                                                                             | Exemple : `thematiques`                                                                                               |
| `fieldType`                          | texte      | Le type du champ                                                                                                                                                                                                                                      | Exemples : `checkbox`, `radio`, `select`, `multiselect`, `integer`, `multilingual`, `textarea`, `markdown`, `text`... |
| `label`, `info`, `placeholder`, `sub`| texte      | Texte ou multilingue. Des valeurs de labels utilisés pour l'affichage du champ sur le formulaire.                                                                                                                                                     | Exemple : `{ "fr": "Thématiques" }`                                                                                   |
| `optional`                           | booléen    | Par défaut `true`. Le caractère optionnel du champ. Si celui-ci est `false`, le champ doit être informé pour toute création ou mise à jour de l'événement.                                                                                            |                                                                                                                       |
| `options`                            | objet[]    | Liste d'options pour les champs à choix (ex : `radio`, `checkbox`, `select`...). Pour les créations/mises à jour d'événement, c'est la sous-clé `id` de l'option à préciser qui doit être spécifiée dans le corps de requête en face du nom du champ. | Exemple : `[{"id": 1, "label": {"fr": "Musique"}, "value": "musique"}]`                                               |
| `schemaType`                         | texte      | Le type de schéma d'où provient le champ : `event` pour les champs standards, `agenda` ou `network` pour les champs additionnels.                                                                                                                     |                                                                                                                       |
| `languages`                          | texte[]    | La liste des langues en cas de champs texte multilingues. Liste vide pour les champ où les choix de langues sont libres                                                                                                                               | Exemple `["fr", "de"]`                                                                                                |

Par exemple, le titre d'un événement est décrit comme ceci:

```json
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

## Les champs additionnels

Le schéma standard événement peut être complété de champs dits additionnels, définits soit à l'échelle d'un agenda, soit d'un réseau. Lorsque c'est le cas, ces champs apparaissent dans la configuration `schema` et ont un `schemaType` qui précise la provenance de cette ajout: `agenda` ou `network`.

### Types

Le type de chaque champ est précisé sous la clé `fieldType`. Un type se décline principalement en trois catégories:

 * **Les champs textuels**: texte simple, texte multi-ligne, HTML, markdown, multilingue. Dans ces cas, les valeurs sont directement associées aux clés "field" des champs sans conversion particulière.
 * **Les champs à options**: liste à choix unique, à choix multiple, select ou multi-select. Les valeurs associées aux clés dans ce cas sont les identifiants des options sélectionnées (voir exemple ci dessous).
 * **Les champs à fichiers**: ceux-cis ne sont pas manipulables par API

En voici la liste complète:

| Type             | Clé         | À options | Multilinguisme possible |
|------------------|-------------|-----------|-------------------------|
| Radio            | radio       | x         |                         |
| Checkbox         | checkbox    | x         |                         |
| Select           | select      | x         |                         |
| Multiselect      | multiselect | x         |                         |
| Entier           | integer     |           |                         |
| Nombre           | number      |           |                         |
| Texte            | text        |           | x                       |
| Texte multiligne | textearea   |           | x                       |
| Markdown         | markdown    |           | x                       |
| HTML             | html        |           | x                       |
| Image            | image       |           |                         |
| Fichier          | file        |           |                         |

### Exemple

Le cas le plus fréquent que l'on retrouve est qu'un formulaire événement standard soit complété d'un champ de catégories ou thématiques: un champ à choix de type `radio` ou `checkbox`:

```json
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

Les événements saisis et lus dans l'agenda verront leurs données complétées d'une clé reprenant el nom du champ additionnel: `categories`:

```json
{
  "title": { "fr": "Festival d'été" },
  ...
  "categories": [4],
  ...
}
```
