import { z } from "zod";

export const homeVideoSectionSchema = z.object({
  videoUrl: z.string().optional(),
  posterImage: z.string().optional(),
  posterImageId: z.string().optional(),
  youtubeEmbedUrl: z.string().url("Must be a valid YouTube embed URL"),
  buttonText: z.string().min(1, "Button text is required"),
});

export type HomeVideoFormData = z.infer<typeof homeVideoSectionSchema>;
