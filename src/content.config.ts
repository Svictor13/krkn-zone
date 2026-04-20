import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  excerpt: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const collections = {
  'briefing': defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/briefing' }), schema: postSchema }),
  'charts': defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/charts' }), schema: postSchema }),
  'field-notes': defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/field-notes' }), schema: postSchema }),
};
