import { z } from "zod";

export const ctaSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  primaryButtonText: z.string().min(1, "Primary button text is required"),
  primaryButtonLink: z.string().min(1, "Link is required"),
  secondaryButtonText: z.string().min(1, "Secondary button text is required"),
  secondaryButtonLink: z.string().min(1, "Link is required"),
});

export type CTAFormData = z.infer<typeof ctaSchema>;
