"use client";

import { Button } from "@/components/ui/button";
import { Download, Smartphone, CheckCircle } from "lucide-react";

export default function ServiceAppSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="bg-secondary rounded-[3rem] p-12 lg:p-24 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]"></div>
          
          <div className="lg:w-1/2 space-y-8 relative z-10 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-sm">// Mobile Marketplace</span>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Book a Service in <span className="text-primary">Seconds</span></h2>
              <p className="text-xl text-slate-400 leading-relaxed">
                Download the KajLagbe app to book services, track professionals in real-time, and get exclusive app-only discounts.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              {["Real-time Tracking", "Easy Payments", "Verified Pros", "24/7 Support"].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white/80">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-bold text-sm tracking-wide">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
              <Button className="bg-primary hover:bg-primary/90 text-white h-16 px-8 rounded-2xl flex items-center gap-3 shadow-xl shadow-primary/20">
                <Download className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-black opacity-70">Download on</div>
                  <div className="text-lg font-black leading-none">App Store</div>
                </div>
              </Button>
              <Button variant="outline" className="bg-white/5 border-white/10 text-white hover:bg-white hover:text-secondary h-16 px-8 rounded-2xl flex items-center gap-3">
                <Smartphone className="w-6 h-6" />
                <div className="text-left">
                  <div className="text-[10px] uppercase font-black opacity-70">Get it on</div>
                  <div className="text-lg font-black leading-none">Google Play</div>
                </div>
              </Button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative z-10 p-10 bg-white/5 backdrop-blur-xl rounded-[3rem] border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-700 max-w-md mx-auto">
               <div className="aspect-[9/19] bg-[#1a1a1a] rounded-[2rem] border-4 border-slate-800 overflow-hidden shadow-2xl">
                 {/* Mock app screen */}
                 <div className="p-6 space-y-6">
                   <div className="flex justify-between items-center">
                     <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-sm bg-primary"></div>
                     </div>
                     <div className="w-8 h-1 bg-slate-800 rounded-full"></div>
                   </div>
                   <div className="space-y-4">
                     <div className="h-8 w-2/3 bg-slate-800 rounded-lg"></div>
                     <div className="grid grid-cols-3 gap-2">
                       {[...Array(6)].map((_, i) => (
                         <div key={i} className="aspect-square bg-slate-800 rounded-xl"></div>
                       ))}
                     </div>
                   </div>
                   <div className="h-40 w-full bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center">
                      <div className="text-[10px] font-black text-primary uppercase">Tracking Professional...</div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
