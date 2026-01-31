"use client";

import { useState } from "react";
import Image from "next/image";
import Pagination from "../common/Pagination";
import { Edit, Plus } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import BlogShowcaseItemModal from "../modal/blog/BlogShowcaseItemModal";
import { BlogShowcaseItem } from "@/schemas/blog/showcase.schema";
import { Button } from "@/components/ui/button";

const initialShowcaseData = [
  {
    id: 1,
    number: "01",
    title: "Forest Cleaning",
    description: "Volunteers gathering to clean up the local forest preserves.",
    image:
      "https://images.unsplash.com/photo-1611270418597-a6c77f4b7271?q=80&w=2598&auto=format&fit=crop",
  },
  {
    id: 2,
    number: "02",
    title: "Waste Management",
    description: "Implementing smarter waste disposal systems for cities.",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=2664&auto=format&fit=crop",
  },
  {
    id: 3,
    number: "03",
    title: "Eco Planning",
    description: "Strategic urban planning focused on sustainability.",
    image:
      "https://images.unsplash.com/photo-1595278069441-2cf29f8005a4?q=80&w=2671&auto=format&fit=crop",
  },
  {
    id: 4,
    number: "04",
    title: "Recycling Plant",
    description:
      "Modern facilities dedicated to processing recyclable materials.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7e?q=80&w=2662&auto=format&fit=crop",
  },
  {
    id: 5,
    number: "05",
    title: "Community Work",
    description: "Engaging local communities in environmental initiatives.",
    image:
      "https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?q=80&w=2671&auto=format&fit=crop",
  },
];

export default function BlogShowcase() {
  const [items, setItems] = useState<BlogShowcaseItem[]>(initialShowcaseData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<BlogShowcaseItem | undefined>(
    undefined,
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsModalOpen(true);
  };

  const handleEditItem = (item: BlogShowcaseItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (data: BlogShowcaseItem) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? data : item)),
      );
    } else {
      setItems((prev) => [{ ...data, id: Date.now() }, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = () => {
    if (editingItem) {
      setItems((prev) => prev.filter((item) => item.id !== editingItem.id));
      setIsModalOpen(false);
    }
  };

  return (
    <section
      id="blog-showcase"
      className="py-10 md:py-16 lg:py-24 bg-white font-outfit relative group/section"
    >
      <div className="main-container relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-secondary">
            Our Impact Gallery
          </h2>
          <AdminOnly>
            <Button
              onClick={handleAddItem}
              className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold"
            >
              <Plus className="w-4 h-4" /> Add Item
            </Button>
          </AdminOnly>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg"
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

              {/* Number Badge */}
              <div className="absolute top-6 right-6 z-10">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold">
                  No - {item.number}
                </span>
              </div>

              {/* Edit Button */}
              <AdminOnly>
                <button
                  onClick={() => handleEditItem(item)}
                  className="absolute top-6 left-6 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/80 text-white opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-secondary shadow-lg border border-white/20"
                  title="Edit Item"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </AdminOnly>

              {/* Content Box */}
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
                <div className="bg-[#1a2e28]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 transform translate-y-2 transition-transform duration-500 hover:-translate-y-1">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2 md:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex -mt-10 md:-mt-1 justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <BlogShowcaseItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
      />
    </section>
  );
}
