# Lieux

```bash
[GET/POST/PATCH/PUT/DELETE] /v2/agendas/${agendaUID}/locations
```

Tout événement dont le mode de participation est soit In situ soit Mixte doit comporter une référence à un lieu qui est un objet à part entière sur OpenAgenda: chaque agenda dispose d'un référentiel de lieux. 

Le détail sur la structure d'un lieu ainsi que les opérations possibles est donné dans les pages suivantes:

* [Structure](/lieux/structure): détails des champs constitutifs d'un lieu.
* [Lecture](/lieux/lecture): Lire des données de lieux d'un agenda.
* [Création](/lieux/creation): Créer un lieu sur un agenda.
* [Édition](/lieux/modification): Mettre à jour complètement ou partiellement un lieu sur un agenda.
* [Suppression](/lieux/suppression): Supprimer un lieu.

## Quelques exemples

Voici quelques lieux présents sur OpenAgenda.

### Archives départementales du Nord

```json
{
  "uid": 72236530,
  "setUid": 59170,
  "slug": "archives-departementales-du-nord_1054862",
  "name": "Archives départementales du Nord",
  "address": "22, rue Saint-Bernard - Lille",
  "countryCode": "FR",
  "adminLevel1": "Hauts-de-France",
  "adminLevel2": "Nord",
  "adminLevel3": "Métropole Européenne de Lille",
  "adminLevel4": "Lille",
  "city": "Lille",
  "adminLevel5": null,
  "adminLevel6": "Wazemmes",
  "district": "Wazemmes",
  "postalCode": "59037",
  "insee": "59350",
  "latitude": 50.620123,
  "longitude": 3.042688,
  "region": "Hauts-de-France",
  "department": "Nord",
  "timezone": "Europe/Paris",
  "updatedAt": "2023-07-24T08:44:48.000Z",
  "createdAt": "2023-02-21T10:55:50.000Z",
  "description": {},
  "website": "http://www.archivesdepartementales.lenord.fr",
  "email": "archivedep@lenord.fr",
  "phone": "0359730600",
  "links": [],
  "access": {},
  "state": 0,
  "imageCredits": null,
  "extIds": null
}
```

### Musée de Metz

```json
{
  "uid": 13131110,
  "setUid": null,
  "slug": "musee-de-metz-la-cour-dor_2769859",
  "name": "Musée de Metz - La Cour d'Or",
  "address": "2 rue du haut poirier, 57000 Metz, France",
  "countryCode": "FR",
  "adminLevel1": "Grand Est",
  "adminLevel2": "Moselle",
  "adminLevel3": "Eurométropole de Metz",
  "adminLevel4": "Metz",
  "city": "Metz",
  "adminLevel5": "Bellecroix",
  "adminLevel6": "Bellecroix",
  "district": "Bellecroix",
  "postalCode": "57000",
  "insee": "57463",
  "latitude": 49.121009,
  "longitude": 6.178047,
  "region": "Grand Est",
  "department": "Moselle",
  "timezone": "Europe/Paris",
  "updatedAt": "2025-07-23T08:53:55.000Z",
  "createdAt": "2025-04-16T17:35:11.000Z",
  "image": "https://cdn.openagenda.com/main/location13131110.a3bfef9ede4a4029836244131a345ef5.jpg?_ts=1753260834908",
  "description": {
    "fr": "Les salles du musée d'histoire et d'archéologie regroupent des collections issues du patrimoine local de l'Antiquité jusqu'à la Renaissance. Des ensembles d'exception illustrent la période gallo-romaine : les thermes antiques, des stèles funéraires sculptées, une colonne à l'anguipède, un autel dédié à Mithra, de nombreux objets de la vie quotidienne ; le département médiéval illustre environ un millénaire d'art et d'histoire. On peut admirer : les tombes mérovingiennes, la statuaire présentée dans le Grenier de Chèvremont, les trésors médiévaux de la salle de l'an Mil, le chancel de l'église Saint Pierre aux Nonnains. La collection d'architecture révèle des vestiges civils et religieux dans un cadre atypique. Le visiteur doit également remarquer les éléments du décor intérieur comme les plafonds peints et le mobilier. La collection de beaux-arts réunit de nombreuses œuvres issues de mouvements artistiques différents : les œuvres de plusieurs écoles européennes (française, allemande, flamande, hollandaise) s'étendant du XVIe au XXe siècle, les œuvres des artistes de l'École de Metz."
  },
  "website": "https://musee.metzmetropole.fr",
  "email": "musees@metzmetropole.fr",
  "phone": "0387201320",
  "links": [],
  "access": {},
  "state": 1,
  "imageCredits": "© La Cour d'Or-Musée de Metz",
  "extIds": [
    {
      "key": "default",
      "value": "62adc12a-3316-5d66-9e6f-ca989ada7a13?dc93fb2a-806a-45dc-90ed-b72324c12e69"
    }
  ]
}
```