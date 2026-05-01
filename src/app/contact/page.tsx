"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/common/FormInput";
import { Edit } from "lucide-react";
import AdminOnly from "@/components/common/auth/AdminOnly";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import ContactMarquee from "@/components/contact/ContactMarquee";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactHero from "@/components/contact/ContactHero";
import { contactSchema, ContactFormData } from "@/schemas/contact/contact.schema";
import { createContact } from "@/actions/contact.actions";
import { getSettingsMap, upsertSetting } from "@/actions/siteSetting.actions";

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [mapLink, setMapLink] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187895593!2d90.33728804077579!3d23.78088745620951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1706114872654!5m2!1sen!2sbd");

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await getSettingsMap("contact");
      if (res.success && res.data.contact_map) {
        setMapLink(res.data.contact_map.value);
      }
    };
    fetchSettings();
  }, []);

  const handleUpdateMap = async () => {
    const newLink = prompt("Enter Google Maps Embed URL:", mapLink);
    if (!newLink || newLink === mapLink) return;

    try {
      const res = await upsertSetting({
        key: "contact_map",
        value: newLink,
        group: "contact",
        description: "Contact Page Google Map Link",
      });
      if (res.success) {
        setMapLink(newLink);
        toast.success("Map updated successfully!");
      } else {
        toast.error("Failed to update map.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred.");
    }
  };

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      const res = await createContact(data);
      if (res.success) {
        toast.success(res.message || "আপনার মেসেজটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।");
        form.reset();
      } else {
        toast.error(res.message || "Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section */}
      <ContactHero />

      <ContactMarquee />

      <ContactInfo />

      <div className="main-container">
        {/* 4. Bottom Section: Map & Form */}
        <div className="grid lg:grid-cols-2 gap-0 my-6 md:my-8 lg:my-12 overflow-hidden rounded-3xl border border-gray-200">
          {/* Left: Google Map (Simulated) */}
          <div className="relative h-[500px] lg:h-auto w-full bg-slate-100 group/map">
            <AdminOnly>
              <button
                onClick={handleUpdateMap}
                className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/80 border border-secondary/20 text-secondary opacity-0 group-hover/map:opacity-100 transition-all hover:bg-secondary hover:text-white shadow-lg"
                title="Edit Map Link"
              >
                <Edit className="w-4 h-4" />
              </button>
            </AdminOnly>
            <iframe
              src={mapLink}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-[0.9] opacity-90 transition-all duration-500"
            />
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 lg:p-12">
            <h2 className="text-3xl font-bold mb-2 text-secondary">
              Send us a message
            </h2>
            <p className="text-gray-500 mb-8">
              We&apos;d love to hear from you. Please fill out this form.
            </p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <FormInput placeholder="First Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <FormInput placeholder="Last Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <FormInput type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <FormInput type="tel" placeholder="Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <textarea
                          {...field}
                          className="w-full min-h-[150px] p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm outline-none bg-gray-50"
                          placeholder="Your Message..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full "
                >
                  {isLoading ? "Sending..." : "Submit Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
