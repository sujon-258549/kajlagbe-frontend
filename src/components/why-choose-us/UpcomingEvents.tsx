"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Heading2 from "../common/Headings/Heading2";

const events = [
  {
    id: 1,
    title: "The forest is our life, it is our job to keep the forest clean",
    icon: "ECO",
    date: "10 June, 2024",
    time: "8.30am - 4.30pm",
    location: "New York, USA",
    author: "Admin",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
  },
  {
    id: 2,
    title: "The forest is our life, it is our job to keep the forest clean",
    icon: "ECO",
    date: "12 Dec, 2024",
    time: "9.30am - 5.30pm",
    location: "New York, USA",
    author: "Admin",
    category: "Ecology",
    image:
      "https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg",
  },
];

export default function UpcomingEvents() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="main-container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
              <Leaf className="w-4 h-4" />
              <span>Our News</span>
            </div>
            <Heading2 className="text-secondary">
              Econest Upcoming Events
            </Heading2>
          </div>

          <Button className="font-bold h-12 px-6 flex items-center gap-2">
            View All Events <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* List of Events */}
        <div className="space-y-8">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 flex flex-col lg:flex-row gap-6 items-center"
            >
              {/* Image */}
              <div className="w-full lg:w-1/3 h-52 lg:h-52 relative rounded-xl overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4 w-full">
                <div className="flex items-center gap-4 text-sm font-bold text-primary uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    {event.date}
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-secondary font-serif group-hover:text-primary transition-colors">
                  <Link href="#">{event.title}</Link>
                </h3>

                <div className="flex flex-wrap gap-4 md:gap-8 text-sm font-medium text-slate-500 pt-2 border-t border-slate-100 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-primary">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full border border-slate-200 flex items-center justify-center text-primary">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    {event.location}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="w-full lg:w-auto flex lg:flex-col justify-between lg:justify-center gap-4 border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-8 shrink-0">
                <Button className="w-full lg:w-auto font-bold h-12 px-8 flex items-center justify-center gap-2 whitespace-nowrap">
                  Join Event <ArrowRight className="w-5 h-5" />
                </Button>

                <div className="flex items-center gap-3">
                  {/* Avatars */}
                  <div className="flex -space-x-3">
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                      <Image
                        src="https://i.pravatar.cc/100?img=1"
                        alt="Attendee"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                      <Image
                        src="https://i.pravatar.cc/100?img=2"
                        alt="Attendee"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative">
                      <Image
                        src="https://i.pravatar.cc/100?img=3"
                        alt="Attendee"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    <span className="text-secondary block text-sm">+3k</span>
                    Join People
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
