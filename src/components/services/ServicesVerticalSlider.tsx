"use client";

import { useState } from "react";
import { ArrowRight, Plus, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Heading3 from "../common/Headings/Heading3";
import { Button } from "../ui/button";
import AdminOnly from "../common/auth/AdminOnly";
import ServiceSliderItemModal from "../modal/services/ServiceSliderItemModal";
import ServicesSliderHeaderModal from "../modal/services/ServicesSliderHeaderModal";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "@/actions/project.actions";
import {
  ServiceSliderItem,
  ServiceSliderFormData,
  ServiceSliderHeaderFormData,
} from "@/schemas/services/slider.schema";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";
import { useEffect } from "react";

const initialProjects = [
  {
    id: 1,
    category: "Eco Friendly",
    title: "Environment For Best People",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7e?auto=format&fit=crop&q=80&w=1200",
    number: "01",
  },
  {
    id: 2,
    category: "Green Energy",
    title: "Eco Friendly Global System",
    image:
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=1200",
    number: "02",
  },
  {
    id: "3",
    category: "Recycling",
    title: "The Power of Energy",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200",
    number: "03",
  },
];

export default function ServicesVerticalSlider() {
  const [headerData, setHeaderData] = useState({
    title: "Our Latest Projects",
  });
  const [projects, setProjects] = useState<any[]>([]);

  console.log("projects",projects)

  const [isHeaderModalOpen, setIsHeaderModalOpen] = useState(false);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | undefined>(
    undefined,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // 1. Fetch Header from SiteSettings
      const settingsRes = await getSettingsMap("home");
      if (settingsRes.success && settingsRes.data.home_project_header) {
        setHeaderData(settingsRes.data.home_project_header.value);
      }

      // 2. Fetch Projects from Project table
      const projectRes = await getAllProjects();
      if (projectRes.success) {
        // Handle both simple array and paginated response { data, meta }
        const projectList = Array.isArray(projectRes.data) 
          ? projectRes.data 
          : projectRes.data?.data;
          
        setProjects(projectList || []);
      } else {
        // Fallback to initial projects if database is empty or error
        setProjects(initialProjects);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    setEditingItem(undefined);
    setIsItemModalOpen(true);
  };

  const handleEditItem = (item: any) => {
    setEditingItem(item);
    setIsItemModalOpen(true);
  };

  const handleSaveItem = async (updatedItem: any) => {
    setIsUpdating(true);
    try {
      let res;
      if (editingItem?.id && typeof editingItem.id === 'string' && editingItem.id.length > 5) {
        // Update existing project in DB
        res = await updateProject(editingItem.id, updatedItem);
      } else {
        // Create new project in DB
        // Remove temporary ID if it exists
        const { id, ...payload } = updatedItem;
        res = await createProject(payload);
      }
      
      if (res.success) {
        // Refresh project list
        const refreshRes = await getAllProjects();
        if (refreshRes.success) {
          setProjects(refreshRes.data);
        }
        setIsItemModalOpen(false);
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
      if (typeof editingItem.id === 'string' && editingItem.id.length > 5) {
        const res = await deleteProject(editingItem.id);
        if (res.success) {
          setProjects(prev => prev.filter(p => p.id !== editingItem.id));
        }
      } else {
        // Local delete for initial mock data
        setProjects(prev => prev.filter(p => p.id !== editingItem.id));
      }
      setIsItemModalOpen(false);
      setEditingItem(undefined);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateHeader = async (headerFormData: ServiceSliderHeaderFormData) => {
    setIsUpdating(true);
    try {
      const res = await upsertSetting({
        key: "home_project_header",
        value: headerFormData,
        group: "home",
        description: "Homepage Project Section Header",
      });
      if (res.success) {
        setHeaderData(headerFormData);
        setIsHeaderModalOpen(false);
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const displayProjects = projects.length > 0 ? projects : initialProjects;

  return (
    <section className="bg-white py-6 md:py-8 lg:py-12 group/section relative">
      <div className="main-container px-4 md:px-6 relative">
        <AdminOnly>
          <button
            onClick={() => setIsHeaderModalOpen(true)}
            className="absolute top-0 right-4 md:right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-secondary/10 border border-secondary/20 text-secondary opacity-0 group-hover/section:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
            title="Edit Header"
          >
            <Edit className="w-4 h-4" />
          </button>
        </AdminOnly>

        <div className="flex justify-between items-center mb-8">
          <Heading3 className="text-2xl font-bold text-secondary">
            {headerData.title}
          </Heading3>
          <AdminOnly>
            <Button
              onClick={handleAddItem}
              className="bg-secondary hover:bg-secondary/90 text-white gap-2 font-bold"
            >
              <Plus className="w-4 h-4" /> Add Project
            </Button>
          </AdminOnly>
        </div>

        {/* Sticky Container */}
        <div className="flex flex-col gap-10">
          {displayProjects.map((item, index) => (
            <div
              key={item.id}
              className="sticky top-20 md:top-32 w-full group/card"
              style={{ zIndex: index + 1 }}
            >
              <div className="bg-secondary border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row min-h-[450px] md:h-[300px] lg:h-[350px] relative ">
                <AdminOnly>
                  <button
                    onClick={() => handleEditItem(item)}
                    className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white text-secondary opacity-0 group-hover/card:opacity-100 transition-all hover:bg-white hover:text-secondary shadow-lg"
                    title="Edit Project"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </AdminOnly>

                {/* Left Side: Image */}
                <div className="w-full md:w-1/2 h-[250px] md:h-full relative overflow-hidden group/img">
                  <Image
                    src={item.image || "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b7e?auto=format&fit=crop&q=80&w=1200"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover/img:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-secondary/10 group-hover/img:bg-transparent transition-colors duration-500" />
                </div>

                {/* Right Side: Content */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative">
                  <div className="flex items-center gap-3 mb-4 text-[#ffffff]/70">
                    <div className="h-px w-8 bg-primary" />
                    <span className="text-xs font-bold uppercase tracking-widest ">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    {item.title}
                  </h3>

                  {item.description && (
                    <p className="text-white/70 text-sm md:text-base mb-8 line-clamp-4">
                      {item.description}
                    </p>
                  )}

                  <Link 
                    href={`/projects/${item.slug || item.id}`}
                    className="flex items-center group/btn w-fit"
                  >
                    <span className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-secondary transition-all duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </span>
                    <span className="ml-4 text-white font-bold text-sm tracking-wide opacity-0 -translate-x-4 group-hover/btn:opacity-100 group-hover/btn:translate-x-0 transition-all duration-500">
                      LEARN MORE
                    </span>
                  </Link>

                  {/* Background Number */}
                  <div className="absolute bottom-2 right-6 text-[#ffffff]/5 text-6xl md:text-8xl font-black select-none pointer-events-none">
                    {item.number}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServicesSliderHeaderModal
        isOpen={isHeaderModalOpen}
        onClose={() => setIsHeaderModalOpen(false)}
        initialData={{ title: headerData.title }}
        onUpdate={handleUpdateHeader}
        isLoading={isUpdating}
      />

      <ServiceSliderItemModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
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
