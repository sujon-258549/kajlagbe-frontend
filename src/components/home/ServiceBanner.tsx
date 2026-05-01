"use client";

import CustomImage from "../common/CustomImage";
import Heading5 from "../common/Headings/Heading5";
import { ChevronLeft, ChevronRight, Edit, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import AdminOnly from "../common/auth/AdminOnly";
import { getAllCategory } from "@/actions/category.actions";
import { TCategory } from "@/types/category";
import CategoryModal from "../modal/category/CategoryModal";

export default function ServiceBanner() {
  const swiperRef = useRef<SwiperType>(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<TCategory | null>(null);
  const [categories, setCategories] = useState<TCategory[]>([]);

  const [refetchKey, setRefetchKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const catRes = await getAllCategory();
        if (!cancelled && catRes.success) {
          setCategories(catRes.data);
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [refetchKey]);

  const handleCategorySuccess = () => {
    setRefetchKey((k) => k + 1);
  };


  return (
    <section className="py-10 md:py-16 lg:py-24 bg-[#F9F8F3] overflow-hidden group/section relative">
      <AdminOnly>
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-30 flex gap-2 opacity-0 -translate-y-2 pointer-events-none group-hover/section:opacity-100 group-hover/section:translate-y-0 group-hover/section:pointer-events-auto transition-all duration-300 ease-out">
          <button
            onClick={() => {
              setEditingCategory(null);
              setIsCategoryModalOpen(true);
            }}
            className="px-4 py-2 flex items-center justify-center gap-2 rounded-full bg-white/95 backdrop-blur-sm border border-slate-200 text-secondary shadow-sm hover:bg-secondary hover:text-white hover:border-secondary hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            title="Add Category"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            <span className="text-xs font-bold uppercase tracking-wider">Add Category</span>
          </button>
        </div>
      </AdminOnly>
      <div className="main-container">
        <div className="relative">
          {/* Controls - Left */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-slate-200 items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 z-20 bg-white shadow-md hover:shadow-lg"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Main Slider main-container */}
          <div className="bg-white rounded-2xl px-12 md:px-16 py-5 md:py-7 border border-slate-200/80 w-full overflow-hidden relative shadow-sm hover:shadow-md transition-shadow duration-300">
            <Swiper
              modules={[Navigation, Autoplay]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              spaceBetween={24}
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
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                },
              }}
              className="w-full"
            >
              {categories.map((cat, i) => (
                <SwiperSlide key={cat.id || i}>
                  <div className="flex items-center gap-4 group/card relative p-2 rounded-xl hover:bg-slate-50/70 transition-colors duration-300 cursor-pointer">
                    {/* Edit Button */}
                    <AdminOnly>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setEditingCategory(cat);
                          setIsCategoryModalOpen(true);
                        }}
                        className="absolute -top-1 -right-1 z-20 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-secondary/15 text-secondary opacity-0 group-hover/card:opacity-100 transition-all duration-200 hover:bg-secondary hover:text-white hover:border-secondary shadow-md"
                        title="Edit Category"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </AdminOnly>

                    {/* Square Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50 relative">
                      <CustomImage
                        src={cat.url || ""}
                        alt={cat.name}
                        fill
                        className="object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <Heading5 className="text-base md:text-lg font-bold text-secondary leading-snug line-clamp-2 group-hover/card:text-primary transition-colors duration-200">
                        {cat.name}
                      </Heading5>
                      <span className="text-primary text-xs md:text-sm font-semibold inline-flex items-center gap-1 group-hover/card:gap-2 transition-all duration-200">
                        Book Now
                        <ChevronRight className="w-3.5 h-3.5" />
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
            className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-slate-200 items-center justify-center text-secondary hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 z-20 bg-white shadow-md hover:shadow-lg"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

  

      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => {
          setIsCategoryModalOpen(false);
          setEditingCategory(null);
        }}
        initialData={editingCategory}
        onSuccess={handleCategorySuccess}
      />
    </section>
  );
}
