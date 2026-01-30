import Hero from "@/components/home/Hero";
import ServiceBanner from "@/components/home/ServiceBanner";
import FeaturedServices from "@/components/home/FeaturedServices";
import Services from "@/components/home/Services";
// import TopRatedExperts from "@/components/home/TopRatedExperts";
import AboutSection from "@/components/home/AboutSection";
import StatsSection from "@/components/home/StatsSection";
import ProcessSection from "@/components/home/ProcessSection";
import HomeBenefits from "@/components/home/HomeBenefits";
import HomeVideoSection from "@/components/home/HomeVideoSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FAQSection from "@/components/home/FAQSection";
import NewBlogSection from "@/components/home/NewBlogSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import ServicesVerticalSlider from "@/components/services/ServicesVerticalSlider";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Loader /> */}
      <Hero />
      <ServiceBanner />
      <FeaturedServices />
      <Services />
      {/* <TopRatedExperts /> */}
      <AboutSection />
      <StatsSection />
      <ProcessSection />
      <HomeBenefits />
      <HomeVideoSection />
      <TestimonialSection />
      <NewBlogSection />
      <div className="md:-my-0 -my-12">
        <ServicesVerticalSlider />
      </div>
      {/* <PortfolioSection /> */}
      <WhyChooseUs />

      <div className="">
        <FAQSection />
      </div>
    </div>
  );
}
