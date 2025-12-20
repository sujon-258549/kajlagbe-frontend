'use client';

import { ArrowRight, Wrench, Sparkles, Hammer, Axe, Droplets, Zap, Palette, Leaf, Bug, Settings, Thermometer, Home, Square, Shield, Cpu, Truck, Trash2, Eye, Waves } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Services() {
  const getIcon = (slug: string): LucideIcon => {
    const iconMap: { [key: string]: LucideIcon } = {
      "home-repair-maintenance": Wrench,
      "cleaning-hygiene": Sparkles,
      "construction-renovation": Hammer,
      "carpentry-glass-metal": Axe,
      "plumbing-services": Droplets,
      "electrical-services": Zap,
      "painting-decorating": Palette,
      "gardening-landscaping": Leaf,
      "pest-control": Bug,
      "appliance-repair": Settings,
      "hvac-services": Thermometer,
      "roofing-gutters": Home,
      "flooring-installation": Square,
      "home-security": Shield,
      "smart-home-installation": Cpu,
      "moving-services": Truck,
      "junk-removal": Trash2,
      "window-cleaning": Eye,
      "carpet-cleaning": Square,
      "pool-maintenance": Waves
    };
    return iconMap[slug] || Wrench;
  };

  const servicesData = [
    {
      title: "Home Repair & Maintenance",
      slug: "home-repair-maintenance",
      image: "https://img.freepik.com/free-photo/repairman-fixing-electric-panel_53876-123456.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Cleaning & Hygiene",
      slug: "cleaning-hygiene",
      image: "https://img.freepik.com/free-photo/cleaning-service-woman-scrubbing-floor_53876-123457.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Construction & Renovation",
      slug: "construction-renovation",
      image: "https://img.freepik.com/free-photo/construction-workers-on-building-site_53876-123458.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Carpentry, Glass & Metal",
      slug: "carpentry-glass-metal",
      image: "https://img.freepik.com/free-photo/carpenter-working-wood_53876-123459.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Plumbing Services",
      slug: "plumbing-services",
      image: "https://img.freepik.com/free-photo/plumber-fixing-pipes_53876-123460.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Electrical Services",
      slug: "electrical-services",
      image: "https://img.freepik.com/free-photo/electrician-working_53876-123461.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Painting & Decorating",
      slug: "painting-decorating",
      image: "https://img.freepik.com/free-photo/painter-applying-paint_53876-123462.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Gardening & Landscaping",
      slug: "gardening-landscaping",
      image: "https://img.freepik.com/free-photo/gardener-planting_53876-123463.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Pest Control",
      slug: "pest-control",
      image: "https://img.freepik.com/free-photo/pest-control-technician_53876-123464.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Appliance Repair",
      slug: "appliance-repair",
      image: "https://img.freepik.com/free-photo/appliance-repairman_53876-123465.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "HVAC Services",
      slug: "hvac-services",
      image: "https://img.freepik.com/free-photo/hvac-technician_53876-123466.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Roofing & Gutters",
      slug: "roofing-gutters",
      image: "https://img.freepik.com/free-photo/roofing-contractor_53876-123467.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Flooring Installation",
      slug: "flooring-installation",
      image: "https://img.freepik.com/free-photo/flooring-installer_53876-123468.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Home Security",
      slug: "home-security",
      image: "https://img.freepik.com/free-photo/security-installer_53876-123469.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Smart Home Installation",
      slug: "smart-home-installation",
      image: "https://img.freepik.com/free-photo/smart-home-installer_53876-123470.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Moving Services",
      slug: "moving-services",
      image: "https://img.freepik.com/free-photo/moving-company_53876-123471.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Junk Removal",
      slug: "junk-removal",
      image: "https://img.freepik.com/free-photo/junk-removal-service_53876-123472.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Window Cleaning",
      slug: "window-cleaning",
      image: "https://img.freepik.com/free-photo/window-cleaner_53876-123473.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Carpet Cleaning",
      slug: "carpet-cleaning",
      image: "https://img.freepik.com/free-photo/carpet-cleaner_53876-123474.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    },
    {
      title: "Pool Maintenance",
      slug: "pool-maintenance",
      image: "https://img.freepik.com/free-photo/pool-maintenance_53876-123475.jpg?w=740&t=st=1708520000~exp=1708520600~hmac=example"
    }
    // Add more categories here
  ];

  return (
    <section className=" bg-white relative">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-black leading-tight">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal">
            Explore verified professionals across all essential categories — simple, fast, and reliable.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {servicesData.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group relative rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden aspect-square flex items-end"
            >
              {/* Background Image with Opacity */}
              <img
                src={service.image}
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover opacity-80 blur-xs group-hover:blur-none group-hover:opacity-90 transition-all duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Content Overlay */}
              <div className="relative z-10 p-5 text-center w-full">
                <div className="mb-3 flex justify-center">
                  <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    {(() => {
                      const IconComponent = getIcon(service.slug);
                      return <IconComponent className="h-6 w-6 text-white" />;
                    })()}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white leading-tight mb-3">
                  {service.title}
                </h3>
                <div className="flex justify-center">
                  <div className="inline-flex items-center text-white font-medium text-sm group-hover:text-gray-200 transition-colors">
                    <span>Details</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            asChild
            variant="outline"
            className="rounded-full px-10 py-4 text-lg font-medium border-2 hover:bg-black hover:text-white transition-all"
          >
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
