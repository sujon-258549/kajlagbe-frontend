import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="bg-slate-50 py-16 border-y border-slate-100">
      <div className="main-container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div>
          <h2 className="text-3xl font-bold text-black mb-2">
            Ready to get started?
          </h2>
          <p className="text-slate-600">
            Contact us today to discuss your project or service needs.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="xl" className="border-none">
              Contact Us
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="bg-white border-slate-200 text-black hover:bg-slate-50 shadow-sm hover:shadow-none"
            >
              View Services
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
