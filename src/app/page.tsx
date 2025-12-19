

import Services from "@/components/home/Services";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Services />
      <WhyChooseUs />
    </div>
  );
}
