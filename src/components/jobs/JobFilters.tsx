"use client";

import {
  Search,
  MapPin,
  Briefcase,
  Filter,
  DollarSign,
  Clock,
  GraduationCap,
  Users,
  Globe,
  Building2,
} from "lucide-react";
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
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Filter className="w-4 h-4" /> Filter Options
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500 hover:text-slate-900 h-8 px-2 text-xs"
          onClick={handleReset}
        >
          Reset All
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Column 1: Core Job Details */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-slate-900 border-b pb-2">
            Job Details
          </h4>

          {/* Job Type */}
          <div className="space-y-2">
            <Label className="text-xs text-slate-500">Job Type</Label>
            <Select
              value={filters.type}
              onValueChange={(val) => handleChange("type", val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
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
            <Label className="text-xs text-slate-500">Location</Label>
            <Select
              value={filters.location}
              onValueChange={(val) => handleChange("location", val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
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
            <Label className="text-xs text-slate-500">Experience</Label>
            <Select
              value={filters.experience}
              onValueChange={(val) => handleChange("experience", val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
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

        {/* Column 2: Category & Industry */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-slate-900 border-b pb-2">
            Category & Sector
          </h4>

          {/* Category */}
          <div className="space-y-2">
            <Label className="text-xs text-slate-500">Category</Label>
            <Select
              value={filters.category}
              onValueChange={(val) => handleChange("category", val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
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
            <Label className="text-xs text-slate-500">Industry</Label>
            <Select
              value={filters.industry}
              onValueChange={(val) => handleChange("industry", val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
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
            <Label className="text-xs text-slate-500">Education</Label>
            <Select
              value={filters.education}
              onValueChange={(val) => handleChange("education", val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
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

        {/* Column 3: Salary & Company */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-slate-900 border-b pb-2">
            Compension & Company
          </h4>

          {/* Salary Grid */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-[10px] text-slate-500">Min Salary</Label>
              <Input
                type="number"
                placeholder="0"
                value={filters.minSalary}
                onChange={(e) => handleChange("minSalary", e.target.value)}
                className="h-9 border-gray-200 text-xs"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] text-slate-500">Max Salary</Label>
              <Input
                type="number"
                placeholder="Max"
                value={filters.maxSalary}
                onChange={(e) => handleChange("maxSalary", e.target.value)}
                className="h-9 border-gray-200 text-xs"
              />
            </div>
          </div>

          {/* Company Size */}
          <div className="space-y-2">
            <Label className="text-xs text-slate-500">Company Size</Label>
            <Select
              value={filters.companySize}
              onValueChange={(val) => handleChange("companySize", val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
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
            <Label className="text-xs text-slate-500">Lunch Facility</Label>
            <Select
              value={filters.lunchFacility}
              onValueChange={(val) => handleChange("lunchFacility", val)}
            >
              <SelectTrigger className="h-9 border-gray-200">
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

        {/* Column 4: Preferences & Options */}
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-slate-900 border-b pb-2">
            Preferences & Benefits
          </h4>

          <div className="space-y-3">
            {/* Remote Policy */}
            <div className="space-y-2 mb-4">
              <Label className="text-xs text-slate-500">Remote Policy</Label>
              <Select
                value={filters.remote}
                onValueChange={(val) => handleChange("remote", val)}
              >
                <SelectTrigger className="h-9 border-gray-200">
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
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="urgent"
                  checked={filters.urgent}
                  onCheckedChange={(checked) => handleChange("urgent", checked)}
                  className="border-gray-300 data-[state=checked]:bg-slate-900"
                />
                <Label htmlFor="urgent" className="text-sm text-slate-600">
                  Urgent Hiring
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={filters.featured}
                  onCheckedChange={(checked) =>
                    handleChange("featured", checked)
                  }
                  className="border-gray-300 data-[state=checked]:bg-slate-900"
                />
                <Label htmlFor="featured" className="text-sm text-slate-600">
                  Promoted Jobs
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="bonus"
                  checked={filters.performanceBonus}
                  onCheckedChange={(checked) =>
                    handleChange("performanceBonus", checked)
                  }
                  className="border-gray-300 data-[state=checked]:bg-slate-900"
                />
                <Label htmlFor="bonus" className="text-sm text-slate-600">
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
