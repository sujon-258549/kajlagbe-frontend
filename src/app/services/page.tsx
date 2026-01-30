import CommonHero from "@/components/common/CommonHero";
import Services from "@/components/home/Services";
import ServicesTestimonial from "@/components/services/ServicesTestimonial";
import ServicesPossible from "@/components/services/ServicesPossible";
import ServicesEngineers from "@/components/services/ServicesEngineers";
import ServicesVerticalSlider from "@/components/services/ServicesVerticalSlider";
import ServicesBlog from "@/components/services/ServicesBlog";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <CommonHero
        title="Our Services"
        breadcrumb="Services"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      />

      <div className="pt-16 pb-16">
        <Services />
      </div>

      <ServicesPossible />

      <ServicesEngineers />

      <ServicesVerticalSlider />

      <ServicesTestimonial />
      <ServicesBlog />
    </div>
  );
}
