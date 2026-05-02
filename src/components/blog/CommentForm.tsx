"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Send } from "lucide-react";

import Heading3 from "../common/Headings/Heading3";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createBlogComment } from "@/actions/blog-comment.actions";

const commentSchema = z.object({
  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(1000, "Comment is too long"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  saveInfo: z.boolean().optional(),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  blogId: string;
  blogSlug: string;
}

export default function CommentForm({ blogId, blogSlug }: CommentFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      comment: "",
      name: "",
      email: "",
      saveInfo: false,
    },
  });

  // Load saved info from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("comment_name");
    const savedEmail = localStorage.getItem("comment_email");
    if (savedName || savedEmail) {
      form.reset({
        ...form.getValues(),
        name: savedName || "",
        email: savedEmail || "",
        saveInfo: true,
      });
    }
  }, [form]);

  const onSubmit = async (data: CommentFormData) => {
    setIsLoading(true);
    try {
      const res = await createBlogComment({
        ...data,
        blogId,
        blogSlug,
      });

      if (res.success) {
        toast.success("Thanks! Your comment has been submitted.");
        
        // Save info to localStorage if requested
        if (data.saveInfo) {
          localStorage.setItem("comment_name", data.name);
          localStorage.setItem("comment_email", data.email);
        } else {
          localStorage.removeItem("comment_name");
          localStorage.removeItem("comment_email");
        }

        form.reset({
          ...data,
          comment: "", // Only clear the comment
        });
      } else {
        toast.error(res.message || "Failed to post comment.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="mt-16 pt-12 border-t border-slate-100">
      <div className="rounded-lg border border-gray-200 bg-white p-6 md:p-8 bg-white">
        <div className="mb-8 space-y-2">
          <Heading3 className="font-bold text-secondary">Leave a Reply</Heading3>
          <p className="text-slate-500 text-sm md:text-base">
            Your email address will not be published. Required fields are marked
            <span className="text-red-500"> *</span>
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field, fieldState }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Comment <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <FormTextarea
                      rows={6}
                      placeholder="Write your comment..."
                      error={fieldState.error}
                      className="min-h-[150px] bg-slate-50/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      size="md"
                      placeholder="John Doe"
                      error={fieldState.error}
                      className="bg-slate-50/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      type="email"
                      size="md"
                      placeholder="you@example.com"
                      error={fieldState.error}
                      className="bg-slate-50/60"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="saveInfo"
              render={({ field }) => (
                <FormItem className="md:col-span-2 flex items-center gap-3 space-y-0">
                  <FormControl>
                    <input
                      id="save-info"
                      type="checkbox"
                      checked={!!field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-3.5 h-3.5 accent-secondary rounded border-slate-300 cursor-pointer"
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="save-info"
                    className="text-sm text-slate-600 font-medium cursor-pointer"
                  >
                    Save my name and email in this browser for the next time I
                    comment.
                  </FormLabel>
                </FormItem>
              )}
            />

            <div className="md:col-span-2 pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="px-10 uppercase tracking-wider"
              >
                {isLoading ? "Posting..." : "Post Comment"}
                {!isLoading && <Send className="w-4 h-4" />}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
