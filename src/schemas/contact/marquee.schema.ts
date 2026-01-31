import { z } from "zod";

export const contactMarqueeSchema = z.object({
  items: z
    .array(
      z.object({
        text: z.string().min(1, "Item text is required"),
      }),
    )
    .min(1, "At least one item is required"),
});

export type ContactMarqueeFormData = z.infer<typeof contactMarqueeSchema>;
