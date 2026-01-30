"use client";

import { useState } from "react";
import Heading3 from "@/components/common/Headings/Heading3";
import { ShieldCheck, TrendingUp, Users, Clock, Edit } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesBenefitsModal, {
  BenefitsFormData,
} from "../modal/services/ServicesBenefitsModal";

const initialBenefits = [
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

const ICONS = {
  "Certified Quality": ShieldCheck,
  "Increased Yield": TrendingUp,
  "Expert Team": Users,
  "Timely Delivery": Clock,
};

export default function ServicesBenefits() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [benefitsData, setBenefitsData] = useState<BenefitsFormData>({
    items: initialBenefits.map((b) => ({
      id: b.title,
      title: b.title,
      desc: b.desc,
    })),
  });

  const handleUpdate = (data: BenefitsFormData) => {
    setBenefitsData(data);
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-white relative group/section">
      <div className="main-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <AdminOnly>
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute top-0 right-0 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white opacity-0 group-hover/section:opacity-100 transition-all hover:scale-110"
              title="Edit Benefits"
            >
              <Edit className="w-5 h-5" />
            </button>
          </AdminOnly>

          <div className="lg:col-span-4 mb-8 text-center md:text-left">
            <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
              WHY CHOOSE US
            </span>
            <Heading3 className="text-secondary max-w-2xl">
              We bring excellence to every field we touch
            </Heading3>
          </div>

          {benefitsData.items.map((item, idx) => {
            // Fallback icon logic or mapping based on title/index if strictly needed dynamic icons
            // For now, mapping by title or index if titles change
            const Icon = Object.values(ICONS)[idx % 4];

            return (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <Icon className="w-24 h-24 -mr-4 -mt-4 rotate-12" />
                </div>
                <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="text-secondary w-7 h-7 group-hover:text-white transition-colors" />
                </div>
                <h4 className="text-xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-slate-500 leading-relaxed text-sm relative z-10">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <ServicesBenefitsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={benefitsData}
        onUpdate={handleUpdate}
      />
    </section>
  );
}
