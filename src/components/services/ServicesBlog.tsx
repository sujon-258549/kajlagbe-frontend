"use client";

import { useState } from "react";
import { ArrowRight, User, Tag, Lightbulb, Edit, Plus } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import Heading5 from "../common/Headings/Heading5";
import AdminOnly from "../common/auth/AdminOnly";
import { Button } from "@/components/ui/button";
import ServicesBlogModal, {
  BlogItem,
} from "../modal/services/ServicesBlogModal";

const initialBlogs = [
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
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogItem | undefined>(
    undefined,
  );

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: BlogItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (data: BlogItem) => {
    if (editingItem) {
      setBlogs((prev) =>
        prev.map((item) => (item.id === editingItem.id ? data : item)),
      );
    } else {
      setBlogs((prev) => [{ ...data, id: Date.now() }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = () => {
    if (editingItem) {
      setBlogs((prev) => prev.filter((item) => item.id !== editingItem.id));
      setIsModalOpen(false);
    }
  };

  return (
    <section className="py-20 bg-white relative group/section">
      <div className="main-container relative">
        <div className="absolute top-0 right-0 z-50">
          <AdminOnly>
            <Button
              onClick={handleAddItem}
              className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold mb-8 w-full md:w-auto"
            >
              <Plus className="w-4 h-4" /> Add Post
            </Button>
          </AdminOnly>
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-[#fbbf24] font-medium mb-3">
            <Lightbulb className="w-5 h-5" />
            <span className="uppercase tracking-wider text-sm text-slate-500">
              News & Blog
            </span>
          </div>
          <Heading2 className="text-secondary">Our Daily Update</Heading2>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((item) => (
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
                  className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 text-secondary opacity-0 group-hover/card:opacity-100 transition-all z-20 hover:bg-white shadow-md"
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
      <ServicesBlogModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />
    </section>
  );
}
