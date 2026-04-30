"use client";

import React, { useState, useEffect, useCallback } from "react";
import Heading4 from "@/components/common/Headings/Heading4";
import {
  Folder as FolderIcon,
  Plus,
  Upload,
  ChevronRight,
  MoreVertical,
  Trash2,
  Home,
  RotateCw,
  Search,
  Grid,
  List as ListIcon,
  Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateFolderModal from "@/components/modal/media/CreateFolderModal";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { 
  getImages, 
  getAllFolders, 
  createFolder, 
  deleteImage, 
  deleteFolder, 
  uploadImage 
} from "@/actions/media.actions";
import { TFolder, TMediaImage } from "@/types/media";
import { uploadMediaImage } from "@/lib/imageUpload";
import { cn } from "@/lib/utils";

export default function MediaLibrary() {
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [folders, setFolders] = useState<TFolder[]>([]);
  const [images, setImages] = useState<TMediaImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFolderModalOpen, setIsFolderModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchFolders = useCallback(async () => {
    try {
      const res = await getAllFolders();
      if (res.success) {
        setFolders(res.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch folders", err);
    }
  }, []);

  const fetchImages = useCallback(async (folderId: string | null) => {
    setIsLoading(true);
    try {
      const res = await getImages(folderId);
      if (res.success) {
        setImages(res.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFolders();
    fetchImages(currentFolderId);
  }, [currentFolderId, fetchFolders, fetchImages]);

  const folderById = React.useMemo(() => {
    const map = new Map<string, TFolder>();
    folders.forEach((f) => map.set(f.id, f));
    return map;
  }, [folders]);

  const breadcrumbs = React.useMemo(() => {
    if (!currentFolderId) return [];
    const path: { id: string; name: string }[] = [];
    let node: TFolder | null | undefined = folderById.get(currentFolderId);
    while (node) {
      path.unshift({ id: node.id, name: node.name });
      node = node.parentId ? folderById.get(node.parentId) : undefined;
    }
    return path;
  }, [currentFolderId, folderById]);

  const currentFolders = folders.filter(
    (f) => (f.parentId || null) === (currentFolderId || null)
  );

  const filteredImages = images.filter(img => 
    img.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateFolder = async (data: { name: string }) => {
    try {
      const res = await createFolder({
        name: data.name,
        parentId: currentFolderId,
      });
      if (res.success) {
        fetchFolders();
      }
    } catch (err) {
      console.error("Failed to create folder", err);
    }
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    setUploading(true);
    try {
      for (const file of files) {
        await uploadMediaImage(file, currentFolderId, (payload) => uploadImage(payload));
      }
      fetchImages(currentFolderId);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        const res = await deleteImage(id);
        if (res.success) fetchImages(currentFolderId);
      } catch (err) {
        console.error("Failed to delete image", err);
      }
    }
  };

  const handleDeleteFolder = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this folder and its contents?")) {
      try {
        const res = await deleteFolder(id);
        if (res.success) fetchFolders();
      } catch (err) {
        console.error("Failed to delete folder", err);
      }
    }
  };

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
        <div className="space-y-1">
          <Heading4 className="text-secondary font-black tracking-tight">Digital Assets</Heading4>
          <div className="flex items-center text-xs text-slate-400 font-bold uppercase tracking-wider">
            <button
              onClick={() => setCurrentFolderId(null)}
              className="hover:text-secondary flex items-center gap-1.5 transition-colors group"
            >
              <Home className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              Root
            </button>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.id}>
                <ChevronRight className="w-3 h-3 mx-2 text-slate-300" />
                <button
                  onClick={() => setCurrentFolderId(crumb.id)}
                  className={cn(
                    "hover:text-secondary transition-colors",
                    idx === breadcrumbs.length - 1 ? "text-secondary" : ""
                  )}
                >
                  {crumb.name}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 pl-10 pr-4 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-secondary/20 focus:bg-white transition-all w-full sm:w-64 font-medium"
            />
          </div>
          <div className="h-10 w-[1px] bg-slate-100 mx-1 hidden sm:block" />
          <Button
            variant="outline"
            onClick={() => setIsFolderModalOpen(true)}
            className="h-10 px-4 flex items-center gap-2 border-slate-200 hover:border-secondary hover:text-secondary rounded-xl font-bold text-sm"
          >
            <Plus className="w-4 h-4" />
            New Folder
          </Button>
          <Button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="h-10 px-5 bg-secondary hover:bg-secondary/90 text-white flex items-center gap-2 rounded-xl font-bold text-sm shadow-lg shadow-secondary/20 active:scale-95 transition-all"
          >
            {uploading ? <RotateCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? "Uploading..." : "Upload Assets"}
          </Button>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={handleUploadImage}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 min-h-[600px] shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
        {/* Sub Toolbar */}
        <div className="px-8 py-4 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-2">Display</span>
            <button 
              onClick={() => setViewMode("grid")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "grid" ? "bg-secondary/10 text-secondary" : "text-slate-400 hover:bg-slate-50"
              )}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn(
                "p-2 rounded-lg transition-all",
                viewMode === "list" ? "bg-secondary/10 text-secondary" : "text-slate-400 hover:bg-slate-50"
              )}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-slate-400 hover:text-secondary font-bold text-xs"
            onClick={() => { fetchFolders(); fetchImages(currentFolderId); }}
          >
            <RotateCw className="w-3.5 h-3.5 mr-2" />
            Sync Library
          </Button>
        </div>

        <div className="p-8 flex-1">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
              {[...Array(16)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-2xl" />
              ))}
            </div>
          ) : currentFolders.length === 0 && filteredImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <div className="w-24 h-24 rounded-full bg-slate-50 flex items-center justify-center mb-6 ring-8 ring-slate-50/50">
                <FolderIcon className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-lg font-black text-slate-800">Your digital library is empty</h3>
              <p className="text-slate-400 max-w-sm mt-2 text-sm font-medium leading-relaxed">
                Start organizing your assets by creating folders or uploading high-quality images.
              </p>
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                className="mt-8 bg-secondary text-white hover:bg-secondary/90 rounded-xl px-8"
              >
                Upload First Asset
              </Button>
            </div>
          ) : (
            <div className={cn(
              viewMode === "grid" 
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6"
                : "flex flex-col gap-2"
            )}>
              {/* Folders */}
              {currentFolders.map((folder) => (
                <div
                  key={folder.id}
                  className={cn(
                    "group relative transition-all duration-300",
                    viewMode === "grid" 
                      ? "flex flex-col items-center space-y-3 p-4 rounded-2xl hover:bg-secondary/5 border border-transparent hover:border-secondary/10 cursor-pointer"
                      : "flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/5 border-b border-slate-50"
                  )}
                  onDoubleClick={() => setCurrentFolderId(folder.id)}
                >
                  <div className={cn(
                    "rounded-2xl flex items-center justify-center transition-all duration-500",
                    viewMode === "grid" 
                      ? "w-full aspect-square bg-amber-50 text-amber-500 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-amber-500/10"
                      : "w-10 h-10 bg-amber-50 text-amber-500"
                  )}>
                    <FolderIcon className={cn(viewMode === "grid" ? "w-12 h-12" : "w-5 h-5", "fill-current opacity-80")} />
                  </div>

                  <div className={cn(viewMode === "grid" ? "text-center" : "flex-1")}>
                    <span className="text-xs font-black text-slate-700 block truncate max-w-[120px]">
                      {folder.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Folder</span>
                  </div>

                  <div className={cn(
                    "absolute top-2 right-2 transition-all duration-300",
                    viewMode === "grid" ? "opacity-0 group-hover:opacity-100" : "relative top-0 right-0"
                  )}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-sm hover:border-secondary transition-colors">
                          <MoreVertical className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl">
                        <DropdownMenuItem
                          onClick={() => handleDeleteFolder(folder.id)}
                          className="text-red-600 flex items-center gap-2.5 p-2 rounded-lg focus:bg-red-50 focus:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="font-bold">Delete Folder</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}

              {/* Images */}
              {filteredImages.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "group relative transition-all duration-300",
                    viewMode === "grid" 
                      ? "flex flex-col items-center space-y-3 p-4 rounded-2xl hover:bg-secondary/5 border border-transparent hover:border-secondary/10 cursor-pointer"
                      : "flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/5 border-b border-slate-50"
                  )}
                >
                  <div className={cn(
                    "rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 flex items-center justify-center transition-all duration-500",
                    viewMode === "grid" 
                      ? "w-full aspect-square group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-secondary/10"
                      : "w-10 h-10"
                  )}>
                    {item.url ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={item.url}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    ) : (
                      <ImageIcon className="w-6 h-6 text-slate-300" />
                    )}
                  </div>

                  <div className={cn(viewMode === "grid" ? "text-center" : "flex-1")}>
                    <span className="text-xs font-black text-slate-700 block truncate max-w-[120px]">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Image</span>
                  </div>

                  <div className={cn(
                    "absolute top-2 right-2 transition-all duration-300",
                    viewMode === "grid" ? "opacity-0 group-hover:opacity-100" : "relative top-0 right-0"
                  )}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-1.5 rounded-lg bg-white border border-slate-100 shadow-sm hover:border-secondary transition-colors">
                          <MoreVertical className="w-3.5 h-3.5 text-slate-600" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 p-1.5 rounded-xl">
                        <DropdownMenuItem
                          onClick={() => window.open(item.url, '_blank')}
                          className="flex items-center gap-2.5 p-2 rounded-lg font-bold text-slate-700"
                        >
                          <ImageIcon className="w-4 h-4" />
                          View Original
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteImage(item.id)}
                          className="text-red-600 flex items-center gap-2.5 p-2 rounded-lg focus:bg-red-50 focus:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="font-bold">Delete Item</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <CreateFolderModal
        isOpen={isFolderModalOpen}
        onClose={() => setIsFolderModalOpen(false)}
        onSave={handleCreateFolder}
        parentId={currentFolderId}
      />
    </div>
  );
}
