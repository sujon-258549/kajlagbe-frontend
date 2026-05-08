"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CheckCircle2,
  Eye,
  FileText,
  Mail,
  Phone,
  RotateCw,
  Trash2,
  User,
  Users,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading4 from "@/components/common/Headings/Heading4";
import CommonModal from "@/components/modal/common/CommonModal";
import {
  deleteApplication,
  getMyApplications,
  updateApplication,
} from "@/actions/application.actions";
import { getJobByIdentifier } from "@/actions/job.actions";
import { cn } from "@/lib/utils";

interface ApplicantUser {
  id?: string;
  email?: string;
  mobile?: string;
  profile?: {
    name?: string;
    photo?: string;
  };
}

interface ApplicationRow {
  id: string;
  jobId: string;
  applyStatus: string;
  applyNote?: string | null;
  applyComment?: string | null;
  resume?: string | null;
  coverLetter?: string | null;
  isRead?: boolean;
  createdAt: string;
  user?: ApplicantUser | null;
}

const statusStyles: Record<string, string> = {
  PENDING: "bg-orange-500 text-white",
  ACCEPTED: "bg-emerald-600 text-white",
  REJECTED: "bg-red-500 text-white",
  REVIEWING: "bg-blue-500 text-white",
};

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

const initial = (name?: string) =>
  (name || "U").trim().charAt(0).toUpperCase() || "U";

export default function JobApplicantsPage() {
  const params = useParams();
  const jobId = (params?.jobId as string) || "";

  const [applications, setApplications] = useState<ApplicationRow[]>([]);
  const [job, setJob] = useState<{ id: string; title: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [selected, setSelected] = useState<ApplicationRow | null>(null);

  const [decision, setDecision] = useState<{
    application: ApplicationRow;
    next: "ACCEPTED" | "REJECTED";
  } | null>(null);
  const [decisionReason, setDecisionReason] = useState("");

  const fetchApplications = useCallback(async () => {
    if (!jobId) return;
    setIsLoading(true);
    try {
      const res = await getMyApplications({ jobId, limit: 100 });
      if (res?.success) {
        const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        setApplications(list);
      } else {
        toast.error(res?.message || "Failed to load applicants");
      }
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    let mounted = true;
    if (!jobId) return;
    getJobByIdentifier(jobId)
      .then((res) => {
        if (!mounted) return;
        if (res?.success && res.data) {
          setJob({ id: res.data.id, title: res.data.title });
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, [jobId]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const updateStatus = async (
    id: string,
    applyStatus: string,
    applyComment?: string,
  ) => {
    const current = applications.find((a) => a.id === id);
    const currentStatus = (current?.applyStatus || "PENDING").toUpperCase();
    const next = applyStatus.toUpperCase();

    if (next === currentStatus) return;

    // Once decided (ACCEPTED / REJECTED), application is locked.
    if (currentStatus === "ACCEPTED" || currentStatus === "REJECTED") {
      toast.warning(
        "This application is already decided and cannot be changed.",
      );
      return;
    }

    setUpdatingId(id);
    try {
      const payload: Record<string, unknown> = { applyStatus: next };
      if (applyComment !== undefined) payload.applyComment = applyComment;

      const res = await updateApplication(id, payload);
      if (res?.success) {
        setApplications((prev) =>
          prev.map((a) =>
            a.id === id
              ? {
                  ...a,
                  applyStatus: next,
                  ...(applyComment !== undefined ? { applyComment } : {}),
                }
              : a,
          ),
        );
        if (selected?.id === id) {
          setSelected({
            ...selected,
            applyStatus: next,
            ...(applyComment !== undefined ? { applyComment } : {}),
          });
        }
        toast.success(`Application ${next.toLowerCase()}`);
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const requestStatusChange = (
    application: ApplicationRow,
    next: string,
  ) => {
    const currentStatus = (application.applyStatus || "PENDING").toUpperCase();
    if (currentStatus === "ACCEPTED" || currentStatus === "REJECTED") {
      toast.warning(
        "This application is already decided and cannot be changed.",
      );
      return;
    }
    if (next === "ACCEPTED" || next === "REJECTED") {
      setDecisionReason("");
      setDecision({
        application,
        next: next as "ACCEPTED" | "REJECTED",
      });
      return;
    }
    updateStatus(application.id, next);
  };

  const confirmDecision = async () => {
    if (!decision) return;
    await updateStatus(
      decision.application.id,
      decision.next,
      decisionReason.trim() || undefined,
    );
    setDecision(null);
    setDecisionReason("");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Remove this application?")) return;
    setDeletingId(id);
    try {
      const res = await deleteApplication(id);
      if (res?.success) {
        setApplications((prev) => prev.filter((a) => a.id !== id));
        if (selected?.id === id) setSelected(null);
        toast.success("Application removed");
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const stats = useMemo(() => {
    const total = applications.length;
    let pending = 0;
    let accepted = 0;
    let rejected = 0;
    for (const a of applications) {
      const s = (a.applyStatus || "PENDING").toUpperCase();
      if (s === "ACCEPTED") accepted++;
      else if (s === "REJECTED") rejected++;
      else pending++;
    }
    return { total, pending, accepted, rejected };
  }, [applications]);

  const columns: ColumnDef<ApplicationRow>[] = [
    {
      id: "applicant",
      header: "Applicant",
      cell: ({ row }) => {
        const u = row.original.user;
        const name = u?.profile?.name || "Unknown";
        const photo = u?.profile?.photo;
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-linear-to-br from-secondary/20 to-secondary/5 border border-slate-200 flex items-center justify-center font-bold text-secondary">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={photo}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              ) : (
                initial(name)
              )}
            </div>
            <div className="flex flex-col">
              <span
                className="font-bold text-secondary line-clamp-1 max-w-56"
                title={name}
              >
                {name}
              </span>
              <span className="text-[11px] text-slate-400 font-medium line-clamp-1 max-w-56">
                {u?.email || "-"}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Applied",
      cell: ({ row }) => (
        <span className="text-xs text-slate-500 font-medium">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      accessorKey: "applyStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = (row.original.applyStatus || "PENDING").toUpperCase();
        return (
          <Badge
            className={cn(
              "rounded-full font-bold text-[10px] uppercase px-3 py-1 border-none shadow-none transition-none",
              statusStyles[status] || "bg-slate-500 text-white",
            )}
          >
            {status}
          </Badge>
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
            className="text-xs text-slate-500 italic line-clamp-1 max-w-64"
            title={note}
          >
            {note}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => {
        const current = (row.original.applyStatus || "PENDING").toUpperCase();
        const isLocked = current === "ACCEPTED" || current === "REJECTED";

        const selectColor =
          current === "ACCEPTED"
            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
            : current === "REJECTED"
              ? "bg-red-50 text-red-700 border-red-200"
              : current === "REVIEWING"
                ? "bg-blue-50 text-blue-700 border-blue-200"
                : "bg-orange-50 text-orange-700 border-orange-200";

        return (
          <div className="flex items-center justify-end gap-2">
            <select
              value={current}
              disabled={updatingId === row.original.id || isLocked}
              onChange={(e) =>
                requestStatusChange(row.original, e.target.value)
              }
              title={
                isLocked
                  ? `Locked: ${current}`
                  : "Change Status"
              }
              className={cn(
                "h-9 pl-3 pr-8 rounded-lg border text-[11px] font-bold uppercase tracking-wider appearance-none focus:outline-none focus:ring-2 focus:ring-secondary/30 disabled:cursor-not-allowed disabled:opacity-90 bg-no-repeat bg-[right_0.5rem_center] bg-[length:0.65rem] bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20320%20512%22%3E%3Cpath%20fill%3D%22%2364748b%22%20d%3D%22M31.3%20192h257.3c17.8%200%2026.7%2021.5%2014.1%2034.1L174.1%20354.8c-7.8%207.8-20.5%207.8-28.3%200L17.2%20226.1C4.6%20213.5%2013.5%20192%2031.3%20192z%22%2F%3E%3C%2Fsvg%3E')]",
                isLocked ? "" : "cursor-pointer",
                selectColor,
              )}
            >
              {current === "PENDING" && (
                <option value="PENDING">Pending</option>
              )}
              <option value="REVIEWING">Reviewing</option>
              <option value="ACCEPTED">Accepted</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setSelected(row.original)}
              className="h-9 w-9 rounded-lg border border-slate-200 text-secondary hover:bg-slate-50 shadow-none"
              title="View Details"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={deletingId === row.original.id}
              onClick={() => handleDelete(row.original.id)}
              className="h-9 w-9 rounded-lg border border-slate-200 text-red-500 hover:bg-red-50 shadow-none"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Button
            asChild
            type="button"
            variant="ghost"
            size="sm"
            className="self-start text-slate-500 hover:text-secondary -ml-2 mb-1"
          >
            <Link href="/dashboard/my-works">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to My Jobs
            </Link>
          </Button>
          <Heading4>Applicants</Heading4>
          <p className="text-slate-500 font-medium text-sm flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-secondary">
              {job?.title || "Loading job..."}
            </span>
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={fetchApplications}
          disabled={isLoading}
        >
          <RotateCw className={cn("w-4 h-4", isLoading && "animate-spin")} />
          Refresh
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total",
            value: stats.total,
            icon: Users,
            color: "text-secondary",
            bg: "bg-secondary/10",
          },
          {
            label: "Pending",
            value: stats.pending,
            icon: Calendar,
            color: "text-orange-600",
            bg: "bg-orange-50",
          },
          {
            label: "Accepted",
            value: stats.accepted,
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Rejected",
            value: stats.rejected,
            icon: XCircle,
            color: "text-red-600",
            bg: "bg-red-50",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-slate-100 p-5 flex items-center gap-4"
          >
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                stat.bg,
              )}
            >
              <stat.icon className={cn("w-5 h-5", stat.color)} />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-secondary leading-none">
                {stat.value}
              </span>
              <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mt-1">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* List */}
      {isLoading && applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-semibold">
          Loading applicants...
        </div>
      ) : applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center">
          <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="text-lg font-bold text-slate-700">
            No applicants yet
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            When candidates apply to this job, they will show up here.
          </p>
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

      {/* Details Modal */}
      <CommonModal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Applicant Details"
        description="Review the candidate information and update status."
        maxWidth="2xl"
      >
        {selected && (
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-linear-to-br from-secondary/20 to-secondary/5 border border-slate-200 flex items-center justify-center font-bold text-secondary text-xl">
                {selected.user?.profile?.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={selected.user.profile.photo}
                    alt={selected.user.profile.name || ""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initial(selected.user?.profile?.name)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-bold text-secondary line-clamp-1">
                  {selected.user?.profile?.name || "Unknown Applicant"}
                </h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                  Applied on {formatDate(selected.createdAt)}
                </p>
              </div>
              <Badge
                className={cn(
                  "rounded-full font-bold text-[10px] uppercase px-3 py-1 border-none shadow-none",
                  statusStyles[
                    (selected.applyStatus || "PENDING").toUpperCase()
                  ] || "bg-slate-500 text-white",
                )}
              >
                {(selected.applyStatus || "PENDING").toUpperCase()}
              </Badge>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Email
                  </span>
                  <span className="text-sm font-semibold text-slate-700 truncate">
                    {selected.user?.email || "Not provided"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-secondary" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                    Phone
                  </span>
                  <span className="text-sm font-semibold text-slate-700 truncate">
                    {selected.user?.mobile || "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* Note */}
            {selected.applyNote && (
              <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <div className="flex items-center gap-2 mb-2 text-secondary font-bold text-sm">
                  <User className="w-4 h-4" />
                  Cover Note
                </div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selected.applyNote}
                </p>
              </div>
            )}

            {/* Cover Letter */}
            {selected.coverLetter && (
              <div className="p-4 rounded-xl border border-slate-100 bg-white">
                <div className="flex items-center gap-2 mb-2 text-secondary font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  Cover Letter
                </div>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selected.coverLetter}
                </p>
              </div>
            )}

            {/* Resume */}
            {selected.resume && (
              <a
                href={selected.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-slate-100 bg-white hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-bold text-secondary">
                    View Resume
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Opens in a new tab
                  </span>
                </div>
                <span className="text-xs text-slate-400 group-hover:text-secondary font-bold uppercase tracking-wider">
                  Open →
                </span>
              </a>
            )}

            {/* Status Actions */}
            <div className="pt-5 border-t border-slate-100 space-y-3">
              <p className="text-xs font-bold uppercase text-slate-400 tracking-widest">
                Update status
              </p>
              {(() => {
                const cur = (
                  selected.applyStatus || "PENDING"
                ).toUpperCase();
                const locked = cur === "ACCEPTED" || cur === "REJECTED";
                if (locked) {
                  return (
                    <p className="text-xs text-slate-500 italic">
                      This application has been{" "}
                      <span className="font-bold text-secondary">
                        {cur.toLowerCase()}
                      </span>{" "}
                      and can no longer be changed.
                    </p>
                  );
                }
                return (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={updatingId === selected.id}
                      onClick={() =>
                        requestStatusChange(selected, "REVIEWING")
                      }
                      className="border-blue-200 text-blue-700 hover:bg-blue-50"
                    >
                      Mark as Reviewing
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={updatingId === selected.id}
                      onClick={() =>
                        requestStatusChange(selected, "ACCEPTED")
                      }
                      className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Accept
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={updatingId === selected.id}
                      onClick={() =>
                        requestStatusChange(selected, "REJECTED")
                      }
                      className="border-red-200 text-red-700 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </CommonModal>

      {/* Decision Confirmation Modal */}
      <CommonModal
        isOpen={!!decision}
        onClose={() => {
          if (updatingId) return;
          setDecision(null);
          setDecisionReason("");
        }}
        title={
          decision?.next === "ACCEPTED"
            ? "Accept Application"
            : "Reject Application"
        }
        description={
          decision?.next === "ACCEPTED"
            ? "Confirm acceptance. The applicant will be notified by email."
            : "Confirm rejection. The applicant will be notified by email."
        }
        maxWidth="lg"
        zIndex={1100}
      >
        {decision && (
          <div className="space-y-5">
            <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 bg-slate-50/60">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-linear-to-br from-secondary/20 to-secondary/5 border border-slate-200 flex items-center justify-center font-bold text-secondary shrink-0">
                {decision.application.user?.profile?.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={decision.application.user.profile.photo}
                    alt={decision.application.user.profile.name || ""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initial(decision.application.user?.profile?.name)
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-secondary line-clamp-1">
                  {decision.application.user?.profile?.name || "Unknown"}
                </span>
                <span className="text-[11px] text-slate-400 truncate">
                  {decision.application.user?.email || "-"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-medium text-slate-700 text-sm inline-block">
                Reason{" "}
                <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <textarea
                value={decisionReason}
                onChange={(e) => setDecisionReason(e.target.value)}
                rows={4}
                placeholder={
                  decision.next === "ACCEPTED"
                    ? "Add a personal note for the candidate (will be included in the email)..."
                    : "Briefly explain why (optional, will be included in the email)..."
                }
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
              />
              <p className="text-[11px] text-slate-400">
                If left empty, an AI-generated message will be sent.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                disabled={!!updatingId}
                onClick={() => {
                  setDecision(null);
                  setDecisionReason("");
                }}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={!!updatingId}
                onClick={confirmDecision}
                className={cn(
                  "px-8 font-bold text-white",
                  decision.next === "ACCEPTED"
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700",
                )}
              >
                {decision.next === "ACCEPTED"
                  ? "Confirm Accept"
                  : "Confirm Reject"}
              </Button>
            </div>
          </div>
        )}
      </CommonModal>
    </div>
  );
}
