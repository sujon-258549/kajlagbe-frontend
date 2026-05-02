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
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "@/lib/imageUpload";
import { registerAction } from "@/actions/auth.actions";
import { useAuth } from "@/context/AuthContext";
import FormTextarea from "@/components/common/FormTextarea";
import { servicesData } from "@/data/servicesData";

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

  const { refreshUser } = useAuth();
  const router = useRouter();

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
      fieldsToValidate = [
        "name",
        "gender",
        "age",
        "dob",
        "bloodGroup",
        "nid",
        "photo",
        "nidPhotoFront",
        "nidPhotoBack",
      ];
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
    const loadingToast = toast.loading("Creating your account...");

    try {
      // 1. Upload Images to Cloudinary
      let photoUrl = "";
      let nidFrontUrl = "";
      let nidBackUrl = "";

      if (data.photo && data.photo[0]) {
        photoUrl = await uploadToCloudinary(data.photo[0]);
      }
      if (data.nidPhotoFront && data.nidPhotoFront[0]) {
        nidFrontUrl = await uploadToCloudinary(data.nidPhotoFront[0]);
      }
      if (data.nidPhotoBack && data.nidPhotoBack[0]) {
        nidBackUrl = await uploadToCloudinary(data.nidPhotoBack[0]);
      }

      // 2. Format Payload for Backend
      const payload = {
        user: {
          email: data.email,
          password: data.password,
          mobile: data.mobile,
          role: data.role,
        },
        profile: {
          name: data.name,
          gender: data.gender,
          age: data.age,
          dob: data.dob,
          bloodGroup: data.bloodGroup,
          nid: data.nid,
          profilePhoto: photoUrl,
          nidPhotoUrls: [nidFrontUrl, nidBackUrl].filter(Boolean),
        },
        address: {
          division: data.division,
          district: data.district,
          upazila: data.upazila,
          address: data.address,
        },
        workInfo: {
          categories: data.categories.split(",").map((c) => c.trim()),
          experience: data.experience,
          workType: data.workType,
          availableTime: data.availableTime,
        },
      };

      console.log("Submitting Payload:", payload);

      // 3. Call Registration Action
      const result = await registerAction(payload);

      if (result.success) {
        toast.update(loadingToast, {
          render: "Registration successful! Welcome to KajLagbe.",
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        
        await refreshUser();
        router.push("/");
      } else {
        toast.update(loadingToast, {
          render: result.message || "Registration failed",
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });
      }
    } catch (error: any) {
      console.error("Registration Error:", error);
      toast.update(loadingToast, {
        render: error.message || "An unexpected error occurred",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
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
                        <Controller
                          control={control}
                          name="gender"
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                className={cn(
                                  "h-9 py-1",
                                  errors.gender &&
                                    "border-red-500 focus:ring-red-500",
                                )}
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                                <SelectItem value="OTHER">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
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
                        <Controller
                          control={control}
                          name="bloodGroup"
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                className={cn(
                                  "h-9 py-1",
                                  errors.bloodGroup &&
                                    "border-red-500 focus:ring-red-500",
                                )}
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A_POSITIVE">A+</SelectItem>
                                <SelectItem value="A_NEGATIVE">A-</SelectItem>
                                <SelectItem value="B_POSITIVE">B+</SelectItem>
                                <SelectItem value="B_NEGATIVE">B-</SelectItem>
                                <SelectItem value="AB_POSITIVE">
                                  AB+
                                </SelectItem>
                                <SelectItem value="AB_NEGATIVE">
                                  AB-
                                </SelectItem>
                                <SelectItem value="O_POSITIVE">O+</SelectItem>
                                <SelectItem value="O_NEGATIVE">O-</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
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
                      <FormTextarea
                        label="Detailed Address"
                        {...register("address")}
                        placeholder="Village, House No, etc."
                        error={errors.address}
                      />
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
                              {servicesData.map((category) => (
                                <SelectItem
                                  key={category.slug}
                                  value={category.title}
                                >
                                  {category.title}
                                </SelectItem>
                              ))}
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
                        <Controller
                          control={control}
                          name="workType"
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                className={cn(
                                  "h-9 py-1",
                                  errors.workType &&
                                    "border-red-500 focus:ring-red-500",
                                )}
                              >
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Full-time">
                                  Full-time
                                </SelectItem>
                                <SelectItem value="Part-time">
                                  Part-time
                                </SelectItem>
                                <SelectItem value="Contract">
                                  Contract
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
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
