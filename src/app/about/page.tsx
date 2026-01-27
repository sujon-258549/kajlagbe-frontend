"use client";

import CommonHero from "@/components/common/CommonHero";
import AboutStory from "@/components/about/AboutStory";
import AboutMission from "@/components/about/AboutMission";
import AboutFeatures from "@/components/about/AboutFeatures";
import AboutStats from "@/components/about/AboutStats";
import AboutFAQ from "@/components/about/AboutFAQ";
import AboutTestimonials from "@/components/about/AboutTestimonials";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <CommonHero
        title="About Us"
        subtitle="Our Journey"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      />
      <AboutStory />
      <AboutMission />
      <AboutFeatures />
      <AboutStats />
      <AboutFAQ />
      <AboutTestimonials />
    </div>
  );
}
