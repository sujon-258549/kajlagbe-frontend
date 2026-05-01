"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Pagination from "../common/Pagination";
import { Edit, Plus, ImageIcon } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import BlogShowcaseItemModal from "../modal/blog/BlogShowcaseItemModal";
import { BlogShowcaseItem } from "@/schemas/blog/showcase.schema";
import { Button } from "@/components/ui/button";
import {
  getAllGalleries,
  createGallery,
  updateGallery,
  deleteGallery,
} from "@/actions/gallery.actions";

export default function BlogShowcase() {
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllGalleries();
      if (res.success) {
        const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
        setItems(list);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

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

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const refresh = async () => {
    const res = await getAllGalleries();
    if (res.success) {
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      setItems(list);
    }
  };

  const handleSaveItem = async (data: BlogShowcaseItem) => {
    setIsUpdating(true);
    try {
      const payload = {
        title: data.title,
        description: data.description,
        image: data.image,
        imageId: data.imageId || undefined,
        number: data.number,
      };

      let res;
      if (editingItem?.id && typeof editingItem.id === "string") {
        res = await updateGallery(editingItem.id, payload);
      } else {
        res = await createGallery(payload);
      }

      if (res.success) {
        await refresh();
        setIsModalOpen(false);
        setEditingItem(undefined);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!editingItem?.id) return;
    setIsUpdating(true);
    try {
      const res = await deleteGallery(editingItem.id);
      if (res.success) {
        setItems((prev) => prev.filter((p) => p.id !== editingItem.id));
        setIsModalOpen(false);
        setEditingItem(undefined);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <section
      id="gallery"
      className="py-6 md:py-8 lg:py-12 bg-white font-outfit relative group/section"
    >
      <div className="main-container relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary">
            Our Impact Gallery
          </h2>
          <AdminOnly>
            <Button
              onClick={handleAddItem}
              className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold w-fit"
            >
              <Plus className="w-4 h-4" /> Add Item
            </Button>
          </AdminOnly>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[280px] sm:h-[320px] md:h-[400px] rounded-3xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4 rounded-3xl border border-dashed border-slate-200 bg-slate-50/40 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary/10 flex items-center justify-center mb-5">
              <ImageIcon className="w-7 h-7 md:w-8 md:h-8 text-secondary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-secondary mb-2">
              No gallery items yet
            </h3>
            <p className="text-slate-500 text-sm md:text-base max-w-md">
              Showcase your impact by adding photos and stories to the gallery.
            </p>
            <AdminOnly>
              <Button
                onClick={handleAddItem}
                className="mt-6 bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold"
              >
                <Plus className="w-4 h-4" /> Add First Item
              </Button>
            </AdminOnly>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
            {currentItems.map((item) => (
              <div
                key={item.id}
                className="group relative h-[280px] sm:h-[340px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg"
              >
                <Image
                  src={
                    item.imageRel?.url ||
                    item.image ||
                    "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200"
                  }
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
                  <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs md:text-sm font-bold">
                    No - {item.number}
                  </span>
                </div>

                <AdminOnly>
                  <button
                    onClick={() => handleEditItem(item)}
                    className="absolute top-4 left-4 md:top-6 md:left-6 w-8 h-8 flex items-center justify-center rounded-full bg-secondary/80 text-white opacity-0 group-hover:opacity-100 transition-all z-20 hover:bg-secondary shadow-lg border border-white/20"
                    title="Edit Item"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </AdminOnly>

                <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-auto md:max-w-md">
                  <div className="bg-[#1a2e28]/80 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 transform translate-y-2 transition-transform duration-500 hover:-translate-y-1">
                    <h3 className="text-lg md:text-2xl font-bold text-white mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center">
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(undefined);
        }}
        item={editingItem}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        isLoading={isUpdating}
      />
    </section>
  );
}
