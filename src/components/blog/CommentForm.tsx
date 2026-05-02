"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { Send } from "lucide-react";

import Heading4 from "../common/Headings/Heading4";
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
  email: z.string().email("Please enter a valid email address").optional().or(z.literal("")),
  phone: z.string().min(11, "Please enter a valid mobile number").max(15, "Mobile number is too long"),
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
      phone: "",
      saveInfo: false,
    },
  });

  // Load saved info from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("comment_name");
    const savedEmail = localStorage.getItem("comment_email");
    const savedPhone = localStorage.getItem("comment_phone");
    if (savedName || savedEmail || savedPhone) {
      form.reset({
        ...form.getValues(),
        name: savedName || "",
        email: savedEmail || "",
        phone: savedPhone || "",
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
          localStorage.setItem("comment_email", data.email || "");
          localStorage.setItem("comment_phone", data.phone);
        } else {
          localStorage.removeItem("comment_name");
          localStorage.removeItem("comment_email");
          localStorage.removeItem("comment_phone");
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
    <section className="mt-4 border-t border-slate-100">
      <div className="rounded-lg bg-white p-6 md:p-8 bg-white">
        <div className="mb-8 space-y-2">
          <Heading4 className="font-bold text-secondary">Leave a Reply</Heading4>
          <p className="text-slate-500 text-sm md:text-base">
            Your personal information will not be published. Required fields are marked
            <span className="text-red-500"> *</span>
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            <FormField
              control={form.control}
              name="comment"
              render={({ field, fieldState }) => (
                <FormItem className="md:col-span-3">
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
                    Email
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
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel className="text-xs font-bold uppercase tracking-wider text-secondary">
                    Mobile Number <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <FormInput
                      size="md"
                      placeholder="01XXXXXXXXX"
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
                <FormItem className="md:col-span-3 flex items-center gap-3 space-y-0">
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
                    Save my info in this browser for the next time I
                    comment.
                  </FormLabel>
                </FormItem>
              )}
            />

            <div className="md:col-span-3 pt-2">
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="px-10"
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
