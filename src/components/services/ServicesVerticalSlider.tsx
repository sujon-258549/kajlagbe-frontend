"use client";

import { useState } from "react";
import { ArrowRight, Plus, Edit } from "lucide-react";
import Heading3 from "../common/Headings/Heading3";
import { Button } from "../ui/button";
import AdminOnly from "../common/auth/AdminOnly";
import ServiceSliderItemModal from "../modal/services/ServiceSliderItemModal";
import ServicesSliderHeaderModal from "../modal/services/ServicesSliderHeaderModal";
import {
  ServiceSliderItem,
  ServiceSliderFormData,
  ServiceSliderHeaderFormData,
} from "@/schemas/services/slider.schema";

const initialProjects = [
  {
    id: 1,
    category: "Eco Friendly",
    title: "Environment For Best People",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7e?auto=format&fit=crop&q=80&w=1200",
    number: "01",
  },
  {
    id: 2,
    category: "Green Energy",
    title: "Eco Friendly Global System",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200",
    number: "02",
  },
  {
    id: 3,
    category: "Recycling",
    title: "The Power of Energy",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200",
    number: "03",
  },
];

export default function ServicesVerticalSlider() {
  const [data, setData] = useState<ServiceSliderFormData>({
    title: "Our Latest Projects",
    projects: initialProjects,
  });

  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServiceSliderItem | undefined>(
    undefined,
  );

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsItemModalOpen(true);
  };

  const handleEditItem = (item: ServiceSliderItem) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = (updatedItem: ServiceSliderItem) => {
    if (editingItem) {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.map((item) =>
          item.id === editingItem.id ? updatedItem : item,
        ),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        projects: [...prev.projects, { ...updatedItem, id: Date.now() }],
      }));
    }
    setIsItemModalOpen(false);
  };

  const handleDeleteItem = () => {
    if (editingItem) {
      setData((prev) => ({
        ...prev,
        projects: prev.projects.filter((item) => item.id !== editingItem.id),
      }));
      setIsItemModalOpen(false);
    }
  };

  const handleUpdateHeader = (headerData: ServiceSliderHeaderFormData) => {
    setData((prev) => ({ ...prev, ...headerData }));
  };

  return (
    <section className="bg-white pt-6 pb-12 md:py-16 lg:pt-6 lg:pb-24 mb-0 group/section relative">
      <div className="main-container px-4 md:px-6 relative">
        <AdminOnly>
          <button
            onClick={() => setIsHeaderModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
            title="Edit Header"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="flex justify-between items-center mb-8">
          <Heading3 className="text-2xl font-bold text-secondary">
            {data.title}
          </Heading3>
          <AdminOnly>
            <Button
              onClick={handleAddItem}
              className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold"
            >
              <Plus className="w-4 h-4" /> Add Project
            </Button>
          </AdminOnly>
        </div>

        {/* Sticky Container */}
        <div className="flex flex-col gap-10">
          {data.projects.map((item, index) => (
            <div
              key={item.id}
              className="sticky top-20 md:top-32 w-full group/card"
              style={{ zIndex: index + 1 }}
            >
              <div className="bg-secondary border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[450px] md:h-[300px] lg:h-[350px] relative ">
                <AdminOnly>
                  <button
                    onClick={() => handleEditItem(item)}
                    className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white text-secondary opacity-0 group-hover/card:opacity-100 transition-all hover:bg-white hover:text-secondary shadow-lg"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </AdminOnly>

                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden group/img">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-secondary/10 group-hover/img:bg-transparent transition-colors duration-500" />
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="flex items-center gap-3 mb-4 text-[#ffffff]/70">
                    <div className="h-px w-8 bg-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest ">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-8 leading-tight">
                    {item.title}
                  </h3>

                  <button className="flex items-center group/btn w-fit">
                    <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-secondary transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                    <span className="ml-4 text-white font-bold text-sm tracking-wide opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-500">
                      LEARN MORE
                    </span>
                  </button>

                  {/* Background Number */}
                  <div className="absolute bottom-2 right-6 text-[#ffffff]/5 text-6xl md:text-8xl font-black select-none pointer-events-none">
                    {item.number}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServicesSliderHeaderModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        initialData={{ title: data.title }}
        onUpdate={handleUpdateHeader}
      />

      <ServiceSliderItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />
    </section>
  );
}
