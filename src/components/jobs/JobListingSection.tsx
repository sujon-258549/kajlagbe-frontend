"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Briefcase, Search, ChevronRight } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { jobs } from "@/data/jobsData";
import Pagination from "@/components/common/Pagination";

const ITEMS_PER_PAGE = 10;

export default function JobListingSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("all");
  const [location, setLocation] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (
    setter: (value: string) => void,
    value: string,
  ) => {
    setter(value);
    setCurrentPage(1);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      jobType === "all" || job.type.toLowerCase() === jobType.toLowerCase();
    const matchesLocation =
      location === "all" ||
      job.location.toLowerCase().includes(location.toLowerCase());

    return matchesSearch && matchesType && matchesLocation;
  });

  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const displayedJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <section className="bg-white min-h-screen py-10">
      <div className="main-container">
        {/* Simple Header */}
        <div className="mb-6 px-1">
          <h1 className="text-2xl font-bold text-slate-900">
            Current Job Openings
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Explore career opportunities in various categories.
          </p>
        </div>

        {/* Minimalist Filter Row */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10 pb-10 border-b border-slate-100">
          <div className="flex-1 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search job title or company..."
                className="pl-9 h-11 border-slate-200 bg-white rounded-lg shadow-none focus-visible:ring-slate-400"
                value={searchTerm}
                onChange={(e) =>
                  handleFilterChange(setSearchTerm, e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex gap-6">
            <Select
              value={jobType}
              onValueChange={(value) => handleFilterChange(setJobType, value)}
            >
              <SelectTrigger className="w-[180px] h-11 border-slate-200 rounded-lg shadow-none text-sm font-medium text-slate-600 focus:ring-slate-400">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">Check all types</SelectItem>
                <SelectItem value="full-time">Full-time</SelectItem>
                <SelectItem value="part-time">Part-time</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={location}
              onValueChange={(value) => handleFilterChange(setLocation, value)}
            >
              <SelectTrigger className="w-[180px] h-11 border-slate-200 rounded-lg shadow-none text-sm font-medium text-slate-600 focus:ring-slate-400">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="rounded-lg border-slate-200">
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="dhaka">Dhaka</SelectItem>
                <SelectItem value="chittagong">Chittagong</SelectItem>
                <SelectItem value="sylhet">Sylhet</SelectItem>
                <SelectItem value="rajshahi">Rajshahi</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Minimal List */}
        <div className="space-y-0 border border-slate-100 rounded-lg overflow-hidden shadow-none bg-white">
          {displayedJobs.length > 0 ? (
            displayedJobs.map((job, idx) => (
              <Link
                href={`/jobs/${job.id}`}
                key={job.id}
                className={`block hover:bg-slate-50 transition-colors ${idx !== displayedJobs.length - 1 ? "border-b border-slate-100" : ""}`}
              >
                <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-lg border border-slate-100 p-2 bg-white flex items-center justify-center shrink-0">
                      <Image
                        src={job.logo}
                        alt={job.company}
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-[17px] font-bold text-slate-900 leading-tight">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs font-semibold text-slate-500 uppercase tracking-tighter">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 opacity-40" />{" "}
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 opacity-40" />{" "}
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5 text-emerald-700 font-bold tracking-normal lowcasse pt-0.5">
                          <TbCurrencyTaka className="w-4 h-4" /> {job.salary}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <div className="flex gap-2">
                      {job.featured && (
                        <Badge
                          variant="outline"
                          className="text-[10px] font-bold uppercase border-emerald-100 text-emerald-700 bg-emerald-50 rounded-md"
                        >
                          Promoted
                        </Badge>
                      )}
                      <Badge
                        variant="outline"
                        className="text-[10px] font-bold uppercase text-slate-400 border-slate-200 rounded-md bg-slate-50/50"
                      >
                        {job.type}
                      </Badge>
                    </div>
                    <div className="hidden sm:block text-slate-200 group-hover:text-slate-400 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
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
                className="mt-6 border-slate-200 text-slate-600 rounded-lg h-10 px-6"
                onClick={() => {
                  setSearchTerm("");
                  setJobType("all");
                  setLocation("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        {/* Minimal Pagination */}
        <div className="mt-12 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </section>
  );
}
