import { z } from "zod";

export const benefitItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  desc: z.string().min(1, "Description is required"),
  iconName: z.string().min(1, "Icon is required"),
});

export const homeBenefitsSchema = z.object({
  badge: z.string().min(1, "Badge is required"),
  title: z.string().min(1, "Title is required"),
  centerImage: z.string().url("Must be a valid URL"),
  leftBenefits: z.array(benefitItemSchema).min(1),
  rightBenefits: z.array(benefitItemSchema).min(1),
});

export type HomeBenefitsFormData = z.infer<typeof homeBenefitsSchema>;
