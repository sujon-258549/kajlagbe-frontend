import CommonHero from "@/components/common/CommonHero";
import ReasonsToChoose from "@/components/why-choose-us/ReasonsToChoose";
import TeamSection from "@/components/why-choose-us/TeamSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import UpcomingEvents from "@/components/why-choose-us/UpcomingEvents";
import ContactInfoCards from "@/components/why-choose-us/ContactInfoCards";

export default function WhyChooseUsPage() {
  return (
    <>
      <CommonHero
        title="Who We Are"
        subtitle="Know About Us"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      />
      <ReasonsToChoose />
      <TeamSection />

      {/* Testimonials with custom margin to separate sections */}
      <TestimonialSection />

      <UpcomingEvents />
      <ContactInfoCards />
    </>
  );
}
