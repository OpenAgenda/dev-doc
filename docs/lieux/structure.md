---
sidebar_position: 1
---

# Structure d'un lieu

Un lieu est un point de rencontre physique: un bâtiment, un lieu-dit, un espace ouvert... Voici la liste complète des champs définissant un lieu.

| Champ                     | Code           | Description                                                                                                              |
| ------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------|
| Identifiant               | `uid`          | Identifiant unique du lieu (non éditable)                                                                                |
| Nom du lieu ⁽ʳ⁾           | `name`         | Texte (max. 100 caractères). Exemple : *Musée de la Folie Marco*                                                         |
| Identifiants externes ⁽ᵒ⁾ | `extIds`       | Liste de clés/paires identifiant le lieu sur des jeux de données externes à OpenAgenda. Voir [ci-dessous](#identifiants-externes) pour des détails. |
| Adresse ⁽ʳ⁾               | `address`      | Texte (max. 255 caractères)                                                                                              |
| Accès ⁽ᵒ⁾                 | `access`       | Texte multilingue (max. 1000 caractères). Instructions d’accès (ex. `{ fr: "Métro 3, Pont de Levallois" }`)              |
| Description ⁽ᵒ⁾           | `description`  | Texte multilingue (max. 5000 caractères). Présentation du lieu (voir l’exemple pour Château de Villeneuve La Comtesse)   |
| Image ⁽ᵒ⁾                 | `image`        | URL ou objet d’illustration du lieu                                                                                      |
| Crédits image ⁽ᵒ⁾         | `imageCredits` | Crédits liés à l’illustration                                                                                            |
| Slug                      | `slug`         | Identifiant textuel non éditable                                                                                         |
| Jeu de lieu               | `setUid`       | Identifiant du jeu de lieux associé (non éditable)                                                                       |
| Ville ⁽ᵍ⁾                 | `city`         | Ville ou commune                                                                                                         |
| Département ⁽ᵍ⁾           | `department`   | Département (pour lieux en France)                                                                                       |
| Région ⁽ᵍ⁾                | `region`       | Région (pour lieux en France)                                                                                            |
| Code postal ⁽ᵍ⁾           | `postalCode`   | Code postal                                                                                                              |
| Code INSEE ⁽ᵍ⁾            | `insee`        | Code INSEE de la commune                                                                                                 |
| Pays ⁽ʳ⁾                  | `countryCode`  | Code pays ISO 3166‑1 alpha 2 (ex. `CH`)                                                                                  |
| Quartier ⁽ᵍ⁾              | `district`     | Quartier                                                                                                                 |
| Latitude ⁽ᵍ⁾              | `latitude`     | Coordonnée géographique décimale (ex. `48.4102778`)                                                                      |
| Longitude ⁽ᵍ⁾             | `longitude`    | Coordonnée géographique décimale (ex. `7.4511111`)                                                                       |
| Fuseau horaire ⁽ᵍ⁾        | `timezone`     | Exemple : `Europe/Paris`                                                                                                 |
| Site web ⁽ᵒ⁾              | `website`      | URL principale                                                                                                           |
| Email ⁽ᵒ⁾                 | `email`        | Adresse email de contact principale                                                                                      |
| Téléphone ⁽ᵒ⁾             | `phone`        | Numéro de téléphone de contact principal                                                                                 |
| Autres liens ⁽ᵒ⁾          | `links`        | Liste de liens hypertextes (ex. réseaux sociaux, site extérieur)                                                         |
| Statut ⁽ᵒ⁾                | `state`        | Statut du lieu : `0` (à vérifier) ou `1` (vérifié)                                                                       |
| Date création             | `createdAt`    | Date de création (non éditable)                                                                                          |
| Date mise à jour          | `updatedAt`    | Date de dernière mise à jour (non éditable)                                                                              |
| Identifiant externe ⁽ᵒ⁾   | `extId`        | **Déprequé**: référence au lieu un jeu de données externe à OpenAgenda                                                   |

**(r)** requis à la création et en mise à jour complète
**(o)** optionnel à la création/mise à jour  
**(g)** généré automatiquement par géocodage si non fourni 

## Identifiants externes

Il est possible d'associer à un lieu référencé sur OpenAgenda des identifiants autres que son identifiant unique (UID). Ce dernier est toujours défini et ne peut être édité.

Les identifiants externes pour lier le lieux à des référentiels exterieurs à OpenAgenda. Par exemple, la donnée suivante montre un lieu qui porte une référence à la [base deslieux culturels du ministère de la Culture](https://basedeslieux.culture.gouv.fr/) ainsi qu'une autre d'un répertoire de la [métropole de Nantes](https://metropole.nantes.fr)

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