"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Type,
  AlignLeft,
  Info,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  PlusCircle,
} from "lucide-react";
import Heading4 from "@/components/common/Headings/Heading4";
import dynamic from "next/dynamic";

const Texteditor = dynamic(() => import("@/components/common/Texteditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-slate-50 animate-pulse rounded-3xl border border-slate-100 flex items-center justify-center">
      <span className="text-slate-400 font-bold">Loading Web Editor...</span>
    </div>
  ),
});

const Label = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-3">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export default function AddBlogPage() {
  const [content, setContent] = useState("");

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700 pb-20">
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center shadow-sm">
            <Sparkles className="w-6 h-6 text-secondary" />
          </div>
          <Heading4>Create New Blog Post</Heading4>
        </div>
        <p className="text-slate-500 font-bold ml-1">
          Craft high-quality content using our streamlined editor.
        </p>
      </div>

      <form className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <Info className="w-4 h-4 text-secondary" /> Blog Details
            </h3>
            <span className="text-[10px] font-black text-secondary bg-white px-3 py-1 rounded-full border border-secondary/10 shadow-sm">
              NEW DRAFT
            </span>
          </div>
          <div className="p-8 space-y-8">
            <div>
              <Label required>Blog Title</Label>
              <div className="relative">
                <Input
                  className="h-14 bg-slate-50/50 border-slate-200 rounded-xl focus:border-secondary/40 focus:bg-white transition-all outline-none font-bold text-lg px-6"
                  placeholder="e.g. Revolutionizing Agriculture with Technology"
                />
                <Type className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Label>Primary Category</Label>
                <div className="relative">
                  <Input
                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white transition-all font-bold px-6"
                    placeholder="e.g. Agriculture"
                  />
                  <Layers className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>
              <div>
                <Label>Publish Schedule</Label>
                <div className="relative">
                  <Input
                    type="date"
                    className="h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:bg-white transition-all font-bold px-6"
                  />
                  <Calendar className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Content Environment */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-slate-50/50 px-8 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
              <AlignLeft className="w-4 h-4 text-secondary" /> Writing Studio
            </h3>
          </div>
          <div className="p-8 space-y-8">
            <div>
              <Label>Short Description (SEO Excerpt)</Label>
              <Textarea
                rows={3}
                className="bg-slate-50/50 border-slate-200 rounded-xl resize-none p-6 font-bold leading-relaxed focus:bg-white transition-all"
                placeholder="A compelling summary for search results and social sharing..."
              />
            </div>

            <div>
              <Label required>Main Story Content</Label>
              <div className="mt-2">
                <Texteditor />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="flex items-start gap-4 max-w-lg">
            <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100 rotate-3 group-hover:rotate-0 transition-transform">
              <PlusCircle className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">
                Quality Assurance
              </p>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-1">
                Your post will be optimized for mobile and desktop viewing
                automatically.
              </p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <Button
              variant="outline"
              type="button"
              className="h-14 px-8 border-slate-300 text-slate-700 font-black rounded-xl hover:bg-white hover:border-secondary shadow-none flex-1 md:flex-none uppercase tracking-widest text-xs"
            >
              Save to Drafts
            </Button>
            <Button
              type="button"
              className="h-14 px-12 font-black flex-1 md:flex-none border-none text-white bg-secondary hover:bg-secondary/90 rounded-xl group shadow-xl shadow-secondary/20 uppercase tracking-widest text-xs"
            >
              Go Live Now{" "}
              <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
