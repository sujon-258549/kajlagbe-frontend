"use client";

import {
  Wrench,
  Monitor,
  Heart,
  GraduationCap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: <Wrench className="w-8 h-8" />,
    title: "Home & Maintenance",
    tags: ["Fix", "Clean", "Renovate"],
    color: "bg-orange-50",
    iconColor: "text-primary",
    link: "/services?filter=Home",
  },
  {
    icon: <Monitor className="w-8 h-8" />,
    title: "IT & Digital Division",
    tags: ["Software", "IT", "Digital"],
    color: "bg-green-50",
    iconColor: "text-secondary",
    link: "/services?filter=Technical",
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Personal & Wellness",
    tags: ["Beauty", "Health", "Care"],
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    link: "/services?filter=Personal",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Education & Skills",
    tags: ["Tutors", "Skill", "Training"],
    color: "bg-purple-50",
    iconColor: "text-purple-500",
    link: "/services?filter=Personal",
  },
];

export default function ServicesBanner() {
  return (
    <section className="py-12 -mt-10 relative z-30">
      <div className="main-container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, i) => (
            <Link
              key={i}
              href={pillar.link}
              className="group relative bg-white p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-black/5 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="flex flex-col items-start gap-6">
                <div
                  className={`w-16 h-16 rounded-2xl ${pillar.color} ${pillar.iconColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-inner`}
                >
                  {pillar.icon}
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-secondary leading-tight">
                    {pillar.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag, j) => (
                      <span
                        key={j}
                        className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-sm font-bold text-secondary group-hover:text-primary transition-colors">
                  <span>Explore Now</span>
                  <ArrowRight className="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>

              {/* Bottom accent bar */}
              <div
                className={`absolute bottom-0 left-8 right-8 h-1 rounded-t-full transition-all duration-500 opacity-0 group-hover:opacity-100 ${pillar.iconColor.replace("text-", "bg-")}`}
              ></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
