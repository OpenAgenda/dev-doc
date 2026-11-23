# Migration from JSON Export to the API

The JSON export, in place since 2015 and deprecated since 2022, reaches end-of-life at the end of 2025. Plan to update your scripts & applications that use it to switch to the v2 API, in place since 2018. This guide aims to provide the useful elements to ensure a smooth migration.

## Some details:[​](#some-details "Direct link to Some details:")

* **The JSON export**: We refer here to the "JSON export" as the link that was given on the export menu of agenda pages on <https://openagenda.com> to read the content of an agenda in JSON format. It takes the following form: `https://openagenda.com/agendas/{agendaUid}/events.json` and is documented here: <https://developers.openagenda.com/export-json-dun-agenda/>
* **API v2 reading**: The event reading endpoint of an agenda via the v2 API documented on this page <https://developers.openagenda.com/10-lecture/> and takes the form `https://api.openagenda.com/v2/agendas/{agendaUid}/events`

Any migration must take into account the three aspects detailed in the following sections:

1. **Filters**: the syntax evolves, particularly for temporal filters and tags/categories which are replaced by additional fields,
2. **Navigation**: the keys to use change,
3. **Content**: tags & categories disappear and are replaced by additional fields, other adjustments are detailed below.

## Filters[​](#filters "Direct link to Filters")

The JSON export gathers all filters in an *oaq* query key. The v2 reading API filters are placed directly at the top level.

**Important**: by default, the JSON export only shows upcoming events, sorted from nearest to farthest in time. On the v2 API, all published events are shown, with upcoming events first from nearest to farthest in time, followed by past events from nearest to farthest. To limit the selection on the v2 API to current and upcoming events, the following filter must be used:

`?relative[]=ongoing&relative[]=upcoming`

For example, a query delimiting events taking place on a specific day is targeted as follows on the JSON export:

`https://openagenda.com/agendas/{agendaUid}/events.json?oaq[from]=2021-02-07`

... and as follows on the v2 API:

`https://api.openagenda.com/v2/agendas/{agendaUid}/events?timings[gte]=2022-02-01T23:00:00.000Z&timings[lte]=2022-02-02T22:59:59.999Z`

There are small variations for each filter, documented in the pages given at the top of this article. The main change concerns the replacement of the *tag* concept on openagenda.com by the concept of *additional fields*: on the JSON export, the oaq\[*tags]* key is used to filter on a value from a choice field on the event form of the corresponding agenda. On the v2 API, the key to use is the field code itself, given in the agenda configuration ([documented here](https://developers.openagenda.com/en/en/agendas/lecture.md)).

The values to specify are no longer tag codes but identifiers. Thus, the following filter on the JSON export:

`https://openagenda.com/agendas/{agendaUid}/events.json?oaq[tags][]=atelier&key=YOURKEY`

... becomes on the v2 API:

`https://api.openagenda.com/v2/agendas/{agendaUid}/events?categories-metropolitaines[]=3&key=YOURKEY`

## Navigation[​](#navigation "Direct link to Navigation")

In both cases, results are paginated. In the case of the JSON export, only navigation using the ?offset and \&limit keys is possible.

The equivalent on the v2 API is found by using the `?from` and `&size` keys.

**Important**: for reading entire programs, the v2 API offers an *after* key to use in a read loop. Avoid looping over a large number of iterations with the *from* key. The higher the *from* value, the less performant the request will be. Excessively large *from* values may be blocked.

## Content[​](#content "Direct link to Content")

By default, only certain fields are shown on the API. To get timing details and additional fields, you will need to add ?detailed=1 to the request to access them in full.

The following field changes should be taken into account.

### Image field[​](#image-field "Direct link to Image field")

On the JSON export, images were presented at the top level behind the *image, thumbnail* and *originalImage* keys.

Now, image data is presented under a single image key, as documented here: <https://developers.openagenda.com/00-structure-evenement/#image>

### List of time slots[​](#list-of-time-slots "Direct link to List of time slots")

On the export, a list of items with keys `{ start, end }` is given behind the `timings` key, whose values are set to the UTC timezone.

On the API, the *start* key is replaced by a *begin* key. Times are given in the local timezone.

For example, a *start* value of a first item in the export's *timings* list with value *2022-02-07T09:00:00.000Z* will be presented under the *begin* key in the API with value *2022-02-07T10:00:00+0100*, the timezone is given under the `timezone` key.

### Tags and custom fields[​](#tags-and-custom-fields "Direct link to Tags and custom fields")

The JSON export's tags & custom fields are presented under 3 keys: *tags* and *tagGroups* for tags, *custom* for agenda-specific data.

On OpenAgenda, tags and custom fields are now integrated into the concept of *additional fields*. The *tags, tagGroups* or *custom* codes from the JSON export are not carried over to the v2 API. The values of each additional field are presented under keys specific to each field. These keys, as well as the identifiers of the selections offered by choice-based additional fields, are listed in [the agenda configuration](https://developers.openagenda.com/en/en/agendas/lecture.md).

### The long description[​](#the-long-description "Direct link to The long description")

The JSON export provides the long description under two keys: *longDescription* and *html.* An option (include\_embedded) allows replacing links pointing to multimedia content with their embed equivalents.

The API now only presents the *longDescription* field, whose format can be controlled by the *longDescriptionFormat* parameter as detailed here: <https://developers.openagenda.com/10-lecture/>

### Locations[​](#locations "Direct link to Locations")

All data related to the event venue is now under the *location* key.

**Note**: it is now possible to define online events on OpenAgenda. In this case, entering a location becomes optional.

### Accessibility accommodations[​](#accessibility-accommodations "Direct link to Accessibility accommodations")

The data structure under the *accessibility* key now lists all possible types as an object. Example:

```
{
  ...
  "accessibility":{"ii":false,"hi":false,"vi":false,"pi":false,"mi":true}
  ...
}
```

### Other[​](#other "Direct link to Other")

* *origin* is now named *originAgenda.* This data describes the agenda in which the event was entered. Additionally, *sourceAgenda* is now available, which refers to the agenda from which the event was retrieved, in case of an automatic addition from one of the agenda's sources.
* *firstDate*, *firstTimeStart* and *firstTimeEnd* are replaced by *firstTiming*, *lastDate*, *lastTimeStart* and *lastTimeEnd* are replaced by *lastTiming*. *nextTiming* allows retrieving the next timing.
