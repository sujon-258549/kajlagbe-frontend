"use client";

import { Briefcase, DollarSign, Globe, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { TbCoinTakaFilled } from "react-icons/tb";

export interface FilterState {
  search: string;
  location: string;
  type: string;
  category: string;
  industry: string;
  minSalary: string;
  maxSalary: string;
  experience: string;
  education: string;
  gender: string;
  remote: string;
  companySize: string;
  jobNature: string;
  weekend: string;
  postedWithin: string;
  urgent: boolean;
  featured: boolean;
  healthInsurance: boolean;
  performanceBonus: boolean;
  relocation: boolean;
  visa: boolean;
  lunchFacility: string;
  skills: string;
}

interface JobFiltersProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  className?: string;
  uniqueLocations: string[]; // Pass extracted unique values
  uniqueCategories: string[];
  uniqueIndustries: string[];
  uniqueCompanies: string[];
}

export default function JobFilters({
  filters,
  setFilters,
  className,
  uniqueLocations,
  uniqueCategories,
  uniqueIndustries,
}: JobFiltersProps) {
  const handleChange = (key: keyof FilterState, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleReset = () => {
    setFilters({
      search: "",
      location: "all",
      type: "all",
      category: "all",
      industry: "all",
      minSalary: "",
      maxSalary: "",
      experience: "all",
      education: "all",
      gender: "all",
      remote: "all",
      companySize: "all",
      jobNature: "all",
      weekend: "all",
      postedWithin: "all",
      urgent: false,
      featured: false,
      healthInsurance: false,
      performanceBonus: false,
      relocation: false,
      visa: false,
      lunchFacility: "all",
      skills: "",
    });
  };

  return (
    <div className={`bg-white ${className}`}>
      {/* Header & Smart Active Filters */}
      <div className="flex  flex-col gap-4 ">
        {/* Active Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => {
            if (key === "search" || key === "postedWithin") return null;
            if (typeof value === "boolean" && !value) return null;
            if (value === "all" || value === "") return null;

            return (
              <div
                key={key}
                className="flex items-center gap-1.5 px-3 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded-full border border-secondary/20"
              >
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                </span>
                <span className="text-slate-700">
                  {typeof value === "boolean" ? "Yes" : value}
                </span>
                <button
                  onClick={() =>
                    handleChange(
                      key as keyof FilterState,
                      typeof value === "boolean" ? false : "all",
                    )
                  }
                  className="ml-1 hover:text-secondary hover:bg-white rounded-full p-0.5 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* Column 1: Core Job Details */}
        <div className="space-y-5">
          <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
            <Briefcase className="w-4 h-4 text-secondary" /> Job Details
          </h4>

          <div className="space-y-4 px-1">
            {/* Job Type */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Job Type
              </Label>
              <Select
                value={filters.type}
                onValueChange={(val) => handleChange("type", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Seasonal">Seasonal</SelectItem>
                  <SelectItem value="Consultant">Consultant</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Location
              </Label>
              <Select
                value={filters.location}
                onValueChange={(val) => handleChange("location", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Experience
              </Label>
              <Select
                value={filters.experience}
                onValueChange={(val) => handleChange("experience", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="Any Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Experience</SelectItem>
                  <SelectItem value="Fresher">Fresher (0-1 Years)</SelectItem>
                  <SelectItem value="1-3 Years">1-3 Years</SelectItem>
                  <SelectItem value="3-5 Years">3-5 Years</SelectItem>
                  <SelectItem value="5+ Years">5+ Years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Column 2: Category & Industry */}
        <div className="space-y-5">
          <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
            <Building2 className="w-4 h-4 text-emerald-600" /> Category & Sector
          </h4>

          <div className="space-y-4 px-1">
            {/* Category */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Category
              </Label>
              <Select
                value={filters.category}
                onValueChange={(val) => handleChange("category", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Industry */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Industry
              </Label>
              <Select
                value={filters.industry}
                onValueChange={(val) => handleChange("industry", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {uniqueIndustries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Education
              </Label>
              <Select
                value={filters.education}
                onValueChange={(val) => handleChange("education", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="Any Education" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Bachelor">Bachelor</SelectItem>
                  <SelectItem value="Master">Master</SelectItem>
                  <SelectItem value="Diploma">Diploma</SelectItem>
                  <SelectItem value="HSC">HSC / A Level</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Column 3: Salary & Company */}
        <div className="space-y-5">
          <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
            <TbCoinTakaFilled className="w-4 h-4 text-amber-500" /> Compensation
          </h4>

          <div className="space-y-4 px-1">
            {/* Salary Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Min Salary
                </Label>
                <Input
                  type="number"
                  placeholder="Min"
                  value={filters.minSalary}
                  onChange={(e) => handleChange("minSalary", e.target.value)}
                  className="h-10 border-gray-200 text-sm focus-visible:ring-secondary rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Max Salary
                </Label>
                <Input
                  type="number"
                  placeholder="Max"
                  value={filters.maxSalary}
                  onChange={(e) => handleChange("maxSalary", e.target.value)}
                  className="h-10 border-gray-200 text-sm focus-visible:ring-secondary rounded-lg"
                />
              </div>
            </div>

            {/* Company Size */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Company Size
              </Label>
              <Select
                value={filters.companySize}
                onValueChange={(val) => handleChange("companySize", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="Any Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Size</SelectItem>
                  <SelectItem value="1-10">1-10 Employees</SelectItem>
                  <SelectItem value="11-50">11-50 Employees</SelectItem>
                  <SelectItem value="50-100">50-100 Employees</SelectItem>
                  <SelectItem value="100+">100+ Employees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Lunch Facility */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Lunch Facility
              </Label>
              <Select
                value={filters.lunchFacility}
                onValueChange={(val) => handleChange("lunchFacility", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Full Subsidize">Full Subsidize</SelectItem>
                  <SelectItem value="Partially Subsidize">
                    Partially Subsidize
                  </SelectItem>
                  <SelectItem value="No">No Facility</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Column 4: Preferences & Options */}
        <div className="space-y-5">
          <h4 className="font-semibold text-sm text-slate-800 flex items-center gap-2 bg-slate-50 p-2 rounded-lg">
            <Globe className="w-4 h-4 text-sky-500" /> Preferences
          </h4>

          <div className="space-y-5 px-1">
            {/* Remote Policy */}
            <div className="space-y-2">
              <Label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Remote Policy
              </Label>
              <Select
                value={filters.remote}
                onValueChange={(val) => handleChange("remote", val)}
              >
                <SelectTrigger className="h-10 border-gray-200 focus:ring-secondary rounded-lg">
                  <SelectValue placeholder="Any Policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any</SelectItem>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Checkboxes Grid */}
            <div className="grid grid-cols-1 gap-4 pt-2">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox
                  id="urgent"
                  checked={filters.urgent}
                  onCheckedChange={(checked) => handleChange("urgent", checked)}
                  className="w-5 h-5 border-gray-300 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary rounded-[4px]"
                />
                <Label
                  htmlFor="urgent"
                  className="text-sm font-medium text-slate-700 cursor-pointer group-hover:text-secondary transition-colors"
                >
                  Urgent Hiring
                </Label>
              </div>

              <div className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox
                  id="featured"
                  checked={filters.featured}
                  onCheckedChange={(checked) =>
                    handleChange("featured", checked)
                  }
                  className="w-5 h-5 border-gray-300 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary rounded-[4px]"
                />
                <Label
                  htmlFor="featured"
                  className="text-sm font-medium text-slate-700 cursor-pointer group-hover:text-secondary transition-colors"
                >
                  Promoted Jobs
                </Label>
              </div>

              <div className="flex items-center space-x-3 group cursor-pointer">
                <Checkbox
                  id="bonus"
                  checked={filters.performanceBonus}
                  onCheckedChange={(checked) =>
                    handleChange("performanceBonus", checked)
                  }
                  className="w-5 h-5 border-gray-300 data-[state=checked]:bg-secondary data-[state=checked]:border-secondary rounded-[4px]"
                />
                <Label
                  htmlFor="bonus"
                  className="text-sm font-medium text-slate-700 cursor-pointer group-hover:text-secondary transition-colors"
                >
                  Performance Bonus
                </Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
