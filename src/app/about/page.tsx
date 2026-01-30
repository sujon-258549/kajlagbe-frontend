"use client";

import AboutHero from "@/components/about/AboutHero";
import AboutStory from "@/components/about/AboutStory";
import AboutMission from "@/components/about/AboutMission";
import AboutFeatures from "@/components/about/AboutFeatures";
import AboutStats from "@/components/about/AboutStats";
import AboutFAQ from "@/components/about/AboutFAQ";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import AboutTestimonialSlider from "@/components/about/AboutTestimonialSlider";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <AboutHero />
      <AboutStory />
      <AboutMission />
      <AboutFeatures />
      <AboutStats />
      <AboutTestimonials />
      <AboutFAQ />
      <AboutTestimonialSlider />
    </div>
  );
}
