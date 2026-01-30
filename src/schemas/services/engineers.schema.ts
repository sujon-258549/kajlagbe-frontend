import { z } from "zod";

export const serviceEngineerItemSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  image: z.string().min(1, "Image is required"),
});

export const serviceEngineerSchema = z.object({
  engineers: z.array(serviceEngineerItemSchema),
});

export type ServiceEngineerFormData = z.infer<typeof serviceEngineerSchema>;
export type ServiceEngineerItem = z.infer<typeof serviceEngineerItemSchema>;
