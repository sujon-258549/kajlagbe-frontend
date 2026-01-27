"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import Heading3 from "../common/Headings/Heading3";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="main-container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Image Side */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
              <CustomImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                alt="About Us"
                fill
                wrapperClassName="w-full h-[500px]"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -z-0"></div>
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm">
                {"// Empowering Users & Professionals"}
              </span>
              <Heading3 className=" font-bold text-black leading-tight">
                A Unified Marketplace for 3{" "}
                <span className="text-primary">Excellence</span>
              </Heading3>
              <p className="text-lg text-slate-600 leading-relaxed">
                KajLagbe is a dual-sided marketplace designed to bridge the gap
                between quality-conscious users and highly skilled service
                professionals. Whether you need expert help or want to provide
                your services, we offer a safe, transparent, and efficient
                platform to connect and grow.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {[
                "Background Verified Experts",
                "Fixed & Transparent Pricing",
                "Damage Insurance Coverage",
                "Post-Service Warranty",
                "24/7 Dedicated Support",
                "Quality Guaranteed",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                  <span className="font-bold text-black text-sm md:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="default"
                className="rounded-md shadow-lg shadow-primary/20"
              >
                How It Works
              </Button>
              <div className="flex items-center gap-4 px-6 py-2 border-l-2 border-slate-100">
                <div className="text-3xl font-bold text-primary">4.8/5</div>
                <div>
                  <div className="flex text-yellow-400">{"★".repeat(5)}</div>
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    Average Expert Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
