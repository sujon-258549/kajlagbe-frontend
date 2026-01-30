import * as z from "zod";

export const aboutFAQSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  image: z.string().min(1, "Sidebar image is required"),
  items: z.array(
    z.object({
      question: z.string().min(5, "Question must be at least 5 characters"),
      answer: z.string().min(10, "Answer must be at least 10 characters"),
    }),
  ),
});

export type AboutFAQFormData = z.infer<typeof aboutFAQSchema>;
