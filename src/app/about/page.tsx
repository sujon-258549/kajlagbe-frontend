"use client";

import CommonHero from "@/components/common/CommonHero";
import AboutStory from "@/components/about/AboutStory";
import AboutMission from "@/components/about/AboutMission";
import AboutFeatures from "@/components/about/AboutFeatures";
import AboutStats from "@/components/about/AboutStats";
import AboutFAQ from "@/components/about/AboutFAQ";
import AboutTestimonials from "@/components/about/AboutTestimonials";
import AboutTestimonialSlider from "@/components/about/AboutTestimonialSlider";

import AboutHeroModal from "@/components/modal/about/AboutHeroModal";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <CommonHero
        title="About Us"
        breadcrumb="About Us"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
        ModalComponent={AboutHeroModal}
      />
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
