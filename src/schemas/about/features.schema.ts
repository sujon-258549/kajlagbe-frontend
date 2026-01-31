import * as z from "zod";

export const aboutFeaturesSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z.string().min(10, "Description is required"),
  items: z.array(
    z.object({
      title: z.string().min(1, "Item title is required"),
      description: z.string().min(1, "Item description is required"),
      iconName: z.string().min(1, "Icon is required"), // Added iconName
    }),
  ),
});

export type AboutFeaturesFormData = z.infer<typeof aboutFeaturesSchema>;
