---
sidebar_position: 5
---

# Suppression d'agendas

L'API OpenAgenda permet de supprimer des agendas existants. **Attention : cette action est irréversible.**

## Supprimer un agenda

### Requête

```bash
DELETE /v2/agendas/{uid}
```

### Paramètres d'URL

| Paramètre | Type | Description |
|-----------|------|-------------|
| `uid` | string | Identifiant unique de l'agenda à supprimer |

### Exemple de requête

```bash
curl -X DELETE \
  -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.openagenda.com/v2/agendas/agenda-456
```

### Réponse de suppression

```json
{
  "success": true,
  "data": {
    "message": "Agenda supprimé avec succès",
    "deletedAt": "2024-03-15T16:45:00Z"
  }
}
```

## Conséquences de la suppression

### Données supprimées

- **L'agenda** et toutes ses métadonnées
- **Tous les événements** associés à cet agenda
- **Les statistiques** de l'agenda
- **Les abonnements** des utilisateurs

### Données conservées

- **Les lieux** référencés restent disponibles
- **L'historique** dans les logs système (30 jours)

## Restrictions de suppression

### Agendas non supprimables

Certains agendas ne peuvent pas être supprimés :

- **Agendas officiels** (`official: true`)
- **Agendas avec plus de 1000 événements** (contactez le support)
- **Agendas partagés** avec d'autres utilisateurs

### Erreur de suppression interdite

```json
{
  "success": false,
  "error": {
    "code": "DELETION_NOT_ALLOWED",
    "message": "Cet agenda ne peut pas être supprimé",
    "details": {
      "reason": "official_agenda",
      "description": "Les agendas officiels ne peuvent pas être supprimés"
    }
  }
}
```

## Suppression sécurisée

### Vérification préalable

Avant de supprimer un agenda, il est recommandé de :

1. **Sauvegarder les données** importantes
2. **Vérifier le nombre d'événements** associés
3. **Informer les utilisateurs** concernés

### Exemple de vérification

```bash
# Vérifier les détails de l'agenda
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.openagenda.com/v2/agendas/agenda-456

# Vérifier les événements associés
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.openagenda.com/v2/events?agenda=agenda-456&limit=1"
```

## Gestion des erreurs

### Agenda non trouvé

```json
{
  "success": false,
  "error": {
    "code": "AGENDA_NOT_FOUND",
    "message": "Agenda non trouvé"
  }
}
```

### Permissions insuffisantes

```json
{
  "success": false,
  "error": {
    "code": "INSUFFICIENT_PERMISSIONS",
    "message": "Vous n'avez pas les permissions pour supprimer cet agenda"
  }
}
```

## Exemples d'implémentation

### JavaScript

```javascript
async function deleteAgenda(uid, options = {}) {
  // Vérification optionnelle
  if (options.confirm) {
    const confirmed = confirm(`Êtes-vous sûr de vouloir supprimer l'agenda ${uid} ?`);
    if (!confirmed) return { cancelled: true };
  }
  
  try {
    const response = await fetch(`https://api.openagenda.com/v2/agendas/${uid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error.message);
    }
    
    return await response.json();
    
  } catch (error) {
    console.error('Erreur lors de la suppression:', error.message);
    throw error;
  }
}

// Utilisation avec confirmation
deleteAgenda('agenda-456', { confirm: true })
  .then(result => {
    if (result.cancelled) {
      console.log('Suppression annulée');
    } else {
      console.log('Agenda supprimé avec succès');
    }
  })
  .catch(error => console.error('Erreur:', error));
```

### Python

```python
import requests

def delete_agenda(uid, confirm=False):
    if confirm:
        response = input(f"Êtes-vous sûr de vouloir supprimer l'agenda {uid} ? (oui/non): ")
        if response.lower() != 'oui':
            print("Suppression annulée")
            return None
    
    url = f"https://api.openagenda.com/v2/agendas/{uid}"
    headers = {'Authorization': 'Bearer YOUR_API_KEY'}
    
    response = requests.delete(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()['data']
    else:
        error = response.json()
        raise Exception(f"Erreur: {error['error']['message']}")

# Utilisation
try:
    result = delete_agenda('agenda-456', confirm=True)
    if result:
        print(f"Agenda supprimé à: {result['deletedAt']}")
except Exception as e:
    print(f"Erreur: {e}")
```

### PHP

```php
function deleteAgenda($uid, $confirm = false) {
    if ($confirm) {
        echo "Êtes-vous sûr de vouloir supprimer l'agenda {$uid} ? (oui/non): ";
        $input = trim(fgets(STDIN));
        if (strtolower($input) !== 'oui') {
            echo "Suppression annulée\n";
            return null;
        }
    }
    
    $url = "https://api.openagenda.com/v2/agendas/" . $uid;
    $headers = ['Authorization: Bearer YOUR_API_KEY'];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
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

// Utilisation
try {
    $result = deleteAgenda('agenda-456', true);
    if ($result) {
        echo "Agenda supprimé avec succès\n";
    }
} catch (Exception $e) {
    echo "Erreur: " . $e->getMessage() . "\n";
}
```

## Bonnes pratiques

1. **Toujours confirmer** avant suppression
2. **Sauvegarder** les données importantes
3. **Vérifier les permissions** avant suppression
4. **Gérer les erreurs** appropriément
5. **Informer les utilisateurs** concernés