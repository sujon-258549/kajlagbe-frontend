"use client";

import { useState } from "react";
import { CheckCircle2, Edit } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import Heading4 from "../common/Headings/Heading4";
import AdminOnly from "../common/auth/AdminOnly";
import HomeWhyModal from "../modal/home/HomeWhyModal";
import { HomeWhyFormData } from "@/schemas/home/why.schema";

const initialPoints = [
  {
    title: "Verified Professionals",
    description:
      "Every expert on our platform is background-checked and vetted.",
  },
  {
    title: "24/7 Support",
    description:
      "Our support team is always available to assist you with any queries.",
  },
  {
    title: "Affordable Pricing",
    description:
      "Transparent pricing with no hidden charges for all our services.",
  },
];

export default function WhyChooseUs() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<HomeWhyFormData>({
    badge: "Why Choose Us",
    title: "We Are Here to Grow Your Business Exponentially",
    description:
      "We combine technical expertise with a customer-centric approach to deliver solutions that drive real results. Our team is committed to excellence and transparency in every project.",
    mainImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80",
    points: initialPoints,
  });

  return (
    <section className=" md:py-20 pt-16 pb-10 relative group/section">
      <AdminOnly>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
          title="Edit Section"
        >
          <Edit className="w-4 h-4" />
        </button>
      </AdminOnly>

      <div className="main-container mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <CustomImage
              src={data.mainImage}
              alt="Highlight"
              fill
              wrapperClassName="w-full h-[350px] lg:h-[600px]"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl z-0"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl z-0"></div>
        </div>
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">
              {data.badge}
            </span>
            <Heading2 className="text-3xl lg:text-4xl font-bold text-secondary leading-tight">
              {data.title}
            </Heading2>
          </div>
          <p className="text-slate-600 leading-relaxed">{data.description}</p>

          <div className="space-y-4">
            {data.points.map((point, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                <div>
                  <Heading4 className="font-bold text-secondary text-lg">
                    {point.title}
                  </Heading4>
                  <p className="text-slate-600 text-sm">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <HomeWhyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={(newData: HomeWhyFormData) => setData(newData)}
      />
    </section>
  );
}
