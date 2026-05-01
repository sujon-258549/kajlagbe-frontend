"use client";

import { useEffect, useState } from "react";
import Heading3 from "@/components/common/Headings/Heading3";
import AdminOnly from "@/components/common/auth/AdminOnly";
import AboutStatsModal from "@/components/modal/about/AboutStatsModal";
import { Edit } from "lucide-react";
import { AboutStatsFormData } from "@/schemas/about/stats.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";

export default function AboutStats() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [, setIsLoading] = useState(true);
  const [, setIsUpdating] = useState(false);
  const [data, setData] = useState<AboutStatsFormData>({
    items: [
      { value: "824", label: "Happy Clients" },
      { value: "31", label: "Years Experience" },
      { value: "08", label: "Awards Won" },
      { value: "56", label: "Expert Farmers" },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("about");
      if (res.success && res.data.about_stats) {
        setData(res.data.about_stats.value);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleUpdate = async (newData: AboutStatsFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "about_stats",
        value: newData,
        group: "about",
        description: "About Page Stats Section Settings",
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
    <section className="py-6 md:py-8 lg:py-12 bg-secondary text-white relative group/section">
      <div className="main-container mx-auto px-4 relative">
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center lg:divide-x divide-x-0 divide-white/10">
          {data.items.map((stat, index) => (
            <div key={index} className="p-4">
              <Heading3 className="text-4xl lg:text-5xl font-bold mb-2">
                {stat.value}
              </Heading3>
              <p className="text-white/70 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <AdminOnly>
        <AboutStatsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={handleUpdate}
        />
      </AdminOnly>
    </section>
  );
}
