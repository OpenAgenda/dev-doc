# Structure d'un événement

## Champs standards[​](#champs-standards "Lien direct vers Champs standards")

### Résumé[​](#résumé "Lien direct vers Résumé")

Ce sont les champs présents sur **tous les événements** publiés sur OpenAgenda et dont les contraintes doivent être respectées quel que soit l’agenda.

| Champ                                                | Code               | Description                                                                                |
| ---------------------------------------------------- | ------------------ | ------------------------------------------------------------------------------------------ |
| [**Identifiant Unique**](#identifiant-unique)        | `uid`              | Identifiant unique OpenAgenda de l’événement                                               |
| [**Code URL**](#code-url)                            | `slug`             | Identifiant texte unique OpenAgenda de l'événement                                         |
| [**Identifiants externes**](#identifiants-externes)  | `extIds`           | Liste de clés/paires identifiant l'événement sur des jeux de données externes à OpenAgenda |
| [**Titre**](#titre) ⁽ʳ⁾                              | `title`            | Le titre de l'événement                                                                    |
| [**Description courte**](#description-courte) ⁽ʳ⁾    | `description`      | La description courte de l'événement                                                       |
| [**Description longue**](#description-longue)        | `longDescription`  | La description longue de l'événement                                                       |
| [**Conditions**](#conditions)                        | `conditions`       | Description libre des conditions de participation à l'événement                            |
| [**Mots clés**](#mots-cl%C3%A9s)                     | `keywords`         | Liste de mots clés                                                                         |
| [**Image**](#image)                                  | `image`            | Illustration principale                                                                    |
| [**Crédits image**](#cr%C3%A9dits-image)             | `imageCredits`     | Crédits liés à l’illustration                                                              |
| [**Inscription**](#outils-dinscription)              | `registration`     | Liste des moyens d'inscription : numéros de téléphones, email ou liens hypertextes         |
| [**Accessibilité**](#accessibilit%C3%A9)             | `accessibility`    | Types de handicaps pour lesquels des aménagements sont prévus                              |
| [**Horaires**](#horaires) ⁽ʳ⁾                        | `timings`          | Liste de plages horaires                                                                   |
| [**Âge cible**](#%C3%A2ge-du-public-cibl%C3%A9)      | `age`              | Créneau min/max d'âge des participants ciblés                                              |
| [**Mode de participation**](#mode-de-participation)  | `attendanceMode`   | Mode de participation à l'événement (physique vs en ligne)                                 |
| [**Identifiant de lieu**](#identifiant-de-lieu) ⁽ʳ⁾  | `locationUid`      | Identifiant unique OpenAgenda du lieu associé                                              |
| [**Lien d’accès**](#lien-dacc%C3%A8s)                | `onlineAccessLink` | Lien hypertexte d'accès à un événement en ligne ou mixte                                   |
| [**Liens enrichis**](#liens-enrichis)                | `links`            | Liste de paires lien / codes enrichis                                                      |
| [**Fuseau horaire**](#fuseau-horaire)                | `timezone`         | Fuseau horaire de référence                                                                |
| [**État**](#%C3%A9tat)                               | `status`           | Reporté, Annulé, Complet…                                                                  |
| [**Statut**](#statut)                                | `state`            | Statut dans l’agenda : Publié (2), Prêt à publier (1), À modérer (0), Refusé (−1)          |
| [**Date de création**](#date-de-cr%C3%A9ation)       | `createdAt`        | Instant de création                                                                        |
| [**Date de mise à jour**](#date-de-mise-%C3%A0-jour) | `updatedAt`        | Instant de la dernière mise à jour                                                         |

**(r)** requis à la création et en mise à jour complète

### Détail[​](#détail "Lien direct vers Détail")

#### Identifiant unique[​](#identifiant-unique "Lien direct vers Identifiant unique")

Identifiant unique OpenAgenda de l'événement. Assigné à la création de l'événement et non éditable.<br />**code**: `uid`<br />**type**: `entier`

#### Code URL[​](#code-url "Lien direct vers Code URL")

Identifiant utile pour construire une URL lisible dérivée du titre de l'événement.<br />**code**: `slug`<br />**type**: `texte`

#### Identifiants externes[​](#identifiants-externes "Lien direct vers Identifiants externes")

Il est possible d'associer à un événement OpenAgenda des identifiants autres que son identifiant unique (UID). Les identifiants externes peuvent être définits soit par une mise à jour classique, soit via les routes dédiées aux identifiants externes.

**code**: `extIds`<br />**type**: `objet({ key, value })[]`

##### Exemple[​](#exemple "Lien direct vers Exemple")

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

#### Titre[​](#titre "Lien direct vers Titre")

Le titre de l'événement.<br /><!-- -->Champ **obligatoire** ne pouvant excéder **140** caractères par langue.<br />**code**: `title`<br />**type**: `texte multilingue`<br />**schema.org**: [name](https://schema.org/name)

##### Exemple[​](#exemple-1 "Lien direct vers Exemple")

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

#### Description courte[​](#description-courte "Lien direct vers Description courte")

Chapô, variante courte ou extrait de la description de l'événement. Est utilisé en complément due titre sur les vues réduites (liste) de l'événement.<br /><!-- -->Champ **obligatoire** ne pouvant excéder **200** caractères par langue.<br />**code**: `description`<br />**type**: `texte multilingue`<br />**schema.org**: [disambiguatingDescription](https://schema.org/disambiguatingDescription)

#### Description longue[​](#description-longue "Lien direct vers Description longue")

Description de l'événement.<br /><!-- -->Champ optionnel ne pouvant excéder **10000** caractères par langue.<br />**code**: `longDescription`<br />**type**: `texte multilingue markdown`<br />**schema.org**: [description](https://schema.org/description)

##### À propos du format[​](#à-propos-du-format "Lien direct vers À propos du format")

La description est stoquée au format [markdown](https://fr.wikipedia.org/wiki/Markdown). C'est également le format présenté par défaut sur une lecture API. Toujours en **lecture**, une [option](https://developers.openagenda.com/evenements/lecture.md) à passer à l'API permet de faire une conversion et de récupérer la description au format `HTML`. Autrement, en **écriture** un format HTML sera automatiquement converti en markdown en amont d'un enregistrement en base.

##### Contenus enrichis[​](#contenus-enrichis "Lien direct vers Contenus enrichis")

Certains liens insérés dans la description longue sont extraits lors de la création ou à la mise à jour et sont associés à des codes d'intégration enrichis mis à disposition dans le champ links de l'événement ainsi que dans la variante html de la description longue.

Les services intégrables incluent: *Allociné, Arte, Calameo, Dailymotion, Eventbrite, Flickr, Google Forms, INA, Instagram, PictoAccess, Prezi, Soundcloud, Twitch, Twitter, Vimeo, WeMap, Youtube*

##### Exemple[​](#exemple-2 "Lien direct vers Exemple")

```
{
  ...
  "longDescription": {
      "fr": "**Explorez les multiples visages de l’Afrique du Sud à travers une dégustation commentée de trois vins soigneusement sélectionnés, témoins de la richesse et de la diversité de ses terroirs.**\n\nPartez pour un voyage au cœur de l’un des plus vastes vignobles du nouveau monde, où traditions anciennes et modernité s’entrelacent. À travers cette exploration, vous plongerez dans l’histoire viticole de l’Afrique du sud, mise en valeur par trois régions emblématiques.\n\nChaque cuvée vous révèlera un style singulier, reflet fidèle de son terroir, entre influences maritimes, diversité des sols et caractère des cépages.\n\nDégustation de 3 vins\n\nVous participez régulièrement à nos afterworks de dégustation ? Pensez à notre carte de fidélité Afterwork ! Dès 5 ateliers afterworks effectués, nous vous offrons le 6ème ! Votre carte de fidélité fonctionne pour des ateliers en tarif plein mais aussi en tarif réduit et abonnés. N'oubliez pas de la demander à nos sommeliers.\n\n**Animé par : Raul Vega**, animateur-sommelier à la Cité du Vin\n\n**En partenariat avec** : Wines of South Africa\n\n**Avec le soutien de** : Maison Johanès Boubée"
  },
  ...
}
```

#### Conditions[​](#conditions "Lien direct vers Conditions")

Détails des conditions de participation à l'événement.<br /><!-- -->Champ optionnel ne pouvant excéder **255** caractères par langue.<br />**code**: `conditions`<br />**type**: `texte multilingue`

#### Mots clés[​](#mots-clés "Lien direct vers Mots clés")

Liste de mots clés.<br /><!-- -->Champ optionnel ne pouvant excéder 255 caractères par langue<br />**code**: `keywords`<br />**type**: `listes de textes par langue`

##### Exemple[​](#exemple-3 "Lien direct vers Exemple")

```
{
    ...
    "keywords": {
        "fr": ["musique", "concert", "rock"]
    },
    ...
}
```

#### Image[​](#image "Lien direct vers Image")

Illustration principale de l'événement.<br /><!-- -->Champ optionnel au format variable selon l'opération.<br />**code**: `image`<br />**type**: `fichier`

##### En lecture[​](#en-lecture "Lien direct vers En lecture")

Lorsqu'une image est définie plusieurs variantes sont proposées, toujours au format `jpeg`:

* **base**: l'image redimensionnée en largeur et non découpée pour tenir sur 700 pixels.
* **full**: l'image aux dimensions d'origine
* **thumbnail**: l'image redimensionnée et découpée pour tenir dans un rectangle de 200x200 pixels

Les dimensions sont précisées pour chaque variante ainsi que la route où elles sont accessibles.

###### Exemple[​](#exemple-4 "Lien direct vers Exemple")

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

##### En écriture[​](#en-écriture "Lien direct vers En écriture")

Une image peut être fournie par `URL` ou par fichier lors d'une opération de mise à jour ou de création. Elle doit être publiquement disponible pour pouvoir être chargée dans l'événement. Une fois chargée, elle sera convertie et redimensionnée pour être proposée selon les critères détaillés dans la section précédente.

###### Exemple[​](#exemple-5 "Lien direct vers Exemple")

```
{
  ...,
  "image": {
    "url": "https://i.pinimg.com/originals/d1/d9/ae/d1d9aec6e351baa115000b4b75e02b1b.jpg"
  }
  ...
}
```

#### Crédits image[​](#crédits-image "Lien direct vers Crédits image")

Crédits liés à l’illustration.<br /><!-- -->Champ optionnel et précisable lorsqu'une image est chargée. Ne peut excéder **255** caractères.<br />**code**: `imageCredits`<br />**type**: `texte`

#### Outils d'inscription[​](#outils-dinscription "Lien direct vers Outils d'inscription")

Liste des moyens d’inscription : numéros de téléphones, email ou liens hypertextes. Champ optionnel ne pouvant excéder 2000 caractères au total.<br />**code**: `registration`<br />**type**: liste de valeurs de type `link` (lien hypertexte), `phone` (numéro de téléphone) ou `email` (courriel)

##### Exemple en lecture[​](#exemple-en-lecture "Lien direct vers Exemple en lecture")

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

##### Exemple en écriture[​](#exemple-en-écriture "Lien direct vers Exemple en écriture")

Le format suivant est accepté pour les opérations d'écritures. Les types dérivent des valeurs lues:

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

#### Accessibilité[​](#accessibilité "Lien direct vers Accessibilité")

Champ optionnel listant les codes correspondants aux types de handicaps pour lesquels des aménagements sont prévus dans le but rendre l'événement accessible.<br />**code**: `accessibility`<br />**type**: `objet` de codes d'accessibilité.

##### Codes[​](#codes "Lien direct vers Codes")

* `hi` (Hearing impairment): Handicap auditif
* `vi` (Visual impairment): Handicap visuel
* `pi` (Psychic impairment): Handicap psychique
* `mi` (Motor impairment): Handicap moteur
* `ii` (Intellectual impairment): Handicap intellectuel

##### Exemple[​](#exemple-6 "Lien direct vers Exemple")

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

#### Horaires[​](#horaires "Lien direct vers Horaires")

Liste des plages horaires lors desquels l'événement à lieu.<br /><!-- -->Champ **obligatoire** ne devant pas excéder **800** plages horaires. Une plage ne peut excéder 24 heures en durée et ne peut chevaucher une autre plage.<br />**codes**: `timings`<br />**type**: `object[{begin: Date, end: Date}]`<br />**schema.org**: [eventSchedule](https://schema.org/eventSchedule)

**Important**: le fuseau. Il est important.

##### Exemple[​](#exemple-7 "Lien direct vers Exemple")

Une pièce de théatre qui a lieu tous les jours sur une semaine de 17h à 19h:

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

#### Âge du public ciblé[​](#âge-du-public-ciblé "Lien direct vers Âge du public ciblé")

Créneau min/max d'âge des participants ciblés.<br /><!-- -->Champ optionnel, il n'est pas possible d'annoncer un événement adaptés aux personnes d'un âge supérieur à 120 ans.<br />**code**: `age`<br />**type**: `objet {min: entier, max: entier}`<br />**schema.org**: [typicalAgeRange](https://schema.org/typicalAgeRange)

##### Exemple[​](#exemple-8 "Lien direct vers Exemple")

Valeur du champ âge pour un événement pour les enfants de 6 ans ou moins:

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

#### Mode de participation[​](#mode-de-participation "Lien direct vers Mode de participation")

Mode de participation à l’événement (physique/in-situ vs en ligne).<br /><!-- -->Par défaut, l'événement sera in-situ/physique (valeur `0`).

**code**: `attendanceMode`<br />**type**: `entier(1|2|3)`<br />**schema.org**: [eventAttendanceMode](https://schema.org/eventAttendanceMode)

##### Valeurs possibles[​](#valeurs-possibles "Lien direct vers Valeurs possibles")

* `1` (offline): Participation physique au lieu où se déroule l'événement
* `2` (online): Participation en ligne via un lien
* `3` (mixed): Participation mixte

#### Identifiant de lieu[​](#identifiant-de-lieu "Lien direct vers Identifiant de lieu")

Identifiant unique OpenAgenda du lieu associé à préciser dans les opérations d'*écriture*. En *lecture* c'est un objet `location` qui est fourni.<br />**Obligatoire** pour les événements dont le mode de participation est physique/offline (`1`) ou mixte (`3`). Sur les opérations de `lecture`, ce sont les informations détaillées dans [Lieux > Structure](https://developers.openagenda.com/lieux/structure.md) qui sont fournies.<br />**code**: `locationUid` en *écriture* ou `location.uid` en *lecture*.<br />**type**: `entier`

#### Lien d'accès[​](#lien-daccès "Lien direct vers Lien d'accès")

Lien hypertexte permettant l'accès à un événement en ligne ou mixte.<br /><!-- -->Champ **obligatoire** pour les événements dont le mode de participation (code `attendanceMode`) est *en ligne* (valeur `2`) ou *mixte* (valeur `3`). Champ non pertinent pour les événements physiques strictes.<br />**code**: `onlineAccessLink`<br />**type**: `lien hypertexte`<br />**schema.org**: [VirtualLocation](https://schema.org/VirtualLocation)

#### Liens enrichis[​](#liens-enrichis "Lien direct vers Liens enrichis")

Liste de paires de valeurs lien / code enrichi extraits de la description longue.<br /><!-- -->Ce champ est défini par un traitement interne à l'API.

**code**: `links`<br />**type**: `[{link, data}]`

##### Exemple[​](#exemple-9 "Lien direct vers Exemple")

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

#### Fuseau horaire[​](#fuseau-horaire "Lien direct vers Fuseau horaire")

Nom du fuseau horaire de référence. Voir [la liste des identifiants TZ](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).<br /><!-- -->Champ défini automatiquement à partir du lieu associé à l'événement pour les événements ayant un mode de participation `attendanceMode` physiques `1` ou mixtes `3`. À préciser pour les événements en ligne `2` au sens strict (c'est à dire non associés à un lieu).

**code**: `timezone`<br />**type**: `texte`<br />**exemple**: `Europe/Paris`

#### État[​](#état "Lien direct vers État")

L'état d'un événement informe l'utilisateur de sa disponibilité. Lorsque la valeur définie n'est pas la valeur par défaut (l'événement est programmé), l'information devient aussi essentielle que le titre.

**code**: `status`<br />**type**: `entier(1|2|3|4|5|6)`<br />**valeur par défaut**: Programmé (`1`)<br />**schema.org**: [eventStatus](https://schema.org/eventStatus)

##### Valeurs[​](#valeurs "Lien direct vers Valeurs")

* **Programmé** (`1`): État par défaut. L'événement est programmé aux horaires indiqués
* **Reprogrammé** (`2`): Les horaires ont changé
* **Déplacé en ligne** (`3`): L'événement qui se déroulait à un lieu physique n'est désormais accessible qu'en ligne
* **Reporté** (`4`): L'événement ne se déroule plus aux horaires indiqués, les nouveaux horaires ne sont pas encore disponibles
* **Complet** (`5`): L'événement n'est plus accessible aux nouveaux participants
* **Annulé** (`6`): L'événement n'est plus programmé aux horaires indiqués et n'est pas reporté.

#### Statut[​](#statut "Lien direct vers Statut")

Indique le statut de l'événement dans le cadre du circuit de modération d'un agenda. L'événement n'est publiquement accessible que s'il a un statut à "Publié" (`2`). Les événements ayant un autre statut ne sont visibles que par les utilisateurs membres de l'agenda et ayant un rôle de **modérateur** ou d'**administrateur**.

**code**: `state`<br />**type**: `entier(-1|0|1|2)`

##### Valeurs[​](#valeurs-1 "Lien direct vers Valeurs")

* **Publié** (`2`): L'événement est affiché sur les flux et la page de l'agenda.
* **Prêt à publier** (`1`): L'événement a été vu et traité par un membre modérateur ou administrateur. L'événement n'est visible que des membres autorisés.
* **À modérer** (`0`): L'événement n'a pas encore été traité par un membre modérateur ou administrateur de l'agenda. L'événement n'est visible que des membres autorisés.
* **Refusé** (`-1`): L'événement a été traité et a été refusé par un membre modérateur ou administrateur de l'agenda. En principe, un événement avec ce statut ne sera jamais publié sur l'agenda.

#### Date de création[​](#date-de-création "Lien direct vers Date de création")

Instant de la création de l'événement.<br /><!-- -->Ce champ n'est pas éditable.

**code**: `createdAt`<br />**type**: `date`

#### Date de mise à jour[​](#date-de-mise-à-jour "Lien direct vers Date de mise à jour")

Instant de la dernière mise à jour de l'événement.<br /><!-- -->Ce champ n'est pas éditable.

**code**: `updatedAt`<br />**type**: `date`

## Champs additionnels[​](#champs-additionnels "Lien direct vers Champs additionnels")

Des champs additionnels peuvent venir compléter le modèle standard d'un événement OpenAgenda. Ils sont définis à l'échelle d'un agenda ou d'un réseau d'agendas. Pour en savoir plus, rendez-vous [ici](https://developers.openagenda.com/agendas/schemas.md).
