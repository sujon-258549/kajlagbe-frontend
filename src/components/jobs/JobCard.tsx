import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  MapPin,
  Clock,
  Heart,
  ThumbsUp,
  Star,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import { Job } from "@/data/jobsData";

interface JobCardProps {
  job: Job;
  isLast?: boolean;
}

export default function JobCard({ job, isLast }: JobCardProps) {
  return (
    <div
      className={`relative box_shadow bg-white rounded-lg border border-gray-200 transition-shadow p-5 flex flex-col gap-4 ${!isLast ? "mb-4" : ""}`}
    >
      {/* NEW Ribbon */}
      <div className="absolute top-0 left-0 overflow-hidden w-[80px] h-[80px] rounded-tl-xl z-10 pointer-events-none">
        <div className="absolute top-[16px] -left-[18px] w-[100px] -rotate-45 bg-[#fccb6c] text-black text-[10px] font-bold py-1 text-center shadow-sm flex items-center justify-center gap-1 uppercase tracking-wider">
          <Star className="w-3 h-3" fill="currentColor" /> NEW
        </div>
      </div>

      {/* Header Info */}
      <div className="flex justify-between items-start pl-3 sm:pl-4">
        <div className="flex gap-4 items-center">
          <div className="w-14 h-14 rounded-xl border border-gray-100 p-2 flex items-center justify-center bg-white shrink-0 mt-2 z-20">
            <Image
              src={job.logo}
              alt={job.company}
              width={40}
              height={40}
              className="object-contain rounded"
            />
          </div>
          <div>
            <h3 className="text-[#0275d8] text-lg sm:text-xl font-bold leading-tight hover:underline cursor-pointer">
              {job.title}
            </h3>
            <p className="text-gray-500 text-[15px] mt-0.5">{job.company}</p>
          </div>
        </div>

        {/* Sponsored Job Badge */}
        {job.featured && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#eaf4fe] text-[#0275d8] rounded-full text-sm font-medium whitespace-nowrap">
            <Star className="w-4 h-4" />
            <span className="hidden sm:inline">Sponsored Job</span>
            <span className="sm:hidden">Sponsored</span>
          </div>
        )}
      </div>

      {/* Salary */}
      <div className="flex items-end gap-1 mt-1 pl-1">
        <p className="text-[22px] font-bold text-[#111827]">
          {job.salary
            ? job.salary.replace("BDT", "৳").replace("per month", "")
            : "৳40,000 - 50,000 "}
        </p>
        <span className="text-gray-400 font-medium mb-[5px] text-sm">
          /Monthly
        </span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-y-3 gap-x-4 text-[13px] font-medium text-gray-700 mt-2 pl-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
            <TrendingUp className="w-3.5 h-3.5 text-pink-600" />
          </div>
          <span>{job.experience || "1 - 2 Years"}</span>
        </div>
        <div className="hidden sm:block w-[1px] h-3 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
            <BarChart2 className="w-3.5 h-3.5 text-yellow-600" />
          </div>
          <span>Mid Level level</span>
        </div>
        <div className="hidden sm:block w-[1px] h-3 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <span>{job.location ? job.location.split(",")[0] : "Jashore"}</span>
        </div>
        <div className="hidden sm:block w-[1px] h-3 bg-gray-300"></div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-sky-100 flex items-center justify-center shrink-0">
            <Briefcase className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <span>{job.type || "Full time"}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 pt-3 border-t border-gray-100 gap-4">
        <div className="flex items-center gap-2 text-[13px] text-gray-600">
          <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          <span>HR Active: {job.posted || "15h ago"}</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1.5 text-gray-500 text-[13px] font-medium mr-1">
            <Clock className="w-4 h-4" />
            <span>Deadline: {job.deadline || "2026-04-04"}</span>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-secondary text-secondary flex items-center justify-center hover:bg-secondary/10 transition-colors shrink-0">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-secondary text-secondary flex items-center justify-center hover:bg-secondary/10 transition-colors shrink-0">
              <ThumbsUp className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <Link href={`/jobs/${job.id}`}>
              <button className="px-5 sm:px-6 py-2 h-9 sm:h-10 rounded-full bg-secondary text-white font-semibold text-sm hover:bg-secondary/90 transition-colors whitespace-nowrap">
                Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
