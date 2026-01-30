import * as z from "zod";

export const subscriptionFAQSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  faqs: z
    .array(
      z.object({
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      }),
    )
    .min(1, "At least one FAQ is required"),
  videoThumbnail: z.string().url("Must be a valid image URL"),
  videoUrl: z.string().min(1, "Video ID or URL is required"),
  videoLabel: z.string().min(1, "Video label is required"),
  videoDescription: z.string().min(1, "Video description is required"),
});

export type SubscriptionFAQFormData = z.infer<typeof subscriptionFAQSchema>;
