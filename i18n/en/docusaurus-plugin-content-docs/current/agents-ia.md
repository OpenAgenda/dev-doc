---
title: 'For your AI agents'
description: Resources for AI agents and tooling working with the OpenAgenda API
slug: /agents-ia
---

# For your AI agents

## Documentation

A summary: [llms.txt](https://developers.openagenda.com/llms.txt)  
The details: [llms-full.txt](https://developers.openagenda.com/llms-full.txt)

## MCP server

OpenAgenda runs an [MCP](https://modelcontextprotocol.io) server at `https://mcp.openagenda.com/mcp`. It is built on the v3 API, which is separate from the v2 API this site documents. A compatible assistant connects with your OpenAgenda account and can do anything that API allows, within what you approve when connecting.

To install, from Claude Code:

```
claude mcp add --transport http openagenda https://mcp.openagenda.com/mcp
```

Other clients and how the server works are described on [mcp.openagenda.com](https://mcp.openagenda.com).

The same server also runs on your own machine with the [`@openagenda/mcp`](https://www.npmjs.com/package/@openagenda/mcp) package: it then acts with the rights of the API key you give it.

v3 API documentation: [api.openagenda.com/v3](https://api.openagenda.com/v3)  
v3 API OpenAPI contract: [openapi.yaml](https://api.openagenda.com/v3/openapi.yaml)

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
