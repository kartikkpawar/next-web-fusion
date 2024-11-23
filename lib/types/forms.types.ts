import { z } from "zod";

export const createSiteSchema = z.object({
  title: z.string().max(50).min(3),
  description: z.string().max(80).optional(),
});

export type createSiteSchemaType = z.infer<typeof createSiteSchema>;
