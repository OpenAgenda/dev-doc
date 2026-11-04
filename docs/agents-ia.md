---
title: 'Pour vos agents IA'
description: Ressources pour les agents et outils IA travaillant avec l'API OpenAgenda
slug: /agents-ia
---

# Pour vos agents IA

## Documentation

Un résumé: [llms.txt](https://developers.openagenda.com/llms.txt)  
Le détail: [llms-full.txt](https://developers.openagenda.com/llms-full.txt)

## Serveur MCP

OpenAgenda publie un serveur [MCP](https://modelcontextprotocol.io) à l'adresse `https://mcp.openagenda.com/mcp`. Il s'appuie sur l'API v3, distincte de l'API v2 que documente ce site. Un assistant compatible s'y connecte avec votre compte OpenAgenda et peut faire tout ce qu'elle permet, dans les limites que vous acceptez à la connexion.

Installation dans les outils de votre ordinateur (Claude Code, Cursor, VS Code…), avec Node.js:

```
npx add-mcp https://mcp.openagenda.com/mcp
```

Les autres clients et le fonctionnement du serveur sont décrits sur [mcp.openagenda.com](https://mcp.openagenda.com).

Le même serveur se lance aussi sur votre machine avec le paquet [`@openagenda/mcp`](https://www.npmjs.com/package/@openagenda/mcp): il agit alors avec les droits de la clé d'API que vous lui donnez.

Documentation de l'API v3: [api.openagenda.com/v3](https://api.openagenda.com/v3)  
Contrat OpenAPI de l'API v3: [openapi.yaml](https://api.openagenda.com/v3/openapi.yaml)

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
