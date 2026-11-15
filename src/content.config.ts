import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entries' }),
  schema: z
    .object({
      title: z.string(),
      domain: z.enum([
        'technology',
        'econ-philosophy',
        'ppe',
        'commentary',
        'creative',
        'arts-letters',
      ]),
      stage: z.enum(['draft', 'polished']),
      type: z.enum([
        'note',
        'essay',
        'script-draft',
        'video',
        'poem',
        'story',
        'exercise',
        'milestone',
        'demo',
      ]),
      created: z.coerce.date(),
      published: z.coerce.date().optional(),
      derivedFrom: z.string().optional(),
      videoUrl: z.string().url().optional(),
      crossPosts: z
        .array(z.object({ platform: z.string(), url: z.string().url() }))
        .default([]),
    })
    .refine((d) => d.stage !== 'polished' || d.published !== undefined, {
      message: 'polished entries need a published date',
      path: ['published'],
    }),
});

export const collections = { entries };
