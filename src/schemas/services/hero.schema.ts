import * as z from "zod";

export const servicesHeroSchema = z.object({
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long." })
    .max(100, { message: "Title must not exceed 100 characters." }),
  subtitle: z.string().optional(),
  image: z.string().min(1, { message: "Hero image is required." }),
  bgImage: z.string().optional(),
});

export type ServicesHeroFormData = z.infer<typeof servicesHeroSchema>;
