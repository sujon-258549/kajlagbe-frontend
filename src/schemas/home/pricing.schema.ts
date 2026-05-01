import { z } from "zod";

const featureSchema = z.object({
  text: z.string().min(1, "Feature text is required"),
  included: z.boolean(),
});

const planSchema = z.object({
  name: z.string().min(1, "Plan name is required"),
  price: z.string().min(1, "Price is required"),
  features: z.array(featureSchema).min(1, "At least one feature is required"),
  recommended: z.boolean(),
  buttonText: z.string().min(1, "Button text is required"),
  buttonLink: z.string().min(1, "Button link is required"),
});

export const pricingSchema = z.object({
  tagline: z.string().min(1, "Tagline is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  plans: z.array(planSchema).length(3, "Exactly 3 plans are required"),
});

export type PricingFormData = z.infer<typeof pricingSchema>;
