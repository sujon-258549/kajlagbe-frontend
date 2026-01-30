import * as z from "zod";

export const aboutTestimonialsSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  items: z.array(
    z.object({
      name: z.string().min(1, "Name is required"),
      role: z.string().min(1, "Role is required"),
      content: z.string().min(10, "Content must be at least 10 characters"),
      rating: z.coerce.number().min(1).max(5),
    }),
  ),
});

export type AboutTestimonialsFormData = z.infer<typeof aboutTestimonialsSchema>;
