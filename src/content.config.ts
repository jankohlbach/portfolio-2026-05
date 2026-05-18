// import type { ImageFunction } from 'astro:content';

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const globalsSiteData = defineCollection({
  loader: glob({ base: './src/content', pattern: 'globalsSiteData.json' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
    }),
});

const globalsHeader = defineCollection({
  loader: glob({ base: './src/content', pattern: 'globalsHeader.json' }),
  schema: () =>
    z.object({
      links: z
        .array(
          z.object({
            title: z.string(),
            link: z.string(),
          }),
        )
        .min(1)
        .max(4),
    }),
});

const globalsFooter = defineCollection({
  loader: glob({ base: './src/content', pattern: 'globalsFooter.json' }),
  schema: () =>
    z.object({
      metaLinks: z
        .array(
          z.object({
            title: z.string(),
            link: z.string(),
          }),
        )
        .min(2),
    }),
});

const globalsPage404 = defineCollection({
  loader: glob({ base: './src/content', pattern: 'globalsPage404.json' }),
  schema: () =>
    z.object({
      title: z.string(),
    }),
});

const getUtilAnchor = () =>
  z
    .object({
      anchorID: z.string().optional(),
    })
    .optional();

const getModulesSchema = () =>
  z.array(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal('moduleHeadline'),
        anchor: getUtilAnchor(),
        headline: z.string(),
      }),
      z.object({
        type: z.literal('moduleRichText'),
        anchor: getUtilAnchor(),
        content: z.string(),
      }),
    ]),
  );

const pageHome = defineCollection({
  loader: glob({ base: './src/content', pattern: 'pageHome.md' }),
  schema: () =>
    z.object({
      title: z.string().optional(),
      sections: z.array(
        z.object({
          modules: getModulesSchema(),
        }),
      ),
    }),
});

const pagesGeneric = defineCollection({
  loader: glob({ base: './src/content/pagesGeneric', pattern: '**/*.md' }),
  schema: () =>
    z.object({
      slug: z.string(),
      title: z.string(),
      sections: z.array(
        z.object({
          modules: getModulesSchema(),
        }),
      ),
    }),
});

export const collections = {
  globalsSiteData,
  globalsHeader,
  globalsFooter,
  globalsPage404,
  pageHome,
  pagesGeneric,
};
