"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";
import CustomImage from "../common/CustomImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import Heading3 from "../common/Headings/Heading3";

const testimonials = [
  {
    id: 1,
    name: "Pete Goldner",
    role: "Client",
    content:
      "It vinyl distillery trade raw. Asymmetrical lyft shaman vaporware street affogato. Mi marfa vibecession pug offal.",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Rebecca Hawland",
    role: "Client",
    content:
      "Great response time, staff was on time and got the job done pretty quickly. House looked great when they finished.",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "John Doe",
    role: "Home Owner",
    content:
      "The quality of work was exceptional. They exceeded my expectations in every way possible. Highly professional team.",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
    rating: 4.9,
  },
];

export default function TestimonialSection() {
  return (
    <section className="py-10 md:py-16 bg-white overflow-hidden">
      <div className="main-container">
        <div className="bg-secondary rounded-2xl md:rounded-2xl overflow-hidden flex flex-col lg:flex-row relative min-h-[600px] lg:h-[700px] shadow-2xl">
          {/* Glossy Spheres (Reference Image Matched) */}
          <div className="absolute top-[8%] left-[40%] w-24 h-24 rounded-full z-0 opacity-40 bg-radial-[at_30%_30%,_rgba(255,255,255,0.4)_0%,_rgba(255,255,255,0)_70%] border border-white/10 backdrop-blur-sm animate-pulse"></div>
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full z-0 opacity-30 bg-radial-[at_30%_30%,_rgba(255,255,255,0.3)_0%,_rgba(255,255,255,0)_70%] border border-white/5 backdrop-blur-md"></div>
          <div className="absolute top-[10%] left-[5%] w-12 h-12 bg-white/5 rounded-full blur-[2px]"></div>

          {/* Left Content Column */}
          <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center space-y-10 z-10 relative">
            <div className="space-y-4">
              <span className="text-white/90 font-medium italic text-xl md:text-2xl block font-serif tracking-tight">
                Testimonials
              </span>
              <Heading3 className="text-white">What Our Clients Think</Heading3>

              {/* Google Rating Badge */}
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full w-fit">
                <div className="bg-white p-1 rounded-full shadow-lg">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i < 5 ? "fill-[#FBBC05] text-[#FBBC05]" : "text-white/30"}`}
                    />
                  ))}
                </div>
                <span className="text-white font-bold text-xs">4.7</span>
              </div>
            </div>

            {/* Testimonial Swiper Slider */}
            <div className="w-full max-w-full">
              <Swiper
                modules={[Autoplay, Pagination]}
                spaceBetween={20}
                slidesPerView={1.2}
                loop={true}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                  bulletClass: "testimonial-bullet",
                  bulletActiveClass: "testimonial-bullet-active",
                }}
                breakpoints={{
                  640: {
                    slidesPerView: 1.5,
                  },
                }}
                className="testimonial-swiper !overflow-visible"
              >
                {testimonials.map((testimonial) => (
                  <SwiperSlide key={testimonial.id}>
                    <div className="bg-[#F8FBF8] rounded-[2rem] p-8 md:p-10 space-y-6 shadow-xl h-full border border-white/50">
                      <Quote className="w-8 h-8 text-[#FF9800] fill-[#FF9800]" />

                      <p className="text-slate-600 text-base md:text-[17px] leading-relaxed font-medium line-clamp-4">
                        {testimonial.content}
                      </p>

                      <div className="flex items-center gap-4 pt-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden shadow-inner relative">
                          <CustomImage
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-[15px]">
                            {testimonial.name}
                          </div>
                          <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="hidden lg:block w-1/2 relative h-full">
            <div className="absolute inset-5 rounded-[3rem] overflow-hidden group">
              <div className="absolute inset-0 bg-secondary/5 z-10 transition-colors duration-500 group-hover:bg-transparent"></div>
              <Image
                src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
                alt="Happy customer using service"
                fill
                priority
                className="object-cover transition-transform duration-[3s] group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .testimonial-swiper {
          padding-bottom: 50px !important;
        }
        .testimonial-bullet {
          width: 8px;
          height: 8px;
          display: inline-block;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.3);
          margin: 0 5px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .testimonial-bullet-active {
          width: 24px;
          background: white;
        }
      `}</style>
    </section>
  );
}
