import Image from "next/image";
import { Check } from "lucide-react";

import Heading2 from "@/components/common/Headings/Heading2";
import Heading3 from "@/components/common/Headings/Heading3";
import Heading4 from "@/components/common/Headings/Heading4";

export default function AboutStory() {
  return (
    <section className="py-12 lg:py-20 overflow-hidden">
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
                  <Heading3 className="text-3xl font-bold text-secondary">
                    100%
                  </Heading3>
                  <p className="text-secondary font-medium">Organic Food</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-secondary p-6 rounded-2xl text-center text-white">
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
            <div className="inline-block px-3 py-1 bg-secondary/10 rounded-full text-secondary font-medium text-sm">
              About Us
            </div>
            <Heading2 className="text-secondary leading-snug">
              Pure is the only one farm that need no cover & extra fertilizer
            </Heading2>
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
                  <Heading4 className="text-secondary">
                    Only Pure Ingredients
                  </Heading4>
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
                  <Heading4 className="text-secondary">
                    Sustainability First
                  </Heading4>
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
