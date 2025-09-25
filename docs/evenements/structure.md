---
title: Structure d'un événement
description: Détails sur les champs standards, champs additionnels et autres champs propres à un agenda
sidebar_position: 1
---

# Structure d'un événement

## Champs standards

### Résumé

Ce sont les champs présents sur **tous les événements** publiés sur OpenAgenda et dont les contraintes doivent être respectées quel que soit l’agenda.

| Champ                                                | Code               | Éditable | Requis | Valeur par défaut | Description                                                                                      |
|------------------------------------------------------|--------------------|----------|--------|-------------------|--------------------------------------------------------------------------------------------      |
| [**Identifiant Unique**](#identifiant-unique)        | `uid`              |          |        |                   | Identifiant unique OpenAgenda de l’événement                                                     |
| [**Code URL**](#code-url)                            | `slug`             |          |        |                   | Identifiant texte unique OpenAgenda de l'événement                                               |
| [**Identifiants externes**](#identifiants-externes)  | `extIds`           | ✅       |        |                   | Liste de clés/paires identifiant l'événement sur des jeux de données externes à OpenAgenda       |
| [**Titre**](#titre)                                  | `title`            | ✅       | ✅     |                   | Le titre de l'événement                                                                          |
| [**Description courte**](#description-courte)        | `description`      | ✅       | ✅     |                   | La description courte de l'événement                                                             |
| [**Description longue**](#description-longue)        | `longDescription`  | ✅       |        |                   | La description longue de l'événement                                                             |
| [**Conditions**](#conditions)                        | `conditions`       | ✅       |        |                   | Description libre des conditions de participation à l'événement                                  |
| [**Mots clés**](#mots-clés)                          | `keywords`         | ✅       |        |                   | Liste de mots clés                                                                               |
| [**Image**](#image)                                  | `image`            | ✅       |        |                   | Illustration principale                                                                          |
| [**Crédits image**](#crédits-image)                  | `imageCredits`     | ✅       |        |                   | Crédits liés à l’illustration                                                                    |
| [**Inscription**](#outils-dinscription)              | `registration`     | ✅       |        |                   | Liste des moyens d'inscription : numéros de téléphones, email ou liens hypertextes               |
| [**Accessibilité**](#accessibilité)                  | `accessibility`    | ✅       |        |                   | Types de handicaps pour lesquels des aménagements sont prévus                                    |
| [**Horaires**](#horaires)                            | `timings`          | ✅       | ✅     |                   | Liste de plages horaires                                                                         |
| [**Âge cible**](#âge-du-public-ciblé)                | `age`              | ✅       |        |                   | Créneau min/max d'âge des participants ciblés                                                    |
| [**Mode de participation**](#mode-de-participation)  | `attendanceMode`   | ✅       |        | 1 (Physique)      | Mode de participation à l'événement (physique vs en ligne)                                       |
| [**Identifiant de lieu**](#identifiant-de-lieu)      | `locationUid`      | ✅       | ✅ ⁽ˡ⁾ |                   | Identifiant unique OpenAgenda du lieu associé                                                    |
| [**Lien d’accès**](#lien-daccès)                     | `onlineAccessLink` | ✅       |        |                   | Lien hypertexte d'accès à un événement en ligne ou mixte                                         |
| [**Liens enrichis**](#liens-enrichis)                | `links`            |          |        |                   | Liste de paires lien / codes enrichis                                                            |
| [**Fuseau horaire**](#fuseau-horaire)                | `timezone`         | ✅       |        | Fuseau du lieu    | Fuseau horaire de référence. Pour les événements en ligne, le fuseau par défaut est Europe/Paris |
| [**État**](#état)                                    | `status`           | ✅       |        | 1 (Programmé)     | Reporté, Annulé, Complet…                                                                        |
| [**Statut**](#statut)                                | `state`            | ✅       |        | Selon l'agenda    | Statut dans l’agenda : Publié (2), Prêt à publier (1), À modérer (0), Refusé (−1)                |
| [**Date de création**](#date-de-création)            | `createdAt`        |          |        |                   | Instant de création                                                                              |
| [**Date de mise à jour**](#date-de-mise-à-jour)      | `updatedAt`        |          |        |                   | Instant de la dernière mise à jour                                                               |

⁽ˡ⁾ Champ lié: requis selon une valeur définie sur un champ voisin. Voir le détail du champ pour des précisions
⁽ᵈ⁾ Une valeur par défaut est définie lorsqu'une valeur n'est pas explicitée pour ce champ.

### Détail

#### Identifiant unique

Identifiant unique OpenAgenda de l'événement. Assigné à la création de l'événement et non éditable.  
**code**: `uid`  
**type**: `entier`

#### Code URL

Identifiant utile pour construire une URL lisible dérivée du titre de l'événement.  
**code**: `slug`  
**type**: `texte`  

#### Identifiants externes

Il est possible d'associer à un événement OpenAgenda des identifiants autres que son identifiant unique (UID). Les identifiants externes peuvent être définits soit par une mise à jour classique, soit via les routes dédiées aux identifiants externes.

**code**: `extIds`  
**type**: `objet({ key, value })[]`  

##### Exemple
```json
{
  ...
  "extIds": [{
    "value": "9f15474c-58cd-42a4-9c93-7114b1ee44f0",
    "key": "Albi"
  }],
  ...
}
```

#### Titre

Le titre de l'événement.  
Champ **obligatoire** ne pouvant excéder **140** caractères par langue.  
**code**: `title`  
**type**: `texte multilingue`  
**schema.org**: [name](https://schema.org/name)

##### Exemple
```json
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

#### Description courte

Chapô, variante courte ou extrait de la description de l'événement. Est utilisé en complément due titre sur les vues réduites (liste) de l'événement.  
Champ **obligatoire** ne pouvant excéder **200** caractères par langue.  
**code**: `description`  
**type**: `texte multilingue`  
**schema.org**: [disambiguatingDescription](https://schema.org/disambiguatingDescription)  

#### Description longue

Description de l'événement.  
Champ optionnel ne pouvant excéder **10000** caractères par langue.  
**code**: `longDescription`  
**type**: `texte multilingue markdown`  
**schema.org**: [description](https://schema.org/description)  

##### À propos du format

La description est stoquée au format [markdown](https://fr.wikipedia.org/wiki/Markdown). C'est également le format présenté par défaut sur une lecture API. Toujours en **lecture**, une [option](/evenements/lecture) à passer à l'API permet de faire une conversion et de récupérer la description au format `HTML`. Autrement, en **écriture** un format HTML sera automatiquement converti en markdown en amont d'un enregistrement en base.

##### Contenus enrichis

Certains liens insérés dans la description longue sont extraits lors de la création ou à la mise à jour et sont associés à des codes d'intégration enrichis mis à disposition dans le champ links de l'événement ainsi que dans la variante html de la description longue.  

Les services intégrables incluent: *Allociné, Arte, Calameo, Dailymotion, Eventbrite, Flickr, Google Forms, INA, Instagram, PictoAccess, Prezi, Soundcloud, Twitch, Twitter, Vimeo, WeMap, Youtube*

##### Exemple

```json
{
  ...
  "longDescription": {
      "fr": "**Explorez les multiples visages de l’Afrique du Sud à travers une dégustation commentée de trois vins soigneusement sélectionnés, témoins de la richesse et de la diversité de ses terroirs.**\n\nPartez pour un voyage au cœur de l’un des plus vastes vignobles du nouveau monde, où traditions anciennes et modernité s’entrelacent. À travers cette exploration, vous plongerez dans l’histoire viticole de l’Afrique du sud, mise en valeur par trois régions emblématiques.\n\nChaque cuvée vous révèlera un style singulier, reflet fidèle de son terroir, entre influences maritimes, diversité des sols et caractère des cépages.\n\nDégustation de 3 vins\n\nVous participez régulièrement à nos afterworks de dégustation ? Pensez à notre carte de fidélité Afterwork ! Dès 5 ateliers afterworks effectués, nous vous offrons le 6ème ! Votre carte de fidélité fonctionne pour des ateliers en tarif plein mais aussi en tarif réduit et abonnés. N'oubliez pas de la demander à nos sommeliers.\n\n**Animé par : Raul Vega**, animateur-sommelier à la Cité du Vin\n\n**En partenariat avec** : Wines of South Africa\n\n**Avec le soutien de** : Maison Johanès Boubée"
  },
  ...
}
```

#### Conditions

Détails des conditions de participation à l'événement.  
Champ optionnel ne pouvant excéder **255** caractères par langue.  
**code**: `conditions`  
**type**: `texte multilingue`  

#### Mots clés

Liste de mots clés.  
Champ optionnel ne pouvant excéder **255** caractères par langue  
**code**: `keywords`
**type**: `listes de textes par langue`  
**schema.org**: [keywords](https://schema.org/keywords)

##### Exemple

```json
{
    ...
    "keywords": {
        "fr": ["musique", "concert", "rock"]
    },
    ...
}
```

#### Image

Illustration principale de l'événement.  
Champ optionnel au format variable selon l'opération.  
**code**: `image`  
**type**: `fichier`
**schema.org**: [image](https://schema.org/image)

##### En lecture

Lorsqu'une image est définie plusieurs variantes sont proposées, toujours au format `jpeg`:

 * **base**: l'image redimensionnée en largeur et non découpée pour tenir sur 700 pixels.
 * **full**: l'image aux dimensions d'origine
 * **thumbnail**: l'image redimensionnée et découpée pour tenir dans un rectangle de 200x200 pixels

Les dimensions sont précisées pour chaque variante ainsi que la route où elles sont accessibles.

###### Exemple

```json
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

##### En écriture

Une image peut être fournie par `URL` ou par fichier lors d'une opération de mise à jour ou de création. Elle doit être publiquement disponible pour pouvoir être chargée dans l'événement. Une fois chargée, elle sera convertie et redimensionnée pour être proposée selon les critères détaillés dans la section précédente.

###### Exemple

```json
{
  ...,
  "image": {
    "url": "https://i.pinimg.com/originals/d1/d9/ae/d1d9aec6e351baa115000b4b75e02b1b.jpg"
  }
  ...
}
```

#### Crédits image

Crédits liés à l’illustration.  
Champ optionnel qui ne peut être défini **que** lorsqu'une image est également définie. Ne peut excéder **255** caractères.  
**code**: `imageCredits`  
**type**: `texte`
**schema.org**: [image.caption](https://schema.org/caption)

#### Outils d'inscription

Liste des moyens d’inscription : numéros de téléphones, email ou liens hypertextes. Champ optionnel ne pouvant excéder 2000 caractères au total.  
**code**: `registration`  
**type**: liste de valeurs de type `link` (lien hypertexte), `phone` (numéro de téléphone) ou `email` (courriel)

##### Exemple en lecture

```json
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

##### Exemple en écriture

Le format suivant est accepté pour les opérations d'écritures. Les types dérivent des valeurs lues:
```json
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

#### Accessibilité

Champ optionnel listant les codes correspondants aux types de handicaps pour lesquels des aménagements sont prévus dans le but rendre l'événement accessible.  
**code**: `accessibility`  
**type**: `objet` de codes d'accessibilité.

##### Codes

* `hi` (Hearing impairment): Handicap auditif
* `vi` (Visual impairment): Handicap visuel
* `pi` (Psychic impairment): Handicap psychique
* `mi` (Motor impairment): Handicap moteur
* `ii` (Intellectual impairment): Handicap intellectuel

##### Exemple

```json
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

#### Horaires

Liste des plages horaires lors desquels l'événement à lieu.  
Champ **obligatoire** ne devant pas excéder **800** plages horaires. Une plage ne peut excéder 24 heures en durée et ne peut chevaucher une autre plage.  
**codes**: `timings`  
**type**: `object[{begin: Date, end: Date}]`  
**schema.org**: [eventSchedule](https://schema.org/eventSchedule), [startDate](https://schema.org/startDate), [endDate](https://schema.org/endDate), [duration](https://schema.org/duration)

**Important**: le fuseau. Il est important.

##### Exemple

Une pièce de théatre qui a lieu tous les jours sur une semaine de 17h à 19h:

```json
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

#### Âge du public ciblé

Créneau min/max d'âge des participants ciblés.  
Champ optionnel, il n'est pas possible d'annoncer un événement adaptés aux personnes d'un âge supérieur à 120 ans.  
**code**: `age`  
**type**: `objet {min: entier, max: entier}`  
**schema.org**: [typicalAgeRange](https://schema.org/typicalAgeRange)  

##### Exemple

Valeur du champ âge pour un événement pour les enfants de 6 ans ou moins:

```json
{
    ...
    "age": {
        "min":0,
        "max":6
    },
    ...
}
```

#### Mode de participation

Mode de participation à l’événement (physique/in-situ vs en ligne).  
Par défaut, l'événement sera in-situ/physique (valeur `1`).  

**code**: `attendanceMode`  
**type**: `entier(1|2|3)`  
**schema.org**: [eventAttendanceMode](https://schema.org/eventAttendanceMode)  

##### Valeurs possibles

* `1` (offline): Participation physique au lieu où se déroule l'événement
* `2` (online): Participation en ligne via un lien
* `3` (mixed): Participation mixte

#### Identifiant de lieu

Identifiant unique OpenAgenda du lieu associé à préciser dans les opérations d'*écriture*. En *lecture* c'est un objet `location` qui est fourni.  
**Obligatoire** pour les événements dont le mode de participation est physique/offline (`1`) ou mixte (`3`). Sur les opérations de `lecture`, ce sont les informations détaillées dans [Lieux > Structure](/lieux/structure) qui sont fournies.  
**code**: `locationUid` en *écriture* ou `location.uid` en *lecture*.  
**type**: `entier`  

#### Lien d'accès

Lien hypertexte permettant l'accès à un événement en ligne ou mixte.  
Champ **obligatoire** pour les événements dont le mode de participation (code `attendanceMode`) est *en ligne* (valeur `2`) ou *mixte* (valeur `3`). Champ non pertinent pour les événements physiques strictes.  
**code**: `onlineAccessLink`  
**type**: `lien hypertexte`  
**schema.org**: [VirtualLocation](https://schema.org/VirtualLocation)  

#### Liens enrichis

Liste de paires de valeurs lien / code enrichi extraits de la description longue.  
Ce champ est défini par un traitement interne à l'API.  

**code**: `links`  
**type**: `[{link, data}]`  

##### Exemple

```json
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
      "description": "Activités 0-6 ans Petite Enfance vacances d’Hiver...",
      "thumbnail_url": "https://p.calameoassets.com/210205112752-fc92911ad9.../p1.jpg",
      "thumbnail_width": 1125,
      "thumbnail_height": 1596,
      "html": "<div style=\"left: 0; width: 100%;....</div>",
      "cache_age": 86400
    }
  }
]
```

#### Fuseau horaire

Nom du fuseau horaire de référence. Voir [la liste des identifiants TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).  
Champ défini automatiquement à partir du lieu associé à l'événement pour les événements ayant un mode de participation `attendanceMode` physiques `1` ou mixtes `3`.
Pour les événements en ligne sans lieu associée, la valeur par défaut prise par ce champ est `Europe/Paris`.

**code**: `timezone`  
**type**: `texte`  
**exemple**: `Europe/Paris` 

#### État

L'état d'un événement informe l'utilisateur de sa disponibilité. Lorsque la valeur définie n'est pas la valeur par défaut (l'événement est programmé), l'information devient aussi essentielle que le titre.

**code**: `status`  
**type**: `entier(1|2|3|4|5|6)`  
**valeur par défaut**: Programmé (`1`)  
**schema.org**: [eventStatus](https://schema.org/eventStatus)

##### Valeurs

* **Programmé** (`1`): État par défaut. L'événement est programmé aux horaires indiqués
* **Reprogrammé** (`2`): Les horaires ont changé
* **Déplacé en ligne** (`3`): L'événement qui se déroulait à un lieu physique n'est désormais accessible qu'en ligne
* **Reporté** (`4`): L'événement ne se déroule plus aux horaires indiqués, les nouveaux horaires ne sont pas encore disponibles
* **Complet** (`5`): L'événement n'est plus accessible aux nouveaux participants
* **Annulé** (`6`): L'événement n'est plus programmé aux horaires indiqués et n'est pas reporté.

#### Statut

Indique le statut de l'événement dans le cadre du circuit de modération d'un agenda. L'événement n'est publiquement accessible que s'il a un statut à "Publié" (`2`). Les événements ayant un autre statut ne sont visibles que par les utilisateurs membres de l'agenda et ayant un rôle de **modérateur** ou d'**administrateur**.

**code**: `state`  
**type**: `entier(-1|0|1|2)`

##### Valeurs

* **Publié** (`2`): L'événement est affiché sur les flux et la page de l'agenda.
* **Prêt à publier** (`1`): L'événement a été vu et traité par un membre modérateur ou administrateur. L'événement n'est visible que des membres autorisés.
* **À modérer** (`0`): L'événement n'a pas encore été traité par un membre modérateur ou administrateur de l'agenda. L'événement n'est visible que des membres autorisés.
* **Refusé** (`-1`): L'événement a été traité et a été refusé par un membre modérateur ou administrateur de l'agenda. En principe, un événement avec ce statut ne sera jamais publié sur l'agenda.

#### Date de création

Instant de la création de l'événement.  
Ce champ n'est pas éditable.  

**code**: `createdAt`  
**type**: `date`

#### Date de mise à jour

Instant de la dernière mise à jour de l'événement.  
Ce champ n'est pas éditable.  

**code**: `updatedAt`  
**type**: `date`

## Champs additionnels

Des champs additionnels peuvent venir compléter le modèle standard d'un événement OpenAgenda. Ils sont définis à l'échelle d'un agenda ou d'un réseau d'agendas. Pour en savoir plus, rendez-vous [ici](/agendas/schemas).