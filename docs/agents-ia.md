---
title: 'Pour vos agents IA'
description: Ressources pour les agents et outils IA travaillant avec l'API OpenAgenda
slug: /agents-ia
---

# Pour vos agents IA

## Documentation

Un résumé: [llms.txt](https://developers.openagenda.com/llms.txt)  
Le détail: [llms-full.txt](https://developers.openagenda.com/llms-full.txt)

## Plugin Claude Code

Un marketplace de plugins [Claude Code](https://docs.claude.com/en/docs/claude-code) est publié sur [OpenAgenda/claude-plugins](https://github.com/OpenAgenda/claude-plugins). Le plugin `openagenda` guide et simplifie la construction d'intégration de programmations: synchroniser une source de données (portail CKAN, API de billetterie, fichier CSV…) vers un ou plusieurs agendas.

Installation, depuis Claude Code:

```
/plugin marketplace add OpenAgenda/claude-plugins
/plugin install openagenda
```

Le plugin apporte:

* le skill `build-openagenda-sync`: une méthode en trois étapes — analyse de la source, modélisation du schéma de l'agenda cible, mise en place d'une synchronisation à état — assortie de points de relecture, d'un référentiel des pièges rencontrés sur l'API et d'un squelette de projet (client d'écriture, cœur de synchronisation, transformations) à copier dans chaque nouveau projet;
* la commande `/openagenda:oa-new-sync` pour démarrer une intégration à partir d'une source.

À lire en amont: [Préparer une source de données](/guides/source-de-donnees).
