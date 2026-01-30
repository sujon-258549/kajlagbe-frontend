"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { ArrowRight, Play } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import CustomImage from "../common/CustomImage";
import { useState } from "react";
import AdminOnly from "../common/auth/AdminOnly";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import ServicesTestimonialModal from "../modal/services/ServicesTestimonialModal";
import ServicesTestimonialSectionModal from "../modal/services/ServicesTestimonialSectionModal";

import {
  ServicesTestimonialItem,
  ServicesTestimonialSectionData,
} from "@/schemas/services/testimonial.schema";

const initialTestimonials = [
  {
    id: 1,
    name: "Penelope Miller",
    role: "Sr. Volunteer",
    title: "Forest Cleaning",
    content:
      "I was very impressed 😉 involves providing of advice and guidance on energy-related for matters. Understand the advantages hiring professionals to design and maintain your garden. 🏡",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 2,
    name: "Matthew Emily",
    role: "Sr. Volunteer",
    title: "Tree Plantation",
    content:
      "I was very impressed 😍 involves providing of advice and guidance on energy-related for matters. Understand the advantages hiring professionals to design and maintain your garden. 🌳",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300&h=300",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Community Lead",
    title: "Urban Gardening",
    content:
      "Exceptional service and dedication. The team provided insightful advice on sustainable practices that transformed our community garden project completely. 🌱",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300&h=300",
  },
];

const partners = [
  { name: "Disrupt", logo: "/placeholder-logo.png" }, // Placeholder mainly, will use text if image fails
  { name: "Air Peace", logo: "/placeholder-logo.png" },
  { name: "Arik", logo: "/placeholder-logo.png" },
  { name: "Transit", logo: "/placeholder-logo.png" },
  { name: "Spectranet", logo: "/placeholder-logo.png" },
  { name: "Kudi", logo: "/placeholder-logo.png" },
];

export default function ServicesTestimonial() {
  const [testimonials, setTestimonials] = useState<ServicesTestimonialItem[]>(
    initialTestimonials as ServicesTestimonialItem[],
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [sectionData, setSectionData] =
    useState<ServicesTestimonialSectionData>({
      subtitle: "Testimonials",
      title: "What People Saying",
      backgroundImage:
        "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=2000",
    });
  const [editingItem, setEditingItem] = useState<
    ServicesTestimonialItem | undefined
  >(undefined);

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: ServicesTestimonialItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (data: ServicesTestimonialItem) => {
    if (editingItem) {
      setTestimonials((prev) =>
        prev.map((item) => (item.id === editingItem.id ? data : item)),
      );
    } else {
      setTestimonials((prev) => [{ ...data, id: Date.now() }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = () => {
    if (editingItem) {
      setTestimonials((prev) =>
        prev.filter((item) => item.id !== editingItem.id),
      );
      setIsModalOpen(false);
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
        {/* Dark green overlay matching the image */}
        <div className="absolute inset-0 bg-linear-to-r from-[#0d2e25] to-[#0f392e]/80" />
      </div>

      <div className="main-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 md:mb-12 gap-6 text-center md:text-left">
          <AdminOnly>
            <button
              onClick={() => setIsSectionModalOpen(true)}
              className="absolute top-0 right-0 z-100 w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white hover:scale-110 transition-transform"
              title="Edit Section"
            >
              <Edit className="w-5 h-5" />
            </button>
          </AdminOnly>

          <div className="text-white">
            <span className="uppercase tracking-widest text-xs font-semibold mb-2 block text-white/80">
              {sectionData.subtitle}
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              {sectionData.title}
            </h2>
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
            <button className="bg-secondary hover:bg-[#0f392e] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all flex items-center gap-2 border border-white/20 backdrop-blur-sm group">
              View All Reviews
              <span className="bg-[#fbbf24] text-black w-6 h-6 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                <ArrowRight className="w-3 h-3" />
              </span>
            </button>
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
            loop={true}
            autoplay={{ delay: 5000 }}
            className="services-testimonial-swiper"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="bg-white/90 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start group hover:shadow-2xl transition-shadow duration-300 h-full relative">
                  {/* Edit Button */}
                  <AdminOnly>
                    <button
                      onClick={() => handleEditItem(item)}
                      className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-secondary text-white hover:scale-110 transition-transform"
                      title="Edit Testimonial"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </AdminOnly>

                  {/* Image Container with Play Button */}
                  <div className="relative w-full md:w-1/3 shrink-0 aspect-3/4 rounded-xl overflow-hidden bg-secondary">
                    <CustomImage
                      src={item.image}
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
        <div className="text-center">
          <h3 className="text-white text-xl font-bold mb-8">Major Partners</h3>
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
                  {/* Using text placeholder styled as logo since we don't have real logos */}
                  <div className="text-white/80 font-bold text-lg md:text-2xl group-hover:text-white transition-colors bg-white/10 px-6 py-3 rounded-lg backdrop-blur-sm border border-white/5 whitespace-nowrap">
                    {partner.name}
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>
      <ServicesTestimonialModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />
      <ServicesTestimonialSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        initialData={sectionData}
        onUpdate={(data) => setSectionData(data)}
      />
    </section>
  );
}
