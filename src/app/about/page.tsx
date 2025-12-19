import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-secondary py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/pattern/grid.png')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">About Kajlagbe</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            We are connecting you with the best professionals for all your home and business needs. Reliable, fast, and secure.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-primary font-bold text-sm uppercase tracking-widest">Our Mission</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-secondary">Empowering Your Daily Life</h2>
              <p className="text-slate-600 leading-relaxed text-lg">
                At Kajlagbe, our mission is to simplify your life by providing easy access to skilled professionals. Whether it's home maintenance, tech support, or personal care, we bring the experts to your doorstep.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-secondary text-lg">Verified Professionals</h3>
                    <p className="text-slate-600">All our service providers go through a strict verification process.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-secondary text-lg">Quality Guaranteed</h3>
                    <p className="text-slate-600">We ensure top-notch service quality and customer satisfaction.</p>
                  </div>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full mt-4">
                Learn More <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
             <div className="relative h-[400px] lg:h-[500px] bg-slate-100 rounded-2xl overflow-hidden shadow-2xl">
               {/* Placeholder for About Image - In a real app, use next/image */}
                <div className="absolute inset-0 bg-secondary/5 flex items-center justify-center text-secondary/20 font-bold text-2xl">
                    About Us Image
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
