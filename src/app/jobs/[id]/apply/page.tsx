import React from "react";
import { getJobByIdentifier } from "@/actions/job.actions";
import { notFound } from "next/navigation";
import ApplicationForm from "@/components/jobs/ApplicationForm";
import Link from "next/link";
import { ArrowLeft, Briefcase, Building, MapPin } from "lucide-react";

export default async function ApplyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await getJobByIdentifier(id);

  if (!response?.success || !response?.data) {
    notFound();
  }

  const job = response.data;

  return (
    <main className="min-h-screen bg-slate-50/50 py-12 md:py-12">
      <div className="main-container max-w-3xl">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
          {/* Header Section */}
          <div className="bg-secondary p-8 md:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                Application Form
              </span>
              <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                Apply for {job.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-emerald-100/80 text-sm">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" /> {job.company}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" /> {job.type}
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          </div>
          
          <div className="p-4 md:p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-800 mb-2">Submit your details</h2>
              <p className="text-slate-500 text-sm">
                Please provide your current information to help the recruiter evaluate your candidacy.
              </p>
            </div>
            
            <ApplicationForm jobId={job.id} />
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-slate-400 text-xs">
          <p>This job is posted by {job.company}. KajLagbe is not responsible for the recruitment process.</p>
        </div>
      </div>
    </main>
  );
}
