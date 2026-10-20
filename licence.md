# Licence et conditions d'utilisation

Les données lues via l'API OpenAgenda sont publiées par les agendas sous une licence qui en encadre la réutilisation. Lorsque vous affichez ces données sur un site, une application ou toute autre plateforme, vous devez respecter les conditions de cette licence.

Pour vous y aider, les données exportées portent une clé `rights` qui précise la licence applicable ainsi que le concédant et l'éditeur des données.

## En bref[​](#en-bref "Lien direct vers En bref")

* Chaque événement lu via l'API porte une clé `rights` décrivant sa licence, son concédant et son éditeur.
* La clé `rights` est en lecture seule : elle n'est pas éditable via les routes de création ou d'édition.
* Avant d'afficher ou de redistribuer des données, consultez la licence indiquée dans `rights.license` et respectez ses conditions.

## La clé `rights`[​](#la-clé-rights "Lien direct vers la-clé-rights")

### Exemple[​](#exemple "Lien direct vers Exemple")

```
{
  ...
  "rights": {
    "license": {
      "name": "Licence Ouverte 2.0",
      "id": "etalab-2.0",
      "url": "https://www.data.gouv.fr/pages/legal/licences/etalab-2.0/"
    },
    "licensor": {
      "agendaUid": 6862496,
      "name": "RNCAP",
      "url": "https://rncap.org/"
    },
    "publisher": {
      "agendaUid": 6862496,
      "name": "RNCAP",
      "url": "https://rncap.org/"
    }
  },
  ...
}
```

### Détail[​](#détail "Lien direct vers Détail")

| Clé                   | Type   | Description                                                                                             |
| --------------------- | ------ | ------------------------------------------------------------------------------------------------------- |
| `license`             | objet  | La licence sous laquelle les données sont diffusées                                                     |
| `license.name`        | texte  | Nom lisible de la licence, à afficher dans les mentions                                                 |
| `license.id`          | texte  | Identifiant stable de la licence (ex. `etalab-2.0`), à utiliser dans votre code                         |
| `license.url`         | lien   | Lien vers le texte de la licence                                                                        |
| `licensor`            | objet  | Le concédant : l'entité qui détient les droits sur les données et les met à disposition sous la licence |
| `licensor.agendaUid`  | entier | Identifiant de l'agenda du concédant                                                                    |
| `licensor.name`       | texte  | Nom du concédant, à citer comme source des données                                                      |
| `licensor.url`        | lien   | Site web du concédant                                                                                   |
| `publisher`           | objet  | L'éditeur : l'entité qui publie les données sur OpenAgenda                                              |
| `publisher.agendaUid` | entier | Identifiant de l'agenda de l'éditeur                                                                    |
| `publisher.name`      | texte  | Nom de l'éditeur                                                                                        |
| `publisher.url`       | lien   | Site web de l'éditeur                                                                                   |

### Concédant et éditeur[​](#concédant-et-éditeur "Lien direct vers Concédant et éditeur")

Le concédant (`licensor`) et l'éditeur (`publisher`) sont souvent la même entité, comme dans l'exemple ci-dessus. Ils peuvent toutefois différer, par exemple lorsqu'un agenda rediffuse des événements produits par un autre agenda. Dans ce cas, c'est le **concédant** qui doit être cité comme source des données.

Les données d'un même agenda peuvent provenir de plusieurs concédants. Lisez donc la clé `rights` événement par événement plutôt que de supposer une licence unique pour tout un agenda.

## Licence Ouverte 2.0[​](#licence-ouverte-20 "Lien direct vers Licence Ouverte 2.0")

La [Licence Ouverte / Open Licence 2.0](https://www.data.gouv.fr/pages/legal/licences/etalab-2.0/) (identifiant `etalab-2.0`) est la licence de référence pour les données publiques en France. Elle est compatible avec les licences [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.fr), [Open Government Licence](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/) et [ODC-BY](https://opendatacommons.org/licenses/by/).

### Ce qu'elle permet[​](#ce-quelle-permet "Lien direct vers Ce qu'elle permet")

La licence autorise librement, y compris à des fins commerciales :

* la reproduction et la copie des données ;
* leur adaptation, modification, extraction et transformation, notamment pour créer des données dérivées ;
* leur communication et leur diffusion ;
* leur exploitation, notamment en les combinant avec d'autres données ou en les intégrant dans un produit ou un service.

### Ce qu'elle impose[​](#ce-quelle-impose "Lien direct vers Ce qu'elle impose")

La réutilisation est conditionnée à la **mention de la paternité** des données, qui doit indiquer :

* la **source** des données, a minima le nom du concédant (`rights.licensor.name`), par exemple sous la forme d'un lien vers son site (`rights.licensor.url`) ;
* la **date de dernière mise à jour** des données, disponible sur le champ `updatedAt` de l'événement.

Cette mention ne doit ni conférer un caractère officiel à votre réutilisation, ni suggérer une quelconque caution du concédant.

### Exemple de mention[​](#exemple-de-mention "Lien direct vers Exemple de mention")

```
<p class="event-credits">
  Source : <a href="https://rncap.org/">RNCAP</a>
  — <a href="https://www.data.gouv.fr/pages/legal/licences/etalab-2.0/">Licence Ouverte 2.0</a>
  — mis à jour le 12/10/2026
</p>
```

## Bonnes pratiques d'affichage[​](#bonnes-pratiques-daffichage "Lien direct vers Bonnes pratiques d'affichage")

* **Affichez les mentions au plus près des données** : sur la page de l'événement ou à côté de chaque événement dans une liste. Si tous les événements affichés partagent la même licence et le même concédant, une mention unique visible sur la page suffit.
* **Mettez les mentions à jour** : la clé `rights` peut évoluer. Si vous synchronisez les données dans votre propre base, rafraîchissez-la à chaque synchronisation, avec le reste de l'événement.
* **Conservez les crédits image** : les illustrations ont leurs propres crédits, indiqués dans le champ [`imageCredits`](https://developers.openagenda.com/evenements/structure.md#cr%C3%A9dits-image). Ils s'ajoutent à la mention de la licence et doivent être affichés avec l'image.

## Conditions d'utilisation de l'API[​](#conditions-dutilisation-de-lapi "Lien direct vers Conditions d'utilisation de l'API")

* L'utilisation de l'API est gratuite. Elle requiert une [authentification](https://developers.openagenda.com/authentification.md), en lecture comme en écriture, pour permettre de lutter contre les usages abusifs.
* En réutilisant les données lues via l'API, vous vous engagez à respecter la licence de chaque donnée, telle qu'indiquée par la clé `rights`.
* Les données sont fournies telles que publiées par les agendas. Leur exactitude relève de la responsabilité de leurs éditeurs.
