"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { 
  Upload, 
  RotateCw, 
  ArrowUp, 
  Folder, 
  Image as ImageIcon, 
  FolderPlus,
  Loader2,
  X,
  CheckCircle2
} from "lucide-react";
import CommonModal from "../common/CommonModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TFolder, TMediaImage } from "@/types/media";
import { getAllFolders, getImages, uploadImage, createFolder } from "@/actions/media.actions";
import { uploadMediaImage } from "@/lib/imageUpload";
import { cn } from "@/lib/utils";
import CreateFolderModal from "./CreateFolderModal";
import Image from "next/image";

export type MediaLibraryPickerModalProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Selected rows from the media library (after user clicks OK). */
  onConfirm: (images: TMediaImage[]) => void;
  /** Allow more than one image. */
  multiple?: boolean;
  /** When `multiple` is true, cap selection (omit for unlimited). */
  maxSelection?: number;
  title?: string;
  okText?: string;
};

const parentKey = (id: string | null | undefined) =>
  id == null || id === "" ? null : id;

export default function MediaLibraryPickerModal({
  isOpen,
  onClose,
  onConfirm,
  multiple = true,
  maxSelection,
  title = "Media Library",
  okText = "Use selected",
}: MediaLibraryPickerModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [foldersLoading, setFoldersLoading] = useState(false);
  
  const [folders, setFolders] = useState<TFolder[]>([]);
  const [libraryImages, setLibraryImages] = useState<TMediaImage[]>([]);
  const [pendingUploaded, setPendingUploaded] = useState<TMediaImage[]>([]);
  const [isCreateFolderOpen, setIsCreateFolderOpen] = useState(false);

  console.log("pendingUploaded", folders)

  const fetchFolders = useCallback(async () => {
    setFoldersLoading(true);
    try {
      const res = await getAllFolders();
      console.log(" getAllFolders", res)
      if (res.success) {
        const data = res.data as any;
        if (Array.isArray(data)) {
          setFolders(data);
        } else if (data && typeof data === "object" && Array.isArray(data.folders)) {
          setFolders(data.folders);
        } else {
          setFolders([]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch folders", err);
      setFolders([]);
    } finally {
      setFoldersLoading(false);
    }
  }, []);

  const fetchImages = useCallback(async (folderId: string | null) => {
    setLoading(true);
    try {
      const res = await getImages(folderId);
      if (res.success) {
        const data = res.data as any;
        if (Array.isArray(data)) {
          setLibraryImages(data);
        } else if (data && typeof data === "object" && Array.isArray(data.images)) {
          setLibraryImages(data.images);
        } else {
          setLibraryImages([]);
        }
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
      setLibraryImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchFolders();
      fetchImages(currentFolderId);
    }
  }, [isOpen, currentFolderId, fetchFolders, fetchImages]);

  const folderById = useMemo(() => {
    const map = new Map<string, TFolder>();
    if (Array.isArray(folders)) {
      folders.forEach((f) => map.set(f.id, f));
    }
    return map;
  }, [folders]);

  const currentPath = useMemo(() => {
    if (!currentFolderId) return [];
    const path: TFolder[] = [];
    let node: TFolder | null | undefined = folderById.get(currentFolderId);
    while (node) {
      path.unshift(node);
      node = node.parentId ? folderById.get(node.parentId) : undefined;
    }
    return path;
  }, [currentFolderId, folderById]);

  const currentFolders = useMemo(
    () => {
      if (!Array.isArray(folders)) return [];
      return folders.filter(
        (f) => parentKey(f.parentId) === parentKey(currentFolderId),
      );
    },
    [folders, currentFolderId],
  );

  const parentFolder = currentFolderId ? folderById.get(currentFolderId) : null;

  useEffect(() => {
    setPendingUploaded((prev) =>
      prev.filter((p) => !libraryImages.some((img) => img.id === p.id)),
    );
  }, [libraryImages]);

  const displayLibraryImages = useMemo(() => {
    const cid = parentKey(currentFolderId);
    if (!Array.isArray(libraryImages)) return [];
    const ids = new Set(libraryImages.map((i) => i.id));
    const extra = (pendingUploaded || []).filter(
      (p) => parentKey(p.folderId) === cid && !ids.has(p.id),
    );
    return [...libraryImages, ...extra];
  }, [libraryImages, pendingUploaded, currentFolderId]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentFolderId(null);
      setSelectedIds(new Set());
      setPendingUploaded([]);
    }
  }, [isOpen]);

  const goToFolder = useCallback((id: string | null) => {
    setCurrentFolderId(id);
    setSelectedIds(new Set());
  }, []);

  const toggleImage = useCallback(
    (img: TMediaImage) => {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(img.id)) {
          next.delete(img.id);
          return next;
        }
        if (!multiple) {
          return new Set([img.id]);
        }
        if (maxSelection != null && next.size >= maxSelection) {
          return prev;
        }
        next.add(img.id);
        return next;
      });
    },
    [multiple, maxSelection],
  );

  const handlePickFiles = () => fileInputRef.current?.click();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const picked = input.files ? Array.from(input.files) : [];
    input.value = "";
    if (picked.length === 0) return;

    const imageFiles = picked.filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      return;
    }

    setUploading(true);
    let ok = 0;
    const newPendingRows: TMediaImage[] = [];
    
    try {
      for (const file of imageFiles) {
        try {
          const { result: res } = await uploadMediaImage(
            file,
            currentFolderId,
            (payload) => uploadImage(payload),
          );
          
          if (res.success) {
            const row = res.data;
            if (row) {
              newPendingRows.push(row);
            }
            ok += 1;
          }
        } catch (err) {
          console.error("Upload failed for file", file.name, err);
        }
      }
    } finally {
      setUploading(false);
    }

    if (ok > 0) {
      if (newPendingRows.length > 0) {
        setPendingUploaded((prev) => {
          const m = new Map([...prev, ...newPendingRows].map((r) => [r.id, r]));
          return [...m.values()];
        });
      }
      fetchFolders();
      fetchImages(currentFolderId);
    }
  };

  const handleCreateFolder = async (data: { name: string }) => {
    try {
      const res = await createFolder({
        name: data.name,
        parentId: currentFolderId || null,
      });
      if (res.success) {
        await fetchFolders();
      }
    } catch (err) {
      console.error("Failed to create folder", err);
    }
  };

  const handleConfirm = () => {
    const selected = displayLibraryImages.filter((img) => selectedIds.has(img.id));
    if (selected.length === 0) {
      return;
    }
    onConfirm(selected);
    onClose();
  };

  const handleRefresh = () => {
    fetchFolders();
    fetchImages(currentFolderId);
  };

  return (
    <>
      <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        maxWidth="5xl"
        className="!p-0"
        zIndex={2000}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          aria-hidden
          onChange={handleFileChange}
        />

        <div className="flex flex-col h-[70vh]">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 bg-gray-50/50 px-6 py-3 text-sm">
            <span className="font-semibold text-gray-700 shrink-0">Path:</span>
            <button
              type="button"
              className={cn(
                "rounded-md px-2 py-0.5 font-medium transition-colors",
                currentFolderId === null
                  ? "bg-secondary/10 text-secondary"
                  : "text-gray-600 hover:bg-gray-100 hover:text-secondary"
              )}
              onClick={() => goToFolder(null)}
            >
              All Folders
            </button>
            {currentPath.map((node) => (
              <span key={node.id} className="flex items-center gap-1 text-gray-400">
                <span>/</span>
                <button
                  type="button"
                  className={cn(
                    "rounded-md px-2 py-0.5 font-medium transition-colors",
                    currentFolderId === node.id
                      ? "bg-secondary/10 text-secondary"
                      : "text-gray-600 hover:bg-gray-100 hover:text-secondary"
                  )}
                  onClick={() => goToFolder(node.id)}
                >
                  {node.name}
                </button>
              </span>
            ))}
            
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs text-gray-500 mr-2">
                {selectedIds.size} selected
                {!multiple ? " (single)" : ""}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={handleRefresh}
              >
                <RotateCw className="w-3.5 h-3.5 mr-1.5" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8"
                onClick={() => goToFolder(parentFolder?.parentId ?? null)}
                disabled={!currentFolderId}
              >
                <ArrowUp className="w-3.5 h-3.5 mr-1.5" />
                Up
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 border-secondary/30 text-secondary hover:bg-secondary/5"
                onClick={() => setIsCreateFolderOpen(true)}
              >
                <FolderPlus className="w-3.5 h-3.5 mr-1.5" />
                New Folder
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="h-8 bg-secondary text-white hover:bg-secondary/90 shadow-sm"
                disabled={uploading}
                onClick={handlePickFiles}
              >
                {uploading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 mr-1.5" />}
                Upload
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white relative">
            {(loading || foldersLoading) && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Folders - Show when not loading folders */}
              {!foldersLoading && currentFolders.map((folder) => {
                  const inactive = folder.status === false;
                  return (
                    <div
                      key={folder.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => !inactive && goToFolder(folder.id)}
                      className={cn(
                        "group relative flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 select-none aspect-square",
                        inactive
                          ? "cursor-default opacity-50 bg-gray-50 border-gray-100"
                          : "cursor-pointer bg-white border-gray-100 hover:border-secondary/50 hover:bg-secondary/5 hover:shadow-md active:scale-95"
                      )}
                    >
                      <div className="relative">
                        <Folder
                          className={cn(
                            "w-12 h-12 transition-all duration-300",
                            inactive ? "text-gray-300" : "text-amber-400 fill-amber-400/10 group-hover:scale-110 group-hover:text-amber-500"
                          )}
                        />
                      </div>
                      <div className="w-full">
                        <span className="block truncate font-bold text-gray-900 text-sm">{folder.name}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Folder</span>
                      </div>
                    </div>
                  );
                })}

                {/* Images - Show when not loading images */}
                {!loading && displayLibraryImages.map((img) => {
                  const checked = selectedIds.has(img.id);
                  return (
                    <div
                      key={img.id}
                      role="checkbox"
                      aria-checked={checked}
                      tabIndex={0}
                      onClick={() => toggleImage(img)}
                      className={cn(
                        "group relative aspect-square cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 select-none",
                        checked
                          ? "border-secondary ring-4 ring-secondary/10 shadow-lg scale-95"
                          : "border-gray-100 bg-gray-50 hover:border-secondary/30 hover:shadow-md"
                      )}
                    >
                      <Image 
                        src={img.url} 
                        alt={img.name} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Selection Overlay */}
                      <div className={cn(
                        "absolute inset-0 transition-all duration-300 flex items-center justify-center",
                        checked ? "bg-secondary/20" : "bg-black/0 group-hover:bg-black/10"
                      )}>
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                          checked ? "bg-secondary scale-100 opacity-100" : "bg-white/80 scale-0 opacity-0 group-hover:scale-75 group-hover:opacity-100"
                        )}>
                          <CheckCircle2 className={cn("w-5 h-5", checked ? "text-white" : "text-secondary")} />
                        </div>
                      </div>

                      {/* Info Badge */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <span className="block truncate text-[11px] font-bold text-white">{img.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

            {!loading && !foldersLoading && currentFolders.length === 0 && displayLibraryImages.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-6 ring-8 ring-gray-50/50">
                  <ImageIcon className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-base font-bold text-gray-900">No content here yet</h3>
                <p className="text-sm text-gray-500 mt-2 max-w-[240px]">
                  This folder is empty. Upload some beautiful images or create a subfolder.
                </p>
                <div className="flex gap-3 mt-8">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-9"
                    onClick={() => setIsCreateFolderOpen(true)}
                  >
                    <FolderPlus className="w-4 h-4 mr-2" />
                    New Folder
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="h-9 bg-secondary text-white hover:bg-secondary/90"
                    onClick={handlePickFiles}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 bg-white px-8 py-5">
            <div className="flex items-center gap-2">
              {selectedIds.size > 0 && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary/5 rounded-full border border-secondary/10">
                  <span className="text-xs font-bold text-secondary">{selectedIds.size} selected</span>
                  <button 
                    onClick={() => setSelectedIds(new Set())}
                    className="text-secondary/50 hover:text-secondary transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose} className="h-10 px-8 font-semibold">
                Cancel
              </Button>
              <Button
                className="h-10 px-8 bg-secondary text-white hover:bg-secondary/90 font-bold shadow-lg shadow-secondary/20 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                onClick={handleConfirm}
                disabled={selectedIds.size === 0}
              >
                {okText}
                {selectedIds.size > 1 ? ` (${selectedIds.size})` : ""}
              </Button>
            </div>
          </div>
        </div>
      </CommonModal>

      <CreateFolderModal 
        isOpen={isCreateFolderOpen} 
        onClose={() => setIsCreateFolderOpen(false)} 
        onSave={handleCreateFolder}
        parentId={currentFolderId}
      />
    </>
  );
}
