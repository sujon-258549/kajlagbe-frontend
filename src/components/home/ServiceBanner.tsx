"use client";

import CustomImage from "../common/CustomImage";
import Heading5 from "../common/Headings/Heading5";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import AdminOnly from "../common/auth/AdminOnly";
import { Edit } from "lucide-react";
import ServiceBannerModal from "../modal/home/ServiceBannerModal";
import { ServiceBannerFormData } from "@/schemas/home/serviceBanner.schema";

const initialServices = [
  {
    title: "Home Repair & Maintenance",
    slug: "home-repair-maintenance",
    image:
      "https://img.freepik.com/free-photo/electrician-working-house_23-2149338512.jpg",
  },
  {
    title: "Cleaning & Hygiene",
    slug: "cleaning-hygiene",
    image:
      "https://img.freepik.com/free-photo/cleaning-service-concept_23-2148531813.jpg",
  },
  {
    title: "Construction & Renovation",
    slug: "construction-renovation",
    image:
      "https://img.freepik.com/free-photo/construction-site-worker_23-2148742496.jpg",
  },
  {
    title: "Carpentry, Glass & Metal",
    slug: "carpentry-glass-metal",
    image:
      "https://img.freepik.com/free-photo/carpenter-working-workshop_23-2148212922.jpg",
  },
  {
    title: "Vehicle Services",
    slug: "vehicle-services",
    image:
      "https://img.freepik.com/free-photo/car-wash-detailing_23-2149218247.jpg",
  },
  {
    title: "Driver & Transport",
    slug: "driver-transport",
    image:
      "https://img.freepik.com/free-photo/professional-driver-car_23-2148982260.jpg",
  },
  {
    title: "Shifting & Labour",
    slug: "shifting-labour",
    image:
      "https://img.freepik.com/free-photo/movers-carrying-boxes_23-2148521476.jpg",
  },
  {
    title: "Electronics, IT & CCTV",
    slug: "electronics-it-cctv",
    image:
      "https://img.freepik.com/free-photo/technician-installing-cctv-camera_23-2149323743.jpg",
  },
  {
    title: "Tutor & Education",
    slug: "tutor-education",
    image:
      "https://img.freepik.com/free-photo/home-tutor-teaching-student_23-2148825202.jpg",
  },
  {
    title: "Health & Care",
    slug: "health-care",
    image:
      "https://img.freepik.com/free-photo/home-nurse-taking-care-patient_23-2148895354.jpg",
  },
  {
    title: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    image:
      "https://img.freepik.com/free-photo/beauty-salon-home-service_23-2149055342.jpg",
  },
  {
    title: "Food & Cooking",
    slug: "food-cooking",
    image:
      "https://img.freepik.com/free-photo/home-cook-preparing-food_23-2148583897.jpg",
  },
  {
    title: "Event & Media",
    slug: "event-media",
    image:
      "https://img.freepik.com/free-photo/event-management-stage-setup_23-2148810255.jpg",
  },
  {
    title: "Digital & Office Support",
    slug: "digital-office-support",
    image:
      "https://img.freepik.com/free-photo/office-assistant-working-laptop_23-2148872254.jpg",
  },
  {
    title: "Security & Safety",
    slug: "security-safety",
    image:
      "https://img.freepik.com/free-photo/security-guard-uniform_23-2148971315.jpg",
  },
  {
    title: "Legal, Paper & Documentation",
    slug: "legal-documentation",
    image:
      "https://img.freepik.com/free-photo/legal-documents-desk_23-2148893441.jpg",
  },
  {
    title: "Daily Life & On-Demand",
    slug: "daily-life-on-demand",
    image:
      "https://img.freepik.com/free-photo/personal-assistant-helping-errand_23-2149101256.jpg",
  },
];

export default function ServiceBanner() {
  const swiperRef = useRef<SwiperType>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<ServiceBannerFormData>({
    services: initialServices,
  });

  return (
    <section className="py-12 bg-[#F9F8F3] overflow-hidden group/section relative">
      <AdminOnly>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white"
          title="Edit Banner"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>
      </AdminOnly>
      <div className="main-container mx-auto px-6">
        <div className="relative flex items-center justify-center gap-2 lg:gap-2">
          {/* Controls - Left */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden md:flex w-12 h-12 rounded-full border border-secondary/20 items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all flex-shrink-0 z-10 bg-white/50 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Main Slider main-container */}
          <div className="bg-white rounded-2xl p-3 md:p-6 border border-slate-200 flex-1 max-w-6xl overflow-hidden relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={32}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="w-full"
            >
              {data.services.map((service, i) => (
                <SwiperSlide key={i}>
                  <div className="flex items-center gap-4 group">
                    {/* Square Image */}
                    <div className="w-24 h-24 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100">
                      <CustomImage
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-1">
                      <Heading5 className="text-lg md:text-xl font-bold text-secondary leading-tight line-clamp-2">
                        {service.title}
                      </Heading5>
                      <span className="text-primary text-sm font-medium hover:underline cursor-pointer">
                        Book Now →
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Controls - Right */}
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden md:flex w-12 h-12 rounded-full border border-secondary/20 items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all shrink-0 z-10 bg-white/50 backdrop-blur-sm"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <ServiceBannerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={(newData: ServiceBannerFormData) => setData(newData)}
      />
    </section>
  );
}
