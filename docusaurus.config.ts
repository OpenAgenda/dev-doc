import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'API OpenAgenda',
  tagline: 'Documentation officielle de l\'API OpenAgenda',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  url: 'https:/developers.openagenda.com',
  baseUrl: '/',

  organizationName: 'OpenAgenda', // Usually your GitHub org/user name.
  projectName: 'dev-doc', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  headTags: [{
    tagName: 'script',
    attributes: {
      type: 'application/javascript',
    },
    innerHTML: `
      var _paq = window._paq = window._paq || [];
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      _paq.push(['trackPageView']);
      _paq.push(["disableCookies"]);
      _paq.push(['enableLinkTracking']);
      (function() {
        var u="//matomo.openagenda.com/";
        _paq.push(['setTrackerUrl', u+'matomo.php']);
        _paq.push(['setSiteId', '3']);
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
      })();`
  }, {
    tagName: 'script',
    attributes: {
      type: 'application/javascript',
    },
    innerHTML: `
      window.$crisp=[];
      window.CRISP_WEBSITE_ID="ec7a439d-5932-4856-9fb6-4f235c9fba52";
      (function(){
          d=document;s=d.createElement("script");
          s.src="https://client.crisp.chat/l.js";
          s.async=1;
          d.getElementsByTagName("head")[0].appendChild(s);
      })();
    `
  }],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          editUrl: 'https://github.com/OpenAgenda/dev-doc',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [[
    '@docusaurus/plugin-client-redirects',
    {
      redirects: [{
        from: '/00-introduction',
        to: '/'
      }, {
        from: '/10-authentification',
        to: '/authentification'
      },
      {
        from: '/20-preparer-une-source-de-donnees/',
        to: '/guides/source-de-donnees'
      },
      {
        from: '/20-lister-les-agendas/',
        to: '/agendas/recherche'
      },
      {
        from: '/configuration-dun-agenda/',
        to: '/agendas/lecture'
      },
      {
        from: '/lister-les-sources/',
        to: '/agendas/sources'
      },
      {
        from: '/lister-ses-agendas/',
        to: '/agendas/mes-agendas'
      },
      {
        from: '/v2-agendas-agendauid-members-get-lister-les-membres-dun-agenda/',
        to: '/agendas/membres'
      },
      {
        from: '/00-structure-evenement/',
        to: '/evenements/structure'
      },
      {
        from: '/10-lecture/',
        to: '/evenements/lecture'
      },
      {
        from: '/20-creer-un-evenement/',
        to: '/evenements/creation'
      },
      {
        from: '/30-mettre-a-jour-un-evenement/',
        to: '/evenements/edition'
      },
      {
        from: '/40-supprimer-un-evenement/',
        to: '/evenements/suppression'
      },
      {
        from: '/50-migration/',
        to: '/evenements/export-json-migration'
      },
      {
        from: '/tag/30-lieux/',
        to: '/lieux'
      },
      {
        from: '/tag/20-evenements/',
        to: '/evenements'
      },
      {
        from: '/tag/10-agendas/',
        to: '/agendas'
      },
      {
        from: '/10-structure-lieu/',
        to: '/lieux/structure'
      },
      {
        from: '/20-lecture-de-lieux/',
        to: '/lieux/lecture'
      },
      {
        from: '/30-creation-lieu/',
        to: '/lieux/creation'
      },
      {
        from: '/40-mise-a-jour-lieu/',
        to: '/lieux/edition'
      },
      {
        from: '/50-suppression-lieu/',
        to: '/lieux/suppression'
      },
      {
        from: '/tag/60-plugins/',
        to: '/plugins'
      },
      {
        from: '/codes-embed/',
        to: '/plugins/embeds'
      },
      {
        from: '/extension-typo3/',
        to: '/plugins/typo3'
      },
      {
        from: '/extension-wordpress/',
        to: '/plugins/wordpress'
      },
      {
        from: '/module-drupal/',
        to: '/plugins/drupal'
      },
      {
        from: '/portail-node-js/',
        to: '/plugins/agenda-portal'
      }, {
        from: '/recherche-transverse/',
        to: '/evenements/recherche-transverse'
      }],
    }
  ], [
    '@signalwire/docusaurus-plugin-llms-txt',
    {
      content: {
        enableLlmsFullTxt: true,
        relativePaths: false,
        excludeRoutes: [
          '/evenements/export-json-migration',
          '/evenements/export-json',
          '/evenements/recherche-transverse',
          '/guides/source-de-donnees',
          '/plugins*',
          '/llms'
        ],
      }
    }
  ]],

  themeConfig: {
    navbar: {
      title: 'Documentation API',
      logo: {
        alt: 'Logo OpenAgenda',
        src: 'img/openagenda.svg',
      },
      items: [
        {
          href: 'https://github.com/OpenAgenda/dev-doc',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Documentation utilisateur',
              href: 'https://doc.openagenda.com',
            },
          ],
        },
        {
          title: 'Suivez-nous!',
          items: [
            {
              label: 'Bluesky',
              href: 'https://bsky.app/profile/openagenda.com',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/company/openagenda',
            },
            {
              label: 'État de la plateforme et de l\'API',
              href: 'https://bsky.app/profile/openagendastatus.bsky.social',
            },
          ],
        },
        {
          title: 'Plus de liens',
          items: [
            {
              label: 'Un peu de logiciel libre',
              href: 'https://github.com/OpenAgenda/oa-public',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} OpenAgenda SAS`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
