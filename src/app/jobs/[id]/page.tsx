"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Clock,
  Briefcase,
  Calendar,
  Bookmark,
  Building,
  CheckCircle2,
  GraduationCap,
  Users,
  Mail,
  Phone,
  ChevronRight,
  Globe,
  Info,
  Hash,
  Star,
  UserCheck,
  Settings,
  Languages,
  Award,
  ShieldCheck,
  PlaneTakeoff,
  Home,
  Timer,
  Layout,
  Network,
  Users2,
  FileBadge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TbCurrencyTaka } from "react-icons/tb";
import { jobs } from "@/data/jobsData";

export default function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    notFound();
  }

  const {
    title,
    company,
    location,
    type,
    salary,
    posted,
    logo,
    description,
    responsibilities,
    requirements,
    benefits,
    job_poster,
    skills,
    experience,
    education,
    vacancy,
    deadline,
    workingHours,
    website,
    short_description,
    industry,
    companySize,
    address,
    is_urgent,
    // New fields to show
    gender,
    ageRange,
    salaryReview,
    lunchFacility,
    festivalBonus,
    weekend,
    email,
    phone,
    founded,
    tools,
    languages: jobLanguages,
    visa_sponsorship,
    relocation_assistance,
    remote_policy,
    department,
    reporting_to,
    team_size,
    performance_bonus,
    health_insurance,
    contact_person,
    ceo_name,
    ratings,
    reviews_count,
    internal_id,
    reference_code,
    keywords,
    views_count,
    applicants_count,
    work_start_time,
    work_time_limit,
    job_amount,
    job_location,
  } = job;

  return (
    <main className="min-h-screen bg-slate-50/30">
      {/* Breadcrumb Section */}

      <div className="py-8 md:py-12">
        <div className="main-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Header Section */}
            <div className="lg:col-span-12 mb-6">
              <div className="bg-white border border-slate-200 rounded-lg p-4 md:p-4 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 rounded-lg border border-slate-100 flex items-center justify-center p-3 shrink-0 bg-white">
                  <Image
                    src={logo}
                    alt={company}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                      {title}
                    </h1>
                    {is_urgent && (
                      <Badge
                        variant="outline"
                        className="text-red-600 border-red-200 bg-red-50 text-[10px] uppercase font-bold rounded-md"
                      >
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Building className="w-4 h-4" /> {company}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-4 h-4" /> {location}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Briefcase className="w-4 h-4" /> {type}
                    </div>
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-4 h-4" /> {posted}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto mt-6 md:mt-0 pt-6 md:pt-0 border-t md:border-t-0 border-slate-100">
                  <Button
                    variant="outline"
                    className="flex-1 md:flex-none border-slate-200 rounded-lg gap-2"
                  >
                    <Bookmark className="w-4 h-4" /> Save
                  </Button>
                  <Button className="">Apply Position</Button>
                </div>
              </div>
            </div>

            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Context Badges */}

              {/* Short Description */}
              {short_description && (
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-lg p-6 text-emerald-900 text-[15px] font-medium leading-relaxed italic">
                  {short_description}
                </div>
              )}

              <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8 space-y-10">
                {/* Job Description */}
                <section>
                  <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                    Job Description
                  </h2>
                  <div className="text-slate-600 leading-relaxed text-[15px] whitespace-pre-line">
                    {description || "No detailed description provided."}
                  </div>
                </section>

                {/* Responsibilities */}
                {responsibilities && responsibilities.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                      Key Responsibilities
                    </h2>
                    <div className="space-y-4">
                      {responsibilities.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-slate-300 shrink-0" />
                          <span className="text-slate-600 text-[15px] leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Requirements */}
                {requirements && requirements.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                      Requirements
                    </h2>
                    <div className="space-y-4">
                      {requirements.map((item, idx) => (
                        <div key={idx} className="flex gap-4 items-start">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                          <span className="text-slate-600 text-[15px] leading-relaxed">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Benefits */}
                {benefits && benefits.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                      Perks & Benefits
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {benefits.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-slate-600 text-[14px]"
                        >
                          <Award className="w-4 h-4 text-slate-400" />
                          {item}
                        </div>
                      ))}
                      {health_insurance && (
                        <div className="flex items-center gap-3 text-slate-600 text-[14px]">
                          <ShieldCheck className="w-4 h-4 text-slate-400" />{" "}
                          Health Insurance
                        </div>
                      )}
                      {performance_bonus && (
                        <div className="flex items-center gap-3 text-slate-600 text-[14px]">
                          <TbCurrencyTaka className="w-5 h-5 text-slate-400" />{" "}
                          Performance Bonus
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Skills & Tools */}
                {(skills?.length > 0 || tools?.length > 0) && (
                  <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                      Skills & Tools
                    </h2>
                    <div className="space-y-6">
                      {skills && skills.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, idx) => (
                            <Badge
                              key={idx}
                              variant="secondary"
                              className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none px-4 py-1.5 rounded-md font-bold transition-all whitespace-nowrap text-xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {tools && tools.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {tools.map((tool, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-slate-500 border-slate-200 px-3 py-1 rounded-md font-medium text-[11px] uppercase tracking-wider"
                            >
                              {tool}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Role Details / Context */}
                <section>
                  <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                    Role Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                    {[
                      { label: "Department", value: department, icon: Layout },
                      {
                        label: "Reporting To",
                        value: reporting_to,
                        icon: UserCheck,
                      },
                      {
                        label: "Team Size",
                        value: team_size ? `${team_size} Members` : null,
                        icon: Network,
                      },
                      { label: "Internal ID", value: internal_id, icon: Hash },
                      {
                        label: "Reference Code",
                        value: reference_code,
                        icon: FileBadge,
                      },
                      {
                        label: "Salary Review",
                        value: salaryReview,
                        icon: TbCurrencyTaka,
                      },
                      {
                        label: "Festival Bonus",
                        value: festivalBonus,
                        icon: Award,
                      },
                      {
                        label: "Lunch Facility",
                        value: lunchFacility,
                        icon: Info,
                      },
                      {
                        label: "Gender Preference",
                        value: gender,
                        icon: Users2,
                      },
                      { label: "Age Range", value: ageRange, icon: Calendar },
                    ].map(
                      (item, idx) =>
                        item.value && (
                          <div
                            key={idx}
                            className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-2 -mx-2 rounded transition-colors"
                          >
                            <span className="text-[11px] font-bold text-slate-400 uppercase flex items-center gap-2">
                              <item.icon className="w-3.5 h-3.5" /> {item.label}
                            </span>
                            <span className="text-[13px] font-bold text-slate-800">
                              {item.value}
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </section>

                {/* Location Details */}
                {job_location && (
                  <section>
                    <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-100 pb-2">
                      Work Location
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-[14px]">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <MapPin className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-slate-700">
                              {job_location.roadNo
                                ? `Road ${job_location.roadNo}, `
                                : ""}
                              {job_location.houseNo
                                ? `House ${job_location.houseNo}`
                                : ""}
                            </p>
                            <p className="text-slate-500">
                              {job_location.village}, {job_location.upazila}
                            </p>
                            <p className="text-slate-500">
                              {job_location.district}, {job_location.division}{" "}
                              {job_location.postCode}
                            </p>
                            {job_location.landmark && (
                              <p className="text-xs text-emerald-600 font-medium mt-1">
                                Landmark: {job_location.landmark}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="bg-slate-100 rounded-lg flex items-center justify-center p-8 text-slate-400 font-medium text-xs italic">
                        Map Location Preview
                      </div>
                    </div>
                  </section>
                )}

                {/* Keywords */}
                {keywords && keywords.length > 0 && (
                  <section>
                    <div className="flex flex-wrap gap-2">
                      {keywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2 py-0.5 bg-slate-50 border border-slate-100 rounded"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Bottom Application Section */}
              <div className="bg-secondary rounded-lg p-8 text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="space-y-2 text-center md:text-left">
                    <h3 className="text-xl font-bold">
                      Interested in this role?
                    </h3>
                    <p className="text-emerald-100 text-sm opacity-80 max-w-sm">
                      Apply today or save this job to your profile for later
                      review. Application deadline is {deadline}.
                    </p>
                  </div>
                  <Button className="w-full md:w-auto h-12 px-12 bg-white hover:bg-slate-100 text-secondary font-bold rounded-lg border-none shadow-none">
                    Submit Application
                  </Button>
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4 space-y-6 sticky top-6">
              {/* Job Overview Card */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                  Job Overview
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      icon: TbCurrencyTaka,
                      label: "Job Amount",
                      value: job_amount,
                      isTaka: true,
                    },
                    {
                      icon: TbCurrencyTaka,
                      label: "Offered Salary",
                      value: salary,
                      isTaka: true,
                    },
                    { icon: Calendar, label: "Deadline", value: deadline },
                    { icon: Briefcase, label: "Job Type", value: type },
                    {
                      icon: MapPin,
                      label: "General Location",
                      value: location,
                    },
                    {
                      icon: GraduationCap,
                      label: "Education",
                      value: education,
                    },
                    { icon: Briefcase, label: "Experience", value: experience },
                    {
                      icon: Users,
                      label: "Vacancy",
                      value: `${vacancy} Person(s)`,
                    },
                    {
                      icon: Timer,
                      label: "Shift Time",
                      value: `${work_start_time} - ${work_time_limit}`,
                      isClock: true,
                    },
                    {
                      icon: Clock,
                      label: "Total Working Hours",
                      value: workingHours,
                    },
                    { icon: Calendar, label: "Weekend", value: weekend },
                  ].map(
                    (item, idx) =>
                      item.value && (
                        <div key={idx} className="flex gap-4 group">
                          <div className="w-5 h-5 text-slate-300 mt-1 shrink-0 group-hover:text-emerald-500 transition-colors">
                            {item.isTaka ? (
                              <item.icon className="w-6 h-6" />
                            ) : item.isClock ? (
                              <Timer className="w-5 h-5" />
                            ) : (
                              <item.icon className="w-5 h-5" />
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider font-mono">
                              {item.label}
                            </p>
                            <p className="text-[14px] font-bold text-slate-800 leading-tight mt-0.5">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      ),
                  )}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                  <span>{views_count || 0} Views</span>
                  <span>{applicants_count || 0} Applicants</span>
                </div>
              </div>

              {/* Recruiter Card */}
              {job_poster && (
                <div className="bg-white border border-slate-200 rounded-lg p-6">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                    Contact & Posting
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
                      <Image
                        src={job_poster.profile_image}
                        alt={job_poster.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm truncate max-w-[150px]">
                        {job_poster.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {job_poster.designation}
                      </p>
                    </div>
                  </div>
                  {job_poster.bio && (
                    <p className="text-[12px] text-slate-500 leading-relaxed mb-6 italic">
                      &quot;{job_poster.bio}&quot;
                    </p>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <UserCheck className="w-4 h-4 text-slate-300" />{" "}
                      {contact_person || job_poster.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Mail className="w-4 h-4 text-slate-300" />{" "}
                      {job_poster.email || email}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Phone className="w-4 h-4 text-slate-300" />{" "}
                      {job_poster.phone || phone}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href={`mailto:${job_poster.email || email}`}
                      className="flex items-center justify-center h-11 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                    <a
                      href={`tel:${job_poster.phone || phone}`}
                      className="flex items-center justify-center h-11 border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              )}

              {/* Company Metadata */}
              <div className="bg-white border border-slate-200 rounded-lg p-6">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                  About Employer
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-bold text-slate-900 text-[15px]">
                        {company}
                      </h4>
                      {ratings && (
                        <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                          <Star className="w-2.5 h-2.5 fill-amber-500 border-none" />{" "}
                          {ratings}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {address}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        Founded
                      </p>
                      <p className="text-xs font-bold text-slate-800">
                        {founded || "N/A"}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400">
                        CEO
                      </p>
                      <p className="text-xs font-bold text-slate-800">
                        {ceo_name || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {website && (
                      <a
                        href={website}
                        target="_blank"
                        className="flex items-center gap-2 text-xs font-bold text-emerald-700 hover:underline"
                      >
                        <Globe className="w-4 h-4" /> Official Website
                      </a>
                    )}
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Info className="w-4 h-4" /> {industry}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <Users className="w-4 h-4" /> {companySize} Employees
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
