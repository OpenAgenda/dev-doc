# Export JSON

⚠️ **Note importante:** N'utilisez pas cet export pour toute nouvelle implémentation. Utilisez [les fonctions de lectures décrites ici](/evenements/lecture) - L'export JSON documenté ici sera définitivement retiré à la fin de l'année 2025

[Une aide est disponible](/evenements/export-json-migration) détaillant les éléments principaux à prendre en compte pour une migration.

Utilisez cet export pour exploiter les événements publiés d'un agenda depuis votre application ou site web.

```bash
https://openagenda.com/agendas/{uid}/events.json
```

L'**uid** de votre agenda est visible en pied de barre latérale sur votre page agenda.

Un appel vous donnera les informations suivantes:

*   **total**: le nombre total d'événements dans l'agenda qui correspondant à votre requête
*   **limit:** le nombre maximal d'événements présents dans la réponse
*   **offset**: le positionnement des événements fournis dans la clé **events** par rapport à la liste complète des événements correspondants à votre requête
*   **events**: la liste d'événements de la tranche courante

Ajoutez la clé de votre compte OpenAgenda pour obtenir de meilleurs performances lors de vos requêtes. Lors de périodes de forte charge, les requêtes faites sans clés seront les premières à être impactées.

```bash
https://openagenda.com/agendas/{uid}/events.json?key={cléDeVotreCompteOA}
```

## Navigation

Pour naviguer dans la liste, utilisez soit le paramètre "page" soit "limit" et "offset". Si vous utilisez page, les événements seront paginés par groupe de 20.

Exemple :

```bash
https://openagenda.com/agendas/{uid}/events.json?page=2
```

ou:

```bash
https://openagenda.com/agendas/{uid}/events.json?limit=100&offset=200
```

La valeur maximale possible pour limit est 300.

## Filtres

Les filtres sont précisés dans une clé **oaq** de la requête et fonctionnent à l'identique de ceux utilisés sur les pages agenda d'[OpenAgenda](https://openagenda.com)

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[passed\]=1&oaq\[tags\]\[\]=cinema
```

**passed**: Inclure les événements passés.

*   oaq\[passed\]=0 : (valeur par défaut ) les événement passés sont exclus des résultats
*   oaq\[passed\]=1 : les événements passés sont inclus

**featured**: Limiter les résultats aux événements en une

*   oaq\[featured\]=1 : ne faire remonter que les événements en une
*   oaq\[featured\]=0 : exclure les événements en une

Pour filtrer par pays, ajouter le code pays en paramètre. Exemple :

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[countryCode\]=de
```

**lang**: Ne faire remonter que les événements saisis dans une langue donnée

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[lang\]=de
```

**tags**: Limiter les résultats aux événements associés aux valeurs à choix unique ou multiples précisés dans cette clé. Seuls les événements associés à tous les tags remonteront dans les résultats.

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[tags\]\[\]=patrimoine&oaq\[tags\]\[\]=exposition-visite
```

**tagsOperator**: Changer l'opérateur appliqué sur la sélection de tags précisée.

*   oaq\[tagsOperator\]=and : valeur par défaut. Chaque événement doit être associé à tous les tags précisés dans la requête
*   oaq\[tagsOperator\]=or : Chaque événement doit être associé à au moins un des tags précisés pour remonter dans les résultats

**lat, lng, radius**: Cibler une recherche centrée sur un point géographique, délimitée par un rayon en km

```bash
https://openagenda.com/agendas/{uid}/events.json?oaq\[lat\]=43.94&oaq\[lng\]=2.133&oaq\[radius\]=3
```

**neLat, neLng, swLat, swLng** : Délimiter une recherche sur un carré géographique

**updatedAtAfter** : délimiter une recherche aux événements mis à jour le plus récemment

*   Exemple : https://openagenda.com/fetedelascience2019\_bretagne?oaq\[updatedAtAfter\]=2019-10-04T14:25

**filtre par dates** : oaq\[from\]=2016-07-13&oaq\[to\]=2016-07-17

**filtre par étiquette** : oaq\[tags\]\[\]=slug

**filtre par lieu** : oaq\[location\]=73516559

**filtre pour un ou plusieurs événements**: oaq\[uids\]\[\]=uidev1&oaq\[uids\]\[\]=uidev2

**filtre par lieux avec une réference externe** : oaq\[locationExtId\]=someextref123

**filtre par zone géographique** : oaq\[neLat\]=49.368&oaq\[neLng\]=2.153&oaq\[swLat\]=44.887&oaq\[swLng\]=-4.87

**filtre par proximité géographique** : ?geolocate=   Attention, ceci ne fonctionne que sur les URL en HTTPS.

**filtre par organisation** : oaq\[org\]=code-organisation

**filtre sur recherche libre** : oaq\[what\]=alaouanagaine

**filtre accessibilité**: oaq\[accessibility\]\[\]=mi&oaq\[accessibility\]\[\]=pi

**filtre recherche ciblé : ville** : oaq\[what\]=paris&oaq\[scope\]=city

**filtre recherche ciblé : quartier** : oaq\[what\]=Centre-Ville&oaq\[scope\]=district ([exemple à Arles, quartier Centre-ville](https://openagenda.com/arles-agenda?oaq%5Bwhat%5D=Centre%20Ville&oaq%5Bscope%5D=district))

**filtre recherche ciblée : département** : oaq\[what\]=Charente&oaq\[scope\]=department

**filtre recherche ciblée : région** : oaq\[what\]=Bretagne&oaq\[scope\]=region

**cibles possibles pour la recherche** : title, description, keywords, placename, city, region, department, postcode, district, country, category, tags

**Note** : il est possible de combiner les filtres pour un ciblage plus précis (en utilisant "&"), ex : [https://openagenda.com/agendas/84693279/events.json?oaq\[uids\]\[\]=95031995&oaq\[uids\]\[\]=81710536](https://openagenda.com/agendas/84693279/events.json?oaq[uids][]=95031995&oaq[uids][]=81710536)

## Tris

Le tri par défaut place les événements en une en premier, suivi des événements triés pas occurrence la plus proche. Les alternatives de tris sont les suivantes:

Les plus récemment mis à jour en premier :

```bash
https://openagenda.com/agendas/85158148/events.json?oaq\[order\]=update
```

Les prochaines occurrences à venir en premier:

```bash
https://openagenda.com/agendas/85158148/events.json?oaq\[order\]=upcoming
```

Les dernières occurrences en premier:
```bash
https://openagenda.com/agendas/85158148/events.json?oaq\[order\]=latest
```

Les événements les plus proches en premier ( les paramètres oaq\[lat\] et oaq\[lng\] doivent être précisés ):

```bash
https://openagenda.com/agendas/85158148/events.json?oaq\[order\]=proximity
```

## Structure d'un événement de l'export

Voici la liste des champs disponibles pour chaque événement présents dans l'export:

*   **uid**: identifiant unique de l'événement
*   **slug**: déclinaison du titre utilisable pour une url (ex: le slug de "L'événement" est 'l-evenement'
*   **canonicalUrl**: url canonique de l'événement
*   **title**: Champ multilingue. Titre de l'événement
*   **description**: Champ multilingue. Description courte de l'événement.
*   **longDescription**:Optionnel. Champ multilingue Markdown. Description longue de l'événement.
*   **keywords**:Optionnel. Champ multilingle de listes. Mots clés de l'événement
*   **html**: Optionnel. Variante HTML du champ **longDescription**
*   **image**: Optionnel. image formattée de l'événement. Redimensionnée pour tenir sur une largeur de 600px. Au format jpg
*   **thumbnail**: Optionnel. Vignette de l'événement ( 200x200 pixels ) au format jpg
*   **originalImage**:Optionnel. Image en taille d'origine au format jpg.
*   **age**:Optionnel. Age du public ciblé ( par défaut: null ). Si défini, objet `{ min, max }`
*   **accessibility\[\]**: Liste. Disponibilités d'installations pour personnes à handicap moteur ( mi ), psychique ( pi ), auditif ( hi ), visuel ( vi ), mental ( mei )
*   **updatedAt**: date de dernière mise à jour de l'événement
*   **range**: Champ multilingue. Résumé des horaires.
*   **imageCredits**: Optionnel. Crédits de l'image associée
*   **conditions**: Optionnel. Champ multilingue. Conditions d'accès à l'événement ( tarifs, gratuité, inscription requise.. )
*   **registration\[\]**: liste de moyens d'inscriptions  
    
*   **value**: valeur
*   **type**: type de la valeur: "phone": téléphone, "email": email, "link": lien hypertexte
*   **prefix**: utile pour constituer un lien html. "mailto:" ou "tel:"
*   **firstDate:** "2020-03-10"
*   **firstTimeStart:** "20:30"
*   **firstTimeEnd:** "22:00"
*   **lastDate:** "2020-03-10"
*   **lastTimeStart:** "20:30"
*   **lastTimeEnd:** "22:00"
*   **origin**: agenda où l'événement a été contribué
*   **uid**: identifiant unique de l'agenda d'origine
*   **title**: titre de l'agenda d'origine
*   **url**: url associé à l'agenda d'origine
*   **slug**: code url de l'agenda d'origine
*   **oaUrl**: url OpenAgenda de l'agenda d'origine
*   **timings\[\]**
*   **start**: heure de début ( format 2018-09-29T12:00:00.000Z )
*   **end**: heure de fin ( même format )
*   **location**: lieu où se déroule l'événement
*   **uid**: identifiant unique du lieu
*   **name**: nom du lieu
*   **slug**: nom du lieu codifié pour url
*   **address**: address complète du lieu
*   **image**: Optionnel. image du lieu
*   **imageCredits**: Optionnel. crédits de l'image du lieu
*   **postalCode**: Optionnel. code postal
*   **city**:Optionnel. ville / commune
*   **district**:Optionnel. quartier
*   **department**:Optionnel. département
*   **region**:Optionnel. région
*   **countryCode**: code pays
*   **latitude**: coordonnée géographique
*   **longitude**: coordonnée géographique
*   **description**:Optionnel. Champ multilingue. Description du lieu.
*   **access**:Optionnel. Champ multilingue. Accès au lieu
*   **website**:Optionnel. site web du lieu
*   **links\[\]**: autres liens ( facebook, twitter, etc )
*   **insee**:Optionnel. code insee de la commune
*   **phone**:Optionnel. numéro de téléphone du lieu
*   **timezone**: fuseau horaire ( ex: Europe/Paris )
*   **updatedAt**: heure et date de la dernière mise à jour
*   **country**: Champ multilingue. Labels pays et code.
*   **extId**: un identifiant de l'événement exterieur à OpenAgenda
*   **tagGroups\[\]**: Champs personnalisés: groupes de tags
*   **name**: Nom du groupe
*   **access**: accès en lecture ( public, private )
*   **slug**: nom codifié pour url
*   **tags\[\]**: liste des tags
*   **label**: label d'un tag
*   **slug**: code url d'un tag
*   **id**: identifiant d'un tag

## Options

*   **include\_embedded**: ajoutez ce paramètre à l'url pour inclure les contenus riches dans les champs html des événements. Exemple: https://openagenda.com/agendas/85158148/events.json?oaq\[featured\]=1&include\_embedded=1