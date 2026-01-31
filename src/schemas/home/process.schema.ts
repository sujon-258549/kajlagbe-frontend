import { z } from "zod";

export const processStepSchema = z.object({
  number: z.string().min(1, "Number is required"),
  title: z.string().min(1, "Title is required"),
  iconName: z.string().min(1, "Icon is required"),
  description: z.string().min(1, "Description is required"),
  color: z.string().min(1, "Color is required"),
});

export const processSectionSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  steps: z.array(processStepSchema).min(1, "At least one step is required"),
});

export type ProcessFormData = z.infer<typeof processSectionSchema>;
