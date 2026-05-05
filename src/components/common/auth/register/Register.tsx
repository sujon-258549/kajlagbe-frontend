"use client";

import { useState } from "react";
import { useForm, Controller, FieldError, Resolver, useWatch } from "react-hook-form";
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
import { Checkbox } from "@/components/ui/checkbox";
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
import { servicesData } from "@/data/servicesData";
import { useEffect } from "react";
import { getAllRolesAction, getAllSubCategoriesAction, getAllWorkTypesAction } from "@/actions/auth.actions";
import FormTextarea from "@/components/common/FormTextarea";

// Schema imported from @/schemas/register.schema

const steps = [
  { id: 1, title: "Personal Details", icon: User },
  { id: 2, title: "Account Info", icon: Lock },
  { id: 3, title: "Address", icon: MapPin },
  { id: 4, title: "Professional Info", icon: Briefcase, roleDependent: true },
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [roles, setRoles] = useState<any[]>([]);
  const [subCategories, setSubCategories] = useState<any[]>([]);
  const [workTypes, setWorkTypes] = useState<any[]>([]);

  const { refreshUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchRoles = async () => {
      const result = await getAllRolesAction();
      if (result.success) {
        setRoles(result.data);
        // Roles are fetched and stored, letting user select from placeholder
      }
    };
    const fetchSubCategories = async () => {
      const result = await getAllSubCategoriesAction();
      if (result.success) {
        setSubCategories(result.data);
      }
    };
    const fetchWorkTypes = async () => {
      const result = await getAllWorkTypesAction();
      if (result.success) {
        setWorkTypes(result.data);
      }
    };
    fetchRoles();
    fetchSubCategories();
    fetchWorkTypes();
  }, []);

  const {
    register,
    handleSubmit,
    trigger,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema) as Resolver<RegisterFormData>,
    defaultValues: {
    },
  });

  const selectedRoleId = watch("role");
  const selectedRoleName = roles.find((r) => r.id === selectedRoleId)?.role?.toUpperCase();

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = [
        "role",
        "name",
        "gender",
        "dob",
        "bloodGroup",
        "photo",
      ];
    } else if (currentStep === 2) {
      fieldsToValidate = [
        "email",
        "password",
        "confirmPassword",
        "mobile",
        "nid",
        "nidPhotoFront",
        "nidPhotoBack",
      ];
    } else if (currentStep === 3) {
      fieldsToValidate = ["division", "district", "upazila", "address"];
    }

    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      if (currentStep === 3 && selectedRoleName === "USER") {
        // Skip Step 4 for regular users
        setCurrentStep(4); 
      } else {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      }
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
          email: data.email.trim().toLowerCase(),
          password: data.password,
          mobile: data.mobile.replace(/\s+/g, ""),
          roleId: data.role || roles.find(r => r.role.toUpperCase() === "WORKER")?.id,
        },
        profile: {
          name: data.name.trim(),
          gender: data.gender,
          age: data.age,
          dob: data.dob,
          bloodGroup: data.bloodGroup,
          nid: data.nid?.trim(),
          photo: photoUrl || undefined,
          nidPhoto: [nidFrontUrl, nidBackUrl].filter(Boolean),
        },
        address: {
          division: data.division,
          district: data.district,
          upazila: data.upazila,
          address: data.address,
        },
        workInfo: selectedRoleName === "WORKER" || selectedRoleName === "PROVIDER" ? {
          subCategoryIds: data.categories || [],
          experience: data.experience,
          workType: workTypes.find(w => w.id === data.workType)?.name || data.workType,
          workTypeIds: [data.workType].filter(Boolean),
          workStartTime: data.availableTimeStart,
          workTimeLimit: data.availableTimeEnd,
          availableTime: `${data.availableTimeStart} - ${data.availableTimeEnd}`,
        } : undefined,
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
    } catch (error) {
      console.error("Registration error:", error);
      toast.update(loadingToast, {
        render: "An unexpected error occurred",
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
              {steps.map((step) => {
                if (step.roleDependent && selectedRoleName === "USER") return null;
                return (
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
                        "w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500",
                        currentStep > step.id
                          ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20"
                          : currentStep === step.id
                            ? "bg-white text-secondary border-white shadow-xl shadow-black/5 scale-110"
                            : "border-white/20 text-white/40",
                      )}
                    >
                      {currentStep > step.id ? (
                        <CheckCircle className="w-6 h-6 animate-in zoom-in duration-300" />
                      ) : (
                        <step.icon className={cn("w-6 h-6", currentStep === step.id ? "animate-pulse" : "")} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={cn(
                        "text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-300",
                        currentStep === step.id ? "text-white" : "text-white/40"
                      )}>
                        Step 0{step.id}
                      </p>
                      <p className={cn(
                        "font-semibold text-lg transition-all duration-300",
                        currentStep === step.id ? "text-white translate-x-1" : "text-white/60"
                      )}>{step.title}</p>
                    </div>
                  </div>
                );
              })}
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
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20  blur-3xl rounded-full"></div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          {/* Glassy Form Container */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 p-6 sm:p-10 relative overflow-hidden group">
            {/* Top Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-slate-100">
              <motion.div
                className="h-full bg-secondary"
                initial={{ width: "0%" }}
                animate={{
                  width: `${(currentStep / steps.filter((s) => !s.roleDependent || selectedRoleName !== "USER").length) * 100}%`,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">
                {steps.find((s) => s.id === currentStep)?.title}
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Please provide the information below to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-6"
                >
                  {/* Step 1: Personal Info */}
                  {currentStep === 1 && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 leading-none mb-3 inline-block">
                          I am a <span className="text-red-500 ml-1">*</span>
                        </label>
                        <Controller
                          control={control}
                          name="role"
                          render={({ field }) => (
                            <Select
                              onValueChange={(val) => {
                                field.onChange(val);
                                const name = roles.find(r => r.id === val)?.role?.toUpperCase();
                                setValue("roleName", name);
                              }}
                              defaultValue={field.value}
                            >
                              <SelectTrigger
                                className={cn(
                                  "global-input-style bg-white text-slate-700",
                                  errors.role &&
                                    "border-red-500 focus:ring-red-500",
                                )}
                              >
                                <SelectValue placeholder="Please select your role" />
                              </SelectTrigger>
                              <SelectContent>
                                {roles
                                  .filter((r) => ["USER", "WORKER", "PROVIDER"].includes(r.role.toUpperCase()))
                                  .map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                      {role.role === "USER" ? "Client / Customer" : 
                                       role.role === "WORKER" || role.role === "PROVIDER" ? "Service Provider / Worker" : 
                                       role.role}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.role && (
                          <p className="text-xs text-red-500">
                            {errors.role.message}
                          </p>
                        )}
                      </div>

                      <FormInput
                        label="Full Name"
                        placeholder="Sujon Mia"
                        {...register("name")}
                        error={errors.name}
                        required
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 leading-none mb-3 inline-block">
                            Gender <span className="text-red-500 ml-1">*</span>
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
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 leading-none mb-3 inline-block">
                            Blood Group <span className="text-red-500 ml-1">*</span>
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
                        <div className="space-y-2">
                          <ImageUpload
                            label="Profile Photo"
                            register={register("photo")}
                            error={errors.photo as FieldError}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Step 2: Account Info */}
                  {currentStep === 2 && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <FormInput
                          label="Email Address"
                          type="email"
                          placeholder="john@example.com"
                          {...register("email")}
                          error={errors.email}
                          required
                        />
                        <FormInput
                          label="Mobile Number"
                          type="tel"
                          placeholder="017..."
                          {...register("mobile")}
                          error={errors.mobile}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <FormInput
                          label="Password"
                          type="password"
                          placeholder="••••••••"
                          {...register("password")}
                          error={errors.password}
                          required
                        />
                        <FormInput
                          label="Confirm Password"
                          type="password"
                          placeholder="••••••••"
                          {...register("confirmPassword")}
                          error={errors.confirmPassword}
                          required
                        />
                      </div>

                      <FormInput
                        label="NID Number"
                        placeholder="National ID Number"
                        {...register("nid")}
                        error={errors.nid}
                        required
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
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <FormInput
                            label="District"
                            placeholder="Rangpur"
                            {...register("district")}
                            error={errors.district}
                            required
                          />
                        </div>
                      </div>
                      <FormInput
                        label="Upazila"
                        placeholder="Sadar"
                        {...register("upazila")}
                        error={errors.upazila}
                        required
                      />
                      <div className="space-y-2">
                        <FormTextarea
                          label="Detailed Address"
                          {...register("address")}
                          placeholder="Village, House No, etc."
                          error={errors.address}
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Step 4: Work Info */}
                  {currentStep === 4 && (
                    <>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-secondary" />
                            Service Categories
                          </label>
                          <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                            Select all that apply
                          </span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-5 border border-slate-200 rounded-lg bg-slate-50/30 max-h-[320px] overflow-y-auto custom-scrollbar shadow-inner">
                          <Controller
                            control={control}
                            name="categories"
                            render={({ field }) => (
                              <>
                                {subCategories.map((item) => (
                                  <div
                                    key={item.id}
                                    className="flex items-center space-x-2 bg-white p-2 rounded-lg border border-slate-100 hover:border-secondary/30 transition-colors shadow-sm"
                                  >
                                    <Checkbox
                                      id={item.id}
                                      checked={(field.value || []).includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        const currentValues = field.value || [];
                                        const nextValues = checked
                                          ? [...currentValues, item.id]
                                          : currentValues.filter((v: string) => v !== item.id);
                                        field.onChange(nextValues);
                                      }}
                                    />
                                    <label
                                      htmlFor={item.id}
                                      className="text-[13px] font-medium leading-none cursor-pointer select-none text-slate-600 hover:text-slate-900"
                                    >
                                      {item.name}
                                    </label>
                                  </div>
                                ))}
                              </>
                            )}
                          />
                        </div>
                        {errors.categories && (
                          <p className="text-xs text-red-500">
                            {errors.categories.message as string}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 leading-none mb-3 inline-block">
                            Work Type <span className="text-red-500 ml-1">*</span>
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
                                  errors.workType &&
                                    "border-red-500 focus:ring-red-500",
                                )}
                              >
                                  <SelectValue placeholder="Please select work type" />
                                </SelectTrigger>
                                <SelectContent>
                                  {workTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                      {type.name}
                                    </SelectItem>
                                  ))}
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
                      <div className="grid grid-cols-2 gap-4">
                        <FormInput
                          label="Start Time"
                          type="time"
                          {...register("availableTimeStart")}
                          error={errors.availableTimeStart}
                          required
                        />
                        <FormInput
                          label="End Time"
                          type="time"
                          {...register("availableTimeEnd")}
                          error={errors.availableTimeEnd}
                          required
                        />
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between items-center pt-8 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isSubmitting}
                  className={cn(
                    "group transition-all duration-300 rounded-[6px] px-6",
                    currentStep === 1 ? "opacity-0 pointer-events-none" : "hover:bg-slate-100",
                  )}
                >
                  <ChevronLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" /> Back
                </Button>

                <div className="flex gap-3">
                  {currentStep < steps.length && !(currentStep === 3 && selectedRoleName === "USER") ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="min-w-[120px] bg-secondary hover:bg-secondary/90 text-white rounded-[6px] shadow-lg shadow-secondary/20 transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                      Next <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="min-w-[140px] bg-secondary hover:bg-secondary/90 text-white rounded-[6px] shadow-lg shadow-secondary/20 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Complete <CheckCircle className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
