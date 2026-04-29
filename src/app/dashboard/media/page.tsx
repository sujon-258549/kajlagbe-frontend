"use client";

import React, { useState, useEffect } from "react";
import Heading4 from "@/components/common/Headings/Heading4";
import {
  Folder,
  FileImage,
  Plus,
  Upload,
  ChevronRight,
  MoreVertical,
  Trash2,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateFolderModal from "@/components/modal/media/CreateFolderModal";
import UploadImageModal from "@/components/modal/media/UploadImageModal";
import Image from "next/image";

interface MediaItem {
  id: string;
  name: string;
  type: "folder" | "image";
  url?: string;
  createdAt: string;
}

export default function MediaLibrary() {
  const [currentFolder, setCurrentFolder] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string; name: string }[]
  >([]);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for initial structure
  useEffect(() => {
    fetchItems();
  }, [currentFolder]);

  const fetchItems = async () => {
    setIsLoading(true);
    // In a real app, this would be an API call
    // await axios.get(`/media/folders?parentId=${currentFolder?.id || 'root'}`)

    // Placeholder mock data
    setTimeout(() => {
      const mockItems: MediaItem[] = [
        { id: "1", name: "Documents", type: "folder", createdAt: "2024-01-01" },
        { id: "2", name: "Images", type: "folder", createdAt: "2024-01-02" },
        {
          id: "3",
          name: "Work Assets",
          type: "folder",
          createdAt: "2024-01-03",
        },
        {
          id: "4",
          name: "banner.png",
          type: "image",
          url: "https://placehold.co/600x400",
          createdAt: "2024-01-04",
        },
      ];
      setItems(mockItems);
      setIsLoading(false);
    }, 500);
  };

  const navigateToFolder = (id: string, name: string) => {
    const newBreadcrumb = { id, name };
    setBreadcrumbs([...breadcrumbs, newBreadcrumb]);
    setCurrentFolder(newBreadcrumb);
  };

  const navigateToBreadcrumb = (index: number) => {
    if (index === -1) {
      setBreadcrumbs([]);
      setCurrentFolder(null);
    } else {
      const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
      setBreadcrumbs(newBreadcrumbs);
      setCurrentFolder(newBreadcrumbs[newBreadcrumbs.length - 1]);
    }
  };

  const handleCreateFolder = (data: { name: string }) => {
    console.log(
      "Creating folder:",
      data.name,
      "under",
      currentFolder?.id || "root",
    );
    // API call here
    const newItem: MediaItem = {
      id: Math.random().toString(),
      name: data.name,
      type: "folder",
      createdAt: new Date().toISOString(),
    };
    setItems([newItem, ...items]);
  };

  const handleUploadImage = (data: { name: string; url: string }) => {
    console.log(
      "Uploading image:",
      data.name,
      "to",
      currentFolder?.id || "root",
    );
    // API call here
    const newItem: MediaItem = {
      id: Math.random().toString(),
      name: data.name,
      type: "image",
      url: data.url,
      createdAt: new Date().toISOString(),
    };
    setItems([newItem, ...items]);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Heading4>Media Library</Heading4>
          <div className="flex items-center text-sm text-slate-500 font-medium">
            <button
              onClick={() => navigateToBreadcrumb(-1)}
              className="hover:text-secondary flex items-center gap-1 transition-colors"
            >
              <Home className="w-4 h-4" />
              Root
            </button>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.id}>
                <ChevronRight className="w-4 h-4 mx-1 text-slate-300" />
                <button
                  onClick={() => navigateToBreadcrumb(idx)}
                  className={`hover:text-secondary transition-colors ${idx === breadcrumbs.length - 1 ? "text-secondary font-bold" : ""}`}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsFolderModalOpen(true)}
            className="flex items-center gap-2 border-slate-200"
          >
            <Plus className="w-4 h-4" />
            New Folder
          </Button>
          <Button
            onClick={() => setIsUploadModalOpen(true)}
            className="bg-secondary hover:bg-secondary/90 text-white flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 min-h-[500px] p-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-slate-400 space-y-4">
            <Folder className="w-16 h-16 opacity-20" />
            <p className="font-medium text-lg">This folder is empty</p>
            <Button
              variant="ghost"
              onClick={() => setIsUploadModalOpen(true)}
              className="text-secondary"
            >
              Upload your first file
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col items-center space-y-2 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100 cursor-pointer"
                onDoubleClick={() =>
                  item.type === "folder" && navigateToFolder(item.id, item.name)
                }
              >
                {/* Actions Menu */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-md hover:bg-white border border-slate-100 shadow-sm bg-white/80">
                        <MoreVertical className="w-3.5 h-3.5 text-slate-600" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* Icon or Preview */}
                <div
                  className={`w-full aspect-square rounded-lg flex items-center justify-center transition-transform group-hover:scale-95 ${item.type === "folder" ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"}`}
                >
                  {item.type === "folder" ? (
                    <Folder className="w-12 h-12 fill-current" />
                  ) : item.url ? (
                    <div className="relative w-full h-full rounded-lg overflow-hidden border border-slate-100">
                      <Image
                        src={item.url}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <FileImage className="w-12 h-12" />
                  )}
                </div>

                <span className="text-xs font-bold text-slate-700 text-center truncate w-full px-1">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onSave={handleCreateFolder}
        parentId={currentFolder?.id}
      />
      <UploadImageModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSave={handleUploadImage}
        parentId={currentFolder?.id}
      />
    </div>
  );
}
