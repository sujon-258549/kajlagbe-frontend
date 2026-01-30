"use client";

import { Button } from "@/components/ui/button";
import CustomImage from "../common/CustomImage";
import Heading3 from "../common/Headings/Heading3";
import Heading5 from "../common/Headings/Heading5";

const featured = [
  {
    title: "Custom T-Shirt Printing",
    image:
      "https://img.freepik.com/free-photo/colorful-t-shirts-arrangement_23-2149074824.jpg",
  },
  {
    title: "Business Card Design",
    image:
      "https://img.freepik.com/free-photo/business-card-mockup_53876-94088.jpg",
  },
  {
    title: "Personalized Mugs",
    image:
      "https://img.freepik.com/free-photo/mockup-mugs-arrangement_23-2149139285.jpg",
  },
  {
    title: "Premium Water Bottles",
    image:
      "https://img.freepik.com/free-photo/water-bottles-mockup_53876-95315.jpg",
  },
  {
    title: "Apparel & Hoodies",
    image:
      "https://img.freepik.com/free-photo/hoodies-arranged_23-2149140501.jpg",
  },
  {
    title: "Customized Notebooks",
    image:
      "https://img.freepik.com/free-photo/notebook-mockup-arrangement_53876-94051.jpg",
  },
];

export default function FeaturedServices() {
  return (
    <section className="py-10 md:py-16 lg:py-24 bg-white">
      <div className="main-container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Slot 1 */}
          <div className="relative group h-[250px] md:h-full rounded-2xl overflow-hidden border border-slate-200">
            <CustomImage
              src={featured[0].image}
              alt={featured[0].title}
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
                {featured[0].title}
              </Heading5>
              <p className="text-gray-200 text-sm mt-2">
                High-quality custom printing services.
              </p>
            </div>
          </div>

          {/* Slot 2 */}
          <div className="relative group h-[250px] md:h-full rounded-2xl overflow-hidden border border-slate-200">
            <CustomImage
              src={featured[1].image}
              alt={featured[1].title}
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
                {featured[1].title}
              </Heading5>
              <p className="text-gray-200 text-sm mt-2">
                Creative business card designs.
              </p>
            </div>
          </div>

          {/* Slot 3-4 Header Block */}
          <div className="md:col-span-2 bg-[#fdfdfd] rounded-2xl p-8 lg:p-12 flex flex-col justify-center space-y-6 border-2 border-dashed border-secondary">
            <span className="text-[#ff4d1c] font-serif italic text-2xl">
              Features
            </span>
            <Heading3 className=" font-bold  leading-[1.1] text-2xl md:text-4xl lg:text-5xl">
              Premier One-Stop <br className="hidden md:block" />
              Custom Print Solutions
            </Heading3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md">
              We provide top-quality personalized products with creative designs
              to make your brand stand out.
            </p>
            <div>
              <Button className="rounded-md shadow-lg shadow-primary/20">
                View All Services
              </Button>
            </div>
          </div>

          {/* Remaining slots */}
          {featured.slice(2).map((service, index) => (
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
                  Quality, personalized products for your needs.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
