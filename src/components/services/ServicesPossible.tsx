"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Leaf, Edit, Plus } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomImage from "../common/CustomImage";
import Heading3 from "../common/Headings/Heading3";
import Heading5 from "../common/Headings/Heading5";
import AdminOnly from "../common/auth/AdminOnly";

import WhatWeDoModal from "../modal/services/WhatWeDoModal";
import ServicesPossibleSectionModal, {
  PossibleSectionFormData,
} from "../modal/services/ServicesPossibleSectionModal";
import { WhatWeDoItem } from "@/schemas/services/whatWeDo.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { toast } from "react-toastify";

export default function ServicesPossible() {
  const [services, setServices] = useState<WhatWeDoItem[]>([]);
  const [sectionData, setSectionData] = useState<PossibleSectionFormData & { backgroundImage?: string }>({
    tagline: "What We Do",
    title: "It's All Possible, We Can\nDo it Together",
    description: "Advanced cameras combined with a large display fast performance, and highly calibrated.",
    backgroundImage: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=2000"
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<WhatWeDoItem | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("services_possible");
      if (res.success) {
        if (res.data.possible_section) {
          setSectionData(res.data.possible_section.value);
        }
        if (res.data.possible_items) {
          setServices(res.data.possible_items.value);
        }
      }
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: WhatWeDoItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = async (data: WhatWeDoItem) => {
    setIsUpdating(true);
    try {
      let newServices;
      if (editingItem) {
        newServices = services.map((item) => (item.id === editingItem.id ? data : item));
      } else {
        newServices = [{ ...data, id: Date.now() }, ...services];
      }

      const res = await upsertSetting({
        key: "possible_items",
        value: newServices,
        group: "services_possible",
        description: "Services Possible Items",
      });

      if (res.success) {
        setServices(newServices);
        toast.success(editingItem ? "Item updated!" : "Item added!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error saving item");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!editingItem) return;
    setIsUpdating(true);
    try {
      const newServices = services.filter((item) => item.id !== editingItem.id);
      const res = await upsertSetting({
        key: "possible_items",
        value: newServices,
        group: "services_possible",
      });
      if (res.success) {
        setServices(newServices);
        toast.success("Item deleted!");
        setIsModalOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error deleting item");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSectionUpdate = async (data: PossibleSectionFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "possible_section",
        value: data,
        group: "services_possible",
        description: "Services Possible Section Settings",
      });
      if (res.success) {
        setSectionData(data);
        toast.success("Section updated!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error updating section");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="relative py-6 md:py-8 lg:py-12 bg-[#063022] overflow-hidden group/section">
      {/* Background Image/Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Wind turbine background placeholder */}
        <Image
          src={sectionData.backgroundImage || "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=2000"}
          alt="Wind Turbines"
          fill
          className="object-cover grayscale"
        />
      </div>

      <div className="main-container relative z-10">
        <AdminOnly>
          <button
            onClick={() => setIsSectionModalOpen(true)}
            className="absolute top-0 right-16 md:right-20 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:bg-white hover:text-secondary shadow-lg backdrop-blur-md"
            title="Edit Section Details"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl text-left">
            <div className="flex items-center justify-start gap-2 text-[#fbbf24] font-semibold mb-4">
              <Leaf className="w-5 h-5" />
              <span className="uppercase tracking-wider text-sm">
                {sectionData.tagline}
              </span>
            </div>
            <Heading3 className=" text-white leading-tight mb-6 whitespace-pre-line">
              {sectionData.title}
            </Heading3>
          </div>

          <div className="max-w-md mx-auto md:mx-0 flex flex-col items-center md:items-end text-center md:text-right group/right-col relative">
            <AdminOnly>
              <button
                onClick={handleAddItem}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#fbbf24] text-[#063022] hover:bg-white hover:text-secondary transition-all mb-6 shadow-lg hover:shadow-xl"
                title="Add Category"
              >
                <Plus className="w-5 h-5" />
              </button>
            </AdminOnly>

            <p className="mb-6 text-slate-300 md:text-lg leading-relaxed font-light">
              &quot;{sectionData.description}&quot;
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#fbbf24] font-bold tracking-wide hover:text-white transition-colors group/link pb-1 border-b-2 border-transparent hover:border-[#fbbf24]"
            >
              CONTACT WITH US
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Slider Section */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            pagination={{
              el: ".custom-pagination",
              type: "progressbar",
            }}
            className="possible-swiper !overflow-visible"
          >
            {services.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="bg-secondary rounded-lg border border-white overflow-hidden h-[350px] flex flex-col relative group">
                  {/* Top Content */}
                  <div className="p-4 pb-4">
                    {/* Number Icon */}
                    <div className="flex justify-between items-start">
                      <div className="w-8 h-8 relative flex items-center justify-center mb-3">
                        {/* Starburst shape */}
                        <svg
                          viewBox="0 0 24 24"
                          className="w-full h-full text-[#fcd34d] absolute inset-0 fill-current"
                        >
                          <path d="M12 2L14.4 7.2L20 7.8L15.6 11.6L17 17L12 14L7 17L8.4 11.6L4 7.8L9.6 7.2L12 2Z" />
                        </svg>
                        <span className="relative z-10 text-[10px] font-bold text-white">
                          {item.number}
                        </span>
                      </div>

                      {/* Edit Button */}
                      <AdminOnly>
                        <button
                          onClick={() => handleEditItem(item)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-white hover:text-secondary transition-all z-20"
                          title="Edit Category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </AdminOnly>
                    </div>

                    <Heading5 className="text-white text-base font-bold mb-3">
                      {item.title}
                    </Heading5>

                    <button className="text-xs font-bold uppercase tracking-wider text-gray-300 hover:text-[#fbbf24] transition-colors flex items-center gap-1">
                      Read More <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Bottom Image without Curve Effect */}
                  <div className="relative mt-auto h-40 w-full">
                    <CustomImage
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer Controls */}
        <div className="flex items-center gap-8 mt-16">
          <div className="flex gap-4">
            <button className="custom-prev w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#063022] transition-all">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="custom-next w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#063022] transition-all">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar Container */}
          <div className="custom-pagination !relative !w-full !bg-white/10 !h-1 !rounded-full overflow-hidden">
            {/* Pagination progress bar will be injected here by Swiper */}
          </div>
        </div>
      </div>

      <style>{`
        .custom-pagination .swiper-pagination-progressbar-fill {
          background-color: #fbbf24 !important;
          border-radius: 9999px;
        }
      `}</style>

      <ServicesPossibleSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        initialData={sectionData}
        onUpdate={handleSectionUpdate}
        isLoading={isUpdating}
      />

      <WhatWeDoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        isLoading={isUpdating}
      />
    </section>
  );
}
