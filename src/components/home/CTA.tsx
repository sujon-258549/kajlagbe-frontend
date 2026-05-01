"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import CTAModal from "../modal/home/CTAModal";
import { CTAFormData } from "@/schemas/home/cta.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import Link from "next/link";

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [data, setData] = useState<CTAFormData>({
    title: "Ready to get started?",
    description: "Contact us today to discuss your project or service needs.",
    primaryButtonText: "Contact Us",
    primaryButtonLink: "#",
    secondaryButtonText: "View Services",
    secondaryButtonLink: "#",
  });

  useEffect(() => {
    const fetchCTAData = async () => {
      const res = await getSettingsMap("home");
      if (res.success && res.data.home_cta) {
        setData(res.data.home_cta.value);
      }
      setIsLoading(false);
    };
    fetchCTAData();
  }, []);

  const handleUpdate = async (newData: CTAFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "home_cta",
        value: newData,
        group: "home",
        description: "Homepage CTA Section Settings",
      });
      if (res.success) {
        setData(newData);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="bg-slate-50 py-16 border-y border-slate-100 relative group/section">
      <div className="main-container mx-auto px-4 relative">
        <AdminOnly>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute -top-10 right-4 md:right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-secondary opacity-0 group-hover/section:opacity-100 group-hover/section:top-0 transition-all duration-500 hover:bg-secondary hover:text-white shadow-xl"
            title="Edit CTA"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h2 className="text-3xl font-bold text-black mb-2">
              {data.title}
            </h2>
            <p className="text-slate-600">
              {data.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href={data.primaryButtonLink}>
              <Button size="xl" className="border-none bg-secondary hover:bg-secondary/90 text-white">
                {data.primaryButtonText}
              </Button>
            </Link>
            <Link href={data.secondaryButtonLink}>
              <Button
                size="xl"
                variant="outline"
                className="bg-white border-slate-200 text-black hover:bg-slate-50 shadow-sm hover:shadow-none"
              >
                {data.secondaryButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <CTAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={handleUpdate}
        isLoading={isUpdating}
      />
    </section>
  );
}
