---
sidebar_position: 3
---

# Formats de données

L'API OpenAgenda supporte plusieurs formats de données pour répondre aux différents besoins d'intégration.

## JSON (par défaut)

Le format JSON est le format par défaut de l'API. Toutes les réponses sont en JSON sauf indication contraire.

### Exemple de réponse JSON

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "uid": "12345",
        "title": "Concert de jazz",
        "description": "Un concert exceptionnel...",
        "dateRange": {
          "start": "2024-03-15T20:00:00Z",
          "end": "2024-03-15T23:00:00Z"
        },
        "location": {
          "name": "Salle Pleyel",
          "address": "252 Rue du Faubourg Saint-Honoré, 75008 Paris"
        }
      }
    ]
  },
  "total": 1
}
```

## JSON-LD

Le format JSON-LD est disponible pour les données structurées compatibles avec Schema.org.

### Demander du JSON-LD

```bash
curl -H "Accept: application/ld+json" \
  https://api.openagenda.com/v2/events/12345
```

### Exemple de réponse JSON-LD

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Concert de jazz",
  "startDate": "2024-03-15T20:00:00Z",
  "endDate": "2024-03-15T23:00:00Z",
  "location": {
    "@type": "Place",
    "name": "Salle Pleyel",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "252 Rue du Faubourg Saint-Honoré",
      "addressLocality": "Paris",
      "postalCode": "75008"
    }
  }
}
```

## XML

Le format XML est disponible pour la compatibilité avec les systèmes legacy.

### Demander du XML

```bash
curl -H "Accept: application/xml" \
  https://api.openagenda.com/v2/events/12345
```

## Paramètres de format

Vous pouvez également spécifier le format via un paramètre de requête :

```bash
# JSON
https://api.openagenda.com/v2/events?format=json

# JSON-LD
https://api.openagenda.com/v2/events?format=jsonld

# XML
https://api.openagenda.com/v2/events?format=xml
```

## Encodage

- **UTF-8** pour tous les formats
- **Content-Type** approprié dans les en-têtes de réponse
- **Caractères spéciaux** correctement encodés