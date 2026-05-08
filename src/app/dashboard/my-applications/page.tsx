"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import { ArrowUpDown, Eye, FileText, Send, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading4 from "@/components/common/Headings/Heading4";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import {
  deleteApplication,
  getMyApplications,
} from "@/actions/application.actions";

interface ApplicationRow {
  id: string;
  jobId: string;
  applyStatus: string;
  applyNote?: string | null;
  createdAt: string;
  job?: {
    id: string;
    title: string;
    slug?: string;
  } | null;
}

const formatDate = (iso: string) => {
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

const statusStyles: Record<string, string> = {
  PENDING: "bg-orange-500 text-white",
  ACCEPTED: "bg-[#86b86b] text-white",
  REJECTED: "bg-red-500 text-white",
  REVIEWING: "bg-blue-500 text-white",
};

export default function MyApplicationsPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchApplications = useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);
    try {
      const res = await getMyApplications({ userId: user.id, limit: 100 });
      if (res?.success) {
        const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        setApplications(list);
      } else {
        toast.error(res?.message || "Failed to load applications");
      }
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthLoading) return;
    fetchApplications();
  }, [fetchApplications, isAuthLoading]);

  const handleWithdraw = async (id: string) => {
    if (!window.confirm("Withdraw this application?")) return;
    setDeletingId(id);
    try {
      const res = await deleteApplication(id);
      if (res?.success) {
        toast.success("Application withdrawn");
        setApplications((prev) => prev.filter((a) => a.id !== id));
      } else {
        toast.error(res?.message || "Failed to withdraw");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const columns: ColumnDef<ApplicationRow>[] = [
    {
      accessorKey: "job",
      header: ({ column }) => (
        <button
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center gap-2 hover:text-secondary group font-bold"
        >
          Job
          <ArrowUpDown className="ml-2 h-4 w-4 text-slate-300 group-hover:text-secondary" />
        </button>
      ),
      cell: ({ row }) => {
        const job = row.original.job;
        return (
          <div className="flex flex-col">
            <span
              className="font-bold text-secondary line-clamp-1 max-w-72"
              title={job?.title || "Job removed"}
            >
              {job?.title || "Job removed"}
            </span>
            <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5 tracking-wider">
              ID: {row.original.id.slice(0, 8)} •{" "}
              {formatDate(row.original.createdAt)}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "applyNote",
      header: "Note",
      cell: ({ row }) => {
        const note = row.original.applyNote;
        if (!note) return <span className="text-slate-300">-</span>;
        return (
          <span
            className="text-sm text-slate-500 italic line-clamp-1 max-w-64"
            title={note}
          >
            {note}
          </span>
        );
      },
    },
    {
      accessorKey: "applyStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = (row.original.applyStatus || "PENDING").toUpperCase();
        return (
          <Badge
            className={cn(
              "rounded-full font-bold text-[10px] uppercase px-3 py-1 border-none shadow-none hover:opacity-90 transition-none",
              statusStyles[status] || "bg-slate-500 text-white",
            )}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const job = row.original.job;
        const isPending =
          (row.original.applyStatus || "PENDING").toUpperCase() === "PENDING";
        return (
          <div className="flex items-center justify-end gap-2">
            {job?.id && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="h-9 px-4 rounded-lg border-gray-100 font-bold text-xs hover:bg-gray-50 shadow-none text-secondary"
              >
                <Link href={`/jobs/${job.id}`}>
                  <Eye className="w-3.5 h-3.5 mr-1" /> View Job
                </Link>
              </Button>
            )}
            {isPending && (
              <Button
                variant="outline"
                size="icon"
                disabled={deletingId === row.original.id}
                onClick={() => handleWithdraw(row.original.id)}
                title="Withdraw"
                className="h-9 w-9 rounded-lg border-gray-100 text-red-500 hover:bg-red-50 shadow-none"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <Heading4>My Applications</Heading4>
        <p className="text-slate-500 font-medium">
          Track the jobs you have applied to and their current status.
        </p>
      </div>

      {isLoading && applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-semibold">
          Loading applications...
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <FileText className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">
            No applications yet
          </h3>
          <p className="text-sm text-slate-500 mt-1 mb-6">
            You haven&apos;t applied to any jobs. Browse open jobs and send your
            first application.
          </p>
          <Button
            asChild
            type="button"
            className="bg-secondary hover:bg-secondary/90 text-white px-10 font-bold"
          >
            <Link href="/jobs">
              <Send className="w-4 h-4" />
              Browse Jobs
            </Link>
          </Button>
        </div>
      ) : (
        <div className="bg-white p-2 rounded-lg border border-gray-200 overflow-hidden">
          <DataTable
            columns={columns}
            data={applications}
            searchKey="applyNote"
          />
        </div>
      )}
    </div>
  );
}
