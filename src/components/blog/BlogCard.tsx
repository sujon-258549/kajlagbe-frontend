"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "motion/react";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link
        href={`/blog/${post.slug}`}
        className="block overflow-hidden rounded-2xl mb-6"
      >
        <div className="relative aspect-4/3 w-full">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </Link>

      <div className="space-y-4">
        <Link href={`/blog/${post.slug}`} className="block">
          <h3 className="text-xl lg:text-2xl font-bold text-[#154d2e] group-hover:text-[#86b86b] transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#154d2e] hover:text-[#86b86b] transition-colors"
        >
          Read More <MoveRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.div>
  );
}
