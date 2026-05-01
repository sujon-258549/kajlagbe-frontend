"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { ArrowRight, Play, Trash2 } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CustomImage from "../common/CustomImage";
import { useState, useEffect } from "react";
import AdminOnly from "../common/auth/AdminOnly";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import ServicesTestimonialModal from "@/components/modal/services/ServicesTestimonialModal";
import ServicesTestimonialSectionModal from "@/components/modal/services/ServicesTestimonialSectionModal";
import ServicesPartnersModal, {
  ServicesPartnersData,
} from "@/components/modal/services/ServicesPartnersModal";

import {
  ServicesTestimonialItem,
  ServicesTestimonialSectionData,
} from "@/schemas/services/testimonial.schema";
import Heading2 from "../common/Headings/Heading2";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { getAllReviews, createReview, updateReview, deleteReview } from "@/actions/review.actions";
import { toast } from "react-toastify";

export default function ServicesTestimonial() {
  const [testimonials, setTestimonials] = useState<ServicesTestimonialItem[]>([]);
  const [partners, setPartners] = useState<{ name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isPartnersModalOpen, setIsPartnersModalOpen] = useState(false);
  const [sectionData, setSectionData] = useState<ServicesTestimonialSectionData>({
    subtitle: "Testimonials",
    title: "What People Saying",
    backgroundImage: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000",
  });
  const [editingItem, setEditingItem] = useState<ServicesTestimonialItem | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch reviews
      const reviewsRes = await getAllReviews();
      if (reviewsRes.success) {
        setTestimonials(reviewsRes.data);
      }

      // Fetch section settings
      const settingsRes = await getSettingsMap("services_testimonials");
      if (settingsRes.success) {
        if (settingsRes.data.testimonial_section) {
          setSectionData(settingsRes.data.testimonial_section.value);
        }
        if (settingsRes.data.partners) {
          setPartners(settingsRes.data.partners.value);
        }
      }
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: ServicesTestimonialItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = async (data: ServicesTestimonialItem) => {
    setIsUpdating(true);
    try {
      let res;
      if (editingItem?.id) {
        res = await updateReview(editingItem.id, data);
      } else {
        res = await createReview(data);
      }

      if (res.success) {
        toast.success(editingItem ? "Review updated!" : "Review added!");
        // Refresh testimonials
        const reviewsRes = await getAllReviews();
        if (reviewsRes.success) setTestimonials(reviewsRes.data);
        return true;
      } else {
        toast.error(res.message || "Something went wrong");
        return false;
      }
    } catch (error) {
      toast.error("Error saving review");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    setIsUpdating(true);
    try {
      const res = await deleteReview(id);
      if (res.success) {
        toast.success("Review deleted!");
        setTestimonials((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error(res.message || "Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting review");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSectionUpdate = async (data: ServicesTestimonialSectionData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "testimonial_section",
        value: data,
        group: "services_testimonials",
        description: "Services Testimonial Section Settings",
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

  const handlePartnersUpdate = async (data: ServicesPartnersData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "partners",
        value: data.partners,
        group: "services_testimonials",
        description: "Services Page Partners",
      });
      if (res.success) {
        setPartners(data.partners);
        toast.success("Partners updated!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error updating partners");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="relative py-10 md:py-16 lg:py-24 overflow-hidden group/section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={sectionData.backgroundImage}
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#0f392ea8] mix-blend-multiply" />
        <div className="absolute inset-0 bg-linear-to-r from-[#0d2e25] to-[#0f392e]/80" />
      </div>

      <div className="main-container relative z-10">
        <AdminOnly>
          <button
            onClick={() => setIsSectionModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-100 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:bg-white hover:text-secondary shadow-lg backdrop-blur-md"
            title="Edit Section"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12 gap-6 text-center md:text-left">
          <div className="text-white">
            <span className="uppercase tracking-widest text-xs font-semibold mb-2 block text-white/80">
              {sectionData.subtitle}
            </span>
            <Heading2 className=" font-bold text-white">
              {sectionData.title}
            </Heading2>
          </div>
          <div className="flex gap-3">
            <AdminOnly>
              <Button
                onClick={handleAddItem}
                className="bg-secondary hover:bg-[#0f392e] text-white rounded-full"
              >
                <Plus className="w-4 h-4 mr-2" /> Add Review
              </Button>
            </AdminOnly>
          </div>
        </div>

        {/* Testimonial Cards Slider */}
        <div className="mb-10 md:mb-20">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
            }}
            loop={testimonials.length > 2}
            autoplay={{ delay: 5000 }}
            className="services-testimonial-swiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start group hover:shadow-2xl transition-shadow duration-300 h-full relative">
                  {/* Action Buttons */}
                  <AdminOnly>
                    <div className="absolute top-4 right-4 z-50 flex gap-2">
                      <button
                        onClick={() => handleEditItem(item)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-white hover:scale-110 transition-transform shadow-md"
                        title="Edit Testimonial"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => item.id && handleDeleteItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:scale-110 transition-transform shadow-md"
                        title="Delete Testimonial"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </AdminOnly>

                  {/* Image Container */}
                  <div className="relative w-full md:w-1/3 shrink-0 aspect-3/4 rounded-xl overflow-hidden bg-secondary">
                    <CustomImage
                      src={item.image || ""}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-secondary/20 group-hover:bg-secondary/40 transition-colors duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-4 h-4 text-white fill-white ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-secondary font-bold text-xl">
                        {item.title}
                      </h3>
                      <div className="flex justify-center md:justify-start">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 text-[#fbbf24] fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 md:line-clamp-4">
                      {item.content}
                    </p>

                    <div className="pt-2 border-t border-gray-100 mt-auto w-full">
                      <h4 className="text-slate-900 font-bold text-sm">
                        {item.name}
                      </h4>
                      <span className="text-slate-400 text-xs">
                        {item.role}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Major Partners Section */}
        <div className="text-center relative group/partners">
          <div className="flex items-center justify-center mb-8 relative">
            <h3 className="text-white text-xl font-bold">Major Partners</h3>
            <AdminOnly>
              <button
                onClick={() => setIsPartnersModalOpen(true)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white hover:bg-secondary hover:text-white transition-all opacity-0 group-hover/partners:opacity-100"
                title="Edit Partners"
              >
                <Edit className="w-4 h-4" />
              </button>
            </AdminOnly>
          </div>
          {partners.length > 0 && (
            <Marquee
              gradient={false}
              speed={50}
              pauseOnHover={true}
              className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500"
            >
              <div className="flex items-center gap-16 px-8">
                {partners.map((partner, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 group cursor-pointer"
                  >
                    <div className="text-white/80 font-bold text-lg md:text-2xl group-hover:text-white transition-colors bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/5 whitespace-nowrap">
                      {partner.name}
                    </div>
                  </div>
                ))}
              </div>
            </Marquee>
          )}
        </div>
      </div>
      <ServicesTestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
        isLoading={isUpdating}
      />
      <ServicesTestimonialSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        initialData={sectionData}
        onUpdate={handleSectionUpdate}
        isLoading={isUpdating}
      />
      <ServicesPartnersModal
        isOpen={isPartnersModalOpen}
        onClose={() => setIsPartnersModalOpen(false)}
        initialData={{ partners }}
        onUpdate={handlePartnersUpdate}
        isLoading={isUpdating}
      />
    </section>
  );
}
