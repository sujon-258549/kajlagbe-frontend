import Image from "next/image";
import { Check } from "lucide-react";
import Heading2 from "@/components/common/Headings/Heading2";

export default function PuritySection() {
  const points = ["100% Organic Certified", "Quality Guaranteed"];
  const stats = [
    { label: "Years of Trust", value: "25+" },
    { label: "Natural Product", value: "98+" },
    { label: "Happy Families", value: "1K+" },
    { label: "Stores Offline", value: "80+" },
  ];

  return (
    <section className="py-12 md:py-16 bg-slate-50/50 overflow-hidden">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6 mb-20">
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-[#86b86b] font-bold text-sm tracking-widest uppercase">
                OUR MISSION
              </span>
              <Heading2 className="text-[#154d2e] leading-tight">
                Rooted in purity, grown with care, delivered with love
              </Heading2>
              <p className="text-slate-600 font-medium text-lg leading-relaxed">
                We believe that good food is the foundation of a good life. Our
                journey started with a simple promise: to provide the purest
                organic products possible.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#86b86b]/10 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#86b86b]" strokeWidth={3} />
                  </div>
                  <span className="font-bold text-[#154d2e]">{point}</span>
                </div>
              ))}
            </div>

            <div className="bg-white p-8 rounded-2xl flex items-center gap-6 border border-slate-100 border-l-8 border-l-[#86b86b]">
              <div className="w-20 h-20 rounded-xl bg-[#86b86b] flex items-center justify-center text-white text-3xl font-black">
                25<span className="text-lg">+</span>
              </div>
              <div>
                <h4 className="font-bold text-[#154d2e] text-xl">
                  Years of Experience
                </h4>
                <p className="text-slate-500 font-medium">
                  Perfecting the art of organic farming.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative aspect-square w-full max-w-lg mx-auto">
              <div className="absolute inset-0 bg-[#86b86b] rounded-full opacity-10 animate-pulse" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-8 border-white">
                <Image
                  src="https://placehold.co/800x800/154d2e/FFFFFF/png?text=Natural+Care"
                  alt="Organic Care"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Floating Element */}
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-4 rounded-2xl hidden md:block border border-slate-100">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="https://placehold.co/400x400/86b86b/FFFFFF/png?text=Fresh"
                    alt="Fresh"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-slate-200">
          {stats.map((stat, index) => (
            <div key={index} className="text-center space-y-2">
              <h3 className="text-4xl lg:text-5xl font-black text-[#154d2e]">
                {stat.value}
              </h3>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
