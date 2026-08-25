---
title: 'For your AI agents'
description: Resources for AI agents and tooling working with the OpenAgenda API
slug: /agents-ia
---

# For your AI agents

## Documentation

A summary: [llms.txt](https://developers.openagenda.com/llms.txt)  
The details: [llms-full.txt](https://developers.openagenda.com/llms-full.txt)

## Claude Code plugin

A [Claude Code](https://docs.claude.com/en/docs/claude-code) plugin marketplace is published at [OpenAgenda/claude-plugins](https://github.com/OpenAgenda/claude-plugins). The `openagenda` plugin guides and simplifies the building of event programme integrations: synchronising a data source (a CKAN portal, a ticketing API, a CSV file…) into one or more agendas.

To install, from Claude Code:

```
/plugin marketplace add OpenAgenda/claude-plugins
/plugin install openagenda
```

The plugin provides:

* the `build-openagenda-sync` skill: a three-step method — analyse the source, model the target agenda schema, set up a stateful synchronisation — with human-review checkpoints, a reference of the pitfalls met on the API, and a project scaffold (write client, sync core, transforms) to copy into each new project;
* the `/openagenda:oa-new-sync` command to start an integration from a source.

Worth reading first: [Preparing a data source](/guides/source-de-donnees).
