"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Leaf } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import Heading3 from "../common/Headings/Heading3";
import Heading4 from "../common/Headings/Heading4";
import Heading5 from "../common/Headings/Heading5";

const services = [
  {
    id: 1,
    title: "Solar Collection",
    number: "1",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 2,
    title: "Solar Recycling",
    number: "2",
    image:
      "https://images.unsplash.com/photo-1548613053-220e753443af?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 3,
    title: "Renewable Power",
    number: "3",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 4,
    title: "Forest Protection",
    number: "4",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 5,
    title: "Wind Energy",
    number: "5",
    image:
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 6,
    title: "Solar Collection",
    number: "6",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 7,
    title: "Solar Recycling",
    number: "7",
    image:
      "https://images.unsplash.com/photo-1548613053-220e753443af?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 8,
    title: "Renewable Power",
    number: "8",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 9,
    title: "Forest Protection",
    number: "9",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7e?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: 10,
    title: "Wind Energy",
    number: "10",
    image:
      "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?auto=format&fit=crop&q=80&w=600",
  },
];

export default function ServicesPossible() {
  return (
    <section className="relative py-10 md:py-16 lg:py-24 bg-[#063022] overflow-hidden">
      {/* Background Image/Texture */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Wind turbine background placeholder */}
        <Image
          src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=2000"
          alt="Wind Turbines"
          fill
          className="object-cover grayscale"
        />
      </div>

      <div className="main-container relative z-10">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#fbbf24] font-semibold mb-4">
              <Leaf className="w-5 h-5" />
              <span className="uppercase tracking-wider text-sm">
                What We Do
              </span>
            </div>
            <Heading3 className=" text-white leading-tight">
              It&apos;s All Possible, We Can
              <br /> Do it Together
            </Heading3>
          </div>

          <div className="max-w-md text-slate-300 mx-auto md:mx-0">
            <p className="mb-6 text-sm md:text-base leading-relaxed">
              &quot;Advanced cameras combined with a large display fast
              performance, and highly calibrated.&quot;
            </p>
            <a
              href="#"
              className="text-[#fbbf24] font-semibold flex items-center justify-center md:justify-start gap-2 hover:gap-4 transition-all group"
            >
              Contact With Us
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
    </section>
  );
}
