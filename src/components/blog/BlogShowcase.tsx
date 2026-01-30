"use client";

import { useState } from "react";
import Image from "next/image";
import Pagination from "../common/Pagination";
import { Edit } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import BlogShowcaseModal from "../modal/blog/BlogShowcaseModal";
import { BlogShowcaseFormData } from "@/schemas/blog/showcase.schema";

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
  const [data, setData] = useState<BlogShowcaseFormData>({
    items: initialShowcaseData,
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(data.items.length / itemsPerPage);
  const currentItems = data.items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section
      id="blog-showcase"
      className="py-10 md:py-16 lg:py-24 bg-white font-outfit relative group/section"
    >
      <div className="main-container relative">
        {/* Edit Button */}
        <AdminOnly>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="absolute top-0 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all z-50 hover:bg-secondary hover:text-white"
            title="Edit Showcase"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

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
              <div className="absolute top-6 right-6">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-bold">
                  No - {item.number}
                </span>
              </div>

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
          <div className="flex justify-center">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

      <AdminOnly>
        <BlogShowcaseModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialData={data}
          onUpdate={(newData: BlogShowcaseFormData) => setData(newData)}
        />
      </AdminOnly>
    </section>
  );
}
