import * as z from "zod";

export const aboutStatsSchema = z.object({
  items: z.array(
    z.object({
      value: z.string().min(1, "Value is required"), // String to allow '50+' or '08'
      label: z.string().min(1, "Label is required"),
    }),
  ),
});

export type AboutStatsFormData = z.infer<typeof aboutStatsSchema>;
