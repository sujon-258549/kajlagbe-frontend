"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, User, Bookmark, Leaf, Edit } from "lucide-react";
import Heading3 from "../common/Headings/Heading3";
import { Button } from "../ui/button";
import AdminOnly from "../common/auth/AdminOnly";
import HomeBlogHeaderModal from "../modal/home/HomeBlogHeaderModal";
import HomeBlogPostModal from "../modal/home/HomeBlogPostModal";
import {
  HomeBlogFormData,
  HomeBlogItemFormData,
  HomeBlogHeaderFormData,
} from "@/schemas/home/blog.schema";

const initialBlogPosts = [
  {
    title: "The Power of One: How Individual Actions Save the Planet",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800",
    day: "09",
    month: "Jan",
    author: "Admin",
    category: "Plastic",
    slug: "power-of-one",
  },
  {
    title: "Sustainable Energy for All: Why Your Donation Matters",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800",
    day: "20",
    month: "Feb",
    author: "Admin",
    category: "Cupboard",
    slug: "sustainable-energy",
  },
  {
    title: "Water Conservation: Small Changes, Big Impact",
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&q=80&w=800",
    day: "14",
    month: "Jan",
    author: "Admin",
    category: "Glass",
    slug: "water-conservation",
  },
];

export default function NewBlogSection() {
  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [data, setData] = useState<HomeBlogFormData>({
    badge: "News & Blog",
    title: "Check Latest Blog Post",
    buttonText: "Read All Posts",
    posts: initialBlogPosts,
  });

  const handleUpdateHeader = (headerData: HomeBlogHeaderFormData) => {
    setData((prev) => ({ ...prev, ...headerData }));
  };

  const handleUpdatePost = (postData: HomeBlogItemFormData) => {
    if (editingIndex !== null) {
      // Edit existing
      const updatedPosts = [...data.posts];
      updatedPosts[editingIndex] = postData;
      setData((prev) => ({ ...prev, posts: updatedPosts }));
    }
    setIsPostModalOpen(false);
    setEditingIndex(null);
  };

  const handleDeletePost = () => {
    if (editingIndex !== null) {
      const updatedPosts = data.posts.filter((_, i) => i !== editingIndex);
      setData((prev) => ({ ...prev, posts: updatedPosts }));
      setIsPostModalOpen(false);
      setEditingIndex(null);
    }
  };

  const openEditPost = (index: number) => {
    setEditingIndex(index);
    setIsPostModalOpen(true);
  };

  return (
    <section className="md:py-20 py-12 relative group/section">
      <div className="main-container relative">
        <AdminOnly>
          <button
            onClick={() => setIsHeaderModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
            title="Edit Blog Header"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm tracking-wide uppercase">
              <Leaf className="w-4 h-4" />
              <span>{data.badge}</span>
            </div>
            <Heading3 className="text-[#002A3A]">{data.title}</Heading3>
          </div>

          <Link href="/blog" className="">
            <Button>
              {data.buttonText}
              <div className="bg-[#002A3A] rounded-full p-1">
                <ArrowRight className="w-3 h-3 text-white" />
              </div>
            </Button>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.posts.map((post, index) => (
            <div
              key={index}
              className="group bg-[#FDFBF7] rounded-xl p-4 hover:shadow-[0_0_10px_0_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-200 hover:border-gray-400 relative"
            >
              <AdminOnly>
                <button
                  onClick={() => openEditPost(index)}
                  className="absolute top-6 right-6 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 border border-slate-200 text-secondary opacity-0 group-hover:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-md"
                  title="Edit Post"
                >
                  <Edit className="w-3 h-3" />
                </button>
              </AdminOnly>

              {/* Image container */}
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
                    {post.day}
                  </span>
                  <span className="block text-xs font-medium opacity-80">
                    {post.month}
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

      <HomeBlogHeaderModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        initialData={{
          badge: data.badge,
          title: data.title,
          buttonText: data.buttonText,
        }}
        onUpdate={handleUpdateHeader}
      />

      <HomeBlogPostModal
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false);
          setEditingIndex(null);
        }}
        initialData={
          editingIndex !== null ? data.posts[editingIndex] : undefined
        }
        onUpdate={handleUpdatePost}
        onDelete={handleDeletePost}
        isNew={false}
      />
    </section>
  );
}
