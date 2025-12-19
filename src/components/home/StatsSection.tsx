"use client";

import { Users, Briefcase, Award, Clock } from "lucide-react";

const stats = [
  {
    icon: <Users className="w-10 h-10" />,
    value: "10k+",
    label: "Happy Clients",
    color: "from-secondary to-secondary/80"
  },
  {
    icon: <Briefcase className="w-10 h-10" />,
    value: "5k+",
    label: "Projects Done",
    color: "from-primary to-primary/80"
  },
  {
    icon: <Award className="w-10 h-10" />,
    value: "25+",
    label: "Awards Win",
    color: "from-secondary to-secondary/80"
  },
  {
    icon: <Clock className="w-10 h-10" />,
    value: "10+",
    label: "Years Experience",
    color: "from-primary to-primary/80"
  }
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 group">
              <div className={`w-20 h-20 rounded-2xl bg-white shadow-lg border border-slate-100 flex items-center justify-center text-primary transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {stat.icon}
              </div>
              <div className="space-y-1">
                <div className="text-4xl lg:text-5xl font-black text-black">{stat.value}</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
