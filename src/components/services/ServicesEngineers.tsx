"use client";

import { useState } from "react";
import { ArrowRight, Share2, Lightbulb, Edit } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import { Button } from "../ui/button";
import AdminOnly from "../common/auth/AdminOnly";
import ServiceEngineerItemModal from "../modal/services/ServiceEngineerItemModal";
import ServicesEngineersSectionModal, {
  EngineersSectionFormData,
} from "../modal/services/ServicesEngineersSectionModal";
import { ServiceEngineerItem } from "@/schemas/services/engineers.schema";

const initialEngineers = [
  {
    id: 1,
    name: "Penelope Miller",
    role: "Team Manager",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 2,
    name: "Denial Pasha",
    role: "Team Manager",
    image:
      "https://images.unsplash.com/photo-1573496359-7013acad27dc?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 3,
    name: "Joshua Sendu",
    role: "CEO-Founder",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 4,
    name: "John Maxwell",
    role: "Co-Founder",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    role: "Senior Engineer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: 6,
    name: "Michael Chen",
    role: "Project Lead",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
  },
];

export default function ServicesEngineers() {
  const [engineers, setEngineers] =
    useState<ServiceEngineerItem[]>(initialEngineers);
  const [sectionData, setSectionData] = useState<EngineersSectionFormData>({
    tagline: "Econest Workers",
    title: "Our Professionals Engineers",
    exploreText: "Explore More",
  });

  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<
    ServiceEngineerItem | undefined
  >(undefined);

  const handleEditItem = (item: ServiceEngineerItem) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = (data: ServiceEngineerItem) => {
    if (editingItem) {
      setEngineers((prev) =>
        prev.map((item) => (item.id === editingItem.id ? data : item)),
      );
    }
    setIsItemModalOpen(false);
  };

  const handleSectionUpdate = (data: EngineersSectionFormData) => {
    setSectionData(data);
  };

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-white overflow-hidden relative group/section">
      <div className="main-container relative">
        <AdminOnly>
          <button
            onClick={() => setIsSectionModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
            title="Edit Section Details"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-start">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 relative text-center lg:text-left sticky top-24 group/left-content">
            {/* Decorative Dotted Arrow (SVG representation) */}
            <div className="absolute -top-40 -left-10 w-40 h-40 pointer-events-none hidden lg:block opacity-50">
              <svg
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-[#063022]"
              >
                <path
                  d="M20 180 C 20 100, 100 20, 180 20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />
                <path
                  d="M170 15 L 180 20 L 170 25"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-slate-500 font-medium mb-4">
              <Lightbulb className="w-5 h-5 text-[#fbbf24]" />
              <span className="uppercase tracking-wider text-sm">
                {sectionData.tagline}
              </span>
            </div>

            <Heading2 className="text-[#063022] mb-8 leading-tight">
              {sectionData.title}
            </Heading2>

            <Button size="xl" className="mx-auto lg:mx-0 hidden lg:flex">
              {sectionData.exploreText || "Explore More"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Right Grid */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {engineers.map((item) => (
                <div
                  key={item.id}
                  className="bg-secondary border border-white rounded-lg p-3 group text-center relative transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-4">
                    <CustomImage
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Share Icon */}
                    <div className="absolute top-3 right-3 w-8 h-8 bg-[#fbbf24] rounded-full flex items-center justify-center cursor-pointer hover:bg-white transition-colors z-20">
                      <Share2 className="w-4 h-4 text-[#063022]" />
                    </div>

                    {/* Edit Button */}
                    <AdminOnly>
                      <button
                        onClick={() => handleEditItem(item)}
                        className="absolute top-3 right-14 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 text-secondary opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-white shadow-md"
                        title="Edit Engineer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </AdminOnly>
                  </div>

                  <div className="pb-2">
                    <h3 className="text-white text-lg font-bold mb-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 text-xs">{item.role}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 lg:hidden flex justify-center">
              <Button size="xl">
                {sectionData.exploreText || "Explore More"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ServicesEngineersSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => setIsSectionModalOpen(false)}
        initialData={sectionData}
        onUpdate={handleSectionUpdate}
      />

      <ServiceEngineerItemModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
      />
    </section>
  );
}
