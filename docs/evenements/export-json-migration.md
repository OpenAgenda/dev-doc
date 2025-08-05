# Migration de l'export JSON vers l'API

L'export JSON, en place depuis 2015 et en déprécation depuis 2022, arrive en fin de vie en fin 2025. Prévoyez une mise à jour de vos scripts & applications qui s'en servent pour passer à l'API v2, en place depuis 2018. Ce guide à pour objectif de fournir les éléments utiles pour vous assurer une migration dans les meilleures conditions.

## Quelques détails:

*   **L'export JSON** : Nous appelons ici "export JSON" le lien qui était donné sur le menu d'export des pages agenda sur https://openagenda.com pour lire le contenu d'un agenda au format JSON. Il prend la forme suivante : `https://openagenda.com/agendas/{agendaUid}/events.json` et est documenté ici : [https://developers.openagenda.com/export-json-dun-agenda/](https://developers.openagenda.com/export-json-dun-agenda/)
*   **Lecture API v2** : Le point de lecture des événements d'un agenda via l'API v2 documenté sur cette page [https://developers.openagenda.com/10-lecture/](https://developers.openagenda.com/10-lecture/) et prend la forme `https://api.openagenda.com/v2/agendas/{agendaUid}/events`

Toute migration doit prendre en compte les trois aspects détaillés dans les sections suivantes:

1.  **Les filtres** : la syntaxe évolue, en particulier pour les filtres temporels et les tags/categories qui sont remplacés par des champs additionnels,
2.  **La navigation** : les clés à utiliser changent,
3.  **Les contenus** : tags & categories disparaissent et sont remplacés par des champs additionnels, d'autres ajustements sont détaillés ci-dessous.

## Les filtres

L'export JSON rassemble tous les filtres dans une clé de requête _oaq_. Les filtres de l'API de lecture v2 se mettent directement au premier niveau.

**Important** : par défaut, l'export JSON ne présente que les événements à venir, triés du plus proche au plus lointain dans le temps. Sur l'API v2, tous les événements publiés sont présentés, en premier ceux à venir du plus proche du temps présent au plus lointain suivi des passés du plus proche du présent au plus lointain. Pour limiter la sélection sur l'API v2 aux événements présents et à venir, le filtre suivant doit être utilisé :

`?relative[]=ongoing&relative[]=upcoming`

Par exemple, une requête délimitant les événements qui se déroulent sur une journée précise sont ciblées de la manière suivante sur l'export JSON:

`https://openagenda.com/agendas/{agendaUid}/events.json?oaq[from]=2021-02-07`

... et de la manière suivante sur l'API v2:

`https://api.openagenda.com/v2/agendas/{agendaUid}/events?timings[gte]=2022-02-01T23:00:00.000Z&timings[lte]=2022-02-02T22:59:59.999Z`

Il y a des petites variations pour chaque filtres, documentées dans les pages données en tête d'article. Le principal changement concerne le remplacement de la notion de _tag_ sur openagenda.com par la notion de _champ additionnels_ : sur l'export JSON, la clé oaq\[_tags\]_ est utilisée pour filtrer sur une valeur provenant d'un champ à choix sur le formulaire événement de l'agenda correspondant. Sur l'API v2, la clé à utiliser est celle du champ même, donnée dans la configuration de l'agenda ([documenté ici](/agendas/lecture)).

Les valeurs à préciser ne sont plus les codes de tags mais les identifiants. Ainsi, le filtre suivant sur l'export JSON :

`https://openagenda.com/agendas/{agendaUid}/events.json?oaq[tags][]=atelier&key=VOTRECLE`

... devient sur l'API v2 :

`https://api.openagenda.com/v2/agendas/{agendaUid}/events?categories-metropolitaines[]=3&key=VOTRECLE`

## La navigation

Dans les deux cas, les résultats sont paginés. Dans le cas de l'export JSON, seule une navigation qui utilise les clés ?offset et &limit est possible.

L'équivalence sur l'API v2 est retrouvée en utilisant les clés ?from et &size

**Important**: pour la lecture de programmations entières, l'API v2 propose une clé _after_ à utiliser dans le cadre d'une boucle de lecture. Il faut éviter de boucler sur un grand nombre d'itérations avec la clé _from_. Plus la valeur _from_ sera importante, moins la requête sera performante. Les trop grandes valeurs de _from_ peuvent être bloquées.

## Les contenus

Par défaut, seuls certains champs sont présentés sur l'API. Pour avoir le détail des horaires ainsi que les champs additionnels, il faudra rajouter un ?detailed=1 à la requête.

Les évolutions sur les champs suivants sont à prendre en compte.

### Champ image

Sur l'export JSON, les images étaient présentées en premier niveau derrière les clés _image, thumbnail_ et _originalImage_

Désormais, les données image sont présentées sous une unique clé image, tel que documenté ici: [https://developers.openagenda.com/00-structure-evenement/#image](https://developers.openagenda.com/00-structure-evenement/#image)

### Liste des plages horaires

Sur l'export, une liste d'items avec clés `{ start, end }` est donnée derrière la clé `timings`, dont les valeurs sont calées sur le fuseau UTC.

Sur l'API, la clé _start_ est remplacée par une clé _begin._ Les horaires sont données dans le fuseau local.

Par exemple, une donnée _start_ d'un premier item de la liste _timings_ de l'export JSON avec pour valeur _2022-02-07T09:00:00.000Z_ sera présentée sous la clé _begin_ dans l'API avec la valeur _2022-02-07T10:00:00+0100_

### Les tags et les champs custom

Les tags & champs custom de l'export JSON sont présentés sous 3 clés: _tags_ et _tagGroups_ pour les tags, _custom_ pour les données particulières aux agendas.

Sur OpenAgenda, les tags et champs custom sont désormais intégrés dans une notion de _champs additionnels._ Les codes _tags, tagGroups_ ou _custom_ de l'export JSON ne sont pas repris sur l'API v2. Les valeurs de chaque champ additionnel sont présentées sous des clés propres à chaque champ. Ces clés, ainsi que les identifiants des sélections proposées par les champs additionnels à choix sont listées dans [la configuration de l'agenda](/agendas/lecture).

### La description longue

L'export JSON décline la description longue sous deux clés : _longDescription_ et _html._ Une option (include\_embedded) permet de remplacer les liens pointant vers des contenus multimédias par leurs équivalents "embeds".

L'API ne présente plus que le champ _longDescription_, son format peut être contrôlé par le paramètre _longDescriptionFormat_ tel que détaillé ici : [https://developers.openagenda.com/10-lecture/](https://developers.openagenda.com/10-lecture/)

### Les lieux

Toutes les données relatives au lieu où se déroule l'événement se trouvent désormais sous la clé _location._

**A noter**: il est désormais possible de définir des événements en ligne sur OpenAgenda. Dans ce cas, la saisie du lieu devient optionnelle.

### Aménagements à l'accessibilité

La structure de la donnée sous la clé _accessibility_ liste désormais tous les types possibles sous la forme d'un objet. Exemple :

```
{
  ...
  "accessibility":{"ii":false,"hi":false,"vi":false,"pi":false,"mi":true}
  ...
}
```

### Autres

*   _origin_ se nomme désormais _originAgenda._ Cette donnée décrit l'agenda dans lequel l'événement a été saisi. Vient s'ajouter _sourceAgenda_, qui fait référence à l'agenda d'où est remonté l'événement, en cas d'un ajout automatique depuis l'une des sources de l'agenda.