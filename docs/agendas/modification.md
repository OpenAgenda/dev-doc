---
sidebar_position: 4
---

# Modification d'agendas

L'API OpenAgenda permet de modifier les agendas existants via des requêtes PUT ou PATCH.

## Modifier un agenda (PUT)

La méthode PUT remplace entièrement l'agenda avec les nouvelles données.

### Requête

```bash
PUT /v2/agendas/{uid}
```

### Corps de la requête

```json
{
  "title": "Nouveau titre",
  "description": "Nouvelle description",
  "slug": "nouveau-slug",
  "private": true,
  "settings": {
    "timezone": "Europe/London",
    "language": "en",
    "moderation": "manual",
    "categories": ["workshop", "conference"]
  }
}
```

### Exemple de requête

```bash
curl -X PUT \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Événements Tech Paris - Mis à jour",
    "description": "Version mise à jour des événements tech parisiens",
    "slug": "tech-paris-v2",
    "private": false,
    "settings": {
      "timezone": "Europe/Paris",
      "language": "fr",
      "moderation": "auto",
      "categories": ["conference", "workshop", "meetup", "hackathon"]
    }
  }' \
  https://api.openagenda.com/v2/agendas/agenda-456
```

## Modification partielle (PATCH)

La méthode PATCH permet de modifier seulement certains champs.

### Requête

```bash
PATCH /v2/agendas/{uid}
```

### Corps de la requête (partiel)

```json
{
  "title": "Nouveau titre seulement",
  "settings": {
    "moderation": "manual"
  }
}
```

### Exemple de requête PATCH

```bash
curl -X PATCH \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Description mise à jour",
    "settings": {
      "categories": ["conference", "workshop", "meetup"]
    }
  }' \
  https://api.openagenda.com/v2/agendas/agenda-456
```

## Réponse de modification

```json
{
  "success": true,
  "data": {
    "uid": "agenda-456",
    "title": "Événements Tech Paris - Mis à jour",
    "description": "Version mise à jour des événements tech parisiens",
    "slug": "tech-paris-v2",
    "official": false,
    "featured": false,
    "private": false,
    "createdAt": "2024-03-15T10:00:00Z",
    "updatedAt": "2024-03-15T15:30:00Z",
    "settings": {
      "timezone": "Europe/Paris",
      "language": "fr",
      "moderation": "auto",
      "categories": ["conference", "workshop", "meetup", "hackathon"]
    },
    "stats": {
      "eventsCount": 12,
      "viewsCount": 156,
      "subscribersCount": 8
    }
  }
}
```

## Champs modifiables

### Champs principaux

| Champ | Modifiable | Contraintes |
|-------|------------|-------------|
| `title` | ✅ | 5-100 caractères |
| `description` | ✅ | 10-500 caractères |
| `slug` | ✅ | Unique, format valide |
| `private` | ✅ | boolean |

### Champs de configuration

| Champ | Modifiable | Contraintes |
|-------|------------|-------------|
| `settings.timezone` | ✅ | Timezone valide |
| `settings.language` | ✅ | Code ISO 639-1 |
| `settings.moderation` | ✅ | auto, manual, none |
| `settings.categories` | ✅ | Maximum 10 catégories |

### Champs en lecture seule

| Champ | Modifiable | Raison |
|-------|------------|--------|
| `uid` | ❌ | Identifiant unique |
| `createdAt` | ❌ | Date de création |
| `official` | ❌ | Statut géré par OpenAgenda |
| `featured` | ❌ | Statut géré par OpenAgenda |
| `stats` | ❌ | Calculé automatiquement |

## Gestion des erreurs

### Erreur de slug déjà utilisé

```json
{
  "success": false,
  "error": {
    "code": "SLUG_ALREADY_EXISTS",
    "message": "Ce slug est déjà utilisé par un autre agenda"
  }
}
```

### Erreur de validation

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Données invalides",
    "details": {
      "fields": [
        {
          "field": "settings.categories",
          "message": "Maximum 10 catégories autorisées"
        }
      ]
    }
  }
}
```

## Exemples d'implémentation

### JavaScript

```javascript
async function updateAgenda(uid, updates) {
  try {
    const response = await fetch(`https://api.openagenda.com/v2/agendas/${uid}`, {
      method: 'PATCH',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updates)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Erreur lors de la modification:', error.message);
    throw error;
  }
}

// Utilisation
const updates = {
  title: "Nouveau titre",
  settings: {
    moderation: "manual"
  }
};

updateAgenda('agenda-456', updates)
  .then(result => console.log('Agenda modifié:', result.data))
  .catch(error => console.error('Erreur:', error));
```

### Python

```python
import requests

def update_agenda(uid, updates):
    url = f"https://api.openagenda.com/v2/agendas/{uid}"
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
    
    response = requests.patch(url, json=updates, headers=headers)
    
    if response.status_code == 200:
        return response.json()['data']
    else:
        error = response.json()
        raise Exception(f"Erreur: {error['error']['message']}")

# Utilisation
updates = {
    "description": "Description mise à jour",
    "settings": {
        "categories": ["conference", "workshop"]
    }
}

try:
    result = update_agenda('agenda-456', updates)
    print(f"Agenda modifié: {result['title']}")
except Exception as e:
    print(f"Erreur: {e}")
```

### PHP

```php
function updateAgenda($uid, $updates) {
    $url = "https://api.openagenda.com/v2/agendas/" . $uid;
    $headers = [
        'Authorization: Bearer YOUR_API_KEY',
        'Content-Type: application/json'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($updates));
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    
    if ($httpCode === 200) {
        return json_decode($response, true)['data'];
    } else {
        $error = json_decode($response, true);
        throw new Exception("Erreur: " . $error['error']['message']);
    }
}
```