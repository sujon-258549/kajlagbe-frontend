import Image from "next/image";
import { Quote } from "lucide-react";
import Heading2 from "@/components/common/Headings/Heading2";

const testimonials = [
  {
    name: "Benjamin Michael",
    role: "Food Enthusiast",
    image: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=BM",
    content:
      "Kajlagbe has transformed the way my family eats. The quality and freshness of their organic produce is consistent and reliable.",
  },
  {
    name: "Emilia Clarke",
    role: "Health Coach",
    image: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=EC",
    content:
      "I always recommend Kajlagbe to my clients. It's rare to find such transparency and commitment to organic purity nowadays.",
  },
  {
    name: "Oliver Twist",
    role: "Chef",
    image: "https://placehold.co/100x100/154d2e/FFFFFF/png?text=OT",
    content:
      "As a chef, the base ingredients are everything. The oils and grains from Kajlagbe are the building blocks of my best dishes.",
  },
];

export default function FeaturesTrust() {
  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden text-center">
      {/* Decorative dots background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#86b86b]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="main-container mx-auto px-4 relative z-10">
        <span className="text-[#86b86b] font-bold text-sm tracking-widest uppercase mb-4 block">
          TESTIMONIALS
        </span>
        <Heading2 className="text-[#154d2e] mb-20 max-w-3xl mx-auto leading-tight">
          Trusted by families, <br />
          <span className="text-slate-300">remembered by palate</span>
        </Heading2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-[#86b86b]/5 p-12 rounded-2xl hover:bg-white transition-all duration-500 group relative border border-gray-200"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#86b86b] rounded-full flex items-center justify-center text-white">
                <Quote className="w-6 h-6 fill-current" />
              </div>

              <div className="flex gap-1 justify-center mb-8 text-[#86b86b]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-slate-600 font-medium text-lg italic leading-relaxed mb-10">
                &quot;{t.content}&quot;
              </p>

              <div className="flex flex-col items-center gap-4 border-t border-slate-200 pt-8">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#86b86b]">
                  <Image src={t.image} alt={t.name} fill />
                </div>
                <div>
                  <h4 className="font-bold text-[#154d2e]">{t.name}</h4>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-16">
          <div className="w-8 h-2 bg-[#86b86b] rounded-full" />
          <div className="w-2 h-2 bg-slate-200 rounded-full" />
          <div className="w-2 h-2 bg-slate-200 rounded-full" />
        </div>
      </div>
    </section>
  );
}
