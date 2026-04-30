"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { 
  Images, 
  Plus, 
  Trash2, 
  Upload, 
  RotateCw, 
  ArrowUp, 
  Folder, 
  Image as ImageIcon, 
  Pin,
  Search,
  Loader2
} from "lucide-react";
import CommonModal from "../common/CommonModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { TFolder, TMediaImage } from "@/types/media";
import { getAllFolders, getImages, uploadImage } from "@/actions/media.actions";
import { uploadMediaImage } from "@/lib/imageUpload";
import { cn } from "@/lib/utils";

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

/** Match DB row to Cloudinary URL after refetch. */
function urlMatchKey(u: string): string {
  const t = u.trim();
  try {
    const x = new URL(t);
    return `${x.origin}${x.pathname}`.toLowerCase();
  } catch {
    return t.toLowerCase();
  }
}

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
  
  const [folders, setFolders] = useState<TFolder[]>([]);
  const [libraryImages, setLibraryImages] = useState<TMediaImage[]>([]);
  const [pendingUploaded, setPendingUploaded] = useState<TMediaImage[]>([]);

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
    setLoading(true);
    try {
      const res = await getImages(folderId);
      if (res.success) {
        setLibraryImages(res.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch images", err);
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
    folders.forEach((f) => map.set(f.id, f));
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
    () =>
      folders.filter(
        (f) => parentKey(f.parentId) === parentKey(currentFolderId),
      ),
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
    const ids = new Set(libraryImages.map((i) => i.id));
    const extra = pendingUploaded.filter(
      (p) => parentKey(p.folderId) === cid && !ids.has(p.id),
    );
    return [...libraryImages, ...extra];
  }, [libraryImages, pendingUploaded, currentFolderId]);

  const pathSubtitle = useMemo(() => {
    if (currentPath.length === 0) return "All Folders";
    return ["All Folders", ...currentPath.map((n) => n.name)].join(" / ");
  }, [currentPath]);

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
          alert(`You can select at most ${maxSelection} image(s).`);
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
      alert("Please choose image files.");
      return;
    }

    setUploading(true);
    let ok = 0;
    const uploadedIds: string[] = [];
    const newPendingRows: TMediaImage[] = [];
    const uploadedPublicUrls: string[] = [];
    
    try {
      for (const file of imageFiles) {
        try {
          const { result: res, publicUrl } = await uploadMediaImage(
            file,
            currentFolderId,
            (payload) => uploadImage(payload),
          );
          
          if (res.success) {
            uploadedPublicUrls.push(publicUrl);
            const row = res.data;
            if (row) {
              uploadedIds.push(row.id);
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
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      description="Folders, images, upload from PC — check images then confirm."
      maxWidth="5xl"
      className="p-0!"
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
              variant="secondary"
              size="sm"
              className="h-8 bg-secondary text-white hover:bg-secondary/90"
              disabled={uploading}
              onClick={handlePickFiles}
            >
              {uploading ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Upload className="w-3.5 h-3.5 mr-1.5" />}
              Upload
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[...Array(10)].map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-lg" />
              ))}
            </div>
          )}

          {!loading && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* Folders */}
              {currentFolders.map((folder) => {
                const inactive = folder.status === false;
                return (
                  <div
                    key={folder.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => !inactive && goToFolder(folder.id)}
                    className={cn(
                      "group relative flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition-all duration-200 select-none",
                      inactive
                        ? "cursor-default opacity-50 bg-gray-50 border-gray-100"
                        : "cursor-pointer bg-white border-gray-100 hover:border-secondary/50 hover:bg-secondary/5 hover:shadow-sm active:scale-95"
                    )}
                  >
                    <div className="relative">
                      <Folder
                        className={cn(
                          "w-12 h-12 transition-colors",
                          inactive ? "text-gray-300" : "text-amber-400 fill-amber-400/10 group-hover:text-amber-500"
                        )}
                      />
                    </div>
                    <div className="w-full">
                      <span className="block truncate font-semibold text-gray-900 text-sm">{folder.name}</span>
                      <span className="text-[10px] text-gray-400">Folder</span>
                    </div>
                  </div>
                );
              })}

              {/* Images */}
              {displayLibraryImages.map((img) => {
                const checked = selectedIds.has(img.id);
                return (
                  <div
                    key={img.id}
                    role="checkbox"
                    aria-checked={checked}
                    tabIndex={0}
                    onClick={() => toggleImage(img)}
                    className={cn(
                      "group relative aspect-square cursor-pointer overflow-hidden rounded-xl border transition-all duration-200 select-none",
                      checked
                        ? "border-secondary ring-2 ring-secondary/20 shadow-md"
                        : "border-gray-100 bg-gray-50 hover:border-secondary/30 hover:shadow-sm"
                    )}
                  >
                    <img 
                      src={img.url} 
                      alt={img.name} 
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Checkbox overlay */}
                    <div className={cn(
                      "absolute top-2 left-2 z-10 transition-opacity",
                      checked ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    )}>
                      <div className={cn(
                        "w-5 h-5 rounded-md flex items-center justify-center border transition-all",
                        checked ? "bg-secondary border-secondary" : "bg-white/80 backdrop-blur-sm border-white/40"
                      )}>
                        {checked && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>

                    {/* Gradient overlay for name */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 pt-6 translate-y-full group-hover:translate-y-0 transition-transform">
                      <span className="block truncate text-[10px] font-medium text-white">{img.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!loading && currentFolders.length === 0 && displayLibraryImages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                <ImageIcon className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">No images found</h3>
              <p className="text-xs text-gray-500 mt-1 max-w-[200px]">
                This folder is empty. Upload some images or choose another folder.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-4"
                onClick={handlePickFiles}
              >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Upload Image
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-white px-6 py-4">
          <Button variant="outline" onClick={onClose} className="h-9 px-6">
            Cancel
          </Button>
          <Button
            className="h-9 px-6 bg-secondary text-white hover:bg-secondary/90 font-bold"
            onClick={handleConfirm}
            disabled={selectedIds.size === 0}
          >
            {okText}
            {selectedIds.size > 0 ? ` (${selectedIds.size})` : ""}
          </Button>
        </div>
      </div>
    </CommonModal>
  );
}
