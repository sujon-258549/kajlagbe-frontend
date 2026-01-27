"use client";

import React from "react";
import { Leaf, Plus, Facebook, Twitter, Linkedin } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import { Button } from "@/components/ui/button";

const team = [
  {
    name: "Andres Jhon",
    role: "CEO Founder",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
  },
  {
    name: "Jaks Maone",
    role: "Team Leader",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
  },
  {
    name: "Iha Aruk Phoni",
    role: "Sr. Volunteer",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
  },
  {
    name: "Gems Potue",
    role: "Volunteer",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="main-container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
              <Leaf className="w-4 h-4" />
              <span>Meet Our Volunteers</span>
            </div>
            <Heading2 className="text-secondary">
              Together For The Planet
            </Heading2>
          </div>

          <Button className="font-bold h-12 px-6 flex items-center gap-2">
            View All Team <Plus className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-[320px] rounded-2xl overflow-hidden mb-6 border border-gray-200">
                <CustomImage
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-x-4 bottom-4 bg-secondary backdrop-blur-sm rounded-xl p-4 translate-y-0 transition-transform duration-300 border border-gray-200/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-sm">Follow</span>
                    <div className="flex gap-2">
                      {/* Social Icons */}
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                        <Facebook className="w-4 h-4" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                        <Twitter className="w-4 h-4" />
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                        <Linkedin className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Initial Tag */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white font-bold border border-gray-200 group-hover:scale-0 transition-transform">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </div>
              </div>

              <div className="text-center">
                <h4 className="text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                  {member.name}
                </h4>
                <p className="text-secondary font-medium text-sm mt-1">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
