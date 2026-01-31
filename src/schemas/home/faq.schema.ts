import { z } from "zod";

export const homeFaqItemSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
});

export const homeFaqSectionSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  faqs: z.array(homeFaqItemSchema).min(1),
  ctaTitle: z.string().min(1, "CTA Title is required"),
  ctaDescription: z.string().min(1, "CTA Description is required"),
  ctaButtonText: z.string().min(1, "CTA Button Text is required"),
});

export type HomeFaqFormData = z.infer<typeof homeFaqSectionSchema>;
