"use client"; // Force reload

import { useState, useEffect } from "react";
import Heading3 from "@/components/common/Headings/Heading3";
import { Edit } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesBenefitsModal, {
  BenefitsFormData,
} from "../modal/services/ServicesBenefitsModal";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { toast } from "react-toastify";

export default function ServicesBenefits() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [benefitsData, setBenefitsData] = useState<BenefitsFormData>({
    sectionTitle: "WHY CHOOSE US",
    sectionDesc: "We bring excellence to every field we touch",
    items: [
      {
        title: "Qualified Team",
        desc: "Our team consists of highly skilled and certified professionals in their fields.",
        icon: "fa-solid fa-users-gear",
      },
      {
        title: "Quality Service",
        desc: "We are committed to delivering the highest quality service to our clients.",
        icon: "fa-solid fa-shield-halved",
      },
      {
        title: "Modern Tech",
        desc: "We use the latest technologies and tools to ensure the best results.",
        icon: "fa-solid fa-microchip",
      },
      {
        title: "Expertise Support",
        desc: "We provide round-the-clock support to help you with any issues or questions.",
        icon: "fa-solid fa-headset",
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("services_benefits");
      if (res.success && res.data.benefits_data) {
        setBenefitsData(res.data.benefits_data.value);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (data: BenefitsFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "benefits_data",
        value: data,
        group: "services_benefits",
        description: "Services Benefits Settings",
      });
      if (res.success) {
        setBenefitsData(data);
        toast.success("Benefits updated!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error updating benefits");
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
            title="Edit Benefits"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          <div className="lg:col-span-4 mb-8 text-center md:text-left">
            <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
              {benefitsData.sectionTitle}
            </span>
            <Heading3 className="text-secondary max-w-2xl">
              {benefitsData.sectionDesc}
            </Heading3>
          </div>

          {benefitsData.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300 border border-white/10 hover:border-primary/30 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <i className={`${item.icon} text-6xl rotate-12 -mr-4 -mt-4`} />
              </div>
              <div className="w-14 h-14 bg-secondary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                <i
                  className={`${item.icon} text-secondary text-2xl group-hover:text-white transition-colors`}
                />
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
      <ServicesBenefitsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={benefitsData}
        onUpdate={handleUpdate}
        isLoading={isUpdating}
      />
    </section>
  );
}
