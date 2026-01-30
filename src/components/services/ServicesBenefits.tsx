import Heading3 from "@/components/common/Headings/Heading3";
import { ShieldCheck, TrendingUp, Users, Clock } from "lucide-react";

const benefits = [
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    desc: "We guarantee the highest standard of organic certification.",
  },
  {
    icon: TrendingUp,
    title: "Increased Yield",
    desc: "Optimized farming techniques for maximum harvest output.",
  },
  {
    icon: Users,
    title: "Expert Team",
    desc: "Decades of combined experience in agricultural science.",
  },
  {
    icon: Clock,
    title: "Timely Delivery",
    desc: "Efficient processes ensuring on-time project completion.",
  },
];

export default function ServicesBenefits() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="main-container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4 mb-8 text-center sm:text-left">
            <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
              WHY CHOOSE US
            </span>
            <Heading3 className="text-secondary max-w-2xl">
              We bring excellence to every field we touch
            </Heading3>
          </div>

          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <item.icon className="w-24 h-24 -mr-4 -mt-4 rotate-12" />
              </div>
              <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <item.icon className="text-secondary w-7 h-7 group-hover:text-white transition-colors" />
              </div>
              <h4 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-slate-500 leading-relaxed text-sm relative z-10">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
