"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCreative } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import { ArrowRight, MessageSquare, Play, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Heading2 from "@/components/common/Headings/Heading2";

const testimonials = [
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

// ... inside the component ...
// <Marquee gradient={false} speed={40} className="py-4" autoFill>

const partners = [
  {
    name: "Kudi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
  },
  {
    name: "DISRUPT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
  },
  {
    name: "AIR PEACE",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/2560px-Tata_Consultancy_Services_Logo.svg.png",
  },
  {
    name: "Arik",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png",
  },
  {
    name: "TRANSIT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
  },
  {
    name: "Spectranet",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
  },
];

export default function AboutTestimonialSlider() {
  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-8 items-center mb-20">
          {/* Left Content */}
          <div className="w-full lg:w-5/12 space-y-8">
            <div className="flex items-center gap-2 text-[#063022] font-semibold">
              <Leaf className="w-5 h-5 fill-current" />
              <span className="text-sm uppercase tracking-wide">
                Testimonials
              </span>
            </div>

            <Heading2 className="text-[#063022] font-bold text-4xl lg:text-5xl leading-tight">
              Why They Believe <br />
              <span className="inline-flex items-center justify-center w-12 h-12 bg-[#063022] text-[#fcd34d] rounded-full mx-2 align-middle">
                <span className="text-2xl font-serif">❝</span>
              </span>
              In Us
            </Heading2>

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
                <div className="w-8 h-8 rounded-full bg-[#063022] flex items-center justify-center text-[#fcd34d]">
                  <Leaf className="w-4 h-4 fill-current" />
                </div>
                <span className="font-bold text-[#063022]">
                  Positive Reviews
                </span>
              </div>
            </div>

            <div className="pt-4">
              <button className="flex items-center gap-3 px-6 py-4 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all group">
                <div className="w-10 h-10 rounded-full bg-[#fcd34d]/20 text-[#fcd34d] flex items-center justify-center group-hover:bg-[#fcd34d] group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5 fill-current" />
                </div>
                <div className="text-left">
                  <span className="block text-xs text-slate-500 font-medium">
                    Write your honest
                  </span>
                  <span className="flex text-sm font-bold text-[#063022] items-center gap-1">
                    review <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Slider */}
          <div className="w-full lg:w-7/12 relative">
            <div className="w-full max-w-[650px] mx-auto lg:mr-0">
              <Swiper
                effect={"creative"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.2}
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
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {testimonials.map((item) => (
                  <SwiperSlide
                    key={item.id}
                    className="rounded-3xl overflow-hidden shadow-2xl"
                  >
                    <div className="bg-[#063022] flex flex-col md:flex-row h-full md:h-[400px]">
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

                        <div className="flex items-center gap-2 mb-6">
                          <div className="px-3 py-1 rounded-full border border-white/20 text-xs font-semibold bg-white/5">
                            Rating ⭐ {item.rating}.0
                          </div>
                        </div>

                        <p className="text-gray-300 mb-8 leading-relaxed italic">
                          &quot;{item.content}&quot;
                        </p>

                        <div>
                          <h4 className="text-xl font-bold">{item.name}</h4>
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
        <div className="mt-20 lg:mt-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-slate-200 grow"></div>
            <h3 className="text-2xl font-bold text-[#063022]">
              Major Partners
            </h3>
            <div className="h-px bg-slate-200 grow"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="bg-[#063022] rounded-2xl p-6 h-28 flex items-center justify-center hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative w-full h-full">
                  {/* Using text for now as the image shows custom logos that aren't in the provided URLs */}
                  <span className="text-white font-bold text-xl opacity-80 group-hover:opacity-100 transition-opacity">
                    {partner.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-[#fcd34d] text-[#063022] hover:bg-[#063022] hover:text-[#fcd34d] rounded-full px-2 py-2 pl-8 pr-2 font-bold text-sm h-14 flex items-center gap-3 transition-all">
              Become a Partner
              <div className="w-10 h-10 rounded-full bg-[#063022] flex items-center justify-center text-[#fcd34d] group-hover:bg-[#fcd34d] group-hover:text-[#063022]">
                <ArrowRight className="w-5 h-5" />
              </div>
            </Button>
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
      </div>
    </section>
  );
}
