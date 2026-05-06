"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createApplication } from "@/actions/application.actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import FormInput from "@/components/common/FormInput";
import FormTextarea from "@/components/common/FormTextarea";
import RichTextEditor from "@/components/common/RichTextEditor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2, Send, FileText, MessageSquare, ClipboardList } from "lucide-react";

const formSchema = z.object({
  resume: z.string().url("Please provide a valid URL for your resume (e.g. Google Drive, Dropbox, or LinkedIn profile).").optional().or(z.literal("")),
  coverLetter: z.string().min(50, "Cover letter should be at least 50 characters."),
  applyNote: z.string().optional(),
  applyComment: z.string().optional(),
});

interface ApplicationFormProps {
  jobId: string;
}

export default function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      resume: "",
      coverLetter: "",
      applyNote: "",
      applyComment: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const payload = {
        ...values,
        jobId,
      };

      const res = await createApplication(payload);

      if (res.success) {
        toast.success("Application submitted successfully!");
        router.push("/dashboard/my-applications");
      } else {
        toast.error(res.message || "Failed to submit application.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-300 p-6 rounded-lg bg-slate-50/50">
          {/* Resume Link */}
          <FormField
            control={form.control}
            name="resume"
            render={({ field, fieldState }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="flex items-center gap-2 text-slate-700 font-bold mb-4">
                  <FileText className="w-4 h-4 text-secondary" /> Resume Link (PDF/Doc)
                </FormLabel>
                <FormControl>
                  <FormInput 
                    placeholder="https://drive.google.com/file/d/..." 
                    error={fieldState.error}
                    size="lg"
                    {...field} 
                  />
                </FormControl>
                <p className="text-[11px] text-slate-500 italic mt-1">
                  Provide a link to your resume stored online (Drive, Dropbox, etc.)
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Apply Note */}
          <FormField
            control={form.control}
            name="applyNote"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-slate-700 font-bold mb-4">
                  <MessageSquare className="w-4 h-4 text-secondary" /> Application Note
                </FormLabel>
                <FormControl>
                  <FormTextarea
                    placeholder="Short note for the recruiter..."
                    error={fieldState.error}
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Apply Comment */}
          <FormField
            control={form.control}
            name="applyComment"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2 text-slate-700 font-bold mb-4">
                  <MessageSquare className="w-4 h-4 text-secondary" /> Additional Comments
                </FormLabel>
                <FormControl>
                  <FormTextarea
                    placeholder="Anything else you'd like to add?"
                    error={fieldState.error}
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Cover Letter */}
        <FormField
          control={form.control}
          name="coverLetter"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 text-slate-700 font-bold mb-4">
                <ClipboardList className="w-4 h-4 text-secondary" /> Cover Letter
              </FormLabel>
              <FormControl>
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Tell us why you are a great fit for this position..."
                  height={400}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 text-md font-semibold tracking-widest bg-secondary hover:bg-secondary/90 transition-all flex items-center justify-center gap-4 rounded-xl shadow-2xl shadow-secondary/30 group"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" /> Processing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /> 
                Submit Application Now
              </>
            )}
          </Button>
          <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-tighter mt-6">
            SECURE APPLICATION SUBMISSION &bull; 256-BIT ENCRYPTION
          </p>
        </div>
      </form>
    </Form>
  );
}


