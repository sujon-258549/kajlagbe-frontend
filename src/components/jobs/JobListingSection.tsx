"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { jobs } from "@/data/jobsData";
import Pagination from "@/components/common/Pagination";
import JobCard from "./JobCard";
import JobFilters, { FilterState } from "./JobFilters";

const ITEMS_PER_PAGE = 10;

// Helper to check if date is within range
const isPostedWithin = (posted: string, range: string) => {
  if (range === "all") return true;
  // This is a simplified check. Ideally, 'posted' should be a Date object or ISO string.
  // jobsData has strings like "2 days ago", "Yesterday", "Just now".
  if (range === "24h")
    return ["Just now", "Yesterday", "1 day ago"].some((s) =>
      posted.includes(s),
    );
  if (range === "3d")
    return [
      "Just now",
      "Yesterday",
      "1 day ago",
      "2 days ago",
      "3 days ago",
    ].some((s) => posted.includes(s));
  if (range === "7d")
    return !posted.includes("week") && !posted.includes("month"); // Very rough approximation
  return true;
};

export default function JobListingSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterState>({
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

  // Extract unique values for dropdowns
  const uniqueLocations = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.location).filter(Boolean))),
    [],
  );
  const uniqueCategories = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.category).filter(Boolean))),
    [],
  );
  const uniqueIndustries = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.industry).filter(Boolean))),
    [],
  );
  const uniqueCompanies = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.company).filter(Boolean))),
    [],
  );

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      // 1. Search
      const searchMatch =
        !filters.search ||
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.tags.some((t) =>
          t.toLowerCase().includes(filters.search.toLowerCase()),
        );

      // 2. Location
      const locationMatch =
        filters.location === "all" || job.location === filters.location;

      // 3. Type
      const typeMatch = filters.type === "all" || job.type === filters.type;

      // 4. Category
      const categoryMatch =
        filters.category === "all" || job.category === filters.category;

      // 5. Industry
      const industryMatch =
        filters.industry === "all" || job.industry === filters.industry;

      // 6. Experience
      const experienceMatch =
        filters.experience === "all" ||
        job.experience.includes(filters.experience) ||
        (filters.experience === "5+ Years" && job.experience.includes("Year")); // Simplified

      // 7. Education
      const educationMatch =
        filters.education === "all" ||
        job.education.toLowerCase().includes(filters.education.toLowerCase());

      // 8. Remote Policy
      const remoteMatch =
        filters.remote === "all" || job.remote_policy === filters.remote;

      // 9. Gender
      const genderMatch =
        filters.gender === "all" ||
        job.gender === filters.gender ||
        job.gender === "Any" ||
        job.gender === "Both";

      // 10. Company Size
      const sizeMatch =
        filters.companySize === "all" ||
        job.companySize === filters.companySize;

      // 11. Salary (Parsing crude string like "80k - 120k BDT")
      // Skipping precise range logic due to string format variety, but implemented structure.
      // If we had numbers, we would do: job.minSalary >= filters.minSalary

      // 12. Job Nature (Using Salary Review field as proxy or if field existed)
      // Note: jobsData has 'jobNature' field
      const natureMatch =
        filters.jobNature === "all" || job.jobNature === filters.jobNature;

      // 13. Lunch
      const lunchMatch =
        filters.lunchFacility === "all" ||
        job.lunchFacility === filters.lunchFacility;

      // 14. Posted Within
      const postedMatch = isPostedWithin(job.posted, filters.postedWithin);

      // Boolean checks
      const urgentMatch = !filters.urgent || job.is_urgent;
      const featuredMatch = !filters.featured || job.featured;
      const healthMatch = !filters.healthInsurance || job.health_insurance;
      const bonusMatch = !filters.performanceBonus || job.performance_bonus;
      const relocationMatch = !filters.relocation || job.relocation_assistance;
      const visaMatch = !filters.visa || job.visa_sponsorship;

      return (
        searchMatch &&
        locationMatch &&
        typeMatch &&
        categoryMatch &&
        industryMatch &&
        experienceMatch &&
        educationMatch &&
        remoteMatch &&
        genderMatch &&
        sizeMatch &&
        natureMatch &&
        lunchMatch &&
        postedMatch &&
        urgentMatch &&
        featuredMatch &&
        healthMatch &&
        bonusMatch &&
        relocationMatch &&
        visaMatch
      );
    });
  }, [filters]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="bg-slate-50 min-h-screen py-4">
      <div className="main-container">
        {/* Header & Controls Container */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* 1. Search Bar */}
            <div className="relative w-full md:flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by Title, Company, or Keywords..."
                value={filters.search}
                onChange={(e) =>
                  handleFilterChange({ ...filters, search: e.target.value })
                }
                className="pl-9 h-11 border-gray-200 bg-slate-50 focus:bg-white transition-all rounded-lg"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* 2. Date Filter */}
              <div className="w-full md:w-[180px]">
                <Select
                  value={filters.postedWithin}
                  onValueChange={(val) =>
                    handleFilterChange({ ...filters, postedWithin: val })
                  }
                >
                  <SelectTrigger className="h-11 border-gray-200 bg-slate-50 rounded-lg">
                    <SelectValue placeholder="Posted Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any time</SelectItem>
                    <SelectItem value="24h">Last 24 Hours</SelectItem>
                    <SelectItem value="3d">Last 3 Days</SelectItem>
                    <SelectItem value="7d">Last 7 Days</SelectItem>
                    <SelectItem value="14d">Last 14 Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 3. Filter Icon Button (Triggers Dropdown) */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="h-11 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 min-w-[100px] rounded-lg border-t border-b-0 border-x-0 border-gray-200"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-[92vw] max-w-[1067px] p-0 shadow-none border-b border-t-0 border-x-0 border-gray-200 -mr-4 mt-3"
                >
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h4 className="font-semibold text-lg">Filter Jobs</h4>
                  </div>
                  <div className="max-h-[80vh] overflow-y-auto">
                    <JobFilters
                      filters={filters}
                      setFilters={handleFilterChange}
                      uniqueLocations={uniqueLocations}
                      uniqueCategories={uniqueCategories}
                      uniqueIndustries={uniqueIndustries}
                      uniqueCompanies={uniqueCompanies}
                      className="border-none shadow-none p-6"
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Job List */}
        <div className="w-full">
          <div className="space-y-0 border border-gray-200 rounded-lg overflow-hidden shadow-none bg-white">
            {displayedJobs.length > 0 ? (
              displayedJobs.map((job, idx) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isLast={idx === displayedJobs.length - 1}
                />
              ))
            ) : (
              <div className="py-20 text-center px-4">
                <Search className="w-10 h-10 text-slate-100 mx-auto mb-6" />
                <h3 className="text-lg font-bold text-slate-800">
                  No jobs found
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Try adjusting your keywords or filters.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-6 border-gray-200 text-slate-600 rounded-lg h-10 px-6"
                  onClick={() =>
                    handleFilterChange({
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
                    })
                  }
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 md:mt-6 mb-10 md:mb-20 flex justify-center">
              <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
