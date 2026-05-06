import { getAllJobs } from "@/actions/job.actions";
import JobListingSection from "@/components/jobs/JobListingSection";

export default async function JobsPage() {
  const response = await getAllJobs();
  const jobs = response?.data || [];
  const meta = response?.meta || { total: 0 };

  return (
    <main className="min-h-screen bg-slate-50">
      <JobListingSection initialJobs={jobs} total={meta.total} />
    </main>
  );
}
