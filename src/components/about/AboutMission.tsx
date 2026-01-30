import Image from "next/image";
import { Sparkles, Leaf, Target } from "lucide-react";
import Heading2 from "@/components/common/Headings/Heading2";
import Heading4 from "@/components/common/Headings/Heading4";

export default function AboutMission() {
  return (
    <section className="py-10 md:py-16 lg:py-24 bg-white overflow-hidden">
      <div className="main-container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Side: Image Collage */}
          <div className="relative">
            <div className="grid grid-cols-12 gap-4">
              {/* Top Main Image */}
              <div className="col-span-12 relative h-[250px] md:h-[380px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl">
                <Image
                  src="/images/about/healthy_food_packet.png"
                  alt="Healthy Food Packet"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Left: Satisfaction Rate */}
              <div className="col-span-12 md:col-span-5 bg-[#f5fbf0] p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] flex flex-col justify-center border border-[#e8f5e0]">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl flex items-center justify-center mb-4 md:mb-6 shadow-sm">
                  <Target className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-secondary mb-1 md:mb-2">
                  98 %
                </h3>
                <p className="text-secondary/70 font-medium text-sm md:text-base">
                  Satisfaction Rate
                </p>
              </div>

              {/* Bottom Right: Fresh Vegetables */}
              <div className="col-span-12 md:col-span-7 relative h-[200px] md:h-[280px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl">
                <Image
                  src="/images/about/fresh_vegetables_bag.png"
                  alt="Fresh Vegetables"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Circular Contact Badge */}
            <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-1/2 md:left-[41.6%] md:top-[60%] z-20">
              <div className="relative w-28 h-28 md:w-40 md:h-40 bg-white rounded-full p-2 shadow-2xl animate-spin-slow">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[10px] font-bold uppercase tracking-[0.2em] fill-secondary">
                    <textPath xlinkHref="#circlePath">
                      Contact Us • Contact Us • Contact Us •
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center m-6 md:m-6 bg-[#86b86b] rounded-full text-white shadow-inner">
                  <Leaf className="w-8 h-8 md:w-10 md:h-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="space-y-6 md:space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0f9eb] rounded-full text-secondary text-xs md:text-sm font-semibold border border-[#dcf0d1]">
                <Sparkles className="w-3.5 h-3.5 md:w-4 h-4" />
                About Us
              </div>
            </div>

            <Heading2 className="text-secondary leading-tight md:leading-[1.2] text-3xl md:text-4xl lg:text-5xl">
              Born from love for real food and a desire to do better
            </Heading2>

            <p className="text-slate-600 text-base md:text-lg leading-relaxed max-w-xl">
              We started with a simple idea: make honest high-quality food
              accessible to everyone. Tired of artificial additives & confusing
              labels, we set out to create better.
            </p>

            <div className="space-y-8 md:space-y-10 pt-4">
              {/* Feature 1 */}
              <div className="flex gap-4 md:gap-6 items-start group">
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#f5fbf0] rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-[#86b86b] group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="7"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="7"
                      cy="17"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="17"
                      cy="17"
                      r="5"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <Heading4 className="text-lg md:text-xl font-bold text-secondary">
                    Ethically Sourced, Honestly Made
                  </Heading4>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                    We believe that great food starts at the source. That&apos;s
                    why we partner with local farmers and ethical suppliers who
                    share our commitment to quality.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex gap-4 md:gap-6 items-start group">
                <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 bg-[#f5fbf0] rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <svg
                    className="w-6 h-6 md:w-8 md:h-8 text-[#86b86b] group-hover:text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="17"
                      cy="7"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="7"
                      cy="17"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <circle
                      cx="17"
                      cy="17"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <Heading4 className="text-lg md:text-xl font-bold text-secondary">
                    Nutrition That Fits Your Lifestyle
                  </Heading4>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                    We believe that great food starts at the source. That&apos;s
                    why we partner with local farmers and ethical suppliers who
                    share our commitment to quality.
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
