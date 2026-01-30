"use client";

import { useState } from "react";
import Image from "next/image";
import Pagination from "../common/Pagination";

const showcaseData = [
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
  {
    id: 6,
    number: "06",
    title: "Green Energy",
    description:
      "Transitioning to renewable energy sources for a cleaner future.",
    image:
      "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 7,
    number: "07",
    title: "Ocean Cleanup",
    description: "Large scale operations to remove plastics from our oceans.",
    image:
      "https://images.unsplash.com/photo-1621451537084-482c73073a0f?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 8,
    number: "08",
    title: "Solar Installation",
    description: "Installing solar panels to harness the power of the sun.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop",
  },
  {
    id: 9,
    number: "09",
    title: "Tree Planting",
    description: "Reforestation efforts to combat climate change globally.",
    image:
      "https://images.unsplash.com/photo-1576085898323-218337e3e43c?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 10,
    number: "10",
    title: "Sustainable Farming",
    description: "Promoting organic farming practices for better health.",
    image:
      "https://images.unsplash.com/photo-1625246333195-098e47580d19?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 11,
    number: "11",
    title: "Urban Gardening",
    description: "Creating green spaces within concrete jungles.",
    image:
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 12,
    number: "12",
    title: "Water Conservation",
    description:
      "Techniques and technologies to save our most precious resource.",
    image:
      "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 13,
    number: "13",
    title: "Wind Energy",
    description: "Harnessing wind power as a sustainable energy alternative.",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop",
  },
  {
    id: 14,
    number: "14",
    title: "Wildlife Protection",
    description: "Preserving habitats for endangered species worldwide.",
    image:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=2672&auto=format&fit=crop",
  },
  {
    id: 15,
    number: "15",
    title: "Composting",
    description: "Turning organic waste into nutrient-rich soil.",
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=2832&auto=format&fit=crop",
  },
  {
    id: 16,
    number: "16",
    title: "Beekeeping",
    description: "Supporting bee populations crucial for our ecosystem.",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=2680&auto=format&fit=crop",
  },
  {
    id: 17,
    number: "17",
    title: "Electric Vehicles",
    description: "Promoting the adoption of clean electric transportation.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2672&auto=format&fit=crop",
  },
  {
    id: 18,
    number: "18",
    title: "Green Architecture",
    description: "Designing buildings that are environmentally responsible.",
    image:
      "https://images.unsplash.com/photo-1518005052357-e9871950f393?q=80&w=2669&auto=format&fit=crop",
  },
  {
    id: 19,
    number: "19",
    title: "Plastic Free",
    description: "Initiatives to reduce single-use plastics in daily life.",
    image:
      "https://images.unsplash.com/photo-1618477461853-56e979f58319?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 20,
    number: "20",
    title: "Climate Action",
    description: "Advocating for policies that protect our climate.",
    image:
      "https://images.unsplash.com/photo-1623851722837-25c276536f34?q=80&w=2670&auto=format&fit=crop",
  },
];

export default function BlogShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(showcaseData.length / itemsPerPage);
  const currentItems = showcaseData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Optional: Scroll to top of section
    // document.getElementById("blog-showcase")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="blog-showcase" className="pb-20 bg-white">
      <div className="main-container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden"
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
        <div className="mt-12 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </section>
  );
}
