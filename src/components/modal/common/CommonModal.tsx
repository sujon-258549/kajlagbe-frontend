"use client";

import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CommonModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  image?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  className?: string;
  showBackground?: boolean;
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
};

const CommonModal: React.FC<CommonModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  image,
  children,
  footer,
  maxWidth = "lg",
  className,
  showBackground = true,
}) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence mode="wait">
        {isOpen && (
          <Dialog.Portal forceMount>
            {/* Overlay */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-secondary/70 backdrop-blur-sm z-999"
              />
            </Dialog.Overlay>

            {/* Content Container */}
            <div className="fixed inset-0 z-1000 flex items-center justify-center p-4 sm:p-6">
              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 30 }}
                  transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    mass: 0.8,
                  }}
                  className={cn(
                    "w-full relative overflow-hidden flex flex-col max-h-[90vh] outline-none",
                    showBackground &&
                      "rounded-lg shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)]",
                    maxWidthClasses[maxWidth],
                    className,
                  )}
                >
                  {/* Close Button - Glass style */}
                  <Dialog.Close asChild>
                    <button
                      onClick={onClose}
                      className={cn(
                        "absolute top-3 right-3 w-10 h-10 flex items-center justify-center rounded-full transition-all z-30 group",
                        showBackground
                          ? "bg-white/40 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/60 text-secondary"
                          : "bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-black/40",
                      )}
                    >
                      <X className="w-5 h-5 transition-transform group-hover:rotate-90" />
                    </button>
                  </Dialog.Close>

                  {/* Header Image */}
                  {image && showBackground && (
                    <div className="relative w-full h-56 md:h-64 shrink-0 overflow-hidden">
                      <Image
                        src={image}
                        alt={title || "Modal Image"}
                        fill
                        className="object-cover transition-transform duration-1000 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-white via-white/5 to-transparent" />
                    </div>
                  )}

                  {/* Fixed Header */}
                  {(title || description) && (
                    <div
                      className={cn(
                        "px-8 py-3 md:px-10 border-b shrink-0 relative z-20",
                        showBackground
                          ? "bg-secondary border-primary/30"
                          : "bg-white/5 border-white/10",
                      )}
                    >
                      {title && (
                        <Dialog.Title
                          className={cn(
                            "text-lg font-bold leading-tight tracking-tight",
                            showBackground ? "text-white" : "text-white",
                          )}
                        >
                          {title}
                        </Dialog.Title>
                      )}
                      {description && (
                        <Dialog.Description
                          className={cn(
                            "text-xs mt-0.5 opacity-80",
                            showBackground ? "text-white" : "text-white",
                          )}
                        >
                          {description}
                        </Dialog.Description>
                      )}
                    </div>
                  )}

                  {/* Scrollable Content Area */}
                  <div
                    className={cn(
                      "flex-1 overflow-y-auto custom-scrollbar flex flex-col",
                      showBackground && "bg-white",
                    )}
                  >
                    <div className="p-8 md:p-10">
                      <div className="relative">{children}</div>
                    </div>

                    {/* Footer - sticky/fixed at bottom of content if provided */}
                    {footer && (
                      <div className="p-8 md:p-10 pt-0 mt-auto">
                        <div
                          className={cn(
                            "pt-6",
                            showBackground
                              ? "border-t border-slate-100"
                              : "border-t border-white/10",
                          )}
                        >
                          {footer}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default CommonModal;
