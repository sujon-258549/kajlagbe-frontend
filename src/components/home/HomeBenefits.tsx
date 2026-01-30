import Image from "next/image";
import {
  Leaf,
  Activity,
  Clock,
  Settings,
  Sprout,
  Truck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Heading4 from "../common/Headings/Heading4";
import Heading2 from "../common/Headings/Heading2";

const leftBenefits = [
  {
    title: "Eco-Friendly Practices",
    desc: "From biodegradable packaging to farming, we're committed.",
    icon: Leaf,
  },
  {
    title: "Naturally Preserved Goodness",
    desc: "From biodegradable packaging to farming, we're committed.",
    icon: Settings,
  },
  {
    title: "Chef-Approved Taste",
    desc: "From biodegradable packaging to farming, we're committed.",
    icon: Clock,
  },
];

const rightBenefits = [
  {
    title: "Farm-Fresh & Organic",
    desc: "From biodegradable packaging to farming, we're committed.",
    icon: Sprout,
  },
  {
    title: "Quality You Can Trust",
    desc: "From biodegradable packaging to farming, we're committed.",
    icon: Activity,
  },
  {
    title: "Fast & Safe Delivery",
    desc: "From biodegradable packaging to farming, we're committed.",
    icon: Truck,
  },
];

export default function HomeBenefits() {
  return (
    <section className="py-20 lg:py-28 bg-[#fcfdfa] overflow-hidden">
      <div className="main-container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0f9eb] rounded-full text-secondary text-sm font-semibold border border-[#dcf0d1] mb-6">
            <Sparkles className="w-4 h-4" />
            Our Benefits
          </div>
          <Heading2 className=" text-secondary leading-tight">
            Discover the benefits that set our food products apart
          </Heading2>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          {/* Left Column */}
          <div className="w-full lg:w-1/3 space-y-12 order-2 lg:order-1">
            {leftBenefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex gap-5 lg:text-right items-start lg:flex-row-reverse group"
              >
                <div className="shrink-0 w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-secondary">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[280px] lg:ml-auto">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Images */}
          <div className="w-full lg:w-1/3 relative h-[400px] md:h-[500px] order-1 lg:order-2 flex items-center justify-center">
            <div className="relative w-full h-full transform scale-110">
              <Image
                src="/images/home/benefits_packets.png"
                alt="Organic Food Packets"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-1/3 space-y-12 order-3">
            {rightBenefits.map((benefit, idx) => (
              <div key={idx} className="flex gap-5 items-start group">
                <div className="shrink-0 w-14 h-14 bg-secondary rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="w-7 h-7" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-secondary">
                    {benefit.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-[280px]">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-20 lg:mt-28">
          <p className="text-slate-500 font-medium">
            From clean ingredients to conscious choices –{" "}
            <Link
              href="/about"
              className="text-secondary underline decoration-[#86b86b] decoration-2 underline-offset-4 hover:text-[#86b86b] transition-colors"
            >
              discover what sets us apart.
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
