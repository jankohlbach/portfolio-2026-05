// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import glsl from 'vite-plugin-glsl';

// https://astro.build/config
export default defineConfig({
  // TODO: change to final domain
  site:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4321'
      : 'https://folio-new.jnkl.dev',
  trailingSlash: 'never',
  integrations: [
    robotsTxt({
      sitemapBaseFileName: 'sitemap-index',
      // TODO: remove when going live
      policy: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    }),
    sitemap({
      lastmod: new Date(),
      xslURL: '/sitemap.xsl',
    }),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@use "/src/styles/functions" as *; @use "/src/styles/mixins" as *;',
        },
      },
    },
    plugins: [glsl()],
  },
  image: {
    responsiveStyles: true,
    layout: 'constrained',
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Switzer',
      cssVariable: '--ff-switzer',
      fallbacks: ['sans-serif'],
      options: {
        variants: [
          {
            src: ['./src/fonts/Switzer/Switzer-Variable.woff2'],
            weight: '100 900',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Signore',
      cssVariable: '--ff-signore',
      fallbacks: ['serif'],
      options: {
        variants: [
          {
            src: ['./src/fonts/Signore/Signore-Serif-Typeface.woff2'],
            weight: '400',
            style: 'normal',
          },
        ],
      },
    },
  ],
});

// file meta order
// -----
// import css

// import type

// type Something

// interface Something

// import package

// import astro:content

// import @content

// import @layouts
// import @components

// getStaticPaths

// Astro.Props
