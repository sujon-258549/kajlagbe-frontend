import { z } from "zod";

export const jobSchema = z.object({
  // Basic
  title: z.string().min(1, "Title is required"),
  categoryId: z.string().optional(),
  type: z.string().min(1, "Job type is required"),
  salary: z.string().optional(),
  jobAmount: z.string().optional(),
  applicationDeadline: z.string().min(1, "Deadline is required"),
  location: z.string().min(1, "Location is required"),

  // Content
  shortDescription: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  responsibilities: z.string().optional(),
  requirements: z.string().optional(),
  benefits: z.string().optional(),

  // Company
  company: z.string().min(1, "Company name is required"),
  industry: z.string().optional(),
  website: z.string().optional(),
  companySize: z.string().optional(),

  // Recruiter
  contactPerson: z.string().min(1, "Contact person is required"),
  department: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),

  // Flags
  isUrgent: z.boolean().optional(),
  visaSponsorship: z.boolean().optional(),
  relocationAssistance: z.boolean().optional(),
  performanceBonus: z.boolean().optional(),
  healthInsurance: z.boolean().optional(),
});

export type JobFormData = z.infer<typeof jobSchema>;
