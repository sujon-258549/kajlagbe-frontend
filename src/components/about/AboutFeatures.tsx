"use client";

import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import Heading2 from "@/components/common/Headings/Heading2";
import Heading3 from "@/components/common/Headings/Heading3";
import AdminOnly from "@/components/common/auth/AdminOnly";
import AboutFeaturesModal from "@/components/modal/about/AboutFeaturesModal";
import { AboutFeaturesFormData } from "@/schemas/about/features.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";

export default function AboutFeatures() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setIsLoading] = useState(true);
  const [, setIsUpdating] = useState(false);
  const [data, setData] = useState<AboutFeaturesFormData>({
    badge: "OUR FEATURES",
    title: "Discover the love behind our food products sprout",
    description:
      "Every product tells a story of care, quality, and dedication to purity.",
    items: [
      {
        iconName: "fa-solid fa-leaf",
        title: "100% Organic",
        description:
          "Certified organic farming practices without harmful chemicals.",
      },
      {
        iconName: "fa-solid fa-seedling",
        title: "Fresh Harvest",
        description:
          "Harvested at peak ripeness for maximum flavor and nutrition.",
      },
      {
        iconName: "fa-solid fa-sun",
        title: "Eco-Friendly",
        description: "Sustainable farming that respects and preserves nature.",
      },
      {
        iconName: "fa-solid fa-heart",
        title: "Made with Love",
        description: "Grown and packed with care for your family's health.",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("about");
      if (res.success && res.data.about_features) {
        setData(res.data.about_features.value);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = async (newData: AboutFeaturesFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "about_features",
        value: newData,
        group: "about",
        description: "About Page Features Section Settings",
      });
      if (res.success) {
        setData(newData);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="py-6 md:py-8 lg:py-12 bg-secondary relative group/section">
      <div className="main-container mx-auto px-4 text-center relative">
        {/* Edit Button */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:bg-white hover:text-secondary z-50"
            title="Edit Section"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="max-w-2xl mx-auto mb-12">
          <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
            {data.badge}
          </span>
          <Heading2 className="text-white mb-4">{data.title}</Heading2>
          <p className="text-white/70">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.items.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-white/10 hover:translate-y-[-5px] transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto bg-[#f8fdf4] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i className={`${feature.iconName} text-2xl text-secondary`} />
              </div>
              <Heading3 className="font-bold text-xl text-secondary mb-3">
                {feature.title}
              </Heading3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <AdminOnly>
        <AboutFeaturesModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={handleUpdate}
        />
      </AdminOnly>
    </section>
  );
}
