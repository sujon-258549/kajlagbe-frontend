import Image from "next/image";
import { Check } from "lucide-react";

import Heading3 from "@/components/common/Headings/Heading3";

export default function AboutStory() {
  return (
    <section className="py-16 lg:py-24 overflow-hidden">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          {/* Image Grid */}
          <div className="w-full lg:w-1/2 relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gray-200" />
                  {/* Placeholder for image 1 */}
                  <Image
                    src="https://placehold.co/400x600/154d2e/FFFFFF/png?text=Fresh+Farm"
                    alt="Farm Fresh"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#bce68a]/30 p-6 rounded-2xl text-center">
                  <Heading3 className="text-3xl font-bold text-[#154d2e]">
                    100%
                  </Heading3>
                  <p className="text-[#154d2e] font-medium">Organic Food</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-[#154d2e] p-6 rounded-2xl text-center text-white">
                  <Check className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">Certified Product</p>
                </div>
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                  <div className="absolute inset-0 bg-gray-200" />
                  {/* Placeholder for image 2 */}
                  <Image
                    src="https://placehold.co/400x600/86b86b/FFFFFF/png?text=Vegetables"
                    alt="Vegetables"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-block px-3 py-1 bg-[#154d2e]/10 rounded-full text-[#154d2e] font-medium text-sm">
              About Us
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#154d2e] leading-snug">
              Pure is the only one farm that need no cover & extra fertilizer
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We believe that nature knows best. That,s why our farm is
              dedicated to growing produce the way it was meant to be
              grew—without artificial covers or synthetic fertilizers. Just pure
              sunlight, rich soil, and fresh water.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#86b86b] flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#154d2e]">
                    Only Pure Ingredients
                  </h4>
                  <p className="text-sm text-slate-500">
                    We never compromise on the quality of our inputs.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#86b86b] flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-[#154d2e]">
                    Sustainability First
                  </h4>
                  <p className="text-sm text-slate-500">
                    Our farming practices enrich the land rather than depleting
                    it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
