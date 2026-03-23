# Event structure

## Standard fields[​](#standard-fields "Direct link to Standard fields")

### Summary[​](#summary "Direct link to Summary")

These are the fields present on **all events** published on OpenAgenda and whose constraints must be respected regardless of the agenda.

| Field                                             | Code               | Editable | Required | Default value     | Description                                                                             |
| ------------------------------------------------- | ------------------ | -------- | -------- | ----------------- | --------------------------------------------------------------------------------------- |
| [**Unique Identifier**](#unique-identifier)       | `uid`              |          |          |                   | OpenAgenda unique identifier of the event                                               |
| [**URL Code**](#url-code)                         | `slug`             |          |          |                   | OpenAgenda unique text identifier of the event                                          |
| [**External Identifiers**](#external-identifiers) | `extIds`           | ✅       |          |                   | List of key/value pairs identifying the event in datasets external to OpenAgenda        |
| [**Title**](#title)                               | `title`            | ✅       | ✅       |                   | The title of the event                                                                  |
| [**Short Description**](#short-description)       | `description`      | ✅       | ✅       |                   | The short description of the event                                                      |
| [**Long Description**](#long-description)         | `longDescription`  | ✅       |          |                   | The long description of the event                                                       |
| [**Conditions**](#conditions)                     | `conditions`       | ✅       |          |                   | Free-form description of participation conditions for the event                         |
| [**Keywords**](#keywords)                         | `keywords`         | ✅       |          |                   | List of keywords                                                                        |
| [**Image**](#image)                               | `image`            | ✅       |          |                   | Main illustration                                                                       |
| [**Image Credits**](#image-credits)               | `imageCredits`     | ✅       |          |                   | Credits related to the illustration                                                     |
| [**Registration**](#registration-tools)           | `registration`     | ✅       |          |                   | List of registration methods: phone numbers, email or hyperlinks                        |
| [**Accessibility**](#accessibility)               | `accessibility`    | ✅       |          |                   | Types of disabilities for which accommodations are provided                             |
| [**Timings**](#timings)                           | `timings`          | ✅       | ✅       |                   | List of time slots                                                                      |
| [**Target Age**](#target-age)                     | `age`              | ✅       |          |                   | Min/max age range of the target audience                                                |
| [**Attendance Mode**](#attendance-mode)           | `attendanceMode`   | ✅       |          | 1 (Offline)       | Event attendance mode (in-person vs online)                                             |
| [**Location Identifier**](#location-identifier)   | `locationUid`      | ✅       | ✅ ⁽ˡ⁾   |                   | OpenAgenda unique identifier of the associated location                                 |
| [**Access Link**](#access-link)                   | `onlineAccessLink` | ✅       |          |                   | Hyperlink to access an online or mixed event                                            |
| [**Rich Links**](#rich-links)                     | `links`            |          |          |                   | List of link / rich embed code pairs                                                    |
| [**Timezone**](#timezone)                         | `timezone`         | ✅       |          | Location timezone | Reference timezone. For online events, the default timezone is Europe/Paris             |
| [**Status**](#event-status)                       | `status`           | ✅       |          | 1 (Scheduled)     | Rescheduled, Cancelled, Full...                                                         |
| [**State**](#state)                               | `state`            | ✅       |          | Depends on agenda | State in the agenda: Published (2), Ready to publish (1), To moderate (0), Refused (−1) |
| [**Creation Date**](#creation-date)               | `createdAt`        |          |          |                   | Creation timestamp                                                                      |
| [**Update Date**](#update-date)                   | `updatedAt`        |          |          |                   | Last update timestamp                                                                   |

⁽ˡ⁾ Linked field: required depending on a value defined on a neighboring field. See the field details for more information. ⁽ᵈ⁾ A default value is set when a value is not explicitly provided for this field.

### Detail[​](#detail "Direct link to Detail")

#### Unique Identifier[​](#unique-identifier "Direct link to Unique Identifier")

OpenAgenda unique identifier of the event. Assigned at event creation and not editable. **code**: `uid` **type**: `integer`

#### URL Code[​](#url-code "Direct link to URL Code")

Identifier useful for building a readable URL derived from the event title. **code**: `slug` **type**: `string`

#### External Identifiers[​](#external-identifiers "Direct link to External Identifiers")

It is possible to associate identifiers other than the unique identifier (UID) with an OpenAgenda event. External identifiers can be defined either by a standard update or via the routes dedicated to external identifiers.

**code**: `extIds` **type**: `object({ key, value })[]`

##### Example[​](#example "Direct link to Example")

```
{
  ...
  "extIds": [{
    "value": "9f15474c-58cd-42a4-9c93-7114b1ee44f0",
    "key": "Albi"
  }],
  ...
}
```

#### Title[​](#title "Direct link to Title")

The title of the event. **Required** field that cannot exceed **140** characters per language. **code**: `title` **type**: `multilingual string` **schema.org**: [name](https://schema.org/name)

##### Example[​](#example-1 "Direct link to Example")

```
{
  ...
  "title": {
    "fr": "Le Coin Vert de Stéphane",
    "en": "The Green Corner of Stéphane",
    "es": "El rincón verde de Esteban",
    "de": "Le Coin Vert de Stéphane",
    "it": "La Zona Verde di Stéphane"
  },
  ...
}
```

#### Short Description[​](#short-description "Direct link to Short Description")

Lead, short variant or excerpt of the event description. Used alongside the title in reduced views (list) of the event. **Required** field that cannot exceed **200** characters per language. **code**: `description` **type**: `multilingual string` **schema.org**: [disambiguatingDescription](https://schema.org/disambiguatingDescription)

#### Long Description[​](#long-description "Direct link to Long Description")

Description of the event. Optional field that cannot exceed **10000** characters per language. **code**: `longDescription` **type**: `multilingual markdown string` **schema.org**: [description](https://schema.org/description)

##### About the format[​](#about-the-format "Direct link to About the format")

The description is stored in [markdown](https://en.wikipedia.org/wiki/Markdown) format. This is also the format presented by default on an API read. Still on **read**, an [option](https://developers.openagenda.com/en/en/evenements/lecture.md) passed to the API allows conversion and retrieval of the description in `HTML` format. Alternatively, on **write**, HTML content will be automatically converted to markdown before being saved to the database.

##### Rich content[​](#rich-content "Direct link to Rich content")

Certain links inserted in the long description are extracted during creation or update and are associated with rich embed codes made available in the event's links field as well as in the HTML variant of the long description.

Embeddable services include: *Allociné, Arte, Calameo, Dailymotion, Eventbrite, Flickr, Google Forms, INA, Instagram, PictoAccess, Prezi, Soundcloud, Twitch, Twitter, Vimeo, WeMap, Youtube*

##### Example[​](#example-2 "Direct link to Example")

```
{
  ...
  "longDescription": {
      "fr": "**Explorez les multiples visages de l'Afrique du Sud à travers une dégustation commentée de trois vins soigneusement sélectionnés, témoins de la richesse et de la diversité de ses terroirs.**\n\nPartez pour un voyage au cœur de l'un des plus vastes vignobles du nouveau monde, où traditions anciennes et modernité s'entrelacent. À travers cette exploration, vous plongerez dans l'histoire viticole de l'Afrique du sud, mise en valeur par trois régions emblématiques.\n\nChaque cuvée vous révèlera un style singulier, reflet fidèle de son terroir, entre influences maritimes, diversité des sols et caractère des cépages.\n\nDégustation de 3 vins\n\nVous participez régulièrement à nos afterworks de dégustation ? Pensez à notre carte de fidélité Afterwork ! Dès 5 ateliers afterworks effectués, nous vous offrons le 6ème ! Votre carte de fidélité fonctionne pour des ateliers en tarif plein mais aussi en tarif réduit et abonnés. N'oubliez pas de la demander à nos sommeliers.\n\n**Animé par : Raul Vega**, animateur-sommelier à la Cité du Vin\n\n**En partenariat avec** : Wines of South Africa\n\n**Avec le soutien de** : Maison Johanès Boubée"
  },
  ...
}
```

#### Conditions[​](#conditions "Direct link to Conditions")

Details of the participation conditions for the event. Optional field that cannot exceed **255** characters per language. **code**: `conditions` **type**: `multilingual string`

#### Keywords[​](#keywords "Direct link to Keywords")

List of keywords. Optional field that cannot exceed **255** characters per language **code**: `keywords` **type**: `lists of strings per language` **schema.org**: [keywords](https://schema.org/keywords)

##### Example[​](#example-3 "Direct link to Example")

```
{
    ...
    "keywords": {
        "fr": ["musique", "concert", "rock"]
    },
    ...
}
```

#### Image[​](#image "Direct link to Image")

Main illustration of the event. Optional field with variable format depending on the operation. **code**: `image` **type**: `file` **schema.org**: [image](https://schema.org/image)

##### On read[​](#on-read "Direct link to On read")

When an image is defined, several variants are offered, always in `jpeg` format:

* **base**: the image resized in width and uncropped to fit 700 pixels.
* **full**: the image at its original dimensions
* **thumbnail**: the image resized and cropped to fit in a 200x200 pixel rectangle

Dimensions are specified for each variant along with the route where they can be accessed.

###### Example[​](#example-4 "Direct link to Example")

```
{
  ...
  "image": {
    "filename": "23fc5619015849848ffe4843c98a03e2.base.image.jpg",
    "size": {
      "width": 700,
      "height": 394
    },
    "variants": [
      {
        "filename": "23fc5619015849848ffe4843c98a03e2.full.image.jpg",
        "size": {
          "width": 1920,
          "height": 1080
        },
        "type": "full"
      },
      {
        "filename": "23fc5619015849848ffe4843c98a03e2.thumb.image.jpg",
        "size": {
          "width": 200,
          "height": 200
        },
        "type": "thumbnail"
      }
    ],
    "base": "https://cdn.openagenda.com/main/"
  },
  ...
}
```

##### On write[​](#on-write "Direct link to On write")

An image can be provided by `URL` or by file during an update or creation operation. It must be publicly available to be loaded into the event. Once loaded, it will be converted and resized to be offered according to the criteria detailed in the previous section.

###### Example[​](#example-5 "Direct link to Example")

```
{
  ...,
  "image": {
    "url": "https://i.pinimg.com/originals/d1/d9/ae/d1d9aec6e351baa115000b4b75e02b1b.jpg"
  }
  ...
}
```

#### Image Credits[​](#image-credits "Direct link to Image Credits")

Credits related to the illustration. Optional field that can only be defined **when** an image is also defined. Cannot exceed **255** characters. **code**: `imageCredits` **type**: `string` **schema.org**: [image.caption](https://schema.org/caption)

#### Registration Tools[​](#registration-tools "Direct link to Registration Tools")

List of registration methods: phone numbers, email or hyperlinks. Optional field that cannot exceed 2000 characters in total. **code**: `registration` **type**: list of values of type `link` (hyperlink), `phone` (phone number) or `email` (email)

##### Read example[​](#read-example "Direct link to Read example")

```
{
  ...,
  "registration": [
    {
      "type": "link",
      "value": "https://formationcontinue.univ-rennes1.fr/cafeinfo"
    },
    {
      "type": "email",
      "value": "formcont@univ-rennes1.fr"
    },
    {
      "type": "phone",
      "value": "0203040506"
    }
  ],
  ...,
}
```

##### Write example[​](#write-example "Direct link to Write example")

The following format is accepted for write operations. Types are derived from the read values:

```
{
  ...
  "registration": [
    "https://formationcontinue.univ-rennes1.fr/cafeinfo",
    "formcont@univ-rennes1.fr",
    "0203040506"
  ],
  ...
}
```

#### Accessibility[​](#accessibility "Direct link to Accessibility")

Optional field listing the codes corresponding to types of disabilities for which accommodations are provided to make the event accessible. **code**: `accessibility` **type**: `object` of accessibility codes.

##### Codes[​](#codes "Direct link to Codes")

* `hi` (Hearing impairment): Hearing disability
* `vi` (Visual impairment): Visual disability
* `pi` (Psychic impairment): Psychic disability
* `mi` (Motor impairment): Motor disability
* `ii` (Intellectual impairment): Intellectual disability

##### Example[​](#example-6 "Direct link to Example")

```
{
  ...
  "accessibility": {
    "hi":false,
    "ii":false,
    "vi":true,
    "mi":false,
    "pi":false
  },
  ...
}
```

#### Timings[​](#timings "Direct link to Timings")

List of time slots during which the event takes place. **Required** field that must not exceed **800** time slots. A slot cannot exceed 24 hours in duration and cannot overlap another slot. **codes**: `timings` **type**: `object[{begin: Date, end: Date}]` **schema.org**: [eventSchedule](https://schema.org/eventSchedule), [startDate](https://schema.org/startDate), [endDate](https://schema.org/endDate), [duration](https://schema.org/duration)

**Important**: the timezone. It is important.

##### Example[​](#example-7 "Direct link to Example")

A theatre play that takes place every day over a week from 5pm to 7pm:

```
[
  {
    "begin": "2026-02-23T17:00:00+0200",
    "end": "2026-02-23T19:00:00+0200"
  },
  {
    "begin": "2026-02-24T17:00:00+0200",
    "end": "2026-02-24T19:00:00+0200"
  },
  {
    "begin": "2026-02-25T17:00:00+0200",
    "end": "2026-02-25T19:00:00+0200"
  },
  {
    "begin": "2026-02-26T17:00:00+0200",
    "end": "2026-02-26T19:00:00+0200"
  },
  {
    "begin": "2026-02-27T17:00:00+0200",
    "end": "2026-02-27T19:00:00+0200"
  }
]
```

#### Target Age[​](#target-age "Direct link to Target Age")

Min/max age range of the target audience. Optional field, it is not possible to advertise an event suitable for people over 120 years old. **code**: `age` **type**: `object {min: integer, max: integer}` **schema.org**: [typicalAgeRange](https://schema.org/typicalAgeRange)

##### Example[​](#example-8 "Direct link to Example")

Age field value for an event for children aged 6 or under:

```
{
    ...
    "age": {
        "min":0,
        "max":6
    },
    ...
}
```

#### Attendance Mode[​](#attendance-mode "Direct link to Attendance Mode")

Event attendance mode (in-person/on-site vs online). By default, the event will be on-site/in-person (value `1`).

**code**: `attendanceMode` **type**: `integer(1|2|3)` **schema.org**: [eventAttendanceMode](https://schema.org/eventAttendanceMode)

##### Possible values[​](#possible-values "Direct link to Possible values")

* `1` (offline): In-person attendance at the event venue
* `2` (online): Online attendance via a link
* `3` (mixed): Mixed attendance

#### Location Identifier[​](#location-identifier "Direct link to Location Identifier")

OpenAgenda unique identifier of the associated location to specify in *write* operations. On *read* a `location` object is provided. **Required** for events whose attendance mode is in-person/offline (`1`) or mixed (`3`). On `read` operations, the detailed information described in [Locations > Structure](https://developers.openagenda.com/en/en/lieux/structure.md) is provided. **code**: `locationUid` on *write* or `location.uid` on *read*. **type**: `integer`

#### Access Link[​](#access-link "Direct link to Access Link")

Hyperlink to access an online or mixed event. **Required** field for events whose attendance mode (code `attendanceMode`) is *online* (value `2`) or *mixed* (value `3`). Not relevant for strictly in-person events. **code**: `onlineAccessLink` **type**: `link` **schema.org**: [VirtualLocation](https://schema.org/VirtualLocation)

#### Rich Links[​](#rich-links "Direct link to Rich Links")

List of link / rich embed code pairs extracted from the long description. This field is defined by an internal API process.

**code**: `links` **type**: `[{link, data}]`

##### Example[​](#example-9 "Direct link to Example")

```
[
  {
    "link": "https://fr.calameo.com/read/0000531370e47329f0819",
    "data": {
      "url": "https://www.calameo.com/read/0000531370e47329f0819",
      "type": "rich",
      "version": "1.0",
      "title": "Activités Petite Enfance - Vacances d'Hiver / 0-6 ans",
      "author": "Ville de Roubaix",
      "author_url": "https://www.calameo.com/accounts/53137",
      "provider_name": "calameo.com",
      "description": "Activités 0-6 ans Petite Enfance vacances d'Hiver...",
      "thumbnail_url": "https://p.calameoassets.com/210205112752-fc92911ad9.../p1.jpg",
      "thumbnail_width": 1125,
      "thumbnail_height": 1596,
      "html": "<div style=\"left: 0; width: 100%;....</div>",
      "cache_age": 86400
    }
  }
]
```

#### Timezone[​](#timezone "Direct link to Timezone")

Reference timezone name. See [the list of TZ identifiers](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). Field automatically defined from the location associated with the event for events with an `attendanceMode` of in-person `1` or mixed `3`. For online events without an associated location, the default value for this field is `Europe/Paris`.

**code**: `timezone` **type**: `string` **example**: `Europe/Paris`

#### Event Status[​](#event-status "Direct link to Event Status")

The status of an event informs the user of its availability. When the defined value is not the default value (the event is scheduled), the information becomes as essential as the title.

**code**: `status` **type**: `integer(1|2|3|4|5|6)` **default value**: Scheduled (`1`) **schema.org**: [eventStatus](https://schema.org/eventStatus)

##### Values[​](#values "Direct link to Values")

* **Scheduled** (`1`): Default status. The event is scheduled at the indicated times
* **Rescheduled** (`2`): The times have changed
* **Moved online** (`3`): The event that was taking place at a physical venue is now only accessible online
* **Postponed** (`4`): The event is no longer taking place at the indicated times, the new times are not yet available
* **Full** (`5`): The event is no longer open to new participants
* **Cancelled** (`6`): The event is no longer scheduled at the indicated times and is not postponed.

#### State[​](#state "Direct link to State")

Indicates the state of the event within the moderation workflow of an agenda. The event is only publicly accessible if its state is "Published" (`2`). Events with a different state are only visible to users who are members of the agenda and have a **moderator** or **administrator** role.

**code**: `state` **type**: `integer(-1|0|1|2)`

##### Values[​](#values-1 "Direct link to Values")

* **Published** (`2`): The event is displayed on the agenda's feeds and page.
* **Ready to publish** (`1`): The event has been reviewed and processed by a moderator or administrator member. The event is only visible to authorized members.
* **To moderate** (`0`): The event has not yet been processed by a moderator or administrator member of the agenda. The event is only visible to authorized members.
* **Refused** (`-1`): The event has been processed and refused by a moderator or administrator member of the agenda. In principle, an event with this state will never be published on the agenda.

#### Creation Date[​](#creation-date "Direct link to Creation Date")

Timestamp of the event creation. This field is not editable.

**code**: `createdAt` **type**: `date`

#### Update Date[​](#update-date "Direct link to Update Date")

Timestamp of the last event update. This field is not editable.

**code**: `updatedAt` **type**: `date`

## Additional fields[​](#additional-fields "Direct link to Additional fields")

Additional fields can supplement the standard model of an OpenAgenda event. They are defined at the agenda or agenda network level. To learn more, go [here](https://developers.openagenda.com/en/en/agendas/schemas.md).
