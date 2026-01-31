"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, Edit } from "lucide-react";
import Heading2 from "../common/Headings/Heading2";
import Heading5 from "../common/Headings/Heading5";
import AdminOnly from "../common/auth/AdminOnly";
import ProcessModal from "../modal/home/ProcessModal";
import { ProcessFormData } from "@/schemas/home/process.schema";

const initialSteps = [
  {
    number: "01",
    title: "Book Your Service",
    iconName: "fa-solid fa-comments",
    description:
      "Select your needed service and schedule a time that works best for you through our simple booking form.",
    color: "from-secondary to-green-600",
  },
  {
    number: "02",
    title: "Expert Assignment",
    iconName: "fa-solid fa-bullseye",
    description:
      "Our system instantly matches you with a background-verified and highly-rated professional in your area.",
    color: "from-primary to-orange-600",
  },
  {
    number: "03",
    title: "Quality Delivery",
    iconName: "fa-solid fa-microchip",
    description:
      "Our expert arrives at your doorstep and provides top-tier service using specialized tools and professional care.",
    color: "from-secondary to-green-600",
  },
  {
    number: "04",
    title: "Check & Warranty",
    iconName: "fa-solid fa-circle-check",
    description:
      "Review the completed work, make a secure payment, and enjoy our 7-day post-service quality guarantee.",
    color: "from-primary to-orange-600",
  },
];

export default function ProcessSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ProcessFormData>({
    badge: "Our Workflow",
    title: "Our Simplified Service Workflow",
    description: "A transparent and proven methodology designed for success.",
    steps: initialSteps,
  });

  return (
    <section className=" py-12 md:py-24 bg-white relative overflow-hidden group/section">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 z-0"></div>

      <div className="main-container mx-auto px-6 relative z-10">
        <AdminOnly>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-4 md:right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
            title="Edit Process"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-secondary font-bold tracking-[0.3em] uppercase text-xs block"
          >
            {data.badge}
          </motion.span>
          <Heading2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            {data.title.split("Service")[0]}
            <span className="text-primary italic">Service</span>{" "}
            {data.title.split("Service")[1]}
          </Heading2>
          <p className="text-lg text-slate-500 font-medium pt-2">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-18 left-[15%] right-[15%] h-[2px] z-0">
            <div className="w-full h-full border-t-2 border-dashed border-slate-200"></div>
          </div>

          {data.steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="relative group flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              {/* Number and Icon Circle */}
              <div className="relative mb-8 z-10">
                <div
                  className={`w-20 h-20 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-slate-900 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:shadow-2xl group-hover:border-transparent group-hover:bg-linear-to-br ${step.color} group-hover:text-white`}
                >
                  <i className={`${step.iconName} text-2xl`} />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white shadow-md border border-slate-50 flex items-center justify-center text-xs font-bold text-slate-400 group-hover:text-primary transition-colors">
                  {step.number}
                </div>
              </div>

              {/* Card Content */}
              <div className="space-y-4 group-hover:-translate-y-1 transition-transform duration-500">
                <Heading5 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                  {step.title}
                </Heading5>
                <p className="text-slate-500 leading-relaxed text-[15px] font-medium">
                  {step.description}
                </p>
              </div>

              {/* Mobile Indicator */}
              <div className="lg:hidden mt-6 text-slate-200 group-last:hidden">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ProcessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={(newData: ProcessFormData) => setData(newData)}
      />
    </section>
  );
}
