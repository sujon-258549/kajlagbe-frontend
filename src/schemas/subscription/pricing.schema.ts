import * as z from "zod";

export const subscriptionPricingSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  plans: z
    .array(
      z.object({
        name: z.string().min(1, "Plan name is required"),
        price: z.string().min(1, "Price is required"),
        period: z.string().min(1, "Period is required"),
        description: z.string().min(1, "Description is required"),
        features: z
          .array(z.string().min(1, "Feature is required"))
          .min(1, "At least one feature is required"),
        isPopular: z.boolean().default(false),
        buttonText: z.string().default("Get Started"),
      }),
    )
    .min(1, "At least one plan is required"),
});

export type SubscriptionPricingFormData = z.infer<
  typeof subscriptionPricingSchema
>;
