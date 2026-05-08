"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import {
  ArrowUpDown,
  Briefcase,
  Eye,
  Pencil,
  Plus,
  RotateCw,
  Trash2,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/ui/data-table";
import Heading4 from "@/components/common/Headings/Heading4";
import UserJobPostModal from "@/components/modal/job/UserJobPostModal";
import {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  updateJobStatus,
} from "@/actions/job.actions";
import { getAllCategory } from "@/actions/category.actions";
import { useAuth } from "@/context/AuthContext";
import { JobFormData } from "@/schemas/job/job.schema";
import { TCategory } from "@/types/category";
import { cn } from "@/lib/utils";

interface JobRow {
  id: string;
  title: string;
  slug?: string;
  company?: string;
  location?: string;
  type?: string;
  salary?: string;
  jobAmount?: string;
  shortDescription?: string;
  description?: string;
  category?: { id?: string; name?: string } | null;
  categoryId?: string;
  applicantsCount?: number;
  isPublished?: boolean;
  status?: boolean;
  isUrgent?: boolean;
  applicationDeadline?: string;
  contactPerson?: string;
  email?: string;
  phone?: string;
  industry?: string;
  website?: string;
  companySize?: string;
  department?: string;
  responsibilities?: string[] | string;
  requirements?: string[] | string;
  benefits?: string[] | string;
  performanceBonus?: boolean;
  healthInsurance?: boolean;
  visaSponsorship?: boolean;
  relocationAssistance?: boolean;
  createdAt: string;
}

const formatDate = (iso?: string) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
};

const arrayToString = (val: string[] | string | undefined): string => {
  if (!val) return "";
  if (Array.isArray(val)) return val.join("\n");
  return val;
};

const stringToArray = (val: string | undefined): string[] => {
  if (!val) return [];
  return val
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
};

export default function MyWorksPage() {
  const { user, isLoading: isAuthLoading } = useAuth();

  const [jobs, setJobs] = useState<JobRow[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobRow | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);

  const fetchJobs = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const res = await getAllJobs({
        page: 1,
        limit: 100,
        authorId: user.id,
      });
      if (res?.success) {
        const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        setJobs(list);
      } else {
        toast.error(res?.message || "Failed to load jobs");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthLoading) return;
    fetchJobs();
  }, [fetchJobs, isAuthLoading]);

  useEffect(() => {
    let mounted = true;
    getAllCategory()
      .then((res) => {
        if (mounted && res?.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  const openCreate = () => {
    setEditingJob(undefined);
    setIsModalOpen(true);
  };

  const openEdit = (job: JobRow) => {
    setEditingJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingJob(undefined);
  };

  const handleSave = async (data: JobFormData) => {
    setIsSaving(true);
    try {
      const payload: Record<string, unknown> = {
        ...data,
        responsibilities: stringToArray(data.responsibilities),
        requirements: stringToArray(data.requirements),
        benefits: stringToArray(data.benefits),
      };

      const res = editingJob?.id
        ? await updateJob(editingJob.id, payload)
        : await createJob(payload);

      if (res?.success) {
        toast.success(
          editingJob ? "Job updated successfully" : "Job posted successfully",
        );
        await fetchJobs();
        closeModal();
      } else {
        toast.error(res?.message || "Something went wrong");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this job? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      const res = await deleteJob(id);
      if (res?.success) {
        toast.success(res?.message || "Job deleted");
        setJobs((prev) => prev.filter((j) => j.id !== id));
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteFromModal = async () => {
    if (!editingJob?.id) return;
    if (!window.confirm("Delete this job? This cannot be undone.")) return;
    setIsSaving(true);
    try {
      const res = await deleteJob(editingJob.id);
      if (res?.success) {
        toast.success("Job deleted");
        setJobs((prev) => prev.filter((j) => j.id !== editingJob.id));
        closeModal();
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleStatus = async (row: JobRow) => {
    setStatusLoadingId(row.id);
    try {
      const res = await updateJobStatus(row.id);
      if (res?.success) {
        setJobs((prev) =>
          prev.map((j) =>
            j.id === row.id ? { ...j, isPublished: !j.isPublished } : j,
          ),
        );
        toast.success("Status updated");
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } finally {
      setStatusLoadingId(null);
    }
  };

  const initialModalData: (Partial<JobFormData> & { id?: string }) | undefined =
    editingJob
      ? {
          id: editingJob.id,
          title: editingJob.title,
          categoryId: editingJob.category?.id || editingJob.categoryId || "",
          type: editingJob.type || "Full-time",
          salary: editingJob.salary || "",
          jobAmount: editingJob.jobAmount || "",
          applicationDeadline: editingJob.applicationDeadline || "",
          location: editingJob.location || "",
          shortDescription: editingJob.shortDescription || "",
          description: editingJob.description || "",
          responsibilities: arrayToString(editingJob.responsibilities),
          requirements: arrayToString(editingJob.requirements),
          benefits: arrayToString(editingJob.benefits),
          company: editingJob.company || "",
          industry: editingJob.industry || "",
          website: editingJob.website || "",
          companySize: editingJob.companySize || "",
          contactPerson: editingJob.contactPerson || "",
          department: editingJob.department || "",
          email: editingJob.email || "",
          phone: editingJob.phone || "",
          isUrgent: !!editingJob.isUrgent,
          performanceBonus: !!editingJob.performanceBonus,
          healthInsurance: !!editingJob.healthInsurance,
          visaSponsorship: !!editingJob.visaSponsorship,
          relocationAssistance: !!editingJob.relocationAssistance,
        }
      : undefined;

  const columns: ColumnDef<JobRow>[] = [
    {
      accessorKey: "title",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:text-secondary group font-bold"
        >
          Job Title
          <ArrowUpDown className="ml-2 h-4 w-4 text-slate-300 group-hover:text-secondary" />
        </button>
      ),
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span
            className="font-bold text-secondary line-clamp-1 max-w-72"
            title={row.original.title}
          >
            {row.original.title}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5 tracking-wider">
            {row.original.location || "—"} •{" "}
            {formatDate(row.original.createdAt)}
          </span>
        </div>
      ),
    },
    {
      id: "category",
      header: "Category",
      cell: ({ row }) => {
        const name = row.original.category?.name;
        if (!name) return <span className="text-slate-300">-</span>;
        return (
          <Badge
            variant="outline"
            className="rounded-full font-bold border-gray-200 text-slate-600 px-3 whitespace-nowrap shadow-none"
          >
            {name}
          </Badge>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => (
        <span className="text-xs font-semibold text-slate-600">
          {row.original.type || "-"}
        </span>
      ),
    },
    {
      accessorKey: "salary",
      header: "Salary",
      cell: ({ row }) => (
        <span className="font-bold text-secondary text-sm">
          {row.original.salary || row.original.jobAmount || "-"}
        </span>
      ),
    },
    {
      accessorKey: "applicantsCount",
      header: "Applicants",
      cell: ({ row }) => (
        <Badge
          variant={row.original.applicantsCount ? "default" : "secondary"}
          className="text-[10px]"
        >
          {row.original.applicantsCount ?? 0}
        </Badge>
      ),
    },
    {
      accessorKey: "isPublished",
      header: "Status",
      cell: ({ row }) => {
        const published = !!row.original.isPublished;
        return (
          <div
            className="flex items-center gap-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Switch
              checked={published}
              disabled={statusLoadingId === row.original.id}
              onCheckedChange={() => handleToggleStatus(row.original)}
            />
            <span
              className={cn(
                "text-[10px] font-bold uppercase tracking-wider",
                published ? "text-emerald-600" : "text-slate-400",
              )}
            >
              {published ? "Live" : "Draft"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-gray-100 text-secondary hover:bg-gray-50 shadow-none"
            title="View Job"
          >
            <Link href={`/jobs/${row.original.id}`}>
              <Eye className="w-4 h-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-gray-100 text-emerald-600 hover:bg-emerald-50 shadow-none relative"
            title="View Applicants"
          >
            <Link href={`/dashboard/my-works/${row.original.id}/applicants`}>
              <Users className="w-4 h-4" />
              {(row.original.applicantsCount ?? 0) > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {row.original.applicantsCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => openEdit(row.original)}
            className="h-9 w-9 rounded-lg border-gray-100 text-secondary hover:bg-gray-50 shadow-none"
            title="Edit"
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={deletingId === row.original.id}
            onClick={() => handleDelete(row.original.id)}
            className="h-9 w-9 rounded-lg border-gray-100 text-red-500 hover:bg-red-50 shadow-none"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Heading4>My Jobs</Heading4>
          <p className="text-slate-500 font-medium text-sm lg:text-base">
            Manage and track all the jobs you have posted.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={fetchJobs}
            disabled={isLoading}
          >
            <RotateCw
              className={cn("w-4 h-4", isLoading && "animate-spin")}
            />
            Refresh
          </Button>
          <Button
            type="button"
            onClick={openCreate}
            className="bg-secondary hover:bg-secondary/90 text-white px-8 font-bold"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </div>
      </div>

      {isLoading && jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-semibold">
          Loading jobs...
        </div>
      ) : jobs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">No jobs yet</h3>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            You haven&apos;t posted any jobs. Create your first one to start
            receiving applications.
          </p>
          <Button
            type="button"
            onClick={openCreate}
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            <Plus className="w-4 h-4" />
            Post New Job
          </Button>
        </div>
      ) : (
        <div className="bg-white p-2 rounded-lg border border-gray-200 overflow-hidden">
          <DataTable columns={columns} data={jobs} searchKey="title" />
        </div>
      )}

      <UserJobPostModal
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={initialModalData}
        onSubmit={handleSave}
        onDelete={editingJob ? handleDeleteFromModal : undefined}
        isNew={!editingJob}
        isLoading={isSaving}
        categories={categories}
      />
    </div>
  );
}
