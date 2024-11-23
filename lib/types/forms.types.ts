import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().max(50).min(3),
  description: z.string().max(80).optional(),
});

export type createProjectSchemaType = z.infer<typeof createProjectSchema>;
