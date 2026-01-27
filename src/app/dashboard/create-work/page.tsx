"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Upload,
  DollarSign,
  AlignLeft,
  Calendar,
  CheckCircle2,
  X,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Heading4 from "@/components/common/Headings/Heading4";

export default function CreateWorkPage() {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-500">
      <div className="flex flex-col gap-1">
        <Heading4>Create New Work</Heading4>
        <p className="text-slate-500 font-medium">
          Post a new job and find the perfect expert for your project.
        </p>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center gap-2 lg:gap-4 py-6 overflow-x-auto scrollbar-none snap-x">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="flex flex-1 items-center gap-2 lg:gap-3 min-w-[80px] snap-start"
          >
            <div
              className={cn(
                "w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center font-bold text-xs lg:text-sm transition-all shadow-none shrink-0",
                step >= s
                  ? "bg-secondary text-white"
                  : "bg-gray-100 text-slate-400",
              )}
            >
              {s}
            </div>
            <div
              className={cn(
                "flex-1 h-1 rounded-full",
                step > s ? "bg-secondary" : "bg-gray-100",
              )}
            />
          </div>
        ))}
      </div>

      <div className="bg-white p-10 rounded-lg border border-gray-200">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                <AlignLeft className="w-5 h-5 text-secondary" /> Basic
                Information
              </h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                    Work Title *
                  </label>
                  <Input
                    className="h-14 bg-gray-50/50 border-gray-100 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary transition-all outline-none shadow-none"
                    placeholder="e.g. Design a premium organic food landing page"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                      Category *
                    </label>
                    <select className="flex h-14 w-full rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-2 text-sm font-semibold focus:outline-none focus:border-secondary transition-all appearance-none cursor-pointer">
                      <option>UI/UX Design</option>
                      <option>Web Development</option>
                      <option>Creative Writing</option>
                      <option>Social Media Marketing</option>
                      <option>Logo Design</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                      Work Type
                    </label>
                    <div className="flex gap-2">
                      <button className="flex-1 h-14 bg-secondary text-white rounded-lg font-bold transition-all text-sm shadow-none">
                        Fixed Price
                      </button>
                      <button className="flex-1 h-14 bg-gray-50 text-slate-500 rounded-lg font-bold transition-all text-sm border border-gray-200 hover:border-secondary/30 shadow-none">
                        Hourly Rate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <Button
                onClick={() => setStep(2)}
                size="lg"
                className="w-full h-14 rounded-lg bg-secondary font-bold text-lg hover:opacity-90 shadow-none"
              >
                Continue to Details
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-secondary" /> Work Details
              </h3>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                  Description *
                </label>
                <Textarea
                  rows={8}
                  className="bg-gray-50/50 border-gray-100 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary outline-none min-h-[200px] shadow-none"
                  placeholder="Detailed explanation of what needs to be done..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                    Estimated Budget ($) *
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      className="h-14 bg-gray-50/50 border-gray-100 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary transition-all outline-none pl-12 shadow-none"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                    Deadline Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      type="date"
                      className="h-14 bg-gray-50/50 border-gray-100 rounded-lg focus-visible:ring-1 focus-visible:ring-secondary/20 focus-visible:border-secondary transition-all outline-none pl-12 shadow-none text-slate-600"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-secondary uppercase tracking-widest ml-1">
                  Required Skills (Tags)
                </label>
                <div className="flex flex-wrap gap-2 p-4 bg-gray-50/50 rounded-xl border border-gray-100 min-h-[100px] content-start">
                  <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-slate-600 shadow-none">
                    Next.js{" "}
                    <X className="w-3 h-3 hover:text-red-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-slate-600 shadow-none">
                    Tailwind CSS{" "}
                    <X className="w-3 h-3 hover:text-red-500 cursor-pointer" />
                  </div>
                  <div className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-bold text-slate-600 shadow-none">
                    TypeScript{" "}
                    <X className="w-3 h-3 hover:text-red-500 cursor-pointer" />
                  </div>
                  <Input
                    className="border-none bg-transparent h-6 w-24 text-xs font-semibold focus:ring-0 p-0 shadow-none ml-2"
                    placeholder="Add skill..."
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-4">
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                size="lg"
                className="flex-1 h-14 rounded-lg font-bold border-gray-200 shadow-none hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                size="lg"
                className="flex-2 h-14 rounded-lg bg-secondary font-bold text-lg hover:opacity-90 shadow-none"
              >
                Continue to Files
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-secondary flex items-center gap-2">
                <Upload className="w-5 h-5 text-secondary" /> Attachments &
                Confirmation
              </h3>
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-16 flex flex-col items-center justify-center space-y-4 hover:border-secondary transition-colors group cursor-pointer shadow-none">
                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-secondary/10 group-hover:scale-110 transition-all shadow-none">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-secondary" />
                </div>
                <div className="text-center">
                  <p className="font-bold text-secondary">
                    Drop files here or click to upload
                  </p>
                  <p className="text-xs text-slate-400 font-medium">
                    PDF, JPG, PNG, DOC (Max 10MB)
                  </p>
                </div>
              </div>

              <div className="bg-[#86b86b]/10 p-6 rounded-xl flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-secondary shrink-0 mt-1" />
                <p className="text-sm font-semibold text-secondary leading-relaxed">
                  By posting this work, you agree to our terms and conditions.
                  Your project will be reviewed and made visible to experts
                  immediately.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-4">
              <Button
                onClick={() => setStep(2)}
                variant="outline"
                size="lg"
                className="flex-1 h-14 rounded-lg font-bold border-gray-200 shadow-none hover:bg-gray-50"
              >
                Back
              </Button>
              <Button className="flex-2 h-14 rounded-lg bg-secondary font-bold text-lg hover:opacity-90 shadow-none">
                Post My Work Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
