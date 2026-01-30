"use client";

import CommonHero from "@/components/common/CommonHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Reusing the marquee style from the reference if possible, otherwise creating a custom simple one here
const MarqueeItem = ({ text }: { text: string }) => (
  <div className="flex items-center mx-4 gap-2">
    <span className="text-xl">⛑</span>
    <span className="font-bold uppercase tracking-wider text-white">
      {text}
    </span>
  </div>
);

import ContactInfo from "@/components/contact/ContactInfo";
import ContactHeroModal from "@/components/modal/contact/ContactHeroModal";

// Reusing the marquee style from the reference if possible, otherwise creating a custom simple one here
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section */}
      <CommonHero
        title="Contact Us"
        breadcrumb="Contact"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
        ModalComponent={ContactHeroModal}
      />

      {/* 2. Ticker/Marquee Section (Simulated based on image) */}
      <div className="bg-primary py-4 overflow-hidden whitespace-nowrap text-white">
        <div className="inline-flex animate-marquee">
          {[
            "Everyday Nourishment",
            "Wholesome Goodness",
            "Farm Fresh Finds",
            "Flavors You Love",
            "Everyday Nourishment",
            "Wholesome Goodness",
            "Farm Fresh Finds",
            "Flavors You Love",
          ].map((text, i) => (
            <MarqueeItem key={i} text={text} />
          ))}
        </div>
      </div>

      <ContactInfo />

      <div className="main-container">
        {/* 4. Bottom Section: Map & Form */}
        <div className="grid lg:grid-cols-2 gap-0 mb-8 lg:mb-16 overflow-hidden rounded-3xl border border-gray-200">
          {/* Left: Google Map (Simulated) */}
          <div className="relative h-[500px] lg:h-auto w-full bg-slate-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187895593!2d90.33728804077579!3d23.78088745620951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1706114872654!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale contrast-[0.9] opacity-90 transition-all duration-500"
            />
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white p-8 lg:p-12">
            <h2 className="text-3xl font-bold mb-2 text-secondary">
              Send us a message
            </h2>
            <p className="text-gray-500 mb-8">
              We&apos;d love to hear from you. Please fill out this form.
            </p>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Input
                    placeholder="First Name"
                    className="bg-gray-50 border-gray-200 h-12 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    placeholder="Last Name"
                    className="bg-gray-50 border-gray-200 h-12 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    className="bg-gray-50 border-gray-200 h-12 focus-visible:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="tel"
                    placeholder="Phone"
                    className="bg-gray-50 border-gray-200 h-12 focus-visible:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Textarea
                  placeholder="Message"
                  className="min-h-[150px] bg-gray-50 border-gray-200 focus-visible:ring-primary resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-green-700 text-white font-bold rounded-xl h-12 text-base transition-transform hover:scale-[1.01]"
              >
                Submit Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
