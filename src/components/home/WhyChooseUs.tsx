import { CheckCircle2 } from "lucide-react";
import CustomImage from "../common/CustomImage";
import Heading2 from "../common/Headings/Heading2";
import Heading4 from "../common/Headings/Heading4";

export default function WhyChooseUs() {
  return (
    <section className="py-20">
      <div className="main-container mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="relative">
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <CustomImage
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80"
              alt="Meeting"
              fill
              wrapperClassName="w-full h-[600px]"
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Decorative Elements */}
          <div className="absolute -bottom-6 -left-6 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -z-0"></div>
        </div>
        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <span className="text-primary font-bold text-sm uppercase tracking-widest">
              Why Choose Us
            </span>
            <Heading2 className="text-3xl lg:text-4xl font-bold text-secondary leading-tight">
              We Are Here to Grow Your Business Exponentially
            </Heading2>
          </div>
          <p className="text-slate-600 leading-relaxed">
            We combine technical expertise with a customer-centric approach to
            deliver solutions that drive real results. Our team is committed to
            excellence and transparency in every project.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
              <div>
                <Heading4 className="font-bold text-secondary text-lg">
                  Verified Professionals
                </Heading4>
                <p className="text-slate-600 text-sm">
                  Every expert on our platform is background-checked and vetted.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
              <div>
                <Heading4 className="font-bold text-secondary text-lg">
                  24/7 Support
                </Heading4>
                <p className="text-slate-600 text-sm">
                  Our support team is always available to assist you with any
                  queries.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
              <div>
                <Heading4 className="font-bold text-secondary text-lg">
                  Affordable Pricing
                </Heading4>
                <p className="text-slate-600 text-sm">
                  Transparent pricing with no hidden charges for all our
                  services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
