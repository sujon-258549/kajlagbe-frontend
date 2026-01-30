import * as z from "zod";

export const aboutStorySchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  images: z.array(z.string()).min(2, "At least 2 images are required"),
  organicPercentage: z.string().optional(),
  features: z
    .array(
      z.object({
        title: z.string().min(1, "Feature title is required"),
        description: z.string().min(1, "Feature description is required"),
      }),
    )
    .min(1, "At least one feature is required"),
});

export type AboutStoryFormData = z.infer<typeof aboutStorySchema>;
