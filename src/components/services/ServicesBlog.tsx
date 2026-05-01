"use client"; // Force reload

import { useState, useEffect } from "react";
import { ArrowRight, User, Tag, Lightbulb, Edit, Plus } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import Heading5 from "../common/Headings/Heading5";
import AdminOnly from "../common/auth/AdminOnly";
import { Button } from "@/components/ui/button";
import ServicesBlogModal from "../modal/services/ServicesBlogModal";
import ServicesBlogHeaderModal from "../modal/services/ServicesBlogHeaderModal";
import {
  ServicesBlogItem,
  ServicesBlogFormData,
  ServicesBlogHeaderFormData,
} from "@/schemas/services/blog.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { toast } from "react-toastify";

export default function ServicesBlog() {
  const [data, setData] = useState<ServicesBlogFormData>({
    tagline: "News & Blog",
    title: "Our Daily Update",
    blogs: [],
  });

  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ServicesBlogItem | undefined>(undefined);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSettingsMap("services_blog");
      if (res.success && res.data.blog_data) {
        setData(res.data.blog_data.value);
      }
    };
    fetchData();
  }, []);

  const handleAddBlog = () => {
    setEditingItem(undefined);
    setIsItemModalOpen(true);
  };

  const handleEditItem = (item: ServicesBlogItem) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (updatedItem: ServicesBlogItem) => {
    setIsUpdating(true);
    try {
      let newBlogs;
      if (editingItem) {
        newBlogs = data.blogs.map((item) => (item.id === editingItem.id ? updatedItem : item));
      } else {
        newBlogs = [{ ...updatedItem, id: Date.now() }, ...data.blogs];
      }

      const newData = { ...data, blogs: newBlogs };
      const res = await upsertSetting({
        key: "blog_data",
        value: newData,
        group: "services_blog",
        description: "Services Blog Settings",
      });

      if (res.success) {
        setData(newData);
        toast.success(editingItem ? "Blog updated!" : "Blog added!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error saving blog");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!editingItem) return;
    setIsUpdating(true);
    try {
      const newBlogs = data.blogs.filter((item) => item.id !== editingItem.id);
      const newData = { ...data, blogs: newBlogs };
      const res = await upsertSetting({
        key: "blog_data",
        value: newData,
        group: "services_blog",
      });
      if (res.success) {
        setData(newData);
        toast.success("Blog deleted!");
        setIsItemModalOpen(false);
        setEditingItem(undefined);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error deleting blog");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateHeader = async (headerData: ServicesBlogHeaderFormData) => {
    setIsUpdating(true);
    try {
      const newData = { ...data, ...headerData };
      const res = await upsertSetting({
        key: "blog_data",
        value: newData,
        group: "services_blog",
      });
      if (res.success) {
        setData(newData);
        toast.success("Header updated!");
        return true;
      } else {
        toast.error(res.message);
        return false;
      }
    } catch (error) {
      toast.error("Error updating header");
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section className="py-20 bg-white relative group/section">
      <div className="main-container relative">
        <AdminOnly>
          <button
            onClick={() => setIsHeaderModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
            title="Edit Section Header"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        {/* Header */}
        <div className="text-center mb-16 relative">
          <AdminOnly>
            <Button
              onClick={handleAddBlog}
              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary hover:bg-secondary text-white rounded-full"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Post
            </Button>
          </AdminOnly>
          <div className="flex items-center justify-center gap-2 text-[#fbbf24] font-medium mb-3">
            <Lightbulb className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm text-slate-500">
              {data.tagline}
            </span>
          </div>
          <Heading2 className="text-secondary">{data.title}</Heading2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.blogs.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl overflow-hidden bg-secondary border border-white/10 hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 relative group/card"
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
                <div className="absolute top-4 right-4 bg-[#fcd34d] rounded-full w-14 h-14 flex flex-col items-center justify-center text-secondary font-bold z-10 border-4 border-secondary/20">
                  <span className="text-lg leading-none">{item.date}</span>
                  <span className="text-[10px] uppercase leading-none">
                    {item.month}
                  </span>
                </div>
              </div>

              <AdminOnly>
                <button
                  onClick={() => handleEditItem(item)}
                  className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-secondary transition-all z-20 hover:bg-white shadow-md hover:scale-110"
                  title="Edit Post"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </AdminOnly>

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

      <ServicesBlogHeaderModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        initialData={{ tagline: data.tagline, title: data.title }}
        onUpdate={handleUpdateHeader}
        isLoading={isUpdating}
      />

      <ServicesBlogModal
        isOpen={isItemModalOpen}
        onClose={() => setIsItemModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        isLoading={isUpdating}
      />
    </section>
  );
}
