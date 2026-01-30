import * as z from "zod";

export const contactInfoSchema = z.object({
  cards: z
    .array(
      z.object({
        title: z.string().min(1, "Title is required"),
        lines: z
          .array(z.string().min(1, "Line content is required"))
          .min(1, "At least one line is required"),
        iconType: z.enum(["phone", "mail", "map", "clock"]),
      }),
    )
    .min(1, "At least one info card is required"),
});

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
