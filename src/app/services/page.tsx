import CommonHero from "@/components/common/CommonHero";
import Services from "@/components/home/Services";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <CommonHero
        title="Our Services"
        subtitle="What We Offer"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      />

      <div className="pt-16">
        <Services />
      </div>
    </div>
  );
}
