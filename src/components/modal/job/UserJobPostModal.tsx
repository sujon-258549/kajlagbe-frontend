"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Building2,
  DollarSign,
  Loader2,
  MapPin,
  Phone,
  Mail,
  CalendarClock,
} from "lucide-react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { jobSchema, JobFormData } from "@/schemas/job/job.schema";
import { TCategory } from "@/types/category";

interface UserJobPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<JobFormData> & { id?: string };
  onSubmit: (data: JobFormData) => void | Promise<void>;
  onDelete?: () => void;
  isNew?: boolean;
  isLoading?: boolean;
  categories?: TCategory[];
}

const emptyValues: JobFormData = {
  title: "",
  categoryId: "",
  type: "Full-time",
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
};

const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
];

const companySizes = ["1-10", "11-50", "51-200", "201-500", "500+"];

const SectionTitle: React.FC<{
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ icon, children }) => (
  <div className="flex items-center gap-2 text-secondary font-bold text-sm border-b border-slate-100 pb-3">
    <span className="text-secondary">{icon}</span>
    {children}
  </div>
);

const UserJobPostModal: React.FC<UserJobPostModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  onDelete,
  isNew = false,
  isLoading = false,
  categories = [],
}) => {
  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: emptyValues,
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!isOpen) return;
    reset({ ...emptyValues, ...(initialData as JobFormData) });
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = handleSubmit(async (values) => {
    await onSubmit(values);
  });

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? "Post a New Job" : "Edit Job Posting"}
      description={
        isNew
          ? "Fill in the details below to publish your job."
          : "Update the details of your job posting."
      }
      maxWidth="4xl"
    >
      <form onSubmit={handleFormSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-5">
          <SectionTitle icon={<Briefcase className="w-4 h-4" />}>
            Basic Information
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Job Title"
              required
              placeholder="e.g. Senior Backend Developer"
              error={errors.title}
              {...register("title")}
            />
            <div className="space-y-2">
              <label className="font-medium text-slate-700 text-sm mb-3 inline-block">
                Job Type<span className="text-red-500 ml-1">*</span>
              </label>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-9 w-full bg-white">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.type && (
                <p className="text-xs text-red-500 font-medium">
                  {errors.type.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="font-medium text-slate-700 text-sm mb-3 inline-block">
                Category
              </label>
              <Controller
                control={control}
                name="categoryId"
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-9 w-full bg-white">
                      <SelectValue placeholder="Select a category" />
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
            <FormInput
              label="Industry"
              placeholder="e.g. IT, Banking"
              error={errors.industry}
              {...register("industry")}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormInput
              label="Location"
              required
              placeholder="e.g. Dhaka, Bangladesh"
              error={errors.location}
              {...register("location")}
            />
            <FormInput
              label="Salary Range"
              placeholder="e.g. 50,000 - 80,000 BDT"
              error={errors.salary}
              {...register("salary")}
            />
            <FormInput
              label="Application Deadline"
              required
              type="date"
              error={errors.applicationDeadline}
              {...register("applicationDeadline")}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-5">
          <SectionTitle icon={<MapPin className="w-4 h-4" />}>
            Job Description
          </SectionTitle>
          <FormTextarea
            label="Short Summary"
            rows={2}
            placeholder="A brief summary shown in the job list."
            error={errors.shortDescription}
            {...register("shortDescription")}
          />
          <FormTextarea
            label="Detailed Description"
            required
            rows={6}
            placeholder="Describe the role, environment, and expectations..."
            error={errors.description}
            {...register("description")}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <FormTextarea
              label="Responsibilities"
              rows={4}
              placeholder="One per line or comma separated"
              error={errors.responsibilities}
              {...register("responsibilities")}
            />
            <FormTextarea
              label="Requirements"
              rows={4}
              placeholder="One per line or comma separated"
              error={errors.requirements}
              {...register("requirements")}
            />
            <FormTextarea
              label="Benefits"
              rows={4}
              placeholder="One per line or comma separated"
              error={errors.benefits}
              {...register("benefits")}
            />
          </div>
        </div>

        {/* Company */}
        <div className="space-y-5">
          <SectionTitle icon={<Building2 className="w-4 h-4" />}>
            Company Details
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Company Name"
              required
              placeholder="e.g. Kajlagbe Ltd."
              error={errors.company}
              {...register("company")}
            />
            <FormInput
              label="Website"
              placeholder="https://..."
              error={errors.website}
              {...register("website")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="font-medium text-slate-700 text-sm mb-3 inline-block">
                Company Size
              </label>
              <Controller
                control={control}
                name="companySize"
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="h-9 w-full bg-white">
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      {companySizes.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s} Employees
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <FormInput
              label="Job Amount / Budget"
              placeholder="e.g. $1,500"
              error={errors.jobAmount}
              {...register("jobAmount")}
            />
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-5">
          <SectionTitle icon={<Phone className="w-4 h-4" />}>
            Recruiter Contact
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Contact Person"
              required
              placeholder="HR Manager Name"
              error={errors.contactPerson}
              {...register("contactPerson")}
            />
            <FormInput
              label="Department"
              placeholder="e.g. Engineering"
              error={errors.department}
              {...register("department")}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              label="Contact Email"
              type="email"
              placeholder="hr@company.com"
              error={errors.email}
              {...register("email")}
            />
            <FormInput
              label="Contact Phone"
              placeholder="+880..."
              error={errors.phone}
              {...register("phone")}
            />
          </div>
          <FormTextarea
            label="Recruiter Bio"
            rows={3}
            placeholder="A short note about the recruiter or hiring team."
            error={errors.recruiterBio}
            {...register("recruiterBio")}
          />
        </div>

        {/* Settings */}
        <div className="space-y-5">
          <SectionTitle icon={<CalendarClock className="w-4 h-4" />}>
            Additional Settings
          </SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "isUrgent", label: "Urgent Hiring" },
              { name: "performanceBonus", label: "Performance Bonus" },
              { name: "healthInsurance", label: "Health Insurance" },
              { name: "visaSponsorship", label: "Visa Sponsorship" },
              {
                name: "relocationAssistance",
                label: "Relocation Assistance",
              },
            ].map((toggle) => (
              <div
                key={toggle.name}
                className="flex items-center justify-between gap-2 border border-slate-200 px-4 h-12 rounded-lg bg-white"
              >
                <span className="text-sm font-medium text-slate-600">
                  {toggle.label}
                </span>
                <Controller
                  control={control}
                  name={toggle.name as keyof JobFormData}
                  render={({ field }) => (
                    <Switch
                      checked={!!field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-4 border-t border-slate-100">
          {!isNew && onDelete ? (
            <Button
              type="button"
              variant="outline"
              onClick={onDelete}
              disabled={isLoading}
              className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
            >
              Delete Job
            </Button>
          ) : (
            <span />
          )}
          <div className="flex gap-3 sm:ml-auto">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-secondary hover:bg-secondary/90 text-white px-8 font-bold"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isNew ? "Publish Job" : "Update Job"}
            </Button>
          </div>
        </div>

        {/* Hidden helpers for icon imports kept active */}
        <span className="hidden">
          <DollarSign /> <Mail />
        </span>
      </form>
    </CommonModal>
  );
};

export default UserJobPostModal;
