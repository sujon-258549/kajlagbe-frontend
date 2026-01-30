import React, { useState } from "react";
import { ArrowRight, Edit } from "lucide-react";
import Link from "next/link";
import AdminOnly from "@/components/common/auth/AdminOnly";
import SubscriptionCTAModal from "@/components/modal/subscription/SubscriptionCTAModal";
import { SubscriptionCTAFormData } from "@/schemas/subscription/cta.schema";

export default function SubscriptionCTA() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<SubscriptionCTAFormData>({
    title: "Ready to Accelerate Your Success?",
    description:
      "Join thousands of satisfied customers who have transformed their workflow with our premium subscription.",
    primaryButtonText: "Get Started Now",
    primaryButtonLink: "/login",
    secondaryButtonText: "Contact Sales",
    secondaryButtonLink: "/contact",
  });

  return (
    <section className="py-10 md:py-16 lg:py-24 relative group/section">
      <div className="main-container">
        <div className="bg-secondary rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Edit Button */}
          <AdminOnly>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="absolute top-6 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover/section:opacity-100 transition-all z-50 hover:bg-white hover:text-secondary"
              title="Edit CTA"
            >
              <Edit className="w-4 h-4" />
            </button>
          </AdminOnly>

          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              {data.title}
            </h2>
            <p className="text-white/80 text-lg md:text-xl">
              {data.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={data.primaryButtonLink}>
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white hover:text-secondary transition-all flex items-center gap-2 group">
                  {data.primaryButtonText}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href={data.secondaryButtonLink}>
                <button className="bg-transparent border border-white text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white hover:text-secondary transition-all">
                  {data.secondaryButtonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AdminOnly>
        <SubscriptionCTAModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData: SubscriptionCTAFormData) => setData(newData)}
        />
      </AdminOnly>
    </section>
  );
}
