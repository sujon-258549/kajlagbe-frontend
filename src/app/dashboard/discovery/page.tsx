"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  DollarSign,
  Clock,
  Filter,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import Heading4 from "@/components/common/Headings/Heading4";

const availableJobs = [
  {
    id: 1,
    title: "Website UI Redesign",
    company: "Organic Hub",
    budget: "$800 - $1,200",
    location: "Remote",
    type: "Full Time",
    tags: ["Figma", "UI Design"],
    posted: "1 hour ago",
  },
  {
    id: 2,
    title: "Backend API development",
    company: "Market Fresh",
    budget: "$150 / hr",
    location: "Global",
    type: "Freelance",
    tags: ["Node.js", "Express"],
    posted: "3 hours ago",
  },
  {
    id: 3,
    title: "Social Media Manager",
    company: "Farm Fresh",
    budget: "$500 / mo",
    location: "New York",
    type: "Part Time",
    tags: ["SEO", "Copywriting"],
    posted: "5 hours ago",
  },
  {
    id: 4,
    title: "Product Photographer",
    company: "Green Roots",
    budget: "$1,500",
    location: "On-site",
    type: "Contract",
    tags: ["Photography", "Editing"],
    posted: "1 day ago",
  },
];

export default function GetWorkPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <Heading4>Find Your Next Work</Heading4>
        <p className="text-slate-500 font-medium">
          Explore thousands of jobs and opportunities from top clients.
        </p>
      </div>

      {/* Search & Filter Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <Input
            className="h-14 pl-12 bg-gray-50/50 border-gray-100 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary transition-all outline-none shadow-none"
            placeholder="Search by job title, skills, or keywords..."
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            className="h-14 rounded-lg px-6 font-bold border-gray-200"
          >
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
          <Button className="h-14 rounded-lg px-8 bg-secondary font-bold text-white hover:opacity-90">
            Search Jobs
          </Button>
        </div>
      </div>

      {/* Quick Filter Tags */}
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-none snap-x lg:snap-none">
        {[
          "Remote",
          "Full Time",
          "$1000+",
          "Next.js",
          "UI/UX",
          "Fast Payment",
        ].map((tag) => (
          <button
            key={tag}
            className="px-4 py-2 bg-gray-100/50 hover:bg-secondary hover:text-white rounded-full text-xs font-bold text-slate-500 transition-all cursor-pointer whitespace-nowrap snap-start shrink-0"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-6">
        {availableJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-8 rounded-lg border border-gray-200 hover:border-secondary/30 transition-all group"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] bg-green-50 text-secondary font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-green-100">
                      Verified Client
                    </span>
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                      • {job.posted}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-bold text-secondary group-hover:text-secondary transition-colors">
                    {job.title}
                  </h3>
                  <p className="font-bold text-slate-500 flex items-center gap-1 italic text-xs lg:text-sm">
                    {job.company}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-400 font-bold">
                  <div className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-secondary" />{" "}
                    <span className="text-secondary">{job.budget}</span>
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <MapPin className="w-4 h-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <Clock className="w-4 h-4" /> {job.type}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {job.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="rounded-lg bg-gray-50 text-slate-600 border-none font-bold px-3 py-1 shadow-none"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[180px]">
                <Button className="w-full h-12 rounded-lg bg-secondary font-bold hover:opacity-90 shadow-none">
                  Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 rounded-lg font-bold border-gray-200 hover:bg-gray-50 shadow-none"
                >
                  Save Job
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center pt-8">
        <Button
          variant="outline"
          className="rounded-lg px-10 h-14 font-bold border-gray-200 hover:bg-gray-50"
        >
          Load More Jobs <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
