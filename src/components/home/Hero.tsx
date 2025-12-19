"use client";

import { Button } from "@/components/ui/button";
import { Search, Monitor, Home, Shield, Code, Settings, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full py-12 md:py-20 bg-slate-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[700px]">
          
          {/* Main Content Area - 7 Columns */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white p-10 md:p-14 rounded-[40px] shadow-sm border border-slate-100 flex-1 flex flex-col justify-center">
              <span className="text-primary font-black tracking-[0.2em] uppercase text-sm mb-4 inline-block">// Multipurpose Service Hub</span>
              <h1 className="text-5xl md:text-7xl font-black text-secondary leading-[1.1] mb-8">
                Your Expert <br />
                Partner for <br />
                <span className="text-primary">Everything.</span>
              </h1>
              
              <div className="relative max-w-xl group">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white shadow-xl rounded-full p-2 flex items-center gap-2 border border-slate-100">
                  <div className="flex-1 flex items-center px-6 gap-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search for any service..." 
                      className="w-full bg-transparent border-none outline-none text-secondary font-medium h-12"
                    />
                  </div>
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-10 h-14 font-black">
                    SEARCH
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-center gap-8 mt-8">
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-secondary">
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Home</span>
                </div>
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-secondary">
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Office</span>
                </div>
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all text-secondary">
                    <div className="w-2 h-2 rounded-full bg-current"></div>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Commercial</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Shield className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-500">Verified Pros</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
                    <Settings className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-bold text-slate-500">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Grid - 5 Columns */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 h-full">
            
            {/* IT Division Card - Full Width of this Column */}
            <div className="col-span-2 relative group overflow-hidden rounded-[40px] bg-secondary aspect-[16/10] lg:aspect-auto h-full">
              <img 
                src="/bento_it.png" 
                alt="IT Division" 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-3">
                  <Monitor className="w-3 h-3 text-white" />
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">IT Division</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Software & Digital</h3>
                <p className="text-white/70 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                  Expert development, cloud solutions, and high-end tech services.
                </p>
              </div>
            </div>

            {/* Home Services Card */}
            <div className="relative group overflow-hidden rounded-[40px] bg-white border border-slate-100 shadow-sm aspect-square lg:aspect-auto">
               <img 
                src="/bento_home.png" 
                alt="Home Services" 
                className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:opacity-20 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <Home className="w-7 h-7" />
                </div>
                <h4 className="font-black text-secondary text-lg mb-1">Home Services</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Premium Care</p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="relative group overflow-hidden rounded-[40px] bg-primary aspect-square lg:aspect-auto">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="flex text-yellow-300 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                </div>
                <div className="text-3xl font-black">5.0</div>
                <div className="text-[10px] font-black uppercase tracking-widest mt-1">Average Rating</div>
                <div className="mt-4 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black uppercase">
                  Top Rated Experts
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
