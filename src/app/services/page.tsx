import CommonHero from "@/components/common/CommonHero";
import Services from "@/components/home/Services";
import ServicesTestimonial from "@/components/services/ServicesTestimonial";
import ServicesPossible from "@/components/services/ServicesPossible";
import ServicesEngineers from "@/components/services/ServicesEngineers";
import ServicesVerticalSlider from "@/components/services/ServicesVerticalSlider";
import ServicesBlog from "@/components/services/ServicesBlog";

import ServicesBenefits from "@/components/services/ServicesBenefits";
import ServicesProcess from "@/components/services/ServicesProcess";
import ServicesPricing from "@/components/services/ServicesPricing";
import ServicesFAQ from "@/components/services/ServicesFAQ";
import ServicesCTA from "@/components/services/ServicesCTA";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <CommonHero
        title="Our Services"
        breadcrumb="Services"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      />

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
