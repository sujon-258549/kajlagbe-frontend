"use client";

import { useEffect, useMemo, useState } from "react";
import BlogCard from "./BlogCard";
import Pagination from "../common/Pagination";
import BlogGridSkeleton from "./BlogGridSkeleton";
import AdminOnly from "../common/auth/AdminOnly";
import { Button } from "@/components/ui/button";
import { Plus, Edit, FileText } from "lucide-react";
import HomeBlogPostModal from "../modal/home/HomeBlogPostModal";
import { BlogPostFormData } from "@/schemas/blog/post.schema";
import { toast } from "react-toastify";
import {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
} from "@/actions/blog.actions";

export default function BlogList() {
  const [posts, setPosts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<any | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);

  const postsPerPage = 6;

  const fetchBlogs = async () => {
    const res = await getAllBlogs();
    if (res.success) {
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setPosts(list);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchBlogs();
      setIsLoading(false);
    };
    init();
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, posts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddPost = () => {
    setEditingPost(undefined);
    setIsModalOpen(true);
  };

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleSavePost = async (data: BlogPostFormData) => {
    setIsSaving(true);
    try {
      const payload: any = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        coverId: data.imageId || undefined,
        category: data.category,
        authorName: data.authorName,
        tags: (data.tags || "")
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const res = editingPost?.id
        ? await updateBlog(editingPost.id, payload)
        : await createBlog(payload);

      if (res.success) {
        toast.success(
          editingPost
            ? "Blog updated successfully!"
            : "Blog created successfully!",
        );
        await fetchBlogs();
        setIsModalOpen(false);
        setEditingPost(undefined);
      } else {
        toast.error(res.message || "Something went wrong!");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePost = async () => {
    if (!editingPost?.id) return;
    setIsSaving(true);
    try {
      const res = await deleteBlog(editingPost.id);
      if (res.success) {
        toast.success("Blog deleted successfully!");
        await fetchBlogs();
        setIsModalOpen(false);
        setEditingPost(undefined);
      } else {
        toast.error(res.message || "Failed to delete blog.");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to delete blog.");
    } finally {
      setIsSaving(false);
    }
  };

  const hasPosts = posts.length > 0;

  const initialModalData = editingPost
    ? ({
        ...editingPost,
        tags: Array.isArray(editingPost.tags)
          ? editingPost.tags.join(", ")
          : editingPost.tags || "",
      } as any)
    : undefined;

  return (
    <div className="space-y-8 relative">
      <AdminOnly>
        <div className="flex justify-end items-center mb-6">
          <Button
            onClick={handleAddPost}
            className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold"
          >
            <Plus className="w-4 h-4" /> Add Blog Post
          </Button>
        </div>
      </AdminOnly>

      {isLoading ? (
        <BlogGridSkeleton />
      ) : !hasPosts ? (
        <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/40 text-center min-h-[400px]">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
            <FileText className="w-7 h-7 md:w-8 md:h-8 text-secondary" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-secondary mb-2">
            No blog posts yet
          </h3>
          <p className="text-slate-500 text-sm md:text-base max-w-md">
            Stay tuned — fresh stories, recipes, and organic living tips are on
            the way.
          </p>
          <AdminOnly>
            <Button
              onClick={handleAddPost}
              className="mt-6 bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold"
            >
              <Plus className="w-4 h-4" /> Write First Post
            </Button>
          </AdminOnly>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {currentPosts.map((post, index) => (
            <div key={post.id} className="relative group/blog-card">
              <BlogCard post={post} index={index} />
              <AdminOnly>
                <button
                  onClick={() => handleEditPost(post)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/80 text-white opacity-0 group-hover/blog-card:opacity-100 transition-all z-20 hover:bg-secondary shadow-lg"
                  title="Edit Post"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </AdminOnly>
            </div>
          ))}
        </div>
      )}

      {hasPosts && totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <HomeBlogPostModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPost(undefined);
        }}
        initialData={initialModalData}
        onUpdate={handleSavePost}
        onDelete={handleDeletePost}
        isNew={!editingPost}
        isLoading={isSaving}
      />
    </div>
  );
}
