"use client";

import { ArrowRight, User, Tag, Lightbulb } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import Heading5 from "../common/Headings/Heading5";

const blogs = [
  {
    id: 1,
    date: "24",
    month: "Jan",
    author: "Admin",
    category: "Solar",
    title: "From Trash to Treasure: Inspiring Recycling Stories",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    date: "09",
    month: "Feb",
    author: "Admin",
    category: "Solar",
    title: "Water Conservation: Small Changes, Big Impact",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    date: "17",
    month: "Mar",
    author: "Admin",
    category: "Solar",
    title: "The Power of One: How Individual Actions Save the Planet",
    image:
      "https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?auto=format&fit=crop&q=80&w=800",
  },
];

export default function ServicesBlog() {
  return (
    <section className="py-20 bg-white">
      <div className="main-container">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-[#fbbf24] font-medium mb-3">
            <Lightbulb className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm text-slate-500">
              News & Blog
            </span>
          </div>
          <Heading2 className="text-[#063022]">Our Daily Update</Heading2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-[#063022] hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <CustomImage
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Date Badge */}
                <div className="absolute top-4 right-4 bg-[#fcd34d] rounded-full w-14 h-14 flex flex-col items-center justify-center text-[#063022] font-bold z-10 border-4 border-[#063022]/20">
                  <span className="text-lg leading-none">{item.date}</span>
                  <span className="text-[10px] uppercase leading-none">
                    {item.month}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8">
                {/* Meta Tags */}
                <div className="flex items-center gap-6 text-primary text-xs font-medium mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" />
                    <span className="text-white/80">{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span className="text-white/80">{item.category}</span>
                  </div>
                </div>

                <Heading5 className="text-white text-xl font-bold mb-8 leading-snug line-clamp-2 min-h-[56px]">
                  {item.title}
                </Heading5>

                <button className="flex items-center gap-2 px-6 py-3 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all group-visible group/btn">
                  Read More
                  <div className="bg-primary text-white rounded-lg w-5 h-5 flex items-center justify-center ml-2 group-hover/btn:bg-white group-hover/btn:text-primary transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
