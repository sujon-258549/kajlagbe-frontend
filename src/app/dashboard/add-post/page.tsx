"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Heading4 from "@/components/common/Headings/Heading4";

export default function AddPostPage() {
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

      <form className="space-y-6">
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
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Job Title *
                </label>
                <div className="relative">
                  <Input
                    className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all outline-none font-semibold px-4"
                    placeholder="e.g. Senior Agronomist"
                  />
                  <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Category / Industry *
                </label>
                <Select>
                  <SelectTrigger className="h-10 bg-slate-50/50 border-slate-200 rounded-xl font-semibold px-4 focus:ring-1 focus:ring-secondary/20">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="agriculture">
                      Agriculture & Farming
                    </SelectItem>
                    <SelectItem value="it">IT & Software</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="logistics">Logistics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Job Type *
                </label>
                <Select>
                  <SelectTrigger className="h-10 bg-slate-50/50 border-slate-200 rounded-xl font-semibold px-4 focus:ring-1 focus:ring-secondary/20">
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
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Salary Range (Text)
                </label>
                <div className="relative">
                  <Input
                    className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                    placeholder="e.g. 80k - 120k BDT"
                  />
                  <FaBangladeshiTakaSign className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Job Amount / Budget
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. Negotiable"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Application Deadline *
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  />
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  General Location *
                </label>
                <div className="relative">
                  <Input
                    className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                    placeholder="e.g. Dhaka, Bangladesh"
                  />
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Content & Details */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-secondary" /> Descriptions &
              Content
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              Step 2 of 2
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                Short Description
              </label>
              <Input
                className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                placeholder="Brief meta description (max 150 chars)"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                Full Description *
              </label>
              <Textarea
                rows={6}
                className="bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all resize-none p-4 font-semibold"
                placeholder="Detailed job description..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Responsibilities
                </label>
                <Textarea
                  rows={4}
                  className="bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all p-4 font-semibold"
                  placeholder="One per line..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Requirements
                </label>
                <Textarea
                  rows={4}
                  className="bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all p-4 font-semibold"
                  placeholder="One per line..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Benefits
                </label>
                <Textarea
                  rows={4}
                  className="bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all p-4 font-semibold"
                  placeholder="One per line..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Company Information */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <Building className="w-4 h-4 text-secondary" /> Company
              Information
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              More Details
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Company Name *
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. Kajlagbe Farms"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Industry
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. Agriculture"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Company Website
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Company Size
                </label>
                <Select>
                  <SelectTrigger className="h-10 bg-slate-50/50 border-slate-200 rounded-xl font-semibold px-4 focus:ring-1 focus:ring-secondary/20">
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
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Detailed Location */}
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
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Division
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. Dhaka"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  District
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. Dhaka"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Upazila
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. Gulshan"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Road No
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. 12"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  House No
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. 55/A"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Post Code
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. 1212"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                Landmark
              </label>
              <Input
                className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                placeholder="e.g. Next to shooting club"
              />
            </div>
          </div>
        </div>

        {/* Section 6: Recruiter Details */}
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
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Contact Person Name *
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. Sujon Ahmed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Designation
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. HR Manager"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Personal Email
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. sujon@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                  Phone Number
                </label>
                <Input
                  className="h-10 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary focus:bg-white transition-all font-semibold px-4"
                  placeholder="e.g. +8801..."
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
                Recruiter Bio
              </label>
              <Textarea
                className="h-24 bg-slate-50/50 border-slate-200 rounded-xl resize-none p-4 font-semibold focus:border-secondary focus:bg-white transition-all"
                placeholder="Brief intro..."
              />
            </div>
          </div>
        </div>

        {/* Section 7: Flags & Visibility */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-secondary uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-secondary" /> Benefits &
              Visibility
            </h3>
            <span className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border">
              Final Step
            </span>
          </div>
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { label: "Is Urgent", id: "is_urgent", icon: Clock },
                { label: "Featured Post", id: "featured", icon: Award },
                { label: "Visa Sponsorship", id: "visa", icon: PlaneTakeoff },
                { label: "Relocation Asst.", id: "relocation", icon: MapPin },
                {
                  label: "Perf. Bonus",
                  id: "bonus",
                  icon: FaBangladeshiTakaSign,
                },
                {
                  label: "Health Insurance",
                  id: "insurance",
                  icon: ShieldCheck,
                },
              ].map((flag) => (
                <label
                  key={flag.id}
                  className="flex items-center gap-4 bg-slate-50 border border-slate-200/50 p-4 rounded-xl cursor-pointer hover:border-secondary/30 transition-all select-none group"
                >
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
                  />
                </label>
              ))}
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
                  variant="outline"
                  className="h-10 px-6 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-slate-50 shadow-none flex-1 md:flex-none"
                >
                  Save Draft
                </Button>
                <Button className="h-10 px-10 rounded-xl font-bold bg-secondary hover:bg-secondary/90 flex-1 md:flex-none border-none">
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
