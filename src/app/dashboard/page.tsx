"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  Inbox,
  MessageSquare,
  Newspaper,
  Send,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import Heading4 from "@/components/common/Headings/Heading4";
import { useAuth } from "@/context/AuthContext";
import { useSocket } from "@/context/SocketContext";
import { getDashboardOverview } from "@/actions/dashboard.actions";
import { cn } from "@/lib/utils";
import {
  ActivityAreaChart,
  StatusDonutChart,
  TopJobsBarChart,
} from "@/components/dashboard/DashboardCharts";

interface Overview {
  role: string;
  myApplicationsCount?: number;
  pendingApplications?: number;
  acceptedApplications?: number;
  rejectedApplications?: number;
  reviewingApplications?: number;
  myJobsCount?: number;
  myActiveJobsCount?: number;
  totalApplicantsReceived?: number;
  pendingApplicantsToReview?: number;
  myBlogsCount?: number;
  myPublishedBlogsCount?: number;
  myBlogCommentsCount?: number;
  totalUsersCount?: number;
  totalJobsCount?: number;
  totalApplicationsCount?: number;
  totalBlogsCount?: number;
  recentJobs?: Array<{
    id: string;
    title: string;
    company?: string | null;
    location?: string | null;
    isPublished?: boolean;
    applicantsCount?: number;
    createdAt: string;
  }>;
  recentApplications?: Array<{
    id: string;
    applyStatus: string;
    createdAt: string;
    job?: { id: string; title: string; company?: string | null } | null;
  }>;
  recentApplicationsReceived?: Array<{
    id: string;
    applyStatus: string;
    createdAt: string;
    job?: { id: string; title: string } | null;
    user?: {
      id: string;
      email?: string;
      profile?: { name?: string; photo?: string } | null;
    } | null;
  }>;
  recentBlogs?: Array<{
    id: string;
    title: string;
    slug?: string;
    category?: string | null;
    isPublished?: boolean;
    createdAt: string;
    _count?: { comments: number };
  }>;
  timeseries?: Array<{
    date: string;
    applications?: number;
    jobs?: number;
    applicants?: number;
  }>;
  applicationStatusBreakdown?: Array<{ status: string; count: number }>;
  topJobsByApplicants?: Array<{
    id: string;
    title: string;
    applicantsCount: number;
  }>;
}

const formatRelative = (iso: string) => {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    const diff = Date.now() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return d.toLocaleDateString(undefined, { month: "short", day: "2-digit" });
  } catch {
    return iso;
  }
};

const initial = (name?: string | null) =>
  (name || "U").trim().charAt(0).toUpperCase() || "U";

interface StatCard {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  href?: string;
  hint?: string;
}

const StatCardItem = ({ stat }: { stat: StatCard }) => {
  const content = (
    <div className="bg-white p-5 rounded-xl border border-gray-300 hover:border-gray-400 hover:shadow-md transition-all duration-200 flex items-center justify-between gap-4 h-full">
      <div className="flex flex-col min-w-0">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] mb-2 whitespace-nowrap">
          {stat.label}
        </p>
        <h3 className="text-3xl font-bold text-secondary leading-none">
          {stat.value}
        </h3>
        {stat.hint && (
          <p className="text-[11px] text-slate-400 font-medium mt-2">
            {stat.hint}
          </p>
        )}
      </div>
      <div
        className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
          stat.accent,
        )}
      >
        <stat.icon className="w-5 h-5" />
      </div>
    </div>
  );
  return stat.href ? (
    <Link href={stat.href} className="block group">
      {content}
    </Link>
  ) : (
    content
  );
};

const StatusPill = ({ status }: { status: string }) => {
  const s = (status || "PENDING").toUpperCase();
  const map: Record<string, string> = {
    PENDING: "bg-orange-50 text-orange-700 border-orange-200",
    REVIEWING: "bg-blue-50 text-blue-700 border-blue-200",
    ACCEPTED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    REJECTED: "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span
      className={cn(
        "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border",
        map[s] || "bg-slate-50 text-slate-700 border-slate-200",
      )}
    >
      {s}
    </span>
  );
};

const SectionCard = ({
  title,
  href,
  children,
  empty,
}: {
  title: string;
  href?: string;
  children: React.ReactNode;
  empty?: { icon: React.ComponentType<{ className?: string }>; label: string };
}) => (
  <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-300">
      <h3 className="text-base font-bold text-secondary">{title}</h3>
      {href && (
        <Link
          href={href}
          className="text-[11px] font-bold text-secondary uppercase tracking-widest hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
    <div className="p-4">
      {Array.isArray(children) && children.length === 0 && empty ? (
        <div className="py-12 flex flex-col items-center text-slate-400">
          <empty.icon className="w-7 h-7 mb-2" />
          <p className="text-xs font-semibold">{empty.label}</p>
        </div>
      ) : (
        children
      )}
    </div>
  </div>
);

export default function DashboardOverviewPage() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { socket } = useSocket();
  const [data, setData] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const res = await getDashboardOverview();
      if (res?.success) {
        setData(res.data);
      }
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (isAuthLoading) return;
    fetchData();
  }, [fetchData, isAuthLoading]);

  // Realtime: refetch on any incoming notification (apply / accept / reject)
  useEffect(() => {
    if (!socket) return;
    const refresh = () => fetchData();
    socket.on("new-notification", refresh);
    return () => {
      socket.off("new-notification", refresh);
    };
  }, [socket, fetchData]);

  const role = (data?.role || "").toUpperCase();
  const isAdmin = role === "ADMIN" || role === "SUPER_ADMIN";
  const isWorker = role === "WORKER";
  const isUser = role === "USER";

  const userStats: StatCard[] = useMemo(() => {
    if (!data) return [];
    const stats: StatCard[] = [];

    if (isUser || isAdmin) {
      stats.push(
        {
          label: "My Jobs",
          value: data.myJobsCount ?? 0,
          icon: Briefcase,
          accent: "bg-blue-50 text-blue-600",
          href: "/dashboard/my-works",
          hint: `${data.myActiveJobsCount ?? 0} live`,
        },
        {
          label: "Applicants",
          value: data.totalApplicantsReceived ?? 0,
          icon: Users,
          accent: "bg-emerald-50 text-emerald-600",
          href: "/dashboard/my-works",
          hint: `${data.pendingApplicantsToReview ?? 0} to review`,
        },
      );
    }

    if (isWorker || isAdmin) {
      stats.push(
        {
          label: "Applications",
          value: data.myApplicationsCount ?? 0,
          icon: Send,
          accent: "bg-indigo-50 text-indigo-600",
          href: "/dashboard/my-applications",
          hint: `${data.pendingApplications ?? 0} pending`,
        },
        {
          label: "Accepted",
          value: data.acceptedApplications ?? 0,
          icon: CheckCircle2,
          accent: "bg-emerald-50 text-emerald-600",
          href: "/dashboard/my-applications",
          hint: `${data.rejectedApplications ?? 0} rejected`,
        },
      );
    }

    stats.push(
      {
        label: "My Blogs",
        value: data.myBlogsCount ?? 0,
        icon: Newspaper,
        accent: "bg-amber-50 text-amber-600",
        href: "/dashboard/blog-list",
        hint: `${data.myPublishedBlogsCount ?? 0} published`,
      },
      {
        label: "Comments",
        value: data.myBlogCommentsCount ?? 0,
        icon: MessageSquare,
        accent: "bg-purple-50 text-purple-600",
        href: "/dashboard/blog-list",
        hint: "On your blogs",
      },
    );

    return stats;
  }, [data, isAdmin, isUser, isWorker]);

  const adminStats: StatCard[] = useMemo(() => {
    if (!data || !isAdmin) return [];
    return [
      {
        label: "Total Users",
        value: data.totalUsersCount ?? 0,
        icon: Users,
        accent: "bg-rose-50 text-rose-600",
      },
      {
        label: "Total Jobs",
        value: data.totalJobsCount ?? 0,
        icon: Briefcase,
        accent: "bg-sky-50 text-sky-600",
      },
      {
        label: "Total Applications",
        value: data.totalApplicationsCount ?? 0,
        icon: FileText,
        accent: "bg-fuchsia-50 text-fuchsia-600",
      },
      {
        label: "Total Blogs",
        value: data.totalBlogsCount ?? 0,
        icon: Newspaper,
        accent: "bg-teal-50 text-teal-600",
      },
    ];
  }, [data, isAdmin]);

  const userName =
    user?.profile?.name || user?.email?.split("@")[0] || "there";

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Hero Greeting */}
      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-secondary via-secondary to-emerald-900 text-white p-8 shadow-lg">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-10 w-48 h-48 rounded-full bg-amber-300/15 blur-3xl pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 mb-2">
            {role || "Member"}
          </p>
          <Heading4 className="text-white mb-1">
            Welcome back, {userName}
          </Heading4>
          <p className="text-white/70 text-sm font-medium">
            Here&apos;s a snapshot of what&apos;s happening across your
            workspace.
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-5">
            {isUser || isAdmin ? (
              <Link
                href="/dashboard/my-works"
                className="px-4 py-2 rounded-lg bg-white text-secondary text-xs font-bold uppercase tracking-wider hover:bg-white/90 transition-colors"
              >
                Post a Job
              </Link>
            ) : null}
            {isWorker || isAdmin ? (
              <Link
                href="/jobs"
                className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-colors"
              >
                Find Work
              </Link>
            ) : null}
            <Link
              href="/dashboard/blog-list"
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-colors"
            >
              Write a Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Loading skeleton */}
      {loading && !data ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-28 rounded-xl bg-white border border-gray-300 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <>
          {/* Personal stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {userStats.map((stat) => (
              <StatCardItem key={stat.label} stat={stat} />
            ))}
          </div>

          {/* Admin / system-wide stats */}
          {isAdmin && adminStats.length > 0 && (
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-3">
                Platform Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {adminStats.map((stat) => (
                  <StatCardItem key={stat.label} stat={stat} />
                ))}
              </div>
            </div>
          )}

          {/* Charts row */}
          {data?.timeseries && data.timeseries.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <ActivityAreaChart
                  data={data.timeseries}
                  show={{
                    applications: isWorker || isAdmin,
                    applicants: isUser || isAdmin,
                    jobs: isUser || isAdmin,
                  }}
                />
              </div>
              <div>
                {isWorker || isAdmin ? (
                  <StatusDonutChart
                    data={data.applicationStatusBreakdown || []}
                  />
                ) : (
                  <TopJobsBarChart data={data.topJobsByApplicants || []} />
                )}
              </div>
            </div>
          )}

          {/* For USER + ADMIN: also show top jobs bar chart on its own row */}
          {(isUser || isAdmin) &&
            (data?.topJobsByApplicants?.length ?? 0) > 0 && (
              <TopJobsBarChart data={data?.topJobsByApplicants || []} />
            )}

          {/* Two-column section: role-aware lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Worker view: My Applications */}
            {(isWorker || isAdmin) && (
              <SectionCard
                title="My Recent Applications"
                href="/dashboard/my-applications"
                empty={{ icon: Inbox, label: "No applications yet" }}
              >
                {(data?.recentApplications || []).length === 0 ? (
                  <div className="py-12 flex flex-col items-center text-slate-400">
                    <Inbox className="w-7 h-7 mb-2" />
                    <p className="text-xs font-semibold">
                      No applications yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {data?.recentApplications?.map((app) => (
                      <Link
                        key={app.id}
                        href="/dashboard/my-applications"
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 hover:bg-slate-50 hover:border-gray-400 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                          <Send className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-secondary text-sm line-clamp-1">
                            {app.job?.title || "Job removed"}
                          </p>
                          <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                            <Clock className="w-3 h-3" />
                            {formatRelative(app.createdAt)}
                          </p>
                        </div>
                        <StatusPill status={app.applyStatus} />
                      </Link>
                    ))}
                  </div>
                )}
              </SectionCard>
            )}

            {/* User view: My Recent Jobs */}
            {(isUser || isAdmin) && (
              <SectionCard
                title="My Recent Jobs"
                href="/dashboard/my-works"
                empty={{ icon: Briefcase, label: "No jobs posted yet" }}
              >
                {(data?.recentJobs || []).length === 0 ? (
                  <div className="py-12 flex flex-col items-center text-slate-400">
                    <Briefcase className="w-7 h-7 mb-2" />
                    <p className="text-xs font-semibold">
                      No jobs posted yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {data?.recentJobs?.map((job) => (
                      <Link
                        key={job.id}
                        href={`/dashboard/my-works/${job.id}/applicants`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 hover:bg-slate-50 hover:border-gray-400 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 font-bold text-blue-600 text-sm">
                          {initial(job.title)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-secondary text-sm line-clamp-1">
                            {job.title}
                          </p>
                          <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-2">
                            <Users className="w-3 h-3" />
                            {job.applicantsCount ?? 0} applicant
                            {(job.applicantsCount ?? 0) === 1 ? "" : "s"}
                            <span className="text-slate-300">•</span>
                            {formatRelative(job.createdAt)}
                          </p>
                        </div>
                        <span
                          className={cn(
                            "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border",
                            job.isPublished
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-slate-50 text-slate-500 border-slate-200",
                          )}
                        >
                          {job.isPublished ? "Live" : "Draft"}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </SectionCard>
            )}

            {/* User: Recent applications received */}
            {(isUser || isAdmin) && (
              <SectionCard
                title="Latest Applicants"
                href="/dashboard/my-works"
                empty={{ icon: Users, label: "No applicants yet" }}
              >
                {(data?.recentApplicationsReceived || []).length === 0 ? (
                  <div className="py-12 flex flex-col items-center text-slate-400">
                    <Users className="w-7 h-7 mb-2" />
                    <p className="text-xs font-semibold">
                      No applicants yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {data?.recentApplicationsReceived?.map((app) => {
                      const name = app.user?.profile?.name || "Unknown";
                      const photo = app.user?.profile?.photo;
                      return (
                        <Link
                          key={app.id}
                          href={
                            app.job?.id
                              ? `/dashboard/my-works/${app.job.id}/applicants`
                              : "/dashboard/my-works"
                          }
                          className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 hover:bg-slate-50 hover:border-gray-400 transition-colors"
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-emerald-50 border border-emerald-100 flex items-center justify-center font-bold text-emerald-700 shrink-0">
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
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-secondary text-sm line-clamp-1">
                              {name}
                            </p>
                            <p className="text-[11px] text-slate-400 font-semibold line-clamp-1">
                              applied for{" "}
                              <span className="text-slate-500">
                                {app.job?.title || "—"}
                              </span>{" "}
                              • {formatRelative(app.createdAt)}
                            </p>
                          </div>
                          <StatusPill status={app.applyStatus} />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </SectionCard>
            )}

            {/* Both: Recent Blogs */}
            <SectionCard
              title="My Recent Blogs"
              href="/dashboard/blog-list"
              empty={{ icon: Newspaper, label: "No blogs yet" }}
            >
              {(data?.recentBlogs || []).length === 0 ? (
                <div className="py-12 flex flex-col items-center text-slate-400">
                  <Newspaper className="w-7 h-7 mb-2" />
                  <p className="text-xs font-semibold">No blogs yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {data?.recentBlogs?.map((blog) => (
                    <Link
                      key={blog.id}
                      href="/dashboard/blog-list"
                      className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 hover:bg-slate-50 hover:border-gray-400 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0 font-bold text-amber-700 text-sm">
                        {initial(blog.title)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-secondary text-sm line-clamp-1">
                          {blog.title}
                        </p>
                        <p className="text-[11px] text-slate-400 font-semibold flex items-center gap-2">
                          <MessageSquare className="w-3 h-3" />
                          {blog._count?.comments ?? 0} comment
                          {(blog._count?.comments ?? 0) === 1 ? "" : "s"}
                          <span className="text-slate-300">•</span>
                          {formatRelative(blog.createdAt)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border",
                          blog.isPublished
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-slate-50 text-slate-500 border-slate-200",
                        )}
                      >
                        {blog.isPublished ? "Published" : "Draft"}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Trending CTA card (light decorative) */}
            <div className="bg-linear-to-br from-amber-50 via-white to-rose-50 rounded-xl border border-gray-300 p-6 flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-white shadow-sm border border-gray-300 flex items-center justify-center shrink-0">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-secondary mb-1">
                  Stay on top of your work
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Notifications appear in the top bar bell. Configure your
                  profile and explore opportunities to keep growing.
                </p>
              </div>
              <Link
                href="/dashboard/profile"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-secondary hover:underline"
              >
                Profile <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Worker red-x rejected hint, Worker only */}
          {isWorker && (data?.rejectedApplications ?? 0) > 0 && (
            <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex items-center gap-3">
              <XCircle className="w-5 h-5 text-red-500 shrink-0" />
              <p className="text-sm text-red-700 font-medium">
                {data?.rejectedApplications} application
                {(data?.rejectedApplications ?? 0) > 1 ? "s" : ""} were not
                selected. Don&apos;t lose hope — keep applying!
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
