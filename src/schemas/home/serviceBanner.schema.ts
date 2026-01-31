import { z } from "zod";

export const serviceBannerItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.string().url("Must be a valid URL"),
});

export const serviceBannerSchema = z.object({
  services: z
    .array(serviceBannerItemSchema)
    .min(1, "At least one service is required"),
});

export type ServiceBannerFormData = z.infer<typeof serviceBannerSchema>;
