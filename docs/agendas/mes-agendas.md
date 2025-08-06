---
title: Lister les agendas du compte authentifié
description: Un compte peut être membre d'un ou plusieurs agendas. Cette route permet de les lister
sidebar_position: 6
---

# Lister les agendas où le compte est membre

```bash
GET /v2/me/agendas
```

Consulter les agendas où l'utilisateur authentifié est membre

## En bref

* Une [authentification](/authentification) en lecture ou par jeton d'accès est requise.

## Navigation

| Clé            | Type     | Description                                                                                                   |
|----------------|----------|---------------------------------------------------------------------------------------------------------------|
| after          | entier | Clé à fournir pour récupérer le jeu suivant. Elle est donnée dans la réponse du dernier appel reçu              |
| limit          | entier   | Définit le nombre d'items récupérés par appel. Valeur par défaut: **20**. Valeur maximale possible: **100**   |

## Réponse

| Clé            | Type            | Description                                                                       |
|----------------|-----------------|-----------------------------------------------------------------------------------|
| total          | entier          | Le nombre total de membres                                                        |
| items          | objet[]         | La liste de paires agenda/membre                                                  |
| after          | entier          | Valeur à placer dans l'appel suivant pour récupérer le segment suivant            |

Pour chaque item de la liste fournie, les informations suivantes sont données:

| Clé                   | Type            | Description                                           |
|-----------------------|-----------------|-------------------------------------------------------|
| uid                   | entier          | Identifiant de l'agenda                               |
| title                 | texte           | Titre de l'agenda                                     |
| slug                  | texte           | Code URL de l'agenda                                  |
| member.userUid        | entier          | Identifiant du membre                                 |
| member.name           | texte           | Nom d'utilisateur ou nom                              |
| member.email          | courriel        | Courriel du membre                                    |
| member.phone          | téléphone       | Numéro de téléphone                                   |
| member.organization   | texte           | Organisme représenté                                  |
| member.role           | texte           | Rôle du membre: administrator, moderator, contributor |