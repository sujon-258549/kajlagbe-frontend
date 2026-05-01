"use client";

import { useCallback, useMemo, useState } from "react";
import { 
  Images, 
  Plus, 
  Trash2, 
  Upload,
  Image as ImageIcon,
  Check
} from "lucide-react";
import MediaLibraryPickerModal from "../modal/media/MediaLibraryPickerModal";
import { TMediaImage } from "@/types/media";
import { cn } from "@/lib/utils";
import Image from "next/image";

type BaseUploaderProps = {
  disabled?: boolean;
  pickerTitle?: string;
  pickerOkText?: string;
  emptyLabel?: string;
  /** Tooltip on single preview hover (bottom chip). */
  changeHoverLabel?: string;
  className?: string;
  /** When `isMulti` is true, max images user can tick in one library visit. */
  maxSelection?: number;
};

/** Default: one URL. Omit `isMulti` or `isMulti={false}` — one image at a time. */
export type MediaLibraryImageUploaderSingleProps = BaseUploaderProps & {
  isMulti?: false;
  value?: string | null;
  onChange?: (url: string, id?: string) => void;
};

/** Many URLs: `isMulti={true}` — multi-select in the library + `string[]` value/onChange. */
export type MediaLibraryImageUploaderMultiProps = BaseUploaderProps & {
  isMulti: true;
  value?: string[];
  onChange?: (urls: string[], ids?: string[]) => void;
};

export type MediaLibraryImageUploaderProps =
  | MediaLibraryImageUploaderSingleProps
  | MediaLibraryImageUploaderMultiProps;

function urlsFromImages(images: TMediaImage[]): string[] {
  return images.map(img => img.url?.trim()).filter(Boolean);
}

function MediaLibraryImageUploaderSingle({
  value,
  onChange,
  disabled = false,
  pickerTitle = "Media Library",
  pickerOkText = "Use this image",
  emptyLabel = "Upload Image",
  changeHoverLabel = "Change Image",
  className = "",
}: MediaLibraryImageUploaderSingleProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const url = typeof value === "string" ? value.trim() : "";
  const hasImage = Boolean(url);

  const applyUrl = useCallback(
    (next: string, id?: string) => {
      onChange?.(next, id);
    },
    [onChange],
  );

  const handleConfirm = useCallback(
    (images: TMediaImage[]) => {
      const pickedUrl = images[0]?.url?.trim();
      const pickedId = images[0]?.id;
      if (pickedUrl) applyUrl(pickedUrl, pickedId);
    },
    [applyUrl],
  );

  const openPicker = useCallback(() => {
    if (!disabled) setPickerOpen(true);
  }, [disabled]);

  return (
    <>
      <div className={cn("flex", className)}>
        {hasImage ? (
          <div
            className="relative h-44 w-44 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-gray-50 shadow-xl ring-1 ring-gray-200 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
          >
            <button
              type="button"
              disabled={disabled}
              onClick={openPicker}
              className="group relative z-0 block h-full w-full overflow-hidden p-0 transition focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            >
              <Image 
                src={url} 
                alt="Uploaded image" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div
                className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/30"
                aria-hidden
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg mb-2">
                  <Images className="w-5 h-5 text-secondary" />
                </div>
                <span className="bg-secondary text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">
                  {changeHoverLabel}
                </span>
              </div>
            </button>
            
            <button
              type="button"
              disabled={disabled}
              className="absolute right-3 top-3 z-10 rounded-xl bg-red-500 p-2 shadow-lg text-white transition-all hover:bg-red-600 hover:scale-110 active:scale-90 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                applyUrl("");
              }}
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Status badge */}
            <div className="absolute left-3 bottom-3 z-10 rounded-lg bg-green-500/90 backdrop-blur-sm p-1 shadow-md">
              <Check className="w-3 h-3 text-white" />
            </div>
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={openPicker}
            className="group flex h-36 w-36 shrink-0 flex-col items-center justify-center gap-4 rounded-md border border-dashed border-gray-300 bg-gray-70/100 p-4 text-center transition-all duration-300 hover:border-secondary/40 hover:bg-secondary/5 hover:shadow-inner active:scale-95 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl group-hover:bg-secondary/20 transition-all" />
              <div className="relative p-3 rounded-md bg-white shadow-sm border border-gray-100 group-hover:border-secondary/20 transition-all group-hover:-translate-y-1">
                <Upload
                  className="w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-secondary"
                />
              </div>
            </div>
            <div className="space-y-1">
              <span className="block text-sm font-bold text-gray-700 transition-colors duration-300 group-hover:text-secondary">
                {emptyLabel}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">Click to browse library</span>
            </div>
          </button>
        )}
      </div>

      <MediaLibraryPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        multiple={false}
        title={pickerTitle}
        okText={pickerOkText}
        onConfirm={handleConfirm}
      />
    </>
  );
}

function MediaLibraryImageUploaderMulti({
  value,
  onChange,
  disabled = false,
  pickerTitle = "Media Library",
  pickerOkText = "Use selected",
  emptyLabel = "Upload Images",
  className = "",
  maxSelection,
}: MediaLibraryImageUploaderMultiProps) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const urls = useMemo(() => {
    if (!Array.isArray(value)) return [];
    return value.map((s) => (typeof s === "string" ? s.trim() : "")).filter(Boolean);
  }, [value]);

  const applyUrls = useCallback(
    (next: string[], nextIds?: string[]) => {
      onChange?.(next, nextIds);
    },
    [onChange],
  );

  const handleConfirm = useCallback(
    (images: TMediaImage[]) => {
      const pickedUrls = urlsFromImages(images);
      const pickedIds = images.map(img => img.id).filter(Boolean) as string[];
      if (pickedUrls.length === 0) return;

      const mergedUrls: string[] = [...urls];
      for (const p of pickedUrls) {
        if (!mergedUrls.includes(p)) mergedUrls.push(p);
      }
      applyUrls(mergedUrls, pickedIds);
    },
    [applyUrls, urls],
  );

  const openPicker = useCallback(() => {
    if (!disabled) setPickerOpen(true);
  }, [disabled]);

  const removeAt = useCallback(
    (index: number) => {
      applyUrls(urls.filter((_, i) => i !== index));
    },
    [applyUrls, urls],
  );

  const hasAny = urls.length > 0;

  return (
    <>
      <div className={cn("flex flex-wrap items-start gap-6", className)}>
        {hasAny ? (
          <>
            {urls.map((u, idx) => (
              <div
                key={`${u}-${idx}`}
                className="relative h-36 w-36 shrink-0 overflow-hidden rounded-2xl border-2 border-white bg-gray-50 shadow-lg ring-1 ring-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Image 
                  src={u} 
                  alt={`Uploaded image ${idx + 1}`} 
                  fill 
                  className="object-cover" 
                />
                <button
                  type="button"
                  disabled={disabled}
                  className="absolute right-2 top-2 z-10 rounded-lg bg-red-500 p-1.5 shadow-md text-white transition-all hover:bg-red-600 active:scale-90 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeAt(idx);
                  }}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <button
              type="button"
              disabled={disabled}
              onClick={openPicker}
              className="group flex h-36 w-36 shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 text-center transition-all hover:border-secondary/40 hover:bg-secondary/5 hover:shadow-inner active:scale-95 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            >
              <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100 group-hover:border-secondary/20 transition-all group-hover:-translate-y-1">
                <Plus
                  className="w-6 h-6 text-gray-400 transition-colors group-hover:text-secondary"
                />
              </div>
              <span className="text-[10px] font-bold text-gray-500 group-hover:text-secondary tracking-tight">Add More</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={openPicker}
            className="group flex h-44 w-44 shrink-0 flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-4 text-center transition-all duration-300 hover:border-secondary/40 hover:bg-secondary/5 hover:shadow-inner active:scale-95 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/10 rounded-full blur-xl group-hover:bg-secondary/20 transition-all" />
              <div className="relative p-4 rounded-2xl bg-white shadow-sm border border-gray-100 group-hover:border-secondary/20 transition-all group-hover:-translate-y-1">
                <Upload
                  className="w-8 h-8 text-gray-400 transition-colors duration-300 group-hover:text-secondary"
                />
              </div>
            </div>
            <div className="space-y-1">
              <span className="block text-sm font-bold text-gray-700 transition-colors duration-300 group-hover:text-secondary">
                {emptyLabel}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">Browse media library</span>
            </div>
          </button>
        )}
      </div>

      <MediaLibraryPickerModal
        isOpen={pickerOpen}
        onClose={() => setPickerOpen(false)}
        multiple
        maxSelection={maxSelection}
        title={pickerTitle}
        okText={pickerOkText}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default function MediaLibraryImageUploader(props: MediaLibraryImageUploaderProps) {
  if (props.isMulti === true) {
    return <MediaLibraryImageUploaderMulti {...props} />;
  }
  return <MediaLibraryImageUploaderSingle {...props} />;
}
