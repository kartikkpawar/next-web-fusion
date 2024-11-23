import { z } from "zod";

export const createSiteSchema = z.object({
  title: z.string().max(50).min(3),
  description: z.string().max(80).optional(),
});

export type createSiteSchemaType = z.infer<typeof createSiteSchema>;

export const createPageSchema = z.object({
  title: z.string().max(50).min(3),
  slug: z.string(),
});

export type createPageSchemaType = z.infer<typeof createPageSchema>;
