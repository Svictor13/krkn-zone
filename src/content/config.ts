import { defineCollection, z } from 'astro:content';

const postSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  excerpt: z.string(),
  image: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const collections = {
  'briefing': defineCollection({ type: 'content', schema: postSchema }),
  'charts': defineCollection({ type: 'content', schema: postSchema }),
  'field-notes': defineCollection({ type: 'content', schema: postSchema }),
};
