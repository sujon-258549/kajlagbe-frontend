"use client";

import Link from "next/link";
import { Calendar, Tag } from "lucide-react";
import { motion } from "motion/react";

interface BlogHeroProps {
  title: string;
  date?: string;
  category?: string;
  isDetails?: boolean;
}

export default function BlogHero({
  title,
  date,
  category,
  isDetails,
}: BlogHeroProps) {
  return (
    <section className="relative bg-[#154d2e] py-20 lg:py-32 overflow-hidden text-center">
      {/* Decorative background circle */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />

      <div className="main-container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 text-sm font-medium">
            {isDetails ? (
              <>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#86b86b]" />
                  <span>{date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-[#86b86b]" />
                  <span>{category}</span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="hover:text-[#86b86b] transition-colors"
                >
                  Home
                </Link>
                <span>/</span>
                <span className="text-white">Blog</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
