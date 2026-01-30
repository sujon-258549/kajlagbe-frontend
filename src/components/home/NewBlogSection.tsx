"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User, Bookmark, Leaf } from "lucide-react";
import Heading2 from "../common/Headings/Heading2";
import Heading3 from "../common/Headings/Heading3";
import { Button } from "../ui/button";

interface BlogPost {
  id: number;
  title: string;
  image: string;
  date: { day: string; month: string };
  author: string;
  category: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Power of One: How Individual Actions Save the Planet",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    date: { day: "09", month: "Jan" },
    author: "Admin",
    category: "Plastic",
    slug: "power-of-one",
  },
  {
    id: 2,
    title: "Sustainable Energy for All: Why Your Donation Matters",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    date: { day: "20", month: "Feb" },
    author: "Admin",
    category: "Cupboard",
    slug: "sustainable-energy",
  },
  {
    id: 3,
    title: "Water Conservation: Small Changes, Big Impact",
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=800",
    date: { day: "14", month: "Jan" },
    author: "Admin",
    category: "Glass",
    slug: "water-conservation",
  },
];

export default function NewBlogSection() {
  return (
    <section className="py-20">
      <div className="main-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm tracking-wide uppercase">
              <Leaf className="w-4 h-4" />
              <span>News & Blog</span>
            </div>
            <Heading3 className="text-[#002A3A]">
              Check Latest Blog Post
            </Heading3>
          </div>

          <Link href="/blog" className="">
            <Button>
              {" "}
              Read All Posts
              <div className="bg-[#002A3A] rounded-full p-1">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </Button>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group bg-[#FDFBF7]  rounded-xl p-4 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-200 hover:border-gray-400"
            >
              {/* Image main-container */}
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 mb-6">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Date Badge */}
                <div className="absolute bottom-4 right-4 bg-[#004D40] text-white rounded-xl p-2 text-center min-w-[60px] shadow-lg">
                  <span className="block text-2xl font-bold leading-none">
                    {post.date.day}
                  </span>
                  <span className="block text-xs font-medium opacity-80">
                    {post.date.month}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="px-2 pb-4 space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-6 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-1.5">
                    <div className="border border-slate-300 rounded-full p-0.5">
                      <User className="w-3 h-3" />
                    </div>
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="border border-slate-300 rounded-full p-0.5">
                      <Bookmark className="w-3 h-3" />
                    </div>
                    {post.category}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-[22px] font-bold text-[#002A3A] leading-snug group-hover:text-secondary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>

                {/* Read More Button */}
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 border border-slate-200 bg-white rounded-full px-5 py-2.5 text-xs font-bold text-[#002A3A] shadow-sm group-hover:bg-[#002A3A] group-hover:text-white transition-all mt-2"
                >
                  Read More
                  <div className="bg-secondary rounded-full p-0.5 group-hover:bg-white group-hover:text-[#002A3A] transition-colors">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
