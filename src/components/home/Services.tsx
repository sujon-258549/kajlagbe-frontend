"use client";

import {
  ArrowRight,
  Wrench,
  Sparkles,
  Hammer,
  Axe,
  Droplets,
  Zap,
  Palette,
  Leaf,
  Bug,
  Settings,
  Thermometer,
  Home,
  Square,
  Shield,
  Cpu,
  Truck,
  Trash2,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Heading1 from "@/components/common/Headings/Heading1";
import Heading5 from "../common/Headings/Heading5";

export default function Services() {
  const servicesData = [
    {
      title: "Home Repair & Maintenance",
      slug: "home-repair-maintenance",
      icon: Wrench,
      image:
        "https://img.freepik.com/free-photo/repairman-fixing-electric-panel_53876-123456.jpg",
    },
    {
      title: "Cleaning & Hygiene",
      slug: "cleaning-hygiene",
      icon: Sparkles,
      image:
        "https://img.freepik.com/free-photo/cleaning-service-woman-scrubbing-floor_53876-123457.jpg",
    },
    {
      title: "Construction & Renovation",
      slug: "construction-renovation",
      icon: Hammer,
      image:
        "https://img.freepik.com/free-photo/construction-workers-on-building-site_53876-123458.jpg",
    },
    {
      title: "Carpentry, Glass & Metal",
      slug: "carpentry-glass-metal",
      icon: Axe,
      image:
        "https://img.freepik.com/free-photo/carpenter-working-wood_53876-123459.jpg",
    },
    {
      title: "Plumbing Services",
      slug: "plumbing-services",
      icon: Droplets,
      image:
        "https://img.freepik.com/free-photo/plumber-fixing-pipes_53876-123460.jpg",
    },
    {
      title: "Electrical Services",
      slug: "electrical-services",
      icon: Zap,
      image:
        "https://img.freepik.com/free-photo/electrician-working_53876-123461.jpg",
    },
    {
      title: "Painting & Decorating",
      slug: "painting-decorating",
      icon: Palette,
      image:
        "https://img.freepik.com/free-photo/painter-applying-paint_53876-123462.jpg",
    },
    {
      title: "Gardening & Landscaping",
      slug: "gardening-landscaping",
      icon: Leaf,
      image:
        "https://img.freepik.com/free-photo/gardener-planting_53876-123463.jpg",
    },
    {
      title: "Pest Control",
      slug: "pest-control",
      icon: Bug,
      image:
        "https://img.freepik.com/free-photo/pest-control-technician_53876-123464.jpg",
    },
    {
      title: "Appliance Repair",
      slug: "appliance-repair",
      icon: Settings,
      image:
        "https://img.freepik.com/free-photo/appliance-repairman_53876-123465.jpg",
    },
    {
      title: "HVAC Services",
      slug: "hvac-services",
      icon: Thermometer,
      image:
        "https://img.freepik.com/free-photo/hvac-technician_53876-123466.jpg",
    },
    {
      title: "Roofing & Gutters",
      slug: "roofing-gutters",
      icon: Home,
      image:
        "https://img.freepik.com/free-photo/roofing-contractor_53876-123467.jpg",
    },
    {
      title: "Flooring Installation",
      slug: "flooring-installation",
      icon: Square,
      image:
        "https://img.freepik.com/free-photo/flooring-installer_53876-123468.jpg",
    },
    {
      title: "Home Security",
      slug: "home-security",
      icon: Shield,
      image:
        "https://img.freepik.com/free-photo/security-installer_53876-123469.jpg",
    },
    {
      title: "Smart Home Installation",
      slug: "smart-home-installation",
      icon: Cpu,
      image:
        "https://img.freepik.com/free-photo/smart-home-installer_53876-123470.jpg",
    },
    {
      title: "Moving Services",
      slug: "moving-services",
      icon: Truck,
      image:
        "https://img.freepik.com/free-photo/moving-company_53876-123471.jpg",
    },
    {
      title: "Junk Removal",
      slug: "junk-removal",
      icon: Trash2,
      image:
        "https://img.freepik.com/free-photo/junk-removal-service_53876-123472.jpg",
    },
    {
      title: "Window Cleaning",
      slug: "window-cleaning",
      icon: Eye,
      image:
        "https://img.freepik.com/free-photo/window-cleaner_53876-123473.jpg",
    },
  ];

  return (
    <section className="bg-green-50/30 relative pb-6 pt-3.5 md:py-16 lg:py-24 overflow-hidden">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(var(--primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="main-container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-8 md:mb-16 space-y-4">
          <Heading1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Our Services
          </Heading1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal">
            Explore verified professionals across all essential categories —
            simple, fast, and reliable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative h-[180px] w-full overflow-hidden rounded-xl bg-secondary border border-white/10 transition-colors"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 z-0 bg-secondary" />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent z-10" />
              </div>

              {/* Top Bar: Icon Left */}
              <div className="absolute top-3 left-3 z-20">
                <div className="h-8 w-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-primary">
                  <service.icon className="h-5 w-5" />
                </div>
              </div>

              {/* Bottom Content: Title & CTA */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-3 flex flex-col gap-2">
                <Heading5 className="text-white text-base font-bold leading-tight line-clamp-2">
                  {service.title}
                </Heading5>

                <div className="w-full h-px bg-white/20" />

                <div className="flex items-center justify-between text-xs font-medium text-white/90">
                  <span>Explore</span>
                  <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-8 md:mt-16 text-center">
          <Button size="lg" asChild variant="default" className="">
            <Link href="/services">
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
