"use client";

import { useState } from "react";
import { useForm, Controller, FieldError, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/schemas/register.schema";
import {
  User,
  MapPin,
  Briefcase,
  Lock,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/FormInput";
import ImageUpload from "@/components/common/ImageUpload";
import { Textarea } from "@/components/ui/textarea"; // Assuming you have this or standard textarea
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Schema imported from @/schemas/register.schema

const steps = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Account Info", icon: Lock },
  { id: 3, title: "Address", icon: MapPin },
  { id: 4, title: "Professional Info", icon: Briefcase },
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterFormData>,
    defaultValues: {
      role: "PROVIDER",
      workType: "Full-time",
    },
  });

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ["name", "gender", "age", "dob", "bloodGroup", "nid"];
    } else if (currentStep === 2) {
      fieldsToValidate = ["email", "password", "confirmPassword", "mobile"];
    } else if (currentStep === 3) {
      fieldsToValidate = ["division", "district", "upazila", "address"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsSubmitting(true);

    // Transform data to match backend expectation
    const payload = {
      ...data,
      categories: data.categories.split(",").map((c) => c.trim()), // Split string to array
      nidPhoto: [data.nidPhotoFront || "", data.nidPhotoBack || ""].filter(
        Boolean,
      ),
    };

    // Remove individual photo fields if cleaner payload needed
    // delete payload.nidPhotoFront;
    // delete payload.nidPhotoBack;

    console.log("Submitting Payload:", payload);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Registration Successful! (Check console for payload)");
      // Redirect or show success
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 my-10 bg-slate-50/50">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-300 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side - Steps & Info */}
        <div className="md:w-1/3 bg-[#052e16] p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/" className="inline-block mb-8">
              <h2 className="text-2xl font-bold tracking-tight">KajLagbe</h2>
            </Link>

            <div className="space-y-6">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={cn(
                    "flex items-center gap-4 transition-all duration-300",
                    currentStep === step.id
                      ? "opacity-100 translate-x-2"
                      : "opacity-60",
                  )}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                      currentStep > step.id
                        ? "bg-primary border-primary text-white"
                        : currentStep === step.id
                          ? "bg-white text-[#052e16] border-white"
                          : "border-white/30 text-white/50",
                    )}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <step.icon className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold opacity-70">
                      Step {step.id}
                    </p>
                    <p className="font-medium text-lg">{step.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-10">
            <p className="text-sm opacity-70">Already have an account?</p>
            <Link
              href="/login"
              className="text-primary font-bold hover:underline mt-1 inline-block"
            >
              Signin here
            </Link>
          </div>

          {/* Decorative Circle */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20  blur-3xl rounded-full"></div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-xl mx-auto space-y-6"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900">
                {steps[currentStep - 1].title}
              </h2>
              <p className="text-slate-500 text-sm">
                Please provide your details below.
              </p>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                  <>
                    <FormInput
                      label="Full Name"
                      placeholder="Sujon Mia"
                      {...register("name")}
                      error={errors.name}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                          Gender
                        </label>
                        <select
                          {...register("gender")}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                          <option value="OTHER">Other</option>
                        </select>
                        {errors.gender && (
                          <p className="text-xs text-red-500">
                            {errors.gender.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <FormInput
                          label="Date of Birth"
                          type="date"
                          {...register("dob")}
                          error={errors.dob}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormInput
                          label="Age"
                          type="number"
                          placeholder="22"
                          {...register("age")}
                          error={errors.age as FieldError}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                          Blood Group
                        </label>
                        <select
                          {...register("bloodGroup")}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="">Select</option>
                          <option value="A_POSITIVE">A+</option>
                          <option value="A_NEGATIVE">A-</option>
                          <option value="B_POSITIVE">B+</option>
                          <option value="B_NEGATIVE">B-</option>
                          <option value="AB_POSITIVE">AB+</option>
                          <option value="AB_NEGATIVE">AB-</option>
                          <option value="O_POSITIVE">O+</option>
                          <option value="O_NEGATIVE">O-</option>
                        </select>
                        {errors.bloodGroup && (
                          <p className="text-xs text-red-500">
                            {errors.bloodGroup.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <FormInput
                      label="NID Number"
                      placeholder="National ID Number"
                      {...register("nid")}
                      error={errors.nid}
                    />

                    <ImageUpload
                      label="Profile Photo"
                      register={register("photo")}
                      error={errors.photo as FieldError}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <ImageUpload
                          label="NID Front"
                          register={register("nidPhotoFront")}
                          error={errors.nidPhotoFront as FieldError}
                        />
                      </div>
                      <div className="space-y-2">
                        <ImageUpload
                          label="NID Back"
                          register={register("nidPhotoBack")}
                          error={errors.nidPhotoBack as FieldError}
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Account Info */}
                {currentStep === 2 && (
                  <>
                    <FormInput
                      label="Email Address"
                      type="email"
                      placeholder="john@example.com"
                      {...register("email")}
                      error={errors.email}
                    />
                    <FormInput
                      label="Password"
                      type="password"
                      placeholder="••••••••"
                      {...register("password")}
                      error={errors.password}
                    />
                    <FormInput
                      label="Confirm Password"
                      type="password"
                      placeholder="••••••••"
                      {...register("confirmPassword")}
                      error={errors.confirmPassword}
                    />
                    <FormInput
                      label="Mobile Number"
                      type="tel"
                      placeholder="017..."
                      {...register("mobile")}
                      error={errors.mobile}
                    />
                  </>
                )}

                {/* Step 3: Address */}
                {currentStep === 3 && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormInput
                          label="Division"
                          placeholder="Rangpur"
                          {...register("division")}
                          error={errors.division}
                        />
                      </div>
                      <div className="space-y-2">
                        <FormInput
                          label="District"
                          placeholder="Rangpur"
                          {...register("district")}
                          error={errors.district}
                        />
                      </div>
                    </div>
                    <FormInput
                      label="Upazila"
                      placeholder="Sadar"
                      {...register("upazila")}
                      error={errors.upazila}
                    />
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Detailed Address
                      </label>
                      <Textarea
                        {...register("address")}
                        placeholder="Village, House No, etc."
                        className={cn(
                          errors.address &&
                            "border-red-500 focus-visible:ring-red-500",
                        )}
                      />
                      {errors.address && (
                        <p className="text-xs text-red-500">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Step 4: Professional Info */}
                {currentStep === 4 && (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">
                        Service Categories
                      </label>
                      <Controller
                        control={control}
                        name="categories"
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              className={cn(
                                "h-9 py-1",
                                errors.categories &&
                                  "border-red-500 focus:ring-red-500",
                              )}
                            >
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="Design">Design</SelectItem>
                              <SelectItem value="Plumbing">Plumbing</SelectItem>
                              <SelectItem value="Electrical">
                                Electrical
                              </SelectItem>
                              <SelectItem value="Cleaning">Cleaning</SelectItem>
                              <SelectItem value="Driving">Driving</SelectItem>
                              <SelectItem value="Cooking">Cooking</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.categories && (
                        <p className="text-xs text-red-500">
                          {errors.categories.message}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <FormInput
                          label="Experience (Years)"
                          type="number"
                          placeholder="3"
                          {...register("experience")}
                          error={errors.experience}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">
                          Work Type
                        </label>
                        <select
                          {...register("workType")}
                          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="Full-time">Full-time</option>
                          <option value="Part-time">Part-time</option>
                          <option value="Contract">Contract</option>
                        </select>
                        {errors.workType && (
                          <p className="text-xs text-red-500">
                            {errors.workType.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <FormInput
                      label="Available Time"
                      placeholder="e.g. 9 AM - 5 PM"
                      {...register("availableTime")}
                      error={errors.availableTime}
                    />
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between pt-6 border-t mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={cn("w-28", currentStep === 1 && "invisible")}
              >
                <ChevronLeft className="w-4 h-4 mr-2" /> Back
              </Button>

              {currentStep < steps.length ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="w-28  hover:bg-secondary/90 text-white"
                >
                  Next <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-32 hover:bg-secondary/90 text-white"
                >
                  {isSubmitting ? "Saving..." : "Register"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
