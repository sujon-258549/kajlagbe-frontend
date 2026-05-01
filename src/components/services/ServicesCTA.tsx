"use client"; // Force reload

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Heading2 from "@/components/common/Headings/Heading2";
import { ArrowRight, Edit } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesCTAModal, {
  CTAFormData,
} from "../modal/services/ServicesCTAModal";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { toast } from "react-toastify";

export default function ServicesCTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [ctaData, setCtaData] = useState<CTAFormData>({
    title: "Ready to transform your land into a thriving harvest?",
    description:
      "Join hundreds of happy farmers who have partnered with us for sustainable and profitable agriculture.",
    primaryButtonText: "Get Started",
    secondaryButtonText: "Contact Us",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("services_cta");
      if (res.success && res.data.cta_data) {
        setCtaData(res.data.cta_data.value);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (data: CTAFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "cta_data",
        value: data,
        group: "services_cta",
        description: "Services CTA Settings",
      });
      if (res.success) {
        setCtaData(data);
        toast.success("CTA updated!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error updating CTA");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="py-6 md:py-8 lg:py-12 bg-white relative group/section">
      <div className="main-container relative">
        <AdminOnly>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
            title="Edit CTA"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="bg-secondary rounded-2xl p-8 md:p-12 lg:p-20 text-center relative overflow-hidden border border-white/10 group/card">
          {/* Background Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <Heading2 className="text-white">{ctaData.title}</Heading2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {ctaData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="xl"
                className="px-10  bg-primary text-white hover:bg-white hover:text-secondary   transition-all duration-300 group"
              >
                {ctaData.primaryButtonText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="px-10  border-white/20 text-white bg-transparent hover:bg-white hover:text-secondary  transition-all duration-300"
              >
                {ctaData.secondaryButtonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ServicesCTAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={ctaData}
        onUpdate={handleUpdate}
        isLoading={isUpdating}
      />
    </section>
  );
}
