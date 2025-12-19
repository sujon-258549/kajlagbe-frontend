import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-primary py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
           <div>
               <h2 className="text-3xl font-bold text-white mb-2">Ready to get started?</h2>
               <p className="text-white/90">Contact us today to discuss your project or service needs.</p>
           </div>
           <div className="flex gap-4">
               <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white border-none h-12 px-8">
                  Contact Us
               </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary h-12 px-8">
                  View Services
               </Button>
           </div>
        </div>
    </section>
  );
}
