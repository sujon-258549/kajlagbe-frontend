import { z } from "zod";

export const statItemSchema = z.object({
  iconName: z.string().min(1, "Icon is required"),
  value: z.string().min(1, "Value is required"),
  label: z.string().min(1, "Label is required"),
  color: z.string().min(1, "Color theme is required"),
});

export const statsSchema = z.object({
  stats: z.array(statItemSchema).min(1, "At least one stat is required"),
  backgroundImage: z.string().url().optional(),
});

export type StatsFormData = z.infer<typeof statsSchema>;
