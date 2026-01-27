"use client";

import React from "react";
import {
  Check,
  ArrowRight,
  Leaf,
  HandCoins,
  BarChart3,
  Lightbulb,
  ThumbsUp,
  Users,
} from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import { Button } from "@/components/ui/button";

export default function ReasonsToChoose() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {/* Left: Image Collage */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-[500px]">
            {/* Desktop Layout (Absolute Positioning) */}
            <div className="hidden lg:block w-full h-full">
              {/* Top Right Large Image */}
              <div className="absolute top-0 right-0 w-[55%] h-[320px] rounded-xl overflow-hidden z-10">
                <CustomImage
                  src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
                  alt="Professional Woman"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Left Square Image */}
              <div className="absolute bottom-10 left-0 w-[45%] h-[290px] rounded-2xl overflow-hidden z-20 border-[6px] border-white">
                <CustomImage
                  src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
                  alt="Team Site"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Bottom Right Wide Low Image */}
              <div className="absolute bottom-0 right-0 w-[50%] h-[180px] rounded-2xl overflow-hidden z-30 border-[6px] border-white">
                <CustomImage
                  src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
                  alt="Planting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mobile/Tablet Layout (Grid) */}
            <div className="grid lg:hidden grid-cols-2 gap-4">
              <div className="col-span-2 h-[250px] relative rounded-xl overflow-hidden">
                <CustomImage
                  src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
                  alt="Professional Woman"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[180px] relative rounded-xl overflow-hidden">
                <CustomImage
                  src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
                  alt="Team Site"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="h-[180px] relative rounded-xl overflow-hidden">
                <CustomImage
                  src="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
                  alt="Planting"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Floating Badge (Responsive Positioning) */}
            <div className="absolute top-1/2 lg:top-[45%] left-1/2 lg:left-[20%] -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 z-40 bg-[#FFE588] px-6 py-4 rounded-xl shadow-lg border-4 border-white flex items-center gap-3 w-max lg:max-w-[200px]">
              <span className="text-3xl lg:text-4xl font-bold text-secondary">
                29+
              </span>
              <span className="text-[10px] lg:text-xs font-bold text-secondary uppercase leading-tight">
                Years of
                <br />
                experience
              </span>
            </div>
          </div>

          {/* Right: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-secondary font-bold text-sm tracking-widest uppercase">
                <Leaf className="w-4 h-4 text-secondary fill-secondary" />
                <span className="text-slate-500 font-bold">Who We Are</span>
              </div>
              <Heading2 className="text-secondary leading-tight">
                Some Reasons to Choose <br />
                <span className="text-secondary">(Econest Organization)</span>
              </Heading2>
              <p className="text-slate-500 text-lg leading-relaxed">
                The implant fixture is first placed, so that it likely to then a
                dental prosthetic is added then dental prosthetic occaecat
                laborum.
              </p>
            </div>

            {/* List with Solid Green Checks */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Specialized Company",
                "Dependable Services",
                "Licensed & Insured",
                "Day Scheduling",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                  </div>
                  <span className="font-bold text-slate-600">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-8 pt-6">
              {/* Custom Yellow Button with Arrow Circle */}
              <Button className="bg-secondary hover:bg-secondary/90 text-white font-bold h-12 rounded-xl flex items-center gap-4 transition-transform hover:-translate-y-1">
                Explore More
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </Button>

              {/* Donation Widget */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#B5B5B5] shadow-sm">
                  <HandCoins className="w-8 h-8 text-[#FFE588]" />
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">
                    Annual Donation
                  </span>
                  <span className="text-xl font-bold text-secondary">
                    $2,056,00
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
          {[
            {
              label: "Company Success",
              value: "98%",
              icon: BarChart3,
              color: "text-[#FFE588]",
              borderColor: "border-[#FFE588]",
            },
            {
              label: "Company Strategies",
              value: "565+",
              icon: Lightbulb,
              color: "text-[#FFE588]", // Image shows yellow icon
              borderColor: "border-[#FFE588]",
            },
            {
              label: "Complete Projects",
              value: "36k",
              icon: ThumbsUp,
              color: "text-[#FFE588]",
              borderColor: "border-[#FFE588]",
            },
            {
              label: "Experienced Members",
              value: "100+",
              icon: Users,
              color: "text-[#FFE588]", // Image shows outline
              borderColor: "border-[#FFE588]",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center space-y-3 group cursor-default"
            >
              <div
                className={`w-20 h-20 mx-auto bg-secondary rounded-full border-2 ${stat.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform mb-4`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color} stroke-[1.5]`} />
              </div>
              <h3 className="text-5xl font-bold text-secondary">
                {stat.value}
              </h3>
              <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
