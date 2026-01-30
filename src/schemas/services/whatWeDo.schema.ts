import { z } from "zod";

export const whatWeDoItemSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Title is required"),
  number: z.string().min(1, "Number is required"),
  image: z.string().min(1, "Image is required"),
});

export const whatWeDoSchema = z.object({
  items: z.array(whatWeDoItemSchema),
});

export type WhatWeDoFormData = z.infer<typeof whatWeDoSchema>;
export type WhatWeDoItem = z.infer<typeof whatWeDoItemSchema>;
