
import Hero from "@/components/home/Hero";
import ServiceBanner from "@/components/home/ServiceBanner";
import FeaturedServices from "@/components/home/FeaturedServices";
import Services from "@/components/home/Services";
// import TopRatedExperts from "@/components/home/TopRatedExperts";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ProcessSection from "@/components/home/ProcessSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import TestimonialSection from "@/components/home/TestimonialSection";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ServiceBanner />
      <FeaturedServices />
      <Services />
      {/* <TopRatedExperts /> */}
      <AboutSection />
      <StatsSection />
      <ProcessSection />
      {/* <PortfolioSection /> */}
      <WhyChooseUs />
      <TestimonialSection />
      <FAQSection />
    </div>
  );
}
