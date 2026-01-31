import { z } from "zod";

export const subscriptionBenefitsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  benefits: z
    .array(
      z.object({
        iconType: z.string().min(1, "Icon is required"),
        title: z.string().min(1, "Benefit title is required"),
        description: z.string().min(1, "Benefit description is required"),
      }),
    )
    .min(1, "At least one benefit is required"),
});

export type SubscriptionBenefitsFormData = z.infer<
  typeof subscriptionBenefitsSchema
>;
