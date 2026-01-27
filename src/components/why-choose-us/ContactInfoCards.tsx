"use client";

import React from "react";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactInfoCards() {
  return (
    <section className="bg-white pb-16 md:pb-24">
      <div className="main-container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Email */}
          <div className="bg-primary rounded-2xl p-8 flex items-start justify-between group hover:-translate-y-2 transition-all duration-300 border border-gray-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center mb-6">
                <Mail className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-bold text-secondary text-lg uppercase tracking-wider">
                support@kajlagbe.com
              </h4>
              <p className="text-secondary/70 text-sm font-medium">
                Safe & Fast
              </p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>

          {/* Card 2: Phone */}
          <div className="bg-secondary rounded-2xl p-8 flex items-start justify-between group hover:-translate-y-2 transition-all duration-300 border border-secondary text-white">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center mb-6">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-white text-2xl">+88 123 456 789</h4>
              <p className="text-white/60 text-sm font-medium">
                Any Time Call Us
              </p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>

          {/* Card 3: Address */}
          <div className="bg-primary rounded-2xl p-8 flex items-start justify-between group hover:-translate-y-2 transition-all duration-300 border border-gray-200">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full border border-secondary/20 flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6 text-secondary" />
              </div>
              <h4 className="font-bold text-secondary text-lg leading-tight">
                Dhanmondi, Dhaka, Bangladesh
              </h4>
              <p className="text-secondary/70 text-sm font-medium">Office</p>
            </div>
            <ArrowUpRight className="w-6 h-6 text-secondary group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
    </section>
  );
}
