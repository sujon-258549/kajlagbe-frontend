import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface ImageUploadProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: FieldError | undefined;
  containerClassName?: string;
  register?: UseFormRegisterReturn; // Pass react-hook-form register
  isSingle?: boolean;
}

const ImageUpload = React.forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      label,
      error,
      className,
      containerClassName,
      register,
      onChange,
      value,
      isSingle = true,
      ...props
    },
    ref,
  ) => {
    const [previews, setPreviews] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Update previews if value is passed (e.g. from react-hook-form defaultValues)
    React.useEffect(() => {
      const isValidSrc = (src: unknown): src is string =>
        typeof src === "string" &&
        (src.startsWith("http") ||
          src.startsWith("https") ||
          src.startsWith("data:"));

      if (isValidSrc(value)) {
        setPreviews([value as string]);
      } else if (Array.isArray(value)) {
        setPreviews(value.filter(isValidSrc));
      }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        const newPreviews: string[] = [];
        const fileList = Array.from(files);

        if (isSingle) {
          const file = fileList[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviews([reader.result as string]);
          };
          reader.readAsDataURL(file);
        } else {
          let processed = 0;
          fileList.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              newPreviews.push(reader.result as string);
              processed++;
              if (processed === fileList.length) {
                setPreviews(newPreviews);
              }
            };
            reader.readAsDataURL(file);
          });
        }
      }

      // Call original handlers
      if (register && register.onChange) {
        register.onChange(e);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const handleClear = (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      e.preventDefault();

      if (isSingle) {
        setPreviews([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        setPreviews((prev) => prev.filter((_, i) => i !== index));
        if (fileInputRef.current && fileInputRef.current.files) {
          const dt = new DataTransfer();
          const files = fileInputRef.current.files;
          for (let i = 0; i < files.length; i++) {
            if (i !== index) {
              dt.items.add(files[i]);
            }
          }
          fileInputRef.current.files = dt.files;
          const event = new Event("change", { bubbles: true });
          fileInputRef.current.dispatchEvent(event);
        }
      }
    };

    const setRefs = (element: HTMLInputElement | null) => {
      fileInputRef.current = element;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current =
          element;
      }
      if (register) {
        register.ref(element);
      }
    };

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-slate-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-3 inline-block">
            {label}
          </label>
        )}

        <div
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative group cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all duration-200 bg-slate-50 hover:bg-slate-100",
            isSingle ? "aspect-square w-40" : "w-full min-h-[160px]",
            error
              ? "border-red-300 bg-red-50"
              : "border-slate-300 hover:border-primary/50",
            previews.length > 0
              ? "border-solid border-primary/20 bg-white"
              : "",
            className,
          )}
        >
          {previews.length > 0 ? (
            isSingle ? (
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={previews[0]}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <button
                  type="button"
                  onClick={(e) => handleClear(e, 0)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 w-full p-2">
                {previews.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative w-full aspect-square rounded-md overflow-hidden group/item"
                  >
                    <Image
                      src={src}
                      alt={`Preview ${idx}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={(e) => handleClear(e, idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-100 md:opacity-0 group-hover/item:opacity-100 transition-opacity hover:bg-red-600 z-10"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400 group-hover:text-primary/80 transition-colors">
              <div className="p-2 rounded-full bg-slate-100 group-hover:bg-primary/10 mb-2 transition-colors">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs font-medium text-center px-2">
                {isSingle ? "Upload Image" : "Upload Images"}
              </p>
            </div>
          )}

          <input
            {...props}
            {...(register && { name: register.name, onBlur: register.onBlur })}
            ref={setRefs}
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            multiple={!isSingle}
            className="hidden"
          />
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium animate-in slide-in-from-top-1 fade-in">
            {error.message}
          </p>
        )}
      </div>
    );
  },
);

ImageUpload.displayName = "ImageUpload";

export default ImageUpload;
