import { Leaf, Sprout, Sun, Heart } from "lucide-react";
import Heading2 from "@/components/common/Headings/Heading2";
import Heading3 from "@/components/common/Headings/Heading3";

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    description:
      "Certified organic farming practices without harmful chemicals.",
  },
  {
    icon: Sprout,
    title: "Fresh Harvest",
    description: "Harvested at peak ripeness for maximum flavor and nutrition.",
  },
  {
    icon: Sun,
    title: "Eco-Friendly",
    description: "Sustainable farming that respects and preserves nature.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Grown and packed with care for your family's health.",
  },
];

export default function AboutFeatures() {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="main-container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto mb-12">
          <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block">
            OUR FEATURES
          </span>
          <Heading2 className="text-white mb-4">
            Discover the love behind our food products sprout
          </Heading2>
          <p className="text-white/70">
            Every product tells a story of care, quality, and dedication to
            purity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-white/10 hover:translate-y-[-5px] transition-all duration-300 group"
            >
              <div className="w-16 h-16 mx-auto bg-[#f8fdf4] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <feature.icon className="w-8 h-8 text-secondary" />
              </div>
              <Heading3 className="font-bold text-xl text-secondary mb-3">
                {feature.title}
              </Heading3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
