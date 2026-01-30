"use client";

import CommonHero from "@/components/common/CommonHero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

// Reusing the marquee style from the reference if possible, otherwise creating a custom simple one here
const MarqueeItem = ({ text }: { text: string }) => (
  <div className="flex items-center mx-4 gap-2">
    <span className="text-xl">⛑</span>
    <span className="font-bold uppercase tracking-wider text-white">
      {text}
    </span>
  </div>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section */}
      <CommonHero
        title="Contact Us"
        breadcrumb="Contact"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
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

      <div className="main-container">
        <div className=" px-4 my-16 space-y-20 ">
          {/* 3. Info Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <InfoCard
              icon={Phone}
              title="Contact Us"
              lines={["+ (123) 456-789", "+ (978) 645-132"]}
            />
            <InfoCard
              icon={Mail}
              title="E - mail"
              lines={["info@domainname.com", "support@domain.com"]}
            />
            <InfoCard
              icon={MapPin}
              title="Address"
              lines={["1234 Maple Avenue, Suite 567", "United States"]}
            />
            <InfoCard
              icon={Clock}
              title="Working hours"
              lines={["Mon-Sat : 10am to 07pm", "Sunday: Closed"]}
            />
          </div>
        </div>

        {/* 4. Bottom Section: Map & Form */}
        <div className="grid lg:grid-cols-2 gap-0 mb-8 lg:mb-16 overflow-hidden rounded-2xl shadow-lg">
          {/* Left: Google Map (Simulated) */}
          <div className="relative h-[500px] lg:h-auto w-full bg-slate-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116833.83187895593!2d90.33728804077579!3d23.78088745620951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1706114872654!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale filter contrast-75 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            />
          </div>

          {/* Right: Contact Form */}
          <div className="bg-secondary p-8 lg:p-12 text-white">
            <h2 className="text-3xl font-bold mb-8">Send us message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Input placeholder="First Name" />
                </div>
                <div className="space-y-2">
                  <Input placeholder="Last Name" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Input type="email" placeholder="Email" />
                </div>
                <div className="space-y-2">
                  <Input type="tel" placeholder="Phone" />
                </div>
              </div>

              <div className="space-y-2">
                <Textarea placeholder="Message" className="min-h-[150px]" />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/80 text-white font-bold rounded-lg text-lg transition-transform hover:scale-[1.01]"
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

function InfoCard({
  icon: Icon,
  title,
  lines,
}: {
  icon: any;
  title: string;
  lines: string[];
}) {
  return (
    <div className="bg-secondary/30 p-8 rounded-xl flex flex-col items-start space-y-4 hover:shadow-md transition-shadow">
      <div className="w-12 h-12 rounded-full border-2 border-secondary flex items-center justify-center text-secondary mb-2">
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
      <h3 className="font-bold text-xl text-secondary">{title}</h3>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <p key={i} className="text-secondary/70 text-sm">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
