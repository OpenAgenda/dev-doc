---
sidebar_position: 1
---

# Préparer une source de données

Bonnes pratiques pour la mise en place d'un export qui servira de source de données principale pour une synchronisation vers un OpenAgenda.

L'API rend possible la synchronisation de l'agenda de son site/système d'informations avec un ou plusieurs agendas sur OpenAgenda. Les points suivants sont important à prendre en considération pour que la reprise d'une programmation se fasse de la manière la plus complète possible.

Les données présentées sur votre OpenAgenda seront amenées à être diffusées vers d'autres OpenAgenda et d'autres sites, des approximations trop importantes - mais nécessaires lorsque la source de données n'est pas suffisamment détaillée - réduiront la lisibilité de vos événements.

Les **formats structurés usuels** pourront être traités par une synchronisation: le format JSON est de loin le plus courant.

## Les champs principaux

Chaque événement est à minima défini par un **titre**, une **description** et **une liste de plages horaires**. Pour les événements _in-situ_ (pas uniquement sur internet), **un lieu physique** doit être donné.

Les champs descriptifs (titre, description courte, description longue, mots clés, conditions) peuvent être **multilingues**.

**Déclinaisons de la description**: deux champs de description existent sur le schéma standard OpenAgenda. Une description courte obligatoire servant sur les affichages de taille réduite des événements (ex: sur une vue liste), une longue pour les vue détaillées.

Le format de la description longue est le _[markdown](https://fr.wikipedia.org/wiki/Markdown)_: les formats HTML ou texte sont acceptés, ils seront convertis lors de la synchronisation.

Retrouvez la liste des champs constituant un événement [en cliquant ici](https://developers.openagenda.com/00-structure-evenement/).

**Une illustration** n'est pas obligatoire mais est importante pour la visibilité de l'événement: un URL pourra être exploité par la synchronisation qui fera une copie sur OpenAgenda. Dans la mesure du possible, associez des crédits pour éviter d'éventuels litiges.

## Les plages horaires

Sur OpenAgenda, un événement peut être décrit par une ou plusieurs plages horaires. Chaque plage horaire a un début et une fin. Une plage horaire ne peut pas excéder 24 heures.

```json
[{ begin: '2024-05-07T10:00:00+0200', end: '2024-05-07T12:00:00+0200' }]
```

S'il arrive que la source de données n'arrive pas à ce niveau de détail, des approximations devront être établies lors du traitement des événements.

Voici des approximations courantes:

*   L'horaire de fin n'est pas connu: si la durée de l'événement n'est pas connu, une durée par défaut sera définie.
*   Seule une date est bien formatée, les horaires sont saisis librement: une extraction des horaires n'est possible que si le format dans la donnée source est suffisamment régulière (ex: de 14h à 17h). Elle devient difficile avec des saisies trop variables. Dans ce cas, l'événement ne peut pas être repris sans grosse approximation sur l'horaire: un horaire de début et de fin général sera utilisé.

## La localisation

Selon le mode de participation, un événement OpenAgenda est lié à un lieu qui est un objet séparé: un OpenAgenda est associé à un répertoire de lieux qui lui est propre ou qui est mutualisé entre plusieurs OpenAgendas.

Un lieu est défini a minima par un nom et une adresse postale complète. L'API se charge alors d'effectuer une géolocalisation pour pouvoir le placer sur une carte. Exemple de nom: _Salle polyvalente Corraze ..._ et d'adresse postale complète: _3 bis, rue Raymond Corraze, 31500 Toulouse_

Si plus d'informations liées au lieu sont disponibles celles-ci seront reprises. La géolocalisation, un descriptif, un détail sur les accès, une illustration, des numéros de téléphone, email et site internet.

Dans l'idéal, une source de donnée séparée listant les lieux est mise à disposition et est associée à une deuxième source de donnée listant les événements..

Le détail des champs constitutifs d'un lieu sur OpenAgenda est donné [ici](https://developers.openagenda.com/10-structure-lieu/).

### Des événements plus complets

Dans la mesure du possible, le maximum d'information doit pouvoir être reprise lors de la synchronisation. Le détail des champs définissant un événement sur OpenAgenda est consultable ici. Voici les plus usuels:

**Conditions**: Un champ (optionnellement multilingue) recevant un texte détaillant les conditions d'accès à l'événement. Ex: Payant, gratuit, sur inscription, tarifs.

**Outils d'inscription**: une liste de valeurs permettant aux public de s'inscrire à l'événement. Ce sont soit des liens hypertexte, des numéros de téléphone ou des emails.

**Mots clés**: une liste de textes courts (optionnellement multilingue) pour qualifier les événements, utiles pour la recherche et l'indexation de pages (balises meta)

Au delà, informer le maximum des champs détaillés [ici](https://developers.openagenda.com/00-structure-evenement/) améliorera la qualité de la description de l'événement.

## Les champs additionnels

Des champs particuliers à certains agendas ou réseaux d'agendas permettent d'ajouter des détails de catégorisation ou des spécificités propres à certains type d'événements. Le plus souvent, il s'agit d'une liste discrète de thématiques/types d'événements/catégories. Le détail des valeurs possibles est donné par un appel API sur [la configuration d'un agenda](https://developers.openagenda.com/agenda/lecture).

Si ces champs ont été définis comme étant obligatoires, le script de synchronisation devra leur associer une valeur pour permettre l'ajout des événements sur l'OpenAgenda cible. Dans ce cas, la source de donnée devra présenter une donnée permettant une mise en correspondance avec les valeurs proposées par les champs additionnels.

Par exemple, le réseau d'agendas de la métropole de Toulouse requiert la saisie d'une ou plusieurs _Thématiques métropolitaines_ dont les valeurs possibles sont _Culture, Économie, Éducation, Emploi, Loisirs, Nature - Environnement, Participation citoyenne, Patrimoine, Social - Santé, Sports_. La source de données devra pour chaque événement proposer une catégorisation similaire.

## Des questions?

Pour tout interrogation concernant la mise en place d'un export, contactez nous soit:

*   via l'outil de clavardage disponible en bas à droite de cette page
*   par email: support@openagenda.com

En plus de répondre à vos interrogation, vos questions nous permettrons de mieux comprendre vos contraintes et d'adapter cette documentation en fonction.