import ServicesHero from "@/components/services/ServicesHero";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServicesHero />

      <div className="pb-6 md:pb-16">
        <Services />
      </div>

      <ServicesPossible />

      <ServicesEngineers />

      <ServicesVerticalSlider />

      <ServicesTestimonial />

      <ServicesBenefits />

      <ServicesPricing />
      <ServicesCTA />
      <ServicesFAQ />

      <ServicesBlog />
      <ServicesProcess />
    </div>
  );
}
