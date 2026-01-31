import { z } from "zod";

export const homeVideoSectionSchema = z.object({
  videoUrl: z.string().url("Must be a valid video URL"),
  posterImage: z.string().url("Must be a valid URL"),
  youtubeEmbedUrl: z.string().url("Must be a valid YouTube embed URL"),
  buttonText: z.string().min(1, "Button text is required"),
});

export type HomeVideoFormData = z.infer<typeof homeVideoSectionSchema>;
