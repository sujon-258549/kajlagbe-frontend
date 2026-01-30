"use client";

import { motion } from "motion/react";
import Heading3 from "../common/Headings/Heading3";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CommentForm() {
  return (
    <div className="space-y-8 mt-16 pt-16 border-t border-slate-100">
      <div className="space-y-2">
        <Heading3 className="font-bold text-secondary">Leave a Reply</Heading3>
        <p className="text-slate-500">
          Your email address will not be published. Required fields are marked *
        </p>
      </div>

      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-secondary tracking-wide block mb-3">
            COMMENT *
          </label>
          <Textarea
            rows={6}
            className="w-full bg-slate-50 border border-gray-200 rounded-lg focus-visible:ring-0 focus-visible:border-secondary transition-all text-slate-700 font-medium min-h-[150px] shadow-none outline-none"
            placeholder="Write your comment..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary tracking-wide block mb-3">
            NAME *
          </label>
          <Input
            type="text"
            className="w-full h-12 px-6 bg-slate-50 border border-gray-200 rounded-lg focus-visible:ring-0 focus-visible:border-secondary transition-all text-slate-700 font-medium shadow-none outline-none"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-secondary tracking-wide block mb-3">
            PHONE *
          </label>
          <Input
            type="tel"
            className="w-full h-12 px-6 bg-slate-50 border border-gray-200 rounded-lg focus-visible:ring-0 focus-visible:border-secondary transition-all text-slate-700 font-medium shadow-none outline-none"
            placeholder="Phone"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-bold text-secondary tracking-wide block mb-3">
            WEBSITE
          </label>
          <Input
            type="url"
            className="w-full h-12 px-6 bg-slate-50 border border-gray-200 rounded-lg focus-visible:ring-0 focus-visible:border-secondary transition-all text-slate-700 font-medium shadow-none outline-none"
            placeholder="https://example.com"
          />
        </div>

        <div className="md:col-span-2 flex items-center gap-3">
          <input
            type="checkbox"
            id="save-info"
            className="w-5 h-5 accent-secondary rounded border-gray-200"
          />
          <label
            htmlFor="save-info"
            className="text-sm text-slate-600 font-medium"
          >
            Save my name, email, and website in this browser for the next time I
            comment.
          </label>
        </div>

        <div className="md:col-span-2 pt-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-10 py-3 bg-secondary text-white font-bold rounded-lg hover:bg-secondary transition-all shadow-lg shadow-secondary/20 cursor-pointer uppercase tracking-wider text-sm"
          >
            Post Comment
          </motion.button>
        </div>
      </form>
    </div>
  );
}
