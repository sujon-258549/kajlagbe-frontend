"use client";

import { useMemo, useState } from "react";
import { blogPosts as initialBlogPosts, BlogPost } from "@/data/blogData";
import BlogCard from "./BlogCard";
import Pagination from "../common/Pagination";
import BlogGridSkeleton from "./BlogGridSkeleton";
import AdminOnly from "../common/auth/AdminOnly";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import BlogPostModal from "../modal/blog/BlogPostModal";
import { BlogPostFormData } from "@/schemas/blog/post.schema";

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>(
    undefined,
  );

  const postsPerPage = 6;

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    return posts.slice(indexOfFirstPost, indexOfLastPost);
  }, [currentPage, posts]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setCurrentPage(page);

    // Simulate loading for better UX feel
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleAddPost = () => {
    setEditingPost(undefined);
    setIsModalOpen(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsModalOpen(true);
  };

  const handleSavePost = (data: BlogPostFormData) => {
    if (editingPost) {
      // Edit existing
      const updatedPosts = posts.map((p) =>
        p.id === editingPost.id
          ? {
              ...p,
              ...data,
              tags: data.tags.split(",").map((t) => t.trim()),
              author: {
                name: data.authorName,
                avatar: data.authorAvatar,
              },
            }
          : p,
      );
      setPosts(updatedPosts);
    } else {
      // Add new
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...data,
        tags: data.tags.split(",").map((t) => t.trim()),
        author: {
          name: data.authorName,
          avatar: data.authorAvatar,
        },
      };
      setPosts([newPost, ...posts]);
    }
    setIsModalOpen(false);
  };

  const handleDeletePost = () => {
    if (editingPost) {
      const updatedPosts = posts.filter((p) => p.id !== editingPost.id);
      setPosts(updatedPosts);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 min-h-[600px] relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-secondary">Latest Stories</h2>
        <AdminOnly>
          <Button
            onClick={handleAddPost}
            className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold"
          >
            <Plus className="w-4 h-4" /> Add Blog Post
          </Button>
        </AdminOnly>
      </div>

      {isLoading ? (
        <BlogGridSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="flex justify-center md:-my-0 -my-3">
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      <BlogPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={editingPost}
        onSave={handleSavePost}
        onDelete={handleDeletePost}
      />
    </div>
  );
}
