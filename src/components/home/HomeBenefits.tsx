"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Edit } from "lucide-react";
import Link from "next/link";
import Heading2 from "../common/Headings/Heading2";
import AdminOnly from "../common/auth/AdminOnly";
import HomeBenefitsModal from "../modal/home/HomeBenefitsModal";
import { HomeBenefitsFormData } from "@/schemas/home/homeBenefits.schema";

const initialLeftBenefits = [
  {
    title: "Eco-Friendly Practices",
    desc: "From biodegradable packaging to farming, we're committed.",
    iconName: "fa-solid fa-leaf",
  },
  {
    title: "Naturally Preserved Goodness",
    desc: "From biodegradable packaging to farming, we're committed.",
    iconName: "fa-solid fa-gear",
  },
  {
    title: "Chef-Approved Taste",
    desc: "From biodegradable packaging to farming, we're committed.",
    iconName: "fa-solid fa-clock",
  },
];

const initialRightBenefits = [
  {
    title: "Farm-Fresh & Organic",
    desc: "From biodegradable packaging to farming, we're committed.",
    iconName: "fa-solid fa-seedling",
  },
  {
    title: "Quality You Can Trust",
    desc: "From biodegradable packaging to farming, we're committed.",
    iconName: "fa-solid fa-heart-pulse",
  },
  {
    title: "Fast & Safe Delivery",
    desc: "From biodegradable packaging to farming, we're committed.",
    iconName: "fa-solid fa-truck",
  },
];

export default function HomeBenefits() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<HomeBenefitsFormData>({
    badge: "Our Benefits",
    title: "Discover the benefits that set our food products apart",
    centerImage: "/images/home/benefits_packets.png",
    leftBenefits: initialLeftBenefits,
    rightBenefits: initialRightBenefits,
  });

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-[#fcfdfa] overflow-hidden group/section relative">
      <AdminOnly>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
          title="Edit Benefits"
        >
          <Edit className="w-4 h-4" />
        </button>
      </AdminOnly>

      <div className="main-container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0f9eb] rounded-full text-secondary text-sm font-semibold border border-[#dcf0d1] mb-6">
            <Sparkles className="w-4 h-4" />
            {data.badge}
          </div>
          <Heading2 className=" text-secondary leading-tight">
            {data.title}
          </Heading2>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/3 space-y-12 order-2 lg:order-1">
            {data.leftBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex gap-5 lg:text-right items-start lg:flex-row-reverse group"
              >
                <div className="shrink-0 w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className={`${benefit.iconName} text-xl`} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-secondary">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] lg:ml-auto">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Images */}
          <div className="w-full lg:w-1/3 relative h-[300px] md:h-[500px] order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full h-full transform scale-100 md:scale-110">
              <Image
                src={data.centerImage}
                alt="Organic Food Packets"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 space-y-12 order-3">
            {data.rightBenefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-5 items-start group">
                <div className="shrink-0 w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className={`${benefit.iconName} text-xl`} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-secondary">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-20 lg:mt-28">
          <p className="text-slate-500 font-medium">
            From clean ingredients to conscious choices –{" "}
            <Link
              href="/about"
              className="text-secondary underline decoration-[#86b86b] decoration-2 underline-offset-4 hover:text-[#86b86b] transition-colors"
            >
              discover what sets us apart.
            </Link>
          </p>
        </div>
      </div>

      <HomeBenefitsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={(newData: HomeBenefitsFormData) => setData(newData)}
      />
    </section>
  );
}
