import * as z from "zod";

export const aboutMissionSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  mainImage: z.string().min(1, "Main image is required"),
  secondaryImage: z.string().min(1, "Secondary image is required"),
  satisfactionRate: z.coerce
    .number()
    .min(0, "Rate must be positive")
    .max(100, "Rate cannot exceed 100"),
  features: z.array(
    z.object({
      title: z.string().min(1, "Feature title is required"),
      description: z.string().min(1, "Feature description is required"),
    }),
  ),
});

export type AboutMissionFormData = z.infer<typeof aboutMissionSchema>;
