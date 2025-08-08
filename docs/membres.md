---
sidebar_position: 5
---

# Les membres d'un agenda

## Lister

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

## Inviter

Inviter des utilisateurs à devenir membre d'un agenda.

```http
POST /v2/agendas/{agendaUID}/members/invite
```

Les informations suivantes doivent être placées en corps de requête:

* `role`: Obligatoire. Les valeurs possibles sont `contributor`, `moderator`, `administrator`
* `emails`: Liste des emails à inviter
* `message`: Optionnel. Le message d'invitation au format markdown.

### Réponse

| Clé            | Type            | Description                                                                                                        |
|----------------|-----------------|--------------------------------------------------------------------------------------------------------------------|
| queued         | entier          | Le total d'invitations à traiter. Au delà d'un certain nombre d'emails, le traitement passe dans une tâche de fond |
| processed      | objet[]         | La liste des membres invités                                                                                       |

#### Exemple d'un membre invité

```
{
  "userUid": null,
  "deletedUser": false,
  "name": null,
  "phone": null,
  "email": "gaetan.la@tou.ch",
  "position": null,
  "organization": null,
  "role": "moderator",
}
```