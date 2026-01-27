"use client";

import {
  ShieldCheck,
  CalendarCheck,
  HelpCircle,
  HeartHandshake,
} from "lucide-react";

const guarantees = [
  {
    icon: <ShieldCheck className="w-12 h-12" />,
    title: "Verified Experts",
    desc: "Every professional undergoes strict background checks and skill verification.",
  },
  {
    icon: <CalendarCheck className="w-12 h-12" />,
    title: "7-Day Warranty",
    desc: "Not satisfied with the service? We offer a 7-day post-service quality warranty.",
  },
  {
    icon: <HeartHandshake className="w-12 h-12" />,
    title: "Damage Insurance",
    desc: "We cover up to $1000 in accidental damages during service delivery.",
  },
  {
    icon: <HelpCircle className="w-12 h-12" />,
    title: "24/7 Support",
    desc: "Our dedicated support team is available around the clock for any assistance.",
  },
];

export default function ServiceGuarantee() {
  return (
    <section className="py-20 bg-white border-y border-slate-100">
      <div className="main-container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {guarantees.map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center space-y-4 md:space-y-6 group"
            >
              <div className="text-secondary group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-black">{item.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
