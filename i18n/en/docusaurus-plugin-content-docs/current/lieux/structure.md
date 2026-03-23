---
title: Structure of a location
description: Details on the fields that make up a location
sidebar_position: 1
---

# Structure of a location

A location is a physical meeting point: a building, a named place, an open space... Here is the complete list of fields defining a location.

| Field                     | Code           | Editable | Required | Description                                                                                                               |
| ------------------------- | -------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| Identifier                | `uid`          |          |          | Unique identifier of the location (not editable)                                                                          |
| Location name (r)         | `name`         | ✅       | ✅       | String (max. 100 characters). Example: *Musée de la Folie Marco*                                                          |
| External identifiers      | `extIds`       | ✅       |          | List of key/value pairs identifying the location in datasets external to OpenAgenda. See [below](#external-identifiers) for details. |
| Address (r)               | `address`      | ✅       | ✅       | String (max. 255 characters)                                                                                              |
| Access                    | `access`       | ✅       |          | Multilingual string (max. 1000 characters). Access instructions (e.g. `{ fr: "Métro 3, Pont de Levallois" }`)             |
| Description               | `description`  | ✅       |          | Multilingual string (max. 5000 characters). Location presentation (see the example for Château de Villeneuve La Comtesse) |
| Image                     | `image`        | ✅       |          | URL or object illustrating the location                                                                                   |
| Image credits             | `imageCredits` | ✅       |          | Credits related to the illustration                                                                                       |
| Slug                      | `slug`         |          |          | Non-editable text identifier                                                                                              |
| Location set              | `setUid`       |          |          | Identifier of the associated location set (not editable)                                                                  |
| Region                    | `adminLevel1`  | ✅       |          | Region (for locations in France)                                                                                          |
| Department                | `adminLevel2`  | ✅       |          | Department (for locations in France)                                                                                      |
| Intercommunality          | `adminLevel3`  | ✅       |          | Intercommunality                                                                                                          |
| City                      | `adminLevel4`  | ✅       |          | City or municipality                                                                                                      |
| Borough                   | `adminLevel5`  | ✅       |          | For large cities                                                                                                          |
| Neighborhood              | `adminLevel6`  | ✅       |          | Neighborhood                                                                                                              |
| Postal code               | `postalCode`   | ✅       |          | Postal code                                                                                                               |
| INSEE code                | `insee`        | ✅       |          | INSEE code of the municipality                                                                                            |
| Country (r)               | `countryCode`  | ✅       | ✅       | ISO 3166-1 alpha-2 country code (e.g. `CH`)                                                                               |
| Latitude                  | `latitude`     | ✅       |          | Decimal geographic coordinate (e.g. `48.4102778`)                                                                         |
| Longitude                 | `longitude`    | ✅       |          | Decimal geographic coordinate (e.g. `7.4511111`)                                                                          |
| Timezone                  | `timezone`     | ✅       |          | Example: `Europe/Paris`                                                                                                   |
| Website                   | `website`      | ✅       |          | Main URL                                                                                                                  |
| Email                     | `email`        | ✅       |          | Main contact email address                                                                                                |
| Phone                     | `phone`        | ✅       |          | Main contact phone number                                                                                                 |
| Other links               | `links`        | ✅       |          | List of hyperlinks (e.g. social networks, external website)                                                               |
| Status                    | `state`        | ✅       |          | Location status: `0` (to be verified) or `1` (verified)                                                                   |
| Creation date             | `createdAt`    |          |          | Creation date (not editable)                                                                                              |
| Last updated date         | `updatedAt`    |          |          | Last updated date (not editable)                                                                                          |
| External identifier       | `extId`        |          |          | **Deprecated**: reference to the location in a dataset external to OpenAgenda                                             |

**(g)** automatically generated by geocoding if not provided

## External identifiers

It is possible to associate identifiers other than the unique identifier (UID) with a location referenced on OpenAgenda. The UID is always defined and cannot be edited.

External identifiers are used to link locations to directories external to OpenAgenda. For example, the following data shows a location that carries a reference to the [cultural venues database of the Ministry of Culture](https://basedeslieux.culture.gouv.fr/) as well as another from a directory of the [Nantes metropolitan area](https://metropole.nantes.fr).

```json
{
  ...
  "extIds": [{
    "key": "MCCBLCID",
    "value": "62adc12a-3316-5d66-9e6f-ca989ada7a13?dc93fb2a-806a-45dc-90ed-b72324c12e69"
  }, {
    "key": "InfoNantes",
    "value": "7894"
  }],
  ...
}
```
