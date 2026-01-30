import { Button } from "@/components/ui/button";
import Heading2 from "@/components/common/Headings/Heading2";
import { ArrowRight } from "lucide-react";

export default function ServicesCTA() {
  return (
    <section className="py-10 md:py-16 lg:py-24 bg-white">
      <div className="main-container mx-auto px-4">
        <div className="bg-secondary rounded-2xl p-12 lg:p-20 text-center relative overflow-hidden border border-white/10">
          {/* Background Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <Heading2 className="text-white">
              Ready to transform your land into a thriving harvest?
            </Heading2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Join hundreds of happy farmers who have partnered with us for
              sustainable and profitable agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="xl"
                className="px-10  bg-primary text-white hover:bg-white hover:text-secondary   transition-all duration-300 group"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="px-10  border-white/20 text-white bg-transparent hover:bg-white hover:text-secondary  transition-all duration-300"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
