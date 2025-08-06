---
sidebar_position: 1
---

# Recherche

Lister et rechercher les agendas publiés et indexés sur OpenAgenda

```bash
GET /v2/agendas
```

## Paramètres

### Filtres

| Clé            | Type      | Description | Valeurs |
|----------------|-----------|-------------|---------|
|`official`      | booléen   | Filtrer selon le critère officiel ou non des agendas | Indéfini par défaut. `0` pour filtrer sur les agendas non-officiels, `1` pour les officiels. |
|`search`        | texte     | Recherche synthaxique sur le titre et les termes clés d'un agenda, dérivant des événements publiés: géographie, mots clés | Exemples: `?search=Festival` ou `search=Loiret` |
|`network`       | entier    | Filtrer selon l'identifiant du réseau d'agendas souhaité | Exemple: `?network=34480426` |
|`locationSet`   | entier    | Filtrer selon l'identifiant du jeu de lieux souhaité | Exemple: `?locationSet=3892749` |
|`updatedAt.gte` | timestamp | Filtrer sur les agendas mis à jour après un moment donné. La variante `updatedAt.lte` est également possible. | Exemple: `?updatedAt.gte=2025-07-16T12:19:00.000Z` |
|`uid`           | entier[]  | Filtrer sur un ou plusieurs agendas par leurs identifiants uniques. | Exemple: `?uid=123` ou `?uid[]=123&uid[]=456` |
|`slug`          | texte[]   | Filtrer sur un ou plusieurs agendas par leurs codes url | Exemple: `?slug=loiret` ou `slug[]=cite-des-sciences&slug[]=versailles` |

### Contenu

| Clé | Variante | Type | Description | Valeurs |
|-----|----------------|------|-------------|---------|
| `includeFields` | `if` | texte[] | Liste des champs à récupérer. Utile pour limiter la volumétrie des données transférées au nécessaire. | `uid`, `title`, `image`, `description`, `official`, `slug`, `summary`, `schema`, `network`, `createdAt`, `locationSet`, `settings`|

### Navigation

| Clé     | Type     | Description                                                                   | Valeurs                                                                                                                                                                                                               |
|---------|----------|-------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `after` | entier[] | Clé à fournir pour récupérer le jeu suivant. Elle est donnée dans la réponse. | Exemple: `?after[]=1&after[]=36668061`                                                                                                                                                                                |
| `size`  | entier   | Nombre d'agendas à récupérer sur un appel. Maximum: 100.                      | Exemple: `?size=20`                                                                                                                                                                                                   |
| `sort`  | texte    | Filtrer par agendas officiels                                                 | `createdAt.desc` ou `recentlyAddedEvents.desc`. Si indéfini et avec un critère `search` de défini, le tri sera par pertinence, sinon, par ordre croissant d'identifiant. Le tri par défaut peut être amené à évoluer` |


## Exemples

### curl

```bash
curl -H "key: VOTRE_CLE_PUBLIQUE" \
  "https://api.openagenda.com/v2/agendas?size=2&official=1"
```

...donne:

```json
{
  "after": [1, 125325],
  "agendas": [
    {
      "uid": 62695,
      "image": "https://cdn.openagenda.com/main/agenda62695.jpg",
      "description": "Retrouvez tous les événements du patrimoine sur Grand Châtellerault",
      "official": true,
      "title": "Patrimoine Grand Châtellerault",
      "slug": "patrimoine-grand-chatellerault"
    },
    {
      "uid": 125325,
      "image": "https://cdn.openagenda.com/main/agenda125325.jpg",
      "description": "EPCC pour la connaissance, la valorisation, la conservation et la restauration des patrimoines ethnologique et muséographique en Normandie.",
      "official": true,
      "title": "La Fabrique de patrimoines en Normandie",
      "slug": "fabrique"
    }
  ],
  "total": 3886
}
```

Et:

```bash
curl -H "key: VOTRE_CLE_PUBLIQUE" \
  "https://api.openagenda.com/v2/agendas?size=2&official=1&after[]=1&after[]=125325"
```

... pour récupérer le jeu de résultats suivants.