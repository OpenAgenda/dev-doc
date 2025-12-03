---
sidebar_position: 1
---

# Code d'intégration

Ce code est disponible depuis la modale d'export de tout agenda publié sur OpenAgenda. Il permet d'intégrer simplement un agenda fonctionnel avec filtres, vue liste, vue détail sur un site.

![Modale d'export d'un agenda](/img/embed-modal.png)
_Modale d'export d'un agenda_

La modale permet de faire les ajustements les plus usuels. Cette documentation permet d'aller au delà en complétant le code de paramètres dont le fonctionnement est détaillé dans la section suivante. Suivent 2 cas d'usages qui illustrent comment arriver à certains résultats:

1.  Comment ne pas rogner les images en vue liste.
2.  Comment créer 2 variantes du codes pour permettre la navigation d'une prévisualisation sur une page d'accueil de site vers une page agenda détaillant l'intégralité d'une programmation.

## Paramètres

Liste exhaustive des paramètres de configuration du code.

### Préciser l'URL de la page hébergeant l'agenda

**Attribut**: `data-base-url`

Cet attribut permet de préciser la page agenda vers laquelle seront orientés les utilisateurs lors d'un clic sur un événement de la liste.

**Important :** L'URL précisée doit pointer vers une implémentation d'agenda existante: le code d'intégration se contente de renvoyer le visiteur cliquant sur une vignette événement vers ce lien, complété du code URL de l'événement. Ce fonctionnement est compatible avec une implémentation faite avec le [module Drupal](https://developers.openagenda.com/module-drupal/) ou la librairie [agenda-portal](https://www.npmjs.com/package/@openagenda/agenda-portal).

En ajoutant l'attribut `data-base-url="https://mon-site.com/agenda"` au `<blockquote>` du code d'intégration les événements seront ouverts dans un nouvel onglet sur la page `https://mon-site.com/agenda/slug-evenement`.

Exemple :

```html
<blockquote
  data-base-url="https://mon-site.com/agenda"
  class="oa-agenda"
  align="center"
>
  <p lang="fr">Voir les événements de 
    <a
      href="https://openagenda.com/agendas/5109558?relative%5B0%5D=current&relative%5B1%5D=upcoming">
      <strong>Fête de la musique 2024</strong>
    </a>
  </p>
</blockquote>
<script async src="https://cdn.openagenda.com/js/widgets.js" charset="utf-8"></script>
```

En précisant **oa** comme valeur plutôt qu'une URL, le visiteur sera renvoyé vers le détail de l'événement sur [openagenda.com](https://openagenda.com)

### Préciser le mode d'ouverture des événements cliqués

**Attribut**: `data-base-url-target`

Cet attribut spécifie si un événement doit s'ouvrir dans un nouvel onglet, la page parent ou le document le plus élevé si il y a plusieurs niveaux d'iframes, les valeurs possibles sont \__blank_, _\_parent_, _\_top._

```html
<blockquote
  data-base-url="https://mon-site.com/agenda"
  data-base-target="_blank"
  class="oa-agenda"
  align="center"
>
  <p lang="fr">Voir les événements de <a
    href="https://openagenda.com/agendas/5109558?relative%5B0%5D=current&relative%5B1%5D=upcoming"
      >
          <strong>Fête de la musique 2024</strong>
      </a>
  </p>
</blockquote>
<script async src="https://cdn.openagenda.com/js/widgets.js" charset="utf-8"></script>
```

### Choix des filtres affichés

**Attribut**: `data-filters`

Cet attribut permet de définir la liste de filtres à afficher dans l'intégration. Les codes à fournir, séparés par des virgules, sont les mêmes qu'utilisés en URL lorsque des filtres sont activés sur l'accueil de l'agenda ou sur son administration.

Exemple :

```html
<blockquote
  class="oa-agenda"
  align="center"
  data-filters="search,geo,timings,themes,publics"
>
  <p lang="fr">Voir les événements de 
    <a href="https://openagenda.com/agendas/64168411?relative%5B0%5D=current&relative%5B1%5D=upcoming">
      <b>Limoges</b>
    </a>
  </p>
</blockquote>
<script async src="https://cdn.openagenda.com/js/widgets.js" charset="utf-8"></script>
```

### Choix de la couleur primaire

**Attribut**: `data-primary-color`

Cet attribut permet de préciser une couleur principale qui sera utilisée dans l'intégration.

Exemple où la couleur choisie est l'orange vif (#FF5733)

```html
<blockquote
  class="oa-agenda"
  align="center"
  data-primary-color="#FF5733"
>
  <p lang="fr">Voir les événements de 
    <a href="https://openagenda.com/agendas/64168411?relative%5B0%5D=current&relative%5B1%5D=upcoming">
      <b>Limoges</b>
    </a>
  </p>
</blockquote>
<script async src="https://cdn.openagenda.com/js/widgets.js" charset="utf-8"></script>
```

### Ajustement des dimensions de la carte

**Attribut**: `data-map-size`

Permet de spécifier une hauteur ou un ratio pour la carte.

*   **height**: Pour une hauteur fixe (ex: `data-map-size="height:400px"`)
*   **ratio**: Pour maintenir un ratio (ex: `data-map-size="ratio:16/9"`)
*   **maxHeight**: Avec le ratio, limiter à une hauteur maximale (ex: `data-map-size="ratio:16/9;maxHeight:400px"`

### Ajustement du nombre d'événements chargés par page

**Attribut**: `data-page-size`

Par défaut, 12 événements sont chargés.

### Choix du tri des événements

**Attribut**: `data-sort`

Permet de spécifier le tri des événements affichés. La liste des possibles est donnée ici.

**À noter**: quand une recherche texte est effectuée, le tri change et les résultats affichés sont donnés par ordre de pertinence.

### Ne pas mentionner le lieu sur la vignette

**Attribut**: `data-hide-location`

Utile pour les agendas de lieux où l'adresse est invariante et la mention du lieu redondante.

### Cacher le logo

**Attribut**: `data-logo`

Permet de cacher le logo OpenAgenda lorsque la valeur "hide" est fournie à l'attribut.

### Affichage du total

**Attribut**: `data-display-total`

Permet de spécifier si le total d'événements affichés doit apparaitre en tête de liste. Il est affiché par défaut. Préciser "0" pour ne pas l'afficher.

```html
<blockquote
  class="oa-agenda"
  align="center"
  data-display-total="0"
>
  <p lang="fr">Voir les événements de 
    <a href="https://openagenda.com/agendas/64168411">
      <strong>Limoges</strong>
    </a>
  </p>
</blockquote>
<script async src="https://cdn.openagenda.com/js/widgets.js" charset="utf-8"></script>
```

### Affichage d'un menu d'exports

**Attribut**: `data-export-modal`

Affiche un lien "Exporter" en tête de liste permettant l'affichage d'une modale proposant des exports dans plusieurs formats: PDF, tableur, ics... Préciser "1": `data-export-modal="1"`

### Présentation des images

**Attribut**: `data-image-list`

Permet de contrôler l'apparence des images affichées dans le widget. Plusieurs valeurs agissant sur des aspects différents des images peuvent être précisées. Il faut alors les séparer par un point-virgule `;`.

*   **`contain` ou `cover`** : Correspond à la propriété CSS `object-fit`.
*   **`ratio`** : Définit le ratio d'aspect via `aspect-ratio` (exemple : `ratio:1` pour un carré).
*   **`maxHeight` ou `height`** : Contrôle la hauteur maximale ou fixe via `max-height` ou `height` (exemple : `maxHeight:400px`).

Dans l'exemple ci-dessous, les images utiliseront le mode `contain` pour conserver leurs proportions et auront une hauteur maximale de 400 pixels.

```html
<blockquote
  class="oa-agenda"
  align="center"
  data-image-list="contain;maxHeight:400px"
>
  <p lang="fr">Voir les événements de 
    <a href="https://openagenda.com/agendas/64168411?relative%5B0%5D=current&relative%5B1%5D=upcoming">
      <b>Limoges</b>
    </a>
  </p>
</blockquote>
<script async src="https://cdn.openagenda.com/js/widgets.js" charset="utf-8"></script>
```

Dans le prochain exemple, les images seront affichées en mode `cover` avec un ratio d’aspect carré (1:1).

```html
<blockquote
  class="oa-agenda"
  align="center"
  data-image-list="cover;ratio:1"
>
  <p lang="fr">Voir les événements de 
    <a href="https://openagenda.com/agendas/64168411?relative%5B0%5D=current&relative%5B1%5D=upcoming">
      <strong>Limoges</strong>
    </a>
  </p>
</blockquote>
<script async src="https://cdn.openagenda.com/js/widgets.js" charset="utf-8"></script>
```

### Largeur minimale des vignettes

**Attribut**: `data-item-min-width`

En `px`. Permet de fixer la largeur minimale d'une vignette événement en vue liste. Exemple: `data-item-min-width="200px"`.

## Cas d'usage

### Ne pas rogner les images sur la vue liste

Par défaut, le format des images est rogné, dans le but de normaliser la hauteur des vignettes affichées en vue liste.

![](/img/embed-list-preview.png)

Pour afficher les images dans un format non-rogné, il suffit d'ajouter un paramètre au code en précisant le mode d'affichage et la hauteur maximale de l'image: **data-image-list="contain;maxHeight:400px"**

### Afficher un aperçu sur sa page d'accueil d'une variante complète sur une page agenda de son site

Le code d'intégration permet de simplement afficher une sélection d'événements en aperçu sur sa page d'accueil qui au clic renvoient vers une page agenda présentant une programmation plus complète.

Pour créer un aperçu, 3 paramètres - documentés en détail dans la section précédente - seront utiles:

*   `data-display-total`: à "0" pour ne pas afficher le total dans l'aperçu
*   `data-base-url`: pour cibler la page où l'agenda est présenté
*   `&size=3` dans le lien de l'agenda pour ne présenter que 3 événements dans l'aperçu

Voici un code pouvant être placé sur l'accueil d'un agenda. Il renverra les utilisateurs vers une page /agenda ou aura été placé le code de l'agenda intégré complet:

```html
<blockquote
  class="oa-agenda"
  align="center"
  data-base-url="/agenda"
  data-display-total="0"
>
  <p lang="fr">Voir les événements de 
    <a href="https://openagenda.com/agendas/64168411?size=3">
      <strong>Limoges</strong>
    </a>
  </p>
</blockquote>
<script async src="https://cdn.openagenda.com/js/widgets.js" charset="utf-8"></script>
```

## Configurer le gestionnaire de widgets OpenAgenda

Le moyen le plus simple de créer un widget OpenAgenda pour sites Web (un agenda, un événement) consiste à copier et coller le code HTML généré dans la modale d'export.

### Pour des performances et une fiabilité optimales, incluez le script widgets.js dans votre modèle

Incluez le gestionnaire de widgets OpenAgenda une fois dans votre modèle de page pour optimiser les performances de votre page Web.

Si votre site utilise plusieurs widgets, vous pouvez configurer une seule fois les widgets OpenAgenda dans vos pages, ce qui rendra votre site plus rapide.

```html
<script>window.oa = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.oa || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = '/index.js';
  js.async = true;
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, 'script', 'oa-wjs'));</script>
```

Cet extrait de code optimise le chargement de la manière suivante :

*   Attribue un identifiant (ID) HTML unique, `oa-wjs`, à l'élément pour vérifier facilement si le fichier JavaScript est déjà présent sur la page. Si cet ID existe déjà, le chargement est arrêté immédiatement.
*   Charge le JavaScript de OpenAgenda de manière asynchrone pour améliorer les performances des sites web.
*   Initialise une file d'attente de fonctions asynchrones pour stocker les fonctions dépendantes jusqu'à ce que le script soit disponible.
*   Place cet extrait avant tout autre JavaScript sur votre page qui pourrait dépendre de la file d'attente de fonctions asynchrones `oa.ready`.

### Ignorer les balises de script des intégrations

Si vous incluez le chargeur JavaScript de Twitter sur chaque page, vous n'avez pas besoin d'inclure l'élément `<script>` généré par une modale d'export. Vous pouvez supprimer l'élément `<script>` supplémentaire du code HTML généré.

## Initialisation du contenu intégré après le chargement d'une page

La plupart des intégrations d'OpenAgenda seront bien servies par le code d'intégration recommandé trouvé dans la modale d'export, mais vous souhaiterez peut-être optimiser comment et quand les widgets JavaScript d'OpenAgenda analysent le DOM de la page pour découvrir de nouveaux éléments HTML éligibles à une augmentation en widget.

Si le contenu est inséré dynamiquement dans une page (par exemple, en cas de chargement différé ou en utilisant une technique `pushState` pour naviguer entre les pages), il est nécessaire d'analyser les nouveaux widgets à l'aide de la fonction `oa.widgets.load()`.

```js
oa.widgets.load();
```

Appelé sans argument, `widgets-js` recherchera dans toute l'arborescence DOM `document.body` les widgets non initialisés. Pour de meilleures performances, transmettez un objet `HTMLElement` pour restreindre la recherche uniquement aux enfants de l'élément.

Exemple:

```js
oa.widgets.load(document.getElementById("container"));
```

## Événements système

### Attente de ressources asynchrones

Charger le fichier `widgets.js` de manière asynchrone nécessitera d'attendre avant de lier les événements : les fonctions que vous appelez n'existent pas encore. Vous devrez encapsuler vos liaisons d'événements dans une fonction de rappel telle que la file d'attente de fonctions asynchrones `oa.ready`, qui sera invoquée une fois que tout sera chargé.

```js
oa.ready(function (oa) {
  // ...
});
```