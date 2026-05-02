"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Leaf, Edit } from "lucide-react";
import Heading3 from "../common/Headings/Heading3";
import { Button } from "../ui/button";
import AdminOnly from "../common/auth/AdminOnly";
import BlogCard from "../blog/BlogCard";
import HomeBlogHeaderModal from "../modal/home/HomeBlogHeaderModal";
import HomeBlogPostModal from "../modal/home/HomeBlogPostModal";
import {
  HomeBlogHeaderFormData,
} from "@/schemas/home/blog.schema";
import { blogPostSchema, BlogPostFormData } from "@/schemas/blog/post.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { 
  getAllBlogs, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} from "@/actions/blog.actions";
import { useEffect } from "react";

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
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingHeader, setIsUpdatingHeader] = useState(false);
  const [isUpdatingPost, setIsUpdatingPost] = useState(false);

  const [headerData, setHeaderData] = useState<HomeBlogHeaderFormData>({
    badge: "News & Blog",
    title: "Check Latest Blog Post",
    buttonText: "Read All Posts",
  });
  const [posts, setPosts] = useState<any[]>([]);

  console.log("posts", posts);

  const data = { ...headerData, posts };

  useEffect(() => {
    const fetchBlogData = async () => {
      const settingsRes = await getSettingsMap("home");
      if (settingsRes.success && settingsRes.data.home_blog_header) {
        setHeaderData(settingsRes.data.home_blog_header.value);
      }
      
      const blogsRes = await getAllBlogs("limit=3");
      if (blogsRes.success) {
        setPosts(blogsRes.data);
      }
      setIsLoading(false);
    };
    fetchBlogData();
  }, []);

  const handleUpdateHeader = async (newHeaderData: HomeBlogHeaderFormData) => {
    setIsUpdatingHeader(true);
    try {
      const res = await upsertSetting({
        key: "home_blog_header",
        value: newHeaderData,
        group: "home",
        description: "Homepage Blog Section Header Settings",
      });
      if (res.success) {
        setHeaderData(newHeaderData);
        setIsHeaderModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdatingHeader(false);
    }
  };
  const handleUpdatePost = async (postData: any) => {
    setIsUpdatingPost(true);
    try {
      const payload: any = {
        title: postData.title,
        slug: postData.slug,
        excerpt: postData.excerpt,
        content: postData.content,
        coverId: postData.imageId || undefined,
        category: postData.category,
        authorName: postData.authorName,
        tags: (postData.tags || "")
          .split(",")
          .map((t: string) => t.trim())
          .filter(Boolean),
      };

      let res;
      if (editingIndex !== null) {
        const postId = posts[editingIndex].id;
        res = await updateBlog(postId, payload);
      } else {
        res = await createBlog(payload);
      }

      if (res.success) {
        const blogsRes = await getAllBlogs("limit=3");
        if (blogsRes.success) setPosts(blogsRes.data);
        setIsPostModalOpen(false);
        setEditingIndex(null);
      } else {
        console.error("Blog save failed:", res.message);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdatingPost(false);
    }
  };

  const handleDeletePost = async () => {
    if (editingIndex === null) return;
    
    setIsUpdatingPost(true);
    try {
      const postId = posts[editingIndex].id;
      const res = await deleteBlog(postId);
      
      if (res.success) {
        const blogsRes = await getAllBlogs("limit=3");
        if (blogsRes.success) setPosts(blogsRes.data);
        setIsPostModalOpen(false);
        setEditingIndex(null);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdatingPost(false);
    }
  };

  const openEditPost = (index: number) => {
    setEditingIndex(index);
    setIsPostModalOpen(true);
  };

  return (
    <section className="py-6 md:py-8 lg:py-12 relative group/section">
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
            <div key={post.id || index} className="relative group/blog-card">
              <BlogCard post={post} index={index} />
              <AdminOnly>
                <button
                  onClick={() => openEditPost(index)}
                  className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 border border-slate-200 text-secondary opacity-0 group-hover/blog-card:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-md"
                  title="Edit Post"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </AdminOnly>
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
        isLoading={isUpdatingHeader}
      />

      <HomeBlogPostModal
        isOpen={isPostModalOpen}
        onClose={() => {
          setIsPostModalOpen(false);
          setEditingIndex(null);
        }}
        initialData={
          editingIndex !== null ? (posts[editingIndex] as any) : undefined
        }
        onUpdate={handleUpdatePost}
        onDelete={handleDeletePost}
        isNew={editingIndex === null}
        isLoading={isUpdatingPost}
      />
    </section>
  );
}
