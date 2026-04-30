import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Valid URL is required").optional().or(z.literal("")),
  imageId: z.string().optional(),
  status: z.boolean(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
