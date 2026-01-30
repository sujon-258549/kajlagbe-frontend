"use client";

import { useState } from "react";
import { ArrowRight, Edit, Wrench } from "lucide-react";
import * as Icons from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Heading1 from "@/components/common/Headings/Heading1";
import Heading5 from "../common/Headings/Heading5";
import AdminOnly from "../common/auth/AdminOnly";
import ServicesModal from "../modal/services/ServicesModal";
import ServiceItemModal from "../modal/services/ServiceItemModal";
import {
  ServicesFormData,
  ServiceItem,
} from "@/schemas/services/services.schema";

const initialServices = [
  {
    title: "Home Repair & Maintenance",
    slug: "home-repair-maintenance",
    iconName: "Wrench",
  },
  {
    title: "Cleaning & Hygiene",
    slug: "cleaning-hygiene",
    iconName: "Sparkles",
  },
  {
    title: "Construction & Renovation",
    slug: "construction-renovation",
    iconName: "Hammer",
  },
  {
    title: "Carpentry, Glass & Metal",
    slug: "carpentry-glass-metal",
    iconName: "Axe",
  },
  {
    title: "Plumbing Services",
    slug: "plumbing-services",
    iconName: "Droplets",
  },
  {
    title: "Electrical Services",
    slug: "electrical-services",
    iconName: "Zap",
  },
  {
    title: "Painting & Decorating",
    slug: "painting-decorating",
    iconName: "Palette",
  },
  {
    title: "Gardening & Landscaping",
    slug: "gardening-landscaping",
    iconName: "Leaf",
  },
  {
    title: "Pest Control",
    slug: "pest-control",
    iconName: "Bug",
  },
  {
    title: "Appliance Repair",
    slug: "appliance-repair",
    iconName: "Settings",
  },
  {
    title: "HVAC Services",
    slug: "hvac-services",
    iconName: "Thermometer",
  },
  {
    title: "Roofing & Gutters",
    slug: "roofing-gutters",
    iconName: "Home",
  },
  {
    title: "Flooring Installation",
    slug: "flooring-installation",
    iconName: "Square",
  },
  {
    title: "Home Security",
    slug: "home-security",
    iconName: "Shield",
  },
  {
    title: "Smart Home Installation",
    slug: "smart-home-installation",
    iconName: "Cpu",
  },
  {
    title: "Moving Services",
    slug: "moving-services",
    iconName: "Truck",
  },
  {
    title: "Junk Removal",
    slug: "junk-removal",
    iconName: "Trash2",
  },
  {
    title: "Window Cleaning",
    slug: "window-cleaning",
    iconName: "Eye",
  },
];

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<ServiceItem | undefined>(
    undefined,
  );

  const [servicesData, setServicesData] = useState<ServicesFormData>({
    sectionTitle: "Our Services",
    sectionDescription:
      "Explore verified professionals across all essential categories — simple, fast, and reliable.",
    sectionBackgroundImage: "",
    services: initialServices,
  });

  const handleUpdate = (data: ServicesFormData) => {
    setServicesData(data);
  };

  const handleEditItem = (e: React.MouseEvent, index: number) => {
    e.preventDefault(); // Prevent link navigation
    e.stopPropagation();
    setEditingIndex(index);
    setEditingItem(servicesData.services[index]);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = (newItem: ServiceItem) => {
    if (editingIndex !== null) {
      const updatedServices = [...servicesData.services];
      updatedServices[editingIndex] = newItem;
      setServicesData({ ...servicesData, services: updatedServices });
    }
    setIsItemModalOpen(false);
    setEditingIndex(null);
    setEditingItem(undefined);
  };

  const getIconComponent = (iconName: string) => {
    return (Icons as any)[iconName] || Wrench;
  };

  return (
    <section className="bg-green-50/30 relative pb-6 pt-3.5 md:py-16 lg:py-24 overflow-hidden group/section">
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
          {/* Note: In a real app we might use Next.js Image here, keeping it as a styled div for simplicity if it's a raw URL */}
          <img
            src={servicesData.sectionBackgroundImage}
            alt=""
            className="w-full h-full object-cover opacity-10"
          />
        </div>
      )}

      <div className="main-container mx-auto px-6 relative z-10">
        <div className="absolute top-0 right-0 z-50">
          <AdminOnly>
            <button
              onClick={() => setIsModalOpen(true)}
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
          {servicesData.services.map((service, index) => {
            const IconComp = getIconComponent(service.iconName);
            return (
              <Link
                key={index} // Changed index as key to avoid issues if slug changes temporarily (though slug is preferred if stable)
                href={`/services/${service.slug}`}
                className="group relative h-[180px] w-full overflow-hidden rounded-xl bg-secondary border border-white/10 transition-colors"
              >
                {/* Edit Button for Item */}
                <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <AdminOnly>
                    <button
                      onClick={(e) => handleEditItem(e, index)}
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
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10" />
                </div>

                {/* Top Bar: Icon Left */}
                <div className="absolute top-3 left-3 z-20">
                  <div className="h-8 w-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary">
                    <IconComp className="h-5 w-5" />
                  </div>
                </div>

                {/* Bottom Content: Title & CTA */}
                <div className="absolute inset-x-0 bottom-0 z-20 p-3 flex flex-col gap-2">
                  <Heading5 className="text-white text-base font-bold leading-tight line-clamp-2">
                    {service.title}
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
            );
          })}
        </div>
      </div>
      <ServicesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={servicesData}
        onUpdate={handleUpdate}
      />

      <ServiceItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
      />
    </section>
  );
}
