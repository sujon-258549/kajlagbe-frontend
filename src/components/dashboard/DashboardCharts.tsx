"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TimePoint {
  date: string;
  applications?: number;
  jobs?: number;
  applicants?: number;
}

interface StatusBreakdown {
  status: string;
  count: number;
}

interface TopJob {
  id: string;
  title: string;
  applicantsCount: number;
}

const SUCCESS_COLOR = "#052e16"; // matches Tailwind --secondary
const SUCCESS_COLOR_SOFT = "#0f4d2a";

const STATUS_COLORS: Record<string, string> = {
  PENDING: "#f97316",
  REVIEWING: "#3b82f6",
  ACCEPTED: SUCCESS_COLOR,
  REJECTED: "#ef4444",
};

const ChartCard = ({
  title,
  subtitle,
  children,
  height = 260,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  height?: number;
}) => (
  <div className="bg-white rounded-xl border border-gray-300 overflow-hidden">
    <div className="px-6 py-5 border-b border-gray-300">
      <h3 className="text-base font-bold text-secondary">{title}</h3>
      {subtitle && (
        <p className="text-[11px] text-slate-400 font-semibold mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
    <div className="p-4" style={{ height }}>
      {children}
    </div>
  </div>
);

const tooltipStyle = {
  backgroundColor: "rgba(255,255,255,0.98)",
  border: "1px solid #d1d5db",
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 600,
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

export const ActivityAreaChart = ({
  data,
  show,
}: {
  data: TimePoint[];
  show: { applications?: boolean; jobs?: boolean; applicants?: boolean };
}) => {
  return (
    <ChartCard
      title="Activity (Last 14 Days)"
      subtitle="Daily counts across your workspace"
      height={300}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 12, left: -10, bottom: 0 }}
        >
          <defs>
            <linearGradient id="grad-applications" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-jobs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.45} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="grad-applicants" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={SUCCESS_COLOR} stopOpacity={0.45} />
              <stop offset="100%" stopColor={SUCCESS_COLOR} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#94a3b8"
            tick={{ fontSize: 11, fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#94a3b8"
            tick={{ fontSize: 11, fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8fafc" }} />
          <Legend
            wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 6 }}
            iconType="circle"
          />
          {show.applications && (
            <Area
              type="monotone"
              dataKey="applications"
              name="Applications"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#grad-applications)"
            />
          )}
          {show.applicants && (
            <Area
              type="monotone"
              dataKey="applicants"
              name="Applicants Received"
              stroke={SUCCESS_COLOR}
              strokeWidth={2}
              fill="url(#grad-applicants)"
            />
          )}
          {show.jobs && (
            <Area
              type="monotone"
              dataKey="jobs"
              name="Jobs Posted"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#grad-jobs)"
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const StatusDonutChart = ({ data }: { data: StatusBreakdown[] }) => {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  const isEmpty = total === 0;

  return (
    <ChartCard
      title="Application Status"
      subtitle={`${total} total application${total === 1 ? "" : "s"}`}
      height={300}
    >
      {isEmpty ? (
        <div className="h-full flex flex-col items-center justify-center text-slate-400">
          <p className="text-xs font-bold">No applications yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={2}
              cornerRadius={6}
              stroke="#fff"
              strokeWidth={2}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_COLORS[entry.status] || "#94a3b8"}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              wrapperStyle={{ fontSize: 11, fontWeight: 700, paddingTop: 6 }}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </ChartCard>
  );
};

export const TopJobsBarChart = ({ data }: { data: TopJob[] }) => {
  if (!data || data.length === 0) {
    return (
      <ChartCard
        title="Top Jobs by Applicants"
        subtitle="Most popular jobs"
        height={300}
      >
        <div className="h-full flex flex-col items-center justify-center text-slate-400">
          <p className="text-xs font-bold">No applicants yet</p>
        </div>
      </ChartCard>
    );
  }

  const formatted = data.map((d) => ({
    name: d.title.length > 22 ? `${d.title.slice(0, 22)}…` : d.title,
    fullName: d.title,
    applicants: d.applicantsCount,
  }));

  return (
    <ChartCard
      title="Top Jobs by Applicants"
      subtitle="Your most popular postings"
      height={300}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formatted}
          layout="vertical"
          margin={{ top: 6, right: 18, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="grad-bar" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={SUCCESS_COLOR} />
              <stop offset="100%" stopColor={SUCCESS_COLOR_SOFT} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f1f5f9" horizontal={false} />
          <XAxis
            type="number"
            stroke="#94a3b8"
            tick={{ fontSize: 11, fontWeight: 600 }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#475569"
            tick={{ fontSize: 11, fontWeight: 700 }}
            tickLine={false}
            axisLine={false}
            width={140}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            cursor={{ fill: "#f8fafc" }}
            formatter={(value: number) => [`${value} applicants`, ""]}
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.fullName || ""
            }
          />
          <Bar
            dataKey="applicants"
            fill="url(#grad-bar)"
            radius={[0, 6, 6, 0]}
            barSize={22}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};
