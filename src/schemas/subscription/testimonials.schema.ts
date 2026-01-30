import * as z from "zod";

export const subscriptionTestimonialsSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  testimonials: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        role: z.string().min(1, "Role is required"),
        image: z.string().url("Must be a valid URL"),
        quote: z.string().min(1, "Quote is required"),
      }),
    )
    .min(1, "At least one testimonial is required"),
});

export type SubscriptionTestimonialsFormData = z.infer<
  typeof subscriptionTestimonialsSchema
>;
