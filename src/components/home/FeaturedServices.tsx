"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import CustomImage from "../common/CustomImage";
import Heading3 from "../common/Headings/Heading3";
import Heading5 from "../common/Headings/Heading5";
import AdminOnly from "../common/auth/AdminOnly";
import { Edit, ArrowRight, Sparkles } from "lucide-react";
import FeaturedServicesModal from "../modal/home/FeaturedServicesModal";
import { FeaturedServicesFormData } from "@/schemas/home/featuredServices.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { motion } from "motion/react";
import Link from "next/link";
interface ServiceItem {
  title: string;
  description: string;
  image: string;
  imageId?: string;
  link: string;
}

const initialFeatured: ServiceItem[] = [
  {
    title: "Custom T-Shirt Printing",
    description: "High-quality custom printing services.",
    image:
      "https://img.freepik.com/free-photo/colorful-t-shirts-arrangement_23-2149074824.jpg",
    link: "#",
  },
  {
    title: "Business Card Design",
    description: "Creative business card designs.",
    image:
      "https://img.freepik.com/free-photo/business-card-mockup_53876-94088.jpg",
    link: "#",
  },
  {
    title: "Personalized Mugs",
    description: "Quality, personalized products for your needs.",
    image:
      "https://img.freepik.com/free-photo/mockup-mugs-arrangement_23-2149139285.jpg",
    link: "#",
  },
  {
    title: "Premium Water Bottles",
    description: "Quality, personalized products for your needs.",
    image:
      "https://img.freepik.com/free-photo/water-bottles-mockup_53876-95315.jpg",
    link: "#",
  },
  {
    title: "Apparel & Hoodies",
    description: "Quality, personalized products for your needs.",
    image:
      "https://img.freepik.com/free-photo/hoodies-arranged_23-2149140501.jpg",
    link: "#",
  },
  {
    title: "Customized Notebooks",
    description: "Quality, personalized products for your needs.",
    image:
      "https://img.freepik.com/free-photo/notebook-mockup-arrangement_53876-94051.jpg",
    link: "#",
  },
];

export default function FeaturedServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [settingName, setSettingName] = useState("Featured Services");
  const [data, setData] = useState<FeaturedServicesFormData>({
    tagline: "Features",
    mainTitle: "Premier One-Stop Custom Print Solutions",
    mainDescription:
      "We provide top-quality personalized products with creative designs to make your brand stand out.",
    buttonText: "View All Services",
    showcase: initialFeatured,
  });

  useEffect(() => {
    const fetchFeaturedData = async () => {
      const res = await getSettingsMap("home");
      if (res.success && res.data.home_featured_services) {
        setData(res.data.home_featured_services.value);
        if (res.data.home_featured_services.name) {
          setSettingName(res.data.home_featured_services.name);
        }
      }
      setIsLoading(false);
    };
    fetchFeaturedData();
  }, []);

  const handleUpdate = async (
    newData: FeaturedServicesFormData,
    newName?: string
  ) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "home_featured_services",
        value: newData,
        group: "home",
        description: "Homepage Featured Services Settings",
        name: newName || settingName,
      });
      if (res.success) {
        setData(newData);
        if (newName) setSettingName(newName);
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as any },
    },
  };

  return (
    <section className="py-20 md:py-32 bg-[#fafafa] group/section relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -ml-64 -mb-64 pointer-events-none" />

      <div className="main-container mx-auto px-4 md:px-6 relative">
        <AdminOnly>
          <button
            onClick={() => setIsModalOpen(true)}
            className="absolute -top-10 right-4 md:right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-secondary opacity-0 group-hover/section:opacity-100 group-hover/section:top-0 transition-all duration-500 hover:bg-secondary hover:text-white shadow-xl"
            title="Edit Featured"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="h-[450px] bg-slate-100 rounded-[2.5rem] animate-pulse" />
            <div className="h-[450px] bg-slate-100 rounded-[2.5rem] animate-pulse" />
            <div className="md:col-span-2 h-[450px] bg-slate-100 rounded-[2.5rem] animate-pulse" />
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-[450px] bg-slate-100 rounded-[2.5rem] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 auto-rows-fr"
          >
            {/* Slot 1 */}
            <ServiceCard service={data.showcase[0]} variants={itemVariants} />

            {/* Slot 2 */}
            <ServiceCard service={data.showcase[1]} variants={itemVariants} />

            {/* Slot 3-4 Header Block */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 bg-white rounded-[2.5rem] p-10 lg:p-14 flex flex-col justify-center space-y-6 border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group/header"
            >
              {/* Decorative Accent */}
              <div className="absolute top-0 right-0 p-8">
                <Sparkles className="w-12 h-12 text-secondary/10 group-hover/header:rotate-12 transition-transform duration-500" />
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-[1px] bg-primary" />
                  <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs">
                    {data.tagline}
                  </span>
                </div>
                <Heading3 className="font-bold leading-[1.1] text-3xl md:text-4xl lg:text-5xl text-slate-900 mb-6">
                  {data.mainTitle}
                </Heading3>
                <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-lg mb-8">
                  {data.mainDescription}
                </p>
                <div>
                  <Button
                    size="lg"
                    className="rounded-full px-10 h-14 bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/30 group/btn"
                  >
                    {data.buttonText}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </div>
              </div>

              {/* Grid Pattern Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <svg width="100%" height="100%">
                  <pattern
                    id="grid-header"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid-header)" />
                </svg>
              </div>
            </motion.div>

            {/* Remaining slots */}
            {data.showcase.slice(2).map((service, index) => (
              <ServiceCard
                key={index + 2}
                service={service}
                variants={itemVariants}
              />
            ))}
          </motion.div>
        )}
      </div>

      <FeaturedServicesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={(newData, newName) => {
          if (newName) setSettingName(newName);
          handleUpdate(newData, newName);
        }}
        isLoading={isUpdating}
        settingName={settingName}
        settingKey="home_featured_services"
      />
    </section>
  );
}


interface ServiceCardProps {
  service: ServiceItem;
  variants: any; // motion variants are often typed as any or specific motion types
}

function ServiceCard({ service, variants }: ServiceCardProps) {
  if (!service) return null;

  return (
    <motion.div
      variants={variants}
      whileHover={{ y: -12 }}
      className="relative group h-[450px] rounded-[2.5rem] overflow-hidden bg-slate-900 border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      <Link href={service.link || "#"} className="block w-full h-full">
        <CustomImage
          src={service.image}
          alt={service.title}
          fill
          wrapperClassName="w-full h-full"
          className="object-cover opacity-90 transition-all duration-1000 group-hover:scale-110 group-hover:opacity-100"
        />

        {/* Modern Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/100 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
          <div className="transform transition-all duration-500 group-hover:translate-y-[-10px]">
            <div className="overflow-hidden mb-4">
              <div className="w-12 h-1 bg-primary rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </div>

            <Heading5 className="text-white font-bold text-2xl lg:text-3xl mb-3 leading-tight">
              {service.title}
            </Heading5>

            <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
              <div className="overflow-hidden">
                <p className="text-white/70 text-sm md:text-base leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 pb-2">
                  {service.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
              Learn More
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </div>
      </Link>

      {/* Hover border glow */}
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/20 rounded-[2.5rem] transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
}
