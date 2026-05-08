"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Briefcase,
  Building2,
  Loader2,
  MapPin,
  Phone,
  CalendarClock,
} from "lucide-react";
import CommonModal from "@/components/modal/common/CommonModal";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import { Button } from "@/components/ui/button";
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

const nativeSelectClasses =
  "flex h-9 w-full rounded-[6px] border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all appearance-none cursor-pointer bg-no-repeat bg-[right_0.75rem_center] bg-[length:0.65rem] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M31.3%20192h257.3c17.8%200%2026.7%2021.5%2014.1%2034.1L174.1%20354.8c-7.8%207.8-20.5%207.8-28.3%200L17.2%20226.1C4.6%20213.5%2013.5%20192%2031.3%20192z%22%2F%3E%3C%2Fsvg%3E')] pr-8";

const SelectField: React.FC<{
  label: string;
  required?: boolean;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  options: { label: string; value: string }[];
  error?: string;
}> = ({ label, required, value, onChange, placeholder, options, error }) => (
  <div className="space-y-2">
    <label className="font-medium text-slate-700 text-sm mb-3 inline-block">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={nativeSelectClasses}
    >
      <option value="" disabled>
        {placeholder || "Select an option"}
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && (
      <p className="text-xs text-red-500 font-medium">{error}</p>
    )}
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
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <SelectField
                  label="Job Type"
                  required
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select job type"
                  options={jobTypes.map((t) => ({ label: t, value: t }))}
                  error={errors.type?.message}
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Controller
              control={control}
              name="categoryId"
              render={({ field }) => (
                <SelectField
                  label="Category"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select a category"
                  options={categories.map((c) => ({
                    label: c.name,
                    value: c.id,
                  }))}
                  error={errors.categoryId?.message}
                />
              )}
            />
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
            <Controller
              control={control}
              name="companySize"
              render={({ field }) => (
                <SelectField
                  label="Company Size"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Select size"
                  options={companySizes.map((s) => ({
                    label: `${s} Employees`,
                    value: s,
                  }))}
                  error={errors.companySize?.message}
                />
              )}
            />
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

      </form>
    </CommonModal>
  );
};

export default UserJobPostModal;
