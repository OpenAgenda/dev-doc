---
sidebar_position: 5
---

# Lister les membres d'un agenda

Consulter les identifiants des membres d'un agenda ainsi que leur rôle et le détail de leurs fiches contact.

```bash
GET /v2/agendas/{agendaUID}/members
```

## En bref

* `agendaUID` est l'identifiant unique de l'agenda où les membres sont référencés
* Une [authentification](/authentification) en lecture ou par jeton d'accès est requise.
* L'utilisateur authentifié doit être modérateur ou administrateur de l'agenda

## Navigation

| Clé            | Type     | Description                                                                                                        |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------|
| after          | entier | Clé à fournir pour récupérer le jeu suivant. Elle est donnée dans la réponse du dernier appel reçu                 |
| limit          | entier   | Définit le nombre de membres récupérés par appel. Valeur par défaut: **20**. Valeur maximale possible: **100**   |

## Réponse

| Clé            | Type            | Description                                                                       |
|----------------|-----------------|-----------------------------------------------------------------------------------|
| total          | entier          | Le nombre total de membres                                                        |
| items          | objet[]         | La liste des membres                                                              |
| after          | entier          | Valeur à placer dans l'appel suivant pour récupérer le segment de membres suivant |

Pour chaque item de la liste fournie, les informations suivantes sont données.

| Clé            | Type            | Description                                           |
|----------------|-----------------|-------------------------------------------------------|
| uid            | entier          | Identifiant du membre                                 |
| name           | texte           | Nom d'utilisateur ou nom                              |
| email          | courriel        | Courriel du membre                                    |
| phone          | téléphone       | Numéro de téléphone                                                      |
| organization   | texte           | Organisme représenté                                  |
| role           | texte           | Rôle du membre: administrator, moderator, contributor |
