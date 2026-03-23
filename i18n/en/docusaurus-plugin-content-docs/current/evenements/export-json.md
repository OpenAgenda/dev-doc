# JSON Export

⚠️ **Important note:** Do not use this export for any new implementation. Use [the reading functions described here](/evenements/lecture) - The JSON export documented here will be permanently removed at the end of 2025.

[A migration guide is available](/evenements/export-json-migration) detailing the main elements to consider for a migration.

Use this export to consume published events from an agenda in your application or website.

```bash
https://openagenda.com/agendas/{uid}/events.json
```

The **uid** of your agenda is visible at the bottom of the sidebar on your agenda page.

A call will give you the following information:

*   **total**: the total number of events in the agenda matching your query
*   **limit:** the maximum number of events present in the response
*   **offset**: the position of the events provided in the **events** key relative to the complete list of events matching your query
*   **events**: the list of events for the current slice

Add your OpenAgenda account key to get better performance for your requests. During periods of high load, requests made without keys will be the first to be impacted.

```bash
https://openagenda.com/agendas/{uid}/events.json?key={yourOAAccountKey}
```

## Navigation

To navigate through the list, use either the "page" parameter or "limit" and "offset". If you use page, events will be paginated in groups of 20.

Example:

```bash
https://openagenda.com/agendas/{uid}/events.json?page=2
```

or:

```bash
https://openagenda.com/agendas/{uid}/events.json?limit=100&offset=200
```

The maximum possible value for limit is 300.

## Filters

Filters are specified in an **oaq** key of the query and work identically to those used on [OpenAgenda](https://openagenda.com) agenda pages.

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[passed\]=1&oaq\[tags\]\[\]=cinema
```

**passed**: Include past events.

*   oaq\[passed\]=0 : (default value) past events are excluded from results
*   oaq\[passed\]=1 : past events are included

**featured**: Limit results to featured events

*   oaq\[featured\]=1 : only return featured events
*   oaq\[featured\]=0 : exclude featured events

To filter by country, add the country code as a parameter. Example:

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[countryCode\]=de
```

**lang**: Only return events entered in a given language

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[lang\]=de
```

**tags**: Limit results to events associated with the single or multiple choice values specified in this key. Only events associated with all tags will appear in the results.

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[tags\]\[\]=patrimoine&oaq\[tags\]\[\]=exposition-visite
```

**tagsOperator**: Change the operator applied to the specified tag selection.

*   oaq\[tagsOperator\]=and : default value. Each event must be associated with all tags specified in the query
*   oaq\[tagsOperator\]=or : Each event must be associated with at least one of the specified tags to appear in the results

**lat, lng, radius**: Target a search centered on a geographic point, bounded by a radius in km

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[lat\]=43.94&oaq\[lng\]=2.133&oaq\[radius\]=3
```

**neLat, neLng, swLat, swLng** : Bound a search to a geographic bounding box

**updatedAtAfter** : limit a search to the most recently updated events

*   Example : https://openagenda.com/fetedelascience2019\_bretagne?oaq\[updatedAtAfter\]=2019-10-04T14:25

**date filter** : oaq\[from\]=2016-07-13&oaq\[to\]=2016-07-17

**tag filter** : oaq\[tags\]\[\]=slug

**location filter** : oaq\[location\]=73516559

**filter for one or more events**: oaq\[uids\]\[\]=uidev1&oaq\[uids\]\[\]=uidev2

**filter locations with an external reference** : oaq\[locationExtId\]=someextref123

**geographic area filter** : oaq\[neLat\]=49.368&oaq\[neLng\]=2.153&oaq\[swLat\]=44.887&oaq\[swLng\]=-4.87

**geographic proximity filter** : ?geolocate=   Note: this only works on HTTPS URLs.

**organization filter** : oaq\[org\]=code-organisation

**free text search filter** : oaq\[what\]=alaouanagaine

**accessibility filter**: oaq\[accessibility\]\[\]=mi&oaq\[accessibility\]\[\]=pi

**targeted search filter: city** : oaq\[what\]=paris&oaq\[scope\]=city

**targeted search filter: district** : oaq\[what\]=Centre-Ville&oaq\[scope\]=district ([example in Arles, Centre-ville district](https://openagenda.com/arles-agenda?oaq%5Bwhat%5D=Centre%20Ville&oaq%5Bscope%5D=district))

**targeted search filter: department** : oaq\[what\]=Charente&oaq\[scope\]=department

**targeted search filter: region** : oaq\[what\]=Bretagne&oaq\[scope\]=region

**possible search targets** : title, description, keywords, placename, city, region, department, postcode, district, country, category, tags

**Note** : it is possible to combine filters for more precise targeting (using "&"), e.g.: [https://openagenda.com/agendas/84693279/events.json?oaq\[uids\]\[\]=95031995&oaq\[uids\]\[\]=81710536](https://openagenda.com/agendas/84693279/events.json?oaq[uids][]=95031995&oaq[uids][]=81710536)

## Sorts

The default sort places featured events first, followed by events sorted by nearest occurrence. The sort alternatives are as follows:

Most recently updated first:

```bash
https://openagenda.com/agendas/85158148/events.json?oaq\[order\]=update
```

Next upcoming occurrences first:

```bash
https://openagenda.com/agendas/85158148/events.json?oaq\[order\]=upcoming
```

Latest occurrences first:
```bash
https://openagenda.com/agendas/85158148/events.json?oaq\[order\]=latest
```

Nearest events first (the oaq\[lat\] and oaq\[lng\] parameters must be specified):

```bash
https://openagenda.com/agendas/85158148/events.json?oaq\[order\]=proximity
```

## Event structure in the export

Here is the list of available fields for each event in the export:

*   **uid**: unique identifier of the event
*   **slug**: URL-friendly version of the title (e.g.: the slug of "L'événement" is 'l-evenement')
*   **canonicalUrl**: canonical URL of the event
*   **title**: Multilingual field. Title of the event
*   **description**: Multilingual field. Short description of the event.
*   **longDescription**: Optional. Multilingual Markdown field. Long description of the event.
*   **keywords**: Optional. Multilingual list field. Keywords of the event
*   **html**: Optional. HTML variant of the **longDescription** field
*   **image**: Optional. Formatted image of the event. Resized to fit a width of 600px. In jpg format
*   **thumbnail**: Optional. Event thumbnail (200x200 pixels) in jpg format
*   **originalImage**: Optional. Image at original size in jpg format.
*   **age**: Optional. Target audience age (default: null). If defined, object `{ min, max }`
*   **accessibility\[\]**: List. Availability of facilities for motor (mi), psychic (pi), hearing (hi), visual (vi), intellectual (mei) disabilities
*   **updatedAt**: date of last event update
*   **range**: Multilingual field. Schedule summary.
*   **imageCredits**: Optional. Credits for the associated image
*   **conditions**: Optional. Multilingual field. Event access conditions (pricing, free admission, registration required...)
*   **registration\[\]**: list of registration methods

*   **value**: value
*   **type**: value type: "phone": phone, "email": email, "link": hyperlink
*   **prefix**: useful for building an HTML link. "mailto:" or "tel:"
*   **firstDate:** "2020-03-10"
*   **firstTimeStart:** "20:30"
*   **firstTimeEnd:** "22:00"
*   **lastDate:** "2020-03-10"
*   **lastTimeStart:** "20:30"
*   **lastTimeEnd:** "22:00"
*   **origin**: agenda where the event was contributed
*   **uid**: unique identifier of the origin agenda
*   **title**: title of the origin agenda
*   **url**: URL associated with the origin agenda
*   **slug**: URL code of the origin agenda
*   **oaUrl**: OpenAgenda URL of the origin agenda
*   **timings\[\]**
*   **start**: start time (format 2018-09-29T12:00:00.000Z)
*   **end**: end time (same format)
*   **location**: venue where the event takes place
*   **uid**: unique identifier of the venue
*   **name**: venue name
*   **slug**: URL-encoded venue name
*   **address**: full address of the venue
*   **image**: Optional. venue image
*   **imageCredits**: Optional. venue image credits
*   **postalCode**: Optional. postal code
*   **city**: Optional. city / municipality
*   **district**: Optional. district
*   **department**: Optional. department
*   **region**: Optional. region
*   **countryCode**: country code
*   **latitude**: geographic coordinate
*   **longitude**: geographic coordinate
*   **description**: Optional. Multilingual field. Venue description.
*   **access**: Optional. Multilingual field. Venue access
*   **website**: Optional. venue website
*   **links\[\]**: other links (facebook, twitter, etc.)
*   **insee**: Optional. municipality INSEE code
*   **phone**: Optional. venue phone number
*   **timezone**: timezone (e.g.: Europe/Paris)
*   **updatedAt**: date and time of last update
*   **country**: Multilingual field. Country labels and code.
*   **extId**: an event identifier external to OpenAgenda
*   **tagGroups\[\]**: Custom fields: tag groups
*   **name**: Group name
*   **access**: read access (public, private)
*   **slug**: URL-encoded name
*   **tags\[\]**: list of tags
*   **label**: tag label
*   **slug**: tag URL code
*   **id**: tag identifier

## Options

*   **include\_embedded**: add this parameter to the URL to include rich content in the HTML fields of events. Example: https://openagenda.com/agendas/85158148/events.json?oaq\[featured\]=1&include\_embedded=1
