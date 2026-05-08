"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  Building,
  AlignLeft,
  Users,
  Calendar,
  PlusCircle,
  CheckCircle2,
  Info,
  ShieldCheck,
  PlaneTakeoff,
  Award,
  Loader2,
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Heading4 from "@/components/common/Headings/Heading4";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import { jobSchema, JobFormData } from "@/schemas/job/job.schema";
import { createJob } from "@/actions/job.actions";
import { getAllCategory } from "@/actions/category.actions";

type CategoryOption = { id: string; name: string };

const fieldLabel =
  "block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3";
const inputClass =
  "h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4";
const selectClass =
  "h-10 bg-slate-50/50 border-slate-200 rounded-xl font-semibold px-4 focus:ring-1 focus:ring-secondary/20";
const textareaClass =
  "bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all p-4 font-semibold";

const flagFields = [
  { label: "Is Urgent", id: "isUrgent" as const, icon: Clock },
  { label: "Visa Sponsorship", id: "visaSponsorship" as const, icon: PlaneTakeoff },
  { label: "Relocation Asst.", id: "relocationAssistance" as const, icon: MapPin },
  { label: "Perf. Bonus", id: "performanceBonus" as const, icon: FaBangladeshiTakaSign },
  { label: "Health Insurance", id: "healthInsurance" as const, icon: ShieldCheck },
  { label: "Featured Post", id: "_featured" as const, icon: Award, disabled: true },
];

const splitLines = (value?: string) =>
  value
    ? value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
    : undefined;

export default function AddPostPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormData>({
    resolver: zodResolver(jobSchema) as Resolver<JobFormData>,
    defaultValues: {
      title: "",
      type: "",
      salary: "",
      jobAmount: "",
      applicationDeadline: "",
      location: "",
      shortDescription: "",
      description: "",
      responsibilities: "",
      requirements: "",
      benefits: "",
      company: "",
      industry: "",
      website: "",
      companySize: "",
      division: "",
      district: "",
      upazila: "",
      roadNo: "",
      houseNo: "",
      postCode: "",
      landmark: "",
      contactPerson: "",
      department: "",
      email: "",
      phone: "",
      recruiterBio: "",
      isUrgent: false,
      visaSponsorship: false,
      relocationAssistance: false,
      performanceBonus: false,
      healthInsurance: false,
    },
  });

  useEffect(() => {
    (async () => {
      const res = await getAllCategory();
      if (res?.success) {
        const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        setCategories(list);
      }
    })();
  }, []);

  const onSubmit = async (values: JobFormData, isDraft = false) => {
    const {
      division,
      district,
      upazila,
      roadNo,
      houseNo,
      postCode,
      landmark,
      responsibilities,
      requirements,
      benefits,
      recruiterBio,
      ...rest
    } = values;

    const payload = {
      ...rest,
      responsibilities: splitLines(responsibilities),
      requirements: splitLines(requirements),
      benefits: splitLines(benefits),
      jobLocation: {
        division: division || undefined,
        district: district || undefined,
        upazila: upazila || undefined,
        roadNo: roadNo || undefined,
        houseNo: houseNo || undefined,
        postCode: postCode || undefined,
        landmark: landmark || undefined,
      },
      isPublished: !isDraft,
    };

    const res = await createJob(payload);
    if (res?.success) {
      toast.success(isDraft ? "Draft saved" : "Job published");
      reset();
      router.push("/dashboard/my-works");
    } else {
      toast.error(res?.message || "Failed to create job");
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
            <PlusCircle className="w-6 h-6 text-secondary" />
          </div>
          <Heading4>Create New Job Post</Heading4>
        </div>
        <p className="text-slate-500 font-medium ml-15">
          Fill in the details below to post a new job opportunity on Kajlagbe.
        </p>
      </div>

      <form onSubmit={handleSubmit((v) => onSubmit(v, false))} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4 text-secondary" /> Basic Information
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              Step 1 of 2
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className={fieldLabel}>Job Title *</label>
                <div className="relative">
                  <FormInput
                    placeholder="e.g. Senior Agronomist"
                    error={errors.title}
                    className={inputClass}
                    {...register("title")}
                  />
                  <Briefcase className="absolute right-4 top-[18px] w-4 h-4 text-slate-300 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className={fieldLabel}>Category / Industry</label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={selectClass}>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <div>
                <label className={fieldLabel}>Job Type *</label>
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={selectClass}>
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.type && (
                  <p className="text-xs text-red-500 font-medium mt-1">
                    {errors.type.message}
                  </p>
                )}
              </div>

              <div>
                <label className={fieldLabel}>Salary Range (Text)</label>
                <div className="relative">
                  <FormInput
                    placeholder="e.g. 80k - 120k BDT"
                    className={inputClass}
                    error={errors.salary}
                    {...register("salary")}
                  />
                  <FaBangladeshiTakaSign className="absolute right-4 top-[18px] w-4 h-4 text-slate-300 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className={fieldLabel}>Job Amount / Budget</label>
                <FormInput
                  placeholder="e.g. Negotiable"
                  className={inputClass}
                  error={errors.jobAmount}
                  {...register("jobAmount")}
                />
              </div>

              <div>
                <label className={fieldLabel}>Application Deadline *</label>
                <div className="relative">
                  <FormInput
                    type="date"
                    className={inputClass}
                    error={errors.applicationDeadline}
                    {...register("applicationDeadline")}
                  />
                  <Calendar className="absolute right-4 top-[18px] w-4 h-4 text-slate-300 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className={fieldLabel}>General Location *</label>
                <div className="relative">
                  <FormInput
                    placeholder="e.g. Dhaka, Bangladesh"
                    className={inputClass}
                    error={errors.location}
                    {...register("location")}
                  />
                  <MapPin className="absolute right-4 top-[18px] w-4 h-4 text-slate-300 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Content & Details */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-secondary" /> Descriptions & Content
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              Step 2 of 2
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className={fieldLabel}>Short Description</label>
              <FormInput
                placeholder="Brief meta description (max 150 chars)"
                className={inputClass}
                error={errors.shortDescription}
                {...register("shortDescription")}
              />
            </div>

            <div>
              <label className={fieldLabel}>Full Description *</label>
              <FormTextarea
                rows={6}
                className={`${textareaClass} resize-none`}
                placeholder="Detailed job description..."
                error={errors.description}
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={fieldLabel}>Responsibilities</label>
                <FormTextarea
                  rows={4}
                  className={textareaClass}
                  placeholder="One per line..."
                  error={errors.responsibilities}
                  {...register("responsibilities")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Requirements</label>
                <FormTextarea
                  rows={4}
                  className={textareaClass}
                  placeholder="One per line..."
                  error={errors.requirements}
                  {...register("requirements")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Benefits</label>
                <FormTextarea
                  rows={4}
                  className={textareaClass}
                  placeholder="One per line..."
                  error={errors.benefits}
                  {...register("benefits")}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Company Information */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <Building className="w-4 h-4 text-secondary" /> Company Information
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              More Details
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={fieldLabel}>Company Name *</label>
                <FormInput
                  placeholder="e.g. Kajlagbe Farms"
                  className={inputClass}
                  error={errors.company}
                  {...register("company")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Industry</label>
                <FormInput
                  placeholder="e.g. Agriculture"
                  className={inputClass}
                  error={errors.industry}
                  {...register("industry")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Company Website</label>
                <FormInput
                  placeholder="https://..."
                  className={inputClass}
                  error={errors.website}
                  {...register("website")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Company Size</label>
                <Controller
                  name="companySize"
                  control={control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={selectClass}>
                        <SelectValue placeholder="Select Size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 Employees</SelectItem>
                        <SelectItem value="11-50">11-50 Employees</SelectItem>
                        <SelectItem value="51-200">51-200 Employees</SelectItem>
                        <SelectItem value="201-500">201-500 Employees</SelectItem>
                        <SelectItem value="500+">500+ Employees</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Detailed Location */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" /> Detailed Location
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              Optional
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className={fieldLabel}>Division</label>
                <FormInput
                  placeholder="e.g. Dhaka"
                  className={inputClass}
                  {...register("division")}
                />
              </div>
              <div>
                <label className={fieldLabel}>District</label>
                <FormInput
                  placeholder="e.g. Dhaka"
                  className={inputClass}
                  {...register("district")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Upazila</label>
                <FormInput
                  placeholder="e.g. Gulshan"
                  className={inputClass}
                  {...register("upazila")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Road No</label>
                <FormInput
                  placeholder="e.g. 12"
                  className={inputClass}
                  {...register("roadNo")}
                />
              </div>
              <div>
                <label className={fieldLabel}>House No</label>
                <FormInput
                  placeholder="e.g. 55/A"
                  className={inputClass}
                  {...register("houseNo")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Post Code</label>
                <FormInput
                  placeholder="e.g. 1212"
                  className={inputClass}
                  {...register("postCode")}
                />
              </div>
            </div>
            <div>
              <label className={fieldLabel}>Landmark</label>
              <FormInput
                placeholder="e.g. Next to shooting club"
                className={inputClass}
                {...register("landmark")}
              />
            </div>
          </div>
        </div>

        {/* Section 5: Recruiter Details */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <Users className="w-4 h-4 text-secondary" /> Recruiter Details
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              Contact info
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className={fieldLabel}>Contact Person Name *</label>
                <FormInput
                  placeholder="e.g. Sujon Ahmed"
                  className={inputClass}
                  error={errors.contactPerson}
                  {...register("contactPerson")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Designation</label>
                <FormInput
                  placeholder="e.g. HR Manager"
                  className={inputClass}
                  {...register("department")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Personal Email</label>
                <FormInput
                  type="email"
                  placeholder="e.g. sujon@example.com"
                  className={inputClass}
                  {...register("email")}
                />
              </div>
              <div>
                <label className={fieldLabel}>Phone Number</label>
                <FormInput
                  placeholder="e.g. +8801..."
                  className={inputClass}
                  {...register("phone")}
                />
              </div>
            </div>
            <div>
              <label className={fieldLabel}>Recruiter Bio</label>
              <FormTextarea
                className={`${textareaClass} h-24 resize-none`}
                placeholder="Brief intro..."
                {...register("recruiterBio")}
              />
            </div>
          </div>
        </div>

        {/* Section 6: Flags & Visibility */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" /> Benefits & Visibility
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              Final Step
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {flagFields.map((flag) =>
                flag.disabled ? (
                  <label
                    key={flag.id}
                    className="flex items-center gap-4 bg-slate-50 border border-slate-200/50 p-4 rounded-xl opacity-60 select-none"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0">
                      <flag.icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                        {flag.label}
                      </p>
                      <p className="text-[10px] text-slate-400">Coming soon</p>
                    </div>
                  </label>
                ) : (
                  <Controller
                    key={flag.id}
                    name={flag.id}
                    control={control}
                    render={({ field }) => (
                      <label className="flex items-center gap-4 bg-slate-50 border border-slate-200/50 p-4 rounded-xl cursor-pointer hover:border-secondary/30 transition-all select-none group">
                        <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <flag.icon className="w-5 h-5 text-slate-400 group-hover:text-secondary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            {flag.label}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded-md border-slate-300 text-secondary focus:ring-secondary accent-secondary"
                          checked={!!field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          onBlur={field.onBlur}
                          ref={field.ref}
                          name={field.name}
                        />
                      </label>
                    )}
                  />
                ),
              )}
            </div>

            <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4 max-w-lg">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  By clicking &quot;Publish Job Post&quot;, you agree to
                  Kajlagbe&apos;s terms of service. Your post will be reviewed
                  and published within 24 hours.
                </p>
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  disabled={isSubmitting}
                  onClick={handleSubmit((v) => onSubmit(v, true))}
                  className="rounded-xl flex-1 md:flex-none"
                >
                  Save Draft
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="rounded-xl flex-1 md:flex-none"
                >
                  {isSubmitting && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  Publish Job Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
