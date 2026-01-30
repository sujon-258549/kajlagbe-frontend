import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, ChevronRight } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Job } from "@/data/jobsData";

interface JobCardProps {
  job: Job;
  isLast?: boolean;
}

export default function JobCard({ job, isLast }: JobCardProps) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className={`block hover:bg-slate-50 transition-colors ${
        !isLast ? "border-b border-gray-200" : ""
      }`}
    >
      <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="w-12 h-12 rounded-lg border border-gray-200 p-2 bg-white flex items-center justify-center shrink-0">
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
                <Briefcase className="w-3.5 h-3.5 opacity-40" /> {job.company}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 opacity-40" /> {job.location}
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
              className="text-[10px] font-bold uppercase text-slate-400 border-gray-200 rounded-md bg-slate-50/50"
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
  );
}
