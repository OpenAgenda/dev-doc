---
sidebar_position: 1
slug: /
---

# Introduction

OpenAgenda met à disposition une API REST permettant de lire et d'éditer des contenus événementiels programmatiquement.

Les données des agendas publiés sont disponibles sous [licence ouverte](http://www.data.gouv.fr/fr/faq/). Des exports sont disponibles sous plusieurs formats : PDF, tableur, ICS, texte.

Bien que l'utilisation de l'API soit gratuite, elle requiert une authentification que ce soit en consultation ou en édition. Cette contrainte nous permet de lutter plus efficacement contre les usages abusifs.

Pour en savoir plus sur l'authentification, [rendez-vous ici](/authentification)

## Entités principales

### Agendas

OpenAgenda permet de gérer des contenus événementiels dans des agendas. Ces agendas sont administrés une communauté de modérateurs ou administrateurs qui décident de la configuration du formulaire de saisie, du circuit de contribution à suivre par les contributeurs avec qui ils peuvent converser via une messagerie propre à l'agenda. Les agendas peuvent être découverts, leur configuration consultée et peuvent être édités depuis le point suivant: 

```
https://api.openagenda.com/v2/agendas
```

[Rendez-vous ici](/agendas) pour plus de détails.

### Événements

Les événements d'un agenda peuvent être consultés, édités, publiés, recherchés via le point suivant:

```
https://api.openagenda.com/v2/agendas/{uid}/events
```

[Rendez-vous ici](/events) pour plus de détails.

## Commencer

Pour commencer à utiliser l'API OpenAgenda :

1. [Créez un compte](https://openagenda.com/signup) si vous n'en avez pas
2. Récupérez votre clé API dans vos [paramètres](https://openagenda.com/settings/apiKey)
3. Consultez la section [Authentification](/authentification) pour apprendre à utiliser votre clé
4. Explorez la section [Agendas](/agendas) pour voir comment consulter et éditer les agendas
5. Explorez la section [Événements](/events) pour comment consulter et éditer les événements publiés sur les agendas

