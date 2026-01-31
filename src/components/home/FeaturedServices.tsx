import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomImage from "../common/CustomImage";
import Heading3 from "../common/Headings/Heading3";
import Heading5 from "../common/Headings/Heading5";
import AdminOnly from "../common/auth/AdminOnly";
import { Edit } from "lucide-react";
import FeaturedServicesModal from "../modal/home/FeaturedServicesModal";
import { FeaturedServicesFormData } from "@/schemas/home/featuredServices.schema";

const initialFeatured = [
  {
    title: "Custom T-Shirt Printing",
    description: "High-quality custom printing services.",
    image:
      "https://img.freepik.com/free-photo/colorful-t-shirts-arrangement_23-2149074824.jpg",
  },
  {
    title: "Business Card Design",
    description: "Creative business card designs.",
    image:
      "https://img.freepik.com/free-photo/business-card-mockup_53876-94088.jpg",
  },
  {
    title: "Personalized Mugs",
    description: "Quality, personalized products for your needs.",
    image:
      "https://img.freepik.com/free-photo/mockup-mugs-arrangement_23-2149139285.jpg",
  },
  {
    title: "Premium Water Bottles",
    description: "Quality, personalized products for your needs.",
    image:
      "https://img.freepik.com/free-photo/water-bottles-mockup_53876-95315.jpg",
  },
  {
    title: "Apparel & Hoodies",
    description: "Quality, personalized products for your needs.",
    image:
      "https://img.freepik.com/free-photo/hoodies-arranged_23-2149140501.jpg",
  },
  {
    title: "Customized Notebooks",
    description: "Quality, personalized products for your needs.",
    image:
      "https://img.freepik.com/free-photo/notebook-mockup-arrangement_53876-94051.jpg",
  },
];

export default function FeaturedServices() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<FeaturedServicesFormData>({
    tagline: "Features",
    mainTitle: "Premier One-Stop Custom Print Solutions",
    mainDescription:
      "We provide top-quality personalized products with creative designs to make your brand stand out.",
    buttonText: "View All Services",
    showcase: initialFeatured,
  });

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-white group/section relative">
      <AdminOnly>
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white"
          title="Edit Featured"
        >
          <Edit className="w-3.5 h-3.5" />
        </button>
      </AdminOnly>

      <div className="main-container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Slot 1 */}
          <div className="relative group h-[250px] md:h-full rounded-2xl overflow-hidden border border-slate-200">
            <CustomImage
              src={data.showcase[0].image}
              alt={data.showcase[0].title}
              fill
              wrapperClassName="w-full h-full"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 flex flex-col justify-center items-center text-center p-4
                            bg-black/20 backdrop-blur-sm opacity-100 md:opacity-0 group-hover:opacity-100
                            transition-all duration-300"
            >
              <Heading5 className="text-white font-bold text-lg">
                {data.showcase[0].title}
              </Heading5>
              <p className="text-gray-200 text-sm mt-2">
                {data.showcase[0].description}
              </p>
            </div>
          </div>

          {/* Slot 2 */}
          <div className="relative group h-[250px] md:h-full rounded-2xl overflow-hidden border border-slate-200">
            <CustomImage
              src={data.showcase[1].image}
              alt={data.showcase[1].title}
              fill
              wrapperClassName="w-full h-full"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div
              className="absolute inset-0 flex flex-col justify-center items-center text-center p-4
                            bg-black/20 backdrop-blur-sm opacity-100 md:opacity-0 group-hover:opacity-100
                            transition-all duration-300"
            >
              <Heading5 className="text-white font-bold text-lg">
                {data.showcase[1].title}
              </Heading5>
              <p className="text-gray-200 text-sm mt-2">
                {data.showcase[1].description}
              </p>
            </div>
          </div>

          {/* Slot 3-4 Header Block */}
          <div className="md:col-span-2 bg-[#fdfdfd] rounded-2xl p-8 lg:p-12 flex flex-col justify-center space-y-6 border-2 border-dashed border-secondary">
            <span className="text-[#ff4d1c] font-serif italic text-2xl">
              {data.tagline}
            </span>
            <Heading3 className=" font-bold  leading-[1.1] text-2xl md:text-4xl lg:text-5xl">
              {data.mainTitle}
            </Heading3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              {data.mainDescription}
            </p>
            <div>
              <Button className="rounded-md shadow-lg shadow-primary/20">
                {data.buttonText}
              </Button>
            </div>
          </div>

          {/* Remaining slots */}
          {data.showcase.slice(2).map((service, index) => (
            <div
              key={index}
              className="relative group h-[250px] md:h-[350px] lg:h-full rounded-2xl overflow-hidden border border-slate-200"
            >
              <CustomImage
                src={service.image}
                alt={service.title}
                fill
                wrapperClassName="w-full h-full"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div
                className="absolute inset-0 flex flex-col justify-center items-center text-center p-4
                              bg-black/20 backdrop-blur-sm opacity-100 md:opacity-0 group-hover:opacity-100
                              transition-all duration-300"
              >
                <Heading5 className="text-white font-bold text-lg">
                  {service.title}
                </Heading5>
                <p className="text-gray-200 text-sm mt-2">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <FeaturedServicesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={data}
        onUpdate={(newData: FeaturedServicesFormData) => setData(newData)}
      />
    </section>
  );
}
