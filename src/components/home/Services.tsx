"use client";

import { useState } from "react";
import { ArrowRight, Edit } from "lucide-react";
import Link from "next/link";
import Heading1 from "@/components/common/Headings/Heading1";
import Heading5 from "../common/Headings/Heading5";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesHeaderModal from "../modal/services/ServicesHeaderModal";
import ServiceItemModal from "../modal/services/ServiceItemModal";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { useEffect } from "react";
import { ServicesHeaderFormData } from "@/schemas/services/services.schema";
import { getAllSubCategory } from "@/actions/subCategory.actions";
import { getAllCategory } from "@/actions/category.actions";
import { TSubCategory } from "@/types/subCategory";
import { TCategory } from "@/types/category";
import SubCategoryModal from "../modal/category/SubCategoryModal";

export default function Services() {
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingSubCategory, setEditingSubCategory] = useState<TSubCategory | null>(null);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [subCategories, setSubCategories] = useState<TSubCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const [servicesData, setServicesData] = useState<ServicesHeaderFormData>({
    sectionTitle: "Our Services",
    sectionDescription:
      "Explore verified professionals across all essential categories — simple, fast, and reliable.",
    sectionBackgroundImage: "",
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [settingsRes, subCatRes, catRes] = await Promise.all([
        getSettingsMap("home"),
        getAllSubCategory(),
        getAllCategory(),
      ]);

      if (settingsRes.success && settingsRes.data.home_services) {
        // We only take the header parts from the setting
        const val = settingsRes.data.home_services.value;
        setServicesData({
          sectionTitle: val.sectionTitle || "Our Services",
          sectionDescription: val.sectionDescription || "",
          sectionBackgroundImage: val.sectionBackgroundImage || "",
        });
      }

      if (subCatRes.success) {
        setSubCategories(subCatRes.data);
      }

      if (catRes.success) {
        setCategories(catRes.data);
      }
    } catch (error) {
      console.error("Error fetching services data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateHeader = async (data: ServicesHeaderFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "home_services",
        value: data, // Now we only save the header
        group: "home",
        description: "Homepage Services Section Settings",
      });
      if (res.success) {
        setServicesData(data);
        setIsHeaderModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEditItem = (e: React.MouseEvent, subCat: TSubCategory) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingSubCategory(subCat);
    setIsItemModalOpen(true);
  };

  return (
    <section className="bg-green-50/30 relative py-6 md:py-8 lg:py-12 overflow-hidden group/section">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Optional Section Background Image Only if provided */}
      {servicesData.sectionBackgroundImage && (
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img
            src={servicesData.sectionBackgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
        </div>
      )}

      <div className="main-container mx-auto px-6 relative z-10">
        <div className="absolute top-0 right-6 z-50">
          <AdminOnly>
            <button
              onClick={() => setIsHeaderModalOpen(true)}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-secondary text-white opacity-0 group-hover/section:opacity-100 transition-all hover:scale-110 hover:bg-primary shadow-lg"
              title="Edit Section"
            >
              <Edit className="w-5 h-5" />
            </button>
          </AdminOnly>
        </div>

        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-8 md:mb-16 space-y-4">
          <Heading1 className="font-bold text-slate-900 leading-tight">
            {servicesData.sectionTitle}
          </Heading1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal">
            {servicesData.sectionDescription}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <AdminOnly>
            <button
              onClick={() => {
                setEditingSubCategory(null);
                setIsItemModalOpen(true);
              }}
              className="group relative h-[180px] w-full overflow-hidden rounded-xl border-2 border-dashed border-secondary/30 flex flex-col items-center justify-center gap-3 hover:border-secondary transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <ArrowRight className="w-6 h-6 rotate-[-45deg]" />
              </div>
              <span className="font-semibold text-secondary">Add New Service</span>
            </button>
          </AdminOnly>

          {subCategories.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group relative h-[180px] w-full overflow-hidden rounded-xl bg-secondary border border-white/10 transition-colors"
            >
              {/* Edit Button for Item */}
              <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <AdminOnly>
                  <button
                    onClick={(e) => handleEditItem(e, service)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white text-white hover:text-secondary backdrop-blur-md transition-all shadow-lg"
                    title="Edit Service"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </AdminOnly>
              </div>

              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 z-0 bg-secondary" />
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10" />
              </div>

              {/* Top Bar: Icon Left */}
              <div className="absolute top-3 left-3 z-20">
                <div className="h-8 w-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary">
                  {service.icon ? (
                    <i className={`${service.icon} text-lg`} />
                  ) : (
                    <ArrowRight className="h-4 w-4" />
                  )}
                </div>
              </div>

              {/* Bottom Content: Title & CTA */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-3 flex flex-col gap-2">
                <Heading5 className="text-white line-clamp-2">
                  {service.name}
                </Heading5>

                <div className="w-full h-px bg-white/20" />

                <div className="flex items-center justify-between text-xs font-medium text-white/90">
                  <span>Explore</span>
                  <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <ServicesHeaderModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        initialData={{
          sectionTitle: servicesData.sectionTitle,
          sectionDescription: servicesData.sectionDescription,
          sectionBackgroundImage: servicesData.sectionBackgroundImage,
        }}
        onUpdate={handleUpdateHeader}
        isLoading={isUpdating}
      />

      <SubCategoryModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setEditingSubCategory(null);
        }}
        initialData={editingSubCategory}
        categories={categories}
        onSuccess={fetchData}
      />
    </section>
  );
}
