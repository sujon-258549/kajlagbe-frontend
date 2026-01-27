import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import Heading2 from "@/components/common/Headings/Heading2";
import Heading3 from "@/components/common/Headings/Heading3";

const products = [
  {
    title: "Fresh Pantry Staples",
    image: "https://placehold.co/400x400/154d2e/FFFFFF/png?text=Pantry",
    description: "Essential items for every kitchen, sourced with care.",
  },
  {
    title: "Cold-Pressed Oils",
    image: "https://placehold.co/400x400/154d2e/FFFFFF/png?text=Oils",
    description: "Retaining all natural nutrients through traditional methods.",
  },
  {
    title: "Treasures of Nature",
    image: "https://placehold.co/400x400/154d2e/FFFFFF/png?text=Treasures",
    description: "Rare and exotic organic finds for the curious palate.",
  },
  {
    title: "Healthy Grains",
    image: "https://placehold.co/400x400/154d2e/FFFFFF/png?text=Grains",
    description: "Wholesome grains to power your daily journey.",
  },
];

export default function ArtisanSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="main-container mx-auto px-4 text-center">
        <span className="text-[#86b86b] font-bold text-sm tracking-widest uppercase mb-4 block">
          OUR PRODUCTS
        </span>
        <Heading2 className="text-[#154d2e] mb-16 max-w-2xl mx-auto leading-tight">
          Artisan food products crafted for flavor seekers
        </Heading2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="space-y-6 group">
              <div className="relative w-48 h-48 mx-auto">
                <div className="absolute inset-0 bg-secondary/10 rounded-full group-hover:scale-105 transition-transform duration-500" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Heading3 className="text-xl font-bold text-[#154d2e]">
                  {product.title}
                </Heading3>
                <p className="text-slate-500 text-sm font-medium">
                  {product.description}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#154d2e] hover:text-[#86b86b] transition-colors"
                >
                  Read More <MoveRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
