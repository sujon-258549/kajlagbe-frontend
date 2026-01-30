import Heading1 from "@/components/common/Headings/Heading1";
import Heading4 from "@/components/common/Headings/Heading4";
import { Briefcase, Gavel, TrendingUp, CheckCircle2 } from "lucide-react";

const stats = [
  {
    label: "Active Jobs",
    value: "12",
    icon: Briefcase,
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    label: "Total Bids",
    value: "48",
    icon: Gavel,
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    label: "Completed",
    value: "24",
    icon: CheckCircle2,
    color: "text-[#86b86b]",
    bg: "bg-[#86b86b]/10",
  },
  {
    label: "Total Spent",
    value: "$2,450",
    icon: TrendingUp,
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <Heading4>Dashboard Overview</Heading4>
        <p className="text-slate-500 font-medium">
          Keep track of your activities and progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg border border-gray-200 flex items-center justify-between"
          >
            <div className="space-y-1">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-secondary">
                {stat.value}
              </h3>
            </div>
            <div className={stat.bg + " p-3 rounded-lg"}>
              <stat.icon className={stat.color + " w-6 h-6"} />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity placeholder items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-lg border border-gray-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-secondary">Recent Bids</h3>
            <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline cursor-pointer">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-secondary font-bold text-xl">
                  W
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-secondary text-sm">
                    Website Modernization
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Bid: $500 • 2 hours ago
                  </p>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-bold uppercase">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-secondary">Latest Jobs</h3>
            <button className="text-xs font-bold text-secondary uppercase tracking-widest hover:underline cursor-pointer">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-secondary font-bold text-xl">
                  A
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-secondary text-sm">
                    App Development
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    Bids: 12 • Posted 1 day ago
                  </p>
                </div>
                <span className="text-[10px] bg-[#86b86b]/20 text-secondary px-2 py-1 rounded-full font-bold uppercase">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
