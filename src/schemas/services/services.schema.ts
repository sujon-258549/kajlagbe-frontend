import { z } from "zod";

export const serviceItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  iconName: z.string().min(1, "Icon is required"),
  image: z.string().optional(),
});

export const servicesHeaderSchema = z.object({
  sectionTitle: z.string().min(1, "Section Title is required"),
  sectionDescription: z.string().min(1, "Section Description is required"),
  sectionBackgroundImage: z.string().optional(),
});

export const servicesSchema = servicesHeaderSchema.extend({
  services: z.array(serviceItemSchema),
});

export type ServiceItem = z.infer<typeof serviceItemSchema>;
export type ServicesHeaderFormData = z.infer<typeof servicesHeaderSchema>;
export type ServicesFormData = z.infer<typeof servicesSchema>;
