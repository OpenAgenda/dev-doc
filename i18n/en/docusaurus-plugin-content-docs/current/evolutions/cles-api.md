---
title: API key permissions
description: Key expiry, authorization scope and visibility
sidebar_position: 1
---

# API key permissions

**Period: September 2026 - rolled out**

Keys associated with user accounts are now managed from [the API section](https://openagenda.com/settings/apiKey) of the settings. It is possible to:

1. set an expiry date for a given key;
2. define the allowed operations, read or write.

## Public keys only read published content

A public key (prefix `oa_pk_`) reads as a signed-out visitor: it only sees the published events of public agendas, whatever the role of its account. It can therefore be placed in a web page.

Reading unpublished events (to review, refused) requires a secret key (prefix `oa_sk_`), kept server side. With a public key, the `state` filter is ignored and only published events are returned.

## Existing keys

Keys carried over from the former system (without a prefix) keep their behavior: a public key without a prefix still reads with its account's rights. For use in a web page, generate an `oa_pk_` public key.

See [Authentication](/authentification) for how to use keys.
