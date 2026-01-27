import {
  Box,
  Lightbulb,
  Heart,
  Leaf,
  Truck,
  ShoppingBasket,
} from "lucide-react";
import Heading3 from "@/components/common/Headings/Heading3";

const features = [
  {
    icon: Box,
    title: "Rich side of food",
    description:
      "Experience the true richness of flavors that nature has to offer.",
  },
  {
    icon: Lightbulb,
    title: "Artisan Expertise",
    description:
      "Crafted by experts who understand the soul of every ingredient.",
  },
  {
    icon: Heart,
    title: "Hearty and Pure",
    description: "Pure ingredients selected with heart for your well-being.",
  },
  {
    icon: Leaf,
    title: "Natural Choice",
    description: "Always natural, always fresh, because that's our promise.",
  },
  {
    icon: Truck,
    title: "Direct to Table",
    description: "From our farms directly to your dining table within hours.",
  },
  {
    icon: ShoppingBasket,
    title: "Quality Picked",
    description: "Every item is hand-picked for quality and freshness.",
  },
];

export default function FeaturesGrid() {
  return (
    <section className="py-12 md:py-16 bg-slate-50/30">
      <div className="main-container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-10 rounded-2xl transition-all group border border-gray-200"
            >
              <div className="w-16 h-16 bg-[#86b86b]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#86b86b] transition-colors">
                <feature.icon className="w-8 h-8 text-[#86b86b] group-hover:text-white transition-colors" />
              </div>
              <Heading3 className="text-xl font-bold text-[#154d2e] mb-4">
                {feature.title}
              </Heading3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
