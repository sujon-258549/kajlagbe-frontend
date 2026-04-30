"use client";

import { useCallback, useMemo, useState } from "react";
import { 
  Images, 
  Plus, 
  Trash2, 
  Upload,
  Image as ImageIcon
} from "lucide-react";
import MediaLibraryPickerModal from "../modal/media/MediaLibraryPickerModal";
import { TMediaImage } from "@/types/media";
import { cn } from "@/lib/utils";

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

const box = "h-40 w-40 shrink-0";
const thumb = "h-32 w-32 shrink-0";
const addTile = "h-32 w-32 shrink-0";

/** Fills a square frame without gray letterboxing (object-cover + block img). */
const previewImgClass =
  "pointer-events-none block h-full w-full min-h-0 min-w-0 object-cover select-none";

function urlsFromImages(images: TMediaImage[]): string[] {
  const out: string[] = [];
  for (const img of images) {
    const u = img.url?.trim();
    if (u) out.push(u);
  }
  return out;
}

function MediaLibraryImageUploaderSingle({
  value,
  onChange,
  disabled = false,
  pickerTitle = "Media Library",
  pickerOkText = "Use this image",
  emptyLabel = "Upload Image",
  changeHoverLabel = "Change",
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
            className={cn(
              "relative overflow-hidden rounded-xl border-2 border-gray-100 bg-gray-50 shadow-sm transition-all hover:shadow-md",
              box
            )}
          >
            <button
              type="button"
              disabled={disabled}
              onClick={openPicker}
              aria-label="Change image"
              title="Change image"
              className="group relative z-0 block h-full w-full overflow-hidden p-0 text-left transition focus:outline-none disabled:pointer-events-none disabled:opacity-60"
            >
              <img src={url} alt="" className={previewImgClass} />
              <div
                className="pointer-events-none absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/25"
                aria-hidden
              />
              <div className="pointer-events-none absolute left-2 top-2 rounded-lg bg-white/90 backdrop-blur-sm p-1.5 shadow-sm border border-white/50">
                <Images className="w-3.5 h-3.5 text-secondary" />
              </div>
              <span className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-sm px-3 py-1 text-[10px] font-bold text-white opacity-0 transition-all group-hover:opacity-100 scale-90 group-hover:scale-100">
                {changeHoverLabel}
              </span>
            </button>
            <button
              type="button"
              disabled={disabled}
              aria-label="Remove image"
              title="Remove image"
              className="absolute right-2 top-2 z-10 rounded-lg bg-white/90 backdrop-blur-sm p-1.5 shadow-sm border border-white/50 transition-all hover:bg-red-50 hover:text-red-600 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                applyUrl("");
              }}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={openPicker}
            aria-label="Open media library to upload or choose image"
            className={cn(
              "group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-4 text-center transition-all duration-300 hover:border-secondary/40 hover:bg-secondary/5 hover:shadow-sm active:scale-95 focus:outline-none disabled:pointer-events-none disabled:opacity-60",
              box
            )}
          >
            <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-secondary/20 transition-colors">
              <Upload
                className="w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-secondary"
              />
            </div>
            <span className="text-xs font-bold text-gray-500 transition-colors duration-300 group-hover:text-secondary">
              {emptyLabel}
            </span>
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
      <div className={cn("flex flex-wrap items-start gap-4", className)}>
        {hasAny ? (
          <>
            {urls.map((u, idx) => (
              <div
                key={`${u}-${idx}`}
                className={cn(
                  "relative overflow-hidden rounded-xl border-2 border-gray-100 bg-gray-50 shadow-sm transition-all hover:shadow-md",
                  thumb
                )}
              >
                <img src={u} alt="" className={previewImgClass} />
                <button
                  type="button"
                  disabled={disabled}
                  aria-label={`Remove image ${idx + 1}`}
                  title="Remove"
                  className="absolute right-1.5 top-1.5 z-10 rounded-lg bg-white/90 backdrop-blur-sm p-1 shadow-sm border border-white/50 transition-all hover:bg-red-50 hover:text-red-600 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    removeAt(idx);
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              disabled={disabled}
              onClick={openPicker}
              aria-label="Add more images from media library"
              className={cn(
                "group flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 text-center transition-all hover:border-secondary/40 hover:bg-secondary/5 hover:shadow-sm active:scale-95 focus:outline-none disabled:pointer-events-none disabled:opacity-60",
                addTile
              )}
            >
              <div className="p-2 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-secondary/20 transition-colors">
                <Plus
                  className="w-5 h-5 text-gray-400 transition-colors group-hover:text-secondary"
                />
              </div>
              <span className="text-[10px] font-bold text-gray-500 group-hover:text-secondary">Add</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            disabled={disabled}
            onClick={openPicker}
            aria-label="Open media library to upload or choose images"
            className={cn(
              "group flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 p-4 text-center transition-all duration-300 hover:border-secondary/40 hover:bg-secondary/5 hover:shadow-sm active:scale-95 focus:outline-none disabled:pointer-events-none disabled:opacity-60",
              box
            )}
          >
            <div className="p-3 rounded-full bg-white shadow-sm border border-gray-100 group-hover:border-secondary/20 transition-colors">
              <Upload
                className="w-6 h-6 text-gray-400 transition-colors duration-300 group-hover:text-secondary"
              />
            </div>
            <span className="text-xs font-bold text-gray-500 transition-colors duration-300 group-hover:text-secondary">
              {emptyLabel}
            </span>
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
