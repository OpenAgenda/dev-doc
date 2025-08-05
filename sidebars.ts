import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // OpenAgenda API Documentation Structure
  apiSidebar: [
    'intro',
    'authentification',
    {
      type: 'category',
      label: 'Agendas',
      link: {
        type: 'doc',
        id: 'agendas/intro',  
      },
      items: [
        { type: 'doc', label: 'Recherche', id: 'agendas/recherche' },
        { type: 'doc', label: 'Lecture', id: 'agendas/lecture' },
        { type: 'doc', label: 'Schémas et champs additionnels', id: 'agendas/schemas' },
        { type: 'doc', label: 'Sources', id: 'agendas/sources' },
        { type: 'doc', label: 'Membres', id: 'agendas/membres' },
        { type: 'doc', label: 'Mes agendas', id: 'agendas/mes-agendas' },
      ],
    },
    {
      type: 'category',
      label: 'Événements',
      link: {
        type: 'doc',
        id: 'evenements/intro',
      },
      items: [
        { type: 'doc', label: 'Structure', id: 'evenements/structure' },
        { type: 'doc', label: 'Lecture', id: 'evenements/lecture' },
        { type: 'doc', label: 'Création', id: 'evenements/creation' },
        { type: 'doc', label: 'Édition', id: 'evenements/edition' },
        { type: 'doc', label: 'Suppression', id: 'evenements/suppression' },
      ],
    },
    {
      type: 'category',
      label: 'Lieux',
      link: {
        type: 'doc',
        id: 'lieux/intro',
      },
      items: [
        { type: 'doc', label: 'Structure', id: 'lieux/structure' },
        { type: 'doc', label: 'Lecture', id: 'lieux/lecture' },
        { type: 'doc', label: 'Création', id: 'lieux/creation' },
        { type: 'doc', label: 'Édition', id: 'lieux/edition' },
        { type: 'doc', label: 'Suppression', id: 'lieux/suppression' },
      ],
    },
    {
      type: 'category',
      label: 'Plugins & intégrations',
      items: [
        { type: 'doc', label: 'Code embed', id: 'plugins/embeds'},
        { type: 'doc', label: 'Extension Typo3', id: 'plugins/typo3' },
        { type: 'doc', label: 'Plugin Wordpress', id: 'plugins/wordpress' },
        { type: 'doc', label: 'Extension Drupal', id: 'plugins/drupal' },
        { type: 'doc', label: 'Portail node.js', id: 'plugins/agenda-portal' }
      ]
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        { type: 'doc', label: 'Préparer une source de données', id: 'guides/source-de-donnees' },
      ]
    },
    {
      type: 'link',
      label: 'Aller sur OpenAgenda',
      href: 'https://openagenda.com',
    },
  ],
};

export default sidebars;
