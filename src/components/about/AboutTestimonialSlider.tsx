"use client";

import React, { useState } from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import {
  ArrowRight,
  MessageSquare,
  Play,
  Leaf,
  Edit,
  Plus,
} from "lucide-react";
import Marquee from "react-fast-marquee";

import Heading3 from "@/components/common/Headings/Heading3";
import Heading4 from "@/components/common/Headings/Heading4";
import AdminOnly from "@/components/common/auth/AdminOnly";
import { Button } from "@/components/ui/button";
import AboutTestimonialItemModal from "@/components/modal/about/AboutTestimonialItemModal";
import { AboutTestimonialItem } from "@/schemas/about/testimonial.schema";
import AboutPartnersModal, {
  AboutPartnersData,
} from "@/components/modal/about/AboutPartnersModal";

const initialTestimonials = [
  {
    id: 1,
    name: "Penelope Miller",
    role: "Sr. Volunteer",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    content:
      "I was very impressed involves providing of advice and guidance on energy-related for matters. Understand the advantages hiring professionals to design and maintain your garden.",
  },
  {
    id: 2,
    name: "Thomas Anderson",
    role: "Civil Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    content:
      "The renewable energy solutions provided were top-notch. It was a game changer for our facility's power consumption and sustainability goals.",
  },
  {
    id: 3,
    name: "Sarah Jenkins",
    role: "Environmentalist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    content:
      "Working with this team has been an absolute pleasure. Their dedication to green energy and waste management is truly inspiring for everyone.",
  },
  {
    id: 4,
    name: "Penelope Miller",
    role: "Sr. Volunteer",
    image:
      "https://images.unsplash.com/photo-1554151228-14d9def656ec?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    content:
      "I was very impressed involves providing of advice and guidance on energy-related for matters. Understand the advantages hiring professionals to design and maintain your garden.",
  },
  {
    id: 5,
    name: "Thomas Anderson",
    role: "Civil Engineer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    content:
      "The renewable energy solutions provided were top-notch. It was a game changer for our facility's power consumption and sustainability goals.",
  },
  {
    id: 6,
    name: "Sarah Jenkins",
    role: "Environmentalist",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=800",
    rating: 5,
    content:
      "Working with this team has been an absolute pleasure. Their dedication to green energy and waste management is truly inspiring for everyone.",
  },
];

const initialPartners = [
  { name: "Kudi" },
  { name: "DISRUPT" },
  { name: "AIR PEACE" },
  { name: "Arik" },
  { name: "TRANSIT" },
  { name: "Spectranet" },
];

export default function AboutTestimonialSlider() {
  const [testimonials, setTestimonials] =
    useState<AboutTestimonialItem[]>(initialTestimonials);
  const [partners, setPartners] = useState(initialPartners);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPartnersModalOpen, setIsPartnersModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<
    AboutTestimonialItem | undefined
  >(undefined);

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: AboutTestimonialItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (data: AboutTestimonialItem) => {
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

  const handlePartnersUpdate = (data: AboutPartnersData) => {
    setPartners(data.partners);
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-white overflow-hidden relative group/section">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center mb-16 md:mb-20">
          {/* Left Content */}
          <div className="w-full lg:w-5/12 space-y-6 md:space-y-8">
            <div className="flex items-center gap-2 text-secondary font-semibold">
              <Leaf className="w-5 h-5 fill-current" />
              <span className="text-sm uppercase tracking-wide">
                Testimonials
              </span>
            </div>

            <Heading3 className="text-secondary font-bold leading-tight ">
              Why They Believe <br className="hidden md:block" />
              <span className="inline-flex items-center justify-center w-10 h-10 bg-secondary text-primary rounded-full mx-2 align-middle">
                <span className="text-xl font-serif">❝</span>
              </span>
              In Us
            </Heading3>

            <p className="text-slate-500 text-lg leading-relaxed">
              Likely to then a dental prosthetic is added then dental prosthetic
              occaecat laborum.
            </p>

            <div className="flex items-center gap-4">
              <span
                className="text-5xl font-bold text-slate-200"
                style={{
                  WebkitTextStroke: "1px #cbd5e1",
                  color: "transparent",
                }}
              >
                99%
              </span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-primary">
                  <Leaf className="w-4 h-4 fill-current" />
                </div>
                <span className="font-bold text-secondary">
                  Positive Reviews
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <button className="flex items-center gap-3 px-6 py-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group w-fit">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <span className="block text-xs text-slate-500 font-medium">
                    Write your honest
                  </span>
                  <span className="flex text-sm font-bold text-secondary items-center gap-1">
                    review <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>

              <AdminOnly>
                <Button
                  onClick={handleAddItem}
                  className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold w-full md:w-auto"
                >
                  <Plus className="w-4 h-4" /> Add Testimonial
                </Button>
              </AdminOnly>
            </div>
          </div>

          {/* Right Slider */}
          <div className="w-full lg:w-7/12 relative">
            <div className="w-full max-w-[650px] mx-auto lg:mr-0">
              <Swiper
                effect={"creative"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 1.2,
                  },
                }}
                modules={[EffectCreative, Autoplay]}
                className="about-testimonial-swiper"
                loop={true}
                creativeEffect={{
                  limitProgress: 3,
                  prev: {
                    translate: ["-10%", 0, -200],
                    opacity: 0.3,
                    scale: 0.85,
                  },
                  next: {
                    translate: ["10%", 0, -200],
                    opacity: 0.3,
                    scale: 0.85,
                  },
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
              >
                {testimonials.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className="rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <div className="bg-secondary flex flex-col md:flex-row h-full md:h-[400px] relative group">
                      {/* Image Half */}
                      <div className="md:w-5/12 relative h-64 md:h-full">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover object-top"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                          <div className="w-14 h-14 rounded-full border border-white/30 backdrop-blur-sm flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-current ml-1" />
                          </div>
                        </div>
                      </div>
                      {/* Content Half */}
                      <div className="md:w-7/12 p-8 md:p-10 flex flex-col justify-center text-white relative">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                          <span className="text-8xl font-serif">❝</span>
                        </div>

                        {/* Edit Button */}
                        <AdminOnly>
                          <button
                            onClick={() => handleEditItem(item)}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:text-secondary z-20"
                            title="Edit Testimonial"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </AdminOnly>

                        <div className="flex items-center gap-2 mb-6">
                          <div className="px-3 py-1 rounded-full border border-white/20 text-xs font-semibold bg-white/5">
                            Rating ⭐ {item.rating}.0
                          </div>
                        </div>

                        <p className="text-gray-300 mb-8 leading-relaxed italic">
                          &quot;{item.content}&quot;
                        </p>

                        <div>
                          <Heading4 className="font-bold">{item.name}</Heading4>
                          <p className="text-sm text-gray-400">{item.role}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>

        {/* Major Partners Section */}
        <div className="mt-16 lg:mt-24 relative group/partners">
          <div className="flex items-center gap-4 mb-10 relative">
            <div className="h-px bg-slate-200 grow"></div>
            <Heading3 className="text-secondary uppercase tracking-wider text-lg">
              Trusted Partners
            </Heading3>
            <div className="h-px bg-slate-200 grow"></div>

            <AdminOnly>
              <button
                onClick={() => setIsPartnersModalOpen(true)}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/10 text-secondary hover:bg-secondary hover:text-white transition-all opacity-0 group-hover/partners:opacity-100"
                title="Edit Partners"
              >
                <Edit className="w-4 h-4" />
              </button>
            </AdminOnly>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-linear-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-linear-to-l from-white to-transparent pointer-events-none" />

            <Marquee
              gradient={false}
              speed={40}
              pauseOnHover
              autoFill
              className="py-4"
            >
              {partners.map((partner, index) => (
                <div
                  key={index}
                  className="mx-4 bg-secondary rounded-xl p-6 h-24 min-w-[200px] flex items-center justify-center hover:bg-secondary/90 transition-colors group cursor-pointer border border-secondary"
                >
                  <span className="text-white font-bold text-lg opacity-70 group-hover:opacity-100 transition-opacity tracking-wide">
                    {partner.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
        <style>{`
          .about-testimonial-swiper {
            overflow: visible !important;
            padding-top: 20px;
            padding-bottom: 20px;
          }
          .about-testimonial-swiper .swiper-slide {
            transform-origin: center center;
          }
          .about-testimonial-swiper .swiper-slide-shadow {
            background: transparent !important;
          }
        `}</style>

        <AboutTestimonialItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={editingItem}
          onSave={handleSaveItem}
          onDelete={handleDeleteItem}
        />

        <AboutPartnersModal
          isOpen={isPartnersModalOpen}
          onClose={() => setIsPartnersModalOpen(false)}
          initialData={{ partners }}
          onUpdate={handlePartnersUpdate}
        />
      </div>
    </section>
  );
}
