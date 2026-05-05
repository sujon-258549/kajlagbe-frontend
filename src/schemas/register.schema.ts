import * as z from "zod";

export const registerSchema = z
  .object({
    // Step 1: Account
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm Password is required"),
    mobile: z
      .string()
      .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi mobile number"),
    role: z.string().min(1, "Please select an account type"),
    roleName: z.string().optional(), // Internal field for conditional validation

    // Step 2: Personal
    name: z.string().min(2, "Name is required"),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], {
      message: "Gender is required",
    }),
    age: z.coerce.number().min(18, "Must be at least 18 years old").optional(),
    dob: z
      .string()
      .refine((date) => new Date(date).toString() !== "Invalid Date", {
        message: "Valid date is required",
      }),
    bloodGroup: z.enum(
      [
        "A_POSITIVE",
        "A_NEGATIVE",
        "B_POSITIVE",
        "B_NEGATIVE",
        "AB_POSITIVE",
        "AB_NEGATIVE",
        "O_POSITIVE",
        "O_NEGATIVE",
      ],
      { message: "Blood group is required" },
    ),
    nid: z.string().min(10, "NID must be valid"),

    // File uploads (Optional)
    photo: z.any().optional(),
    nidPhotoFront: z.any().optional(),
    nidPhotoBack: z.any().optional(),

    // Step 3: Address
    division: z.string().min(1, "Division is required"),
    district: z.string().min(1, "District is required"),
    upazila: z.string().min(1, "Upazila is required"),
    address: z.string().min(5, "Full address is required"),

    // Step 4: Work Info
    categories: z.array(z.string()).optional(),
    experience: z.string().optional(),
    workType: z.string().min(1, "Work type is required").optional(),
    availableTimeStart: z.string().optional(),
    availableTimeEnd: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .superRefine((data, ctx) => {
    const isWorker = data.roleName === "WORKER" || data.roleName === "PROVIDER";
    
    if (isWorker) {
      if (!data.categories || data.categories.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "At least one category is required",
          path: ["categories"],
        });
      }
      if (!data.workType) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Work type is required",
          path: ["workType"],
        });
      }
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
