
'use client';
import { 
  ArrowRight, 
  Wrench, 
  Sparkles, 
  Hammer, 
  Armchair, 
  Car, 
  Truck, 
  Box, 
  Cpu, 
  GraduationCap, 
  HeartPulse, 
  Scissors, 
  Utensils, 
  Music, 
  Briefcase, 
  ShieldCheck, 
  FileText, 
  Clock,
  Leaf,
  Search,
  FilterX,
  X,
  Star as StarIcon,
  Users
} from "lucide-react";
import Link from "next/link";
import { JSX, useState, useMemo } from "react";
import { servicesData } from "@/data/servicesData";

const iconMap: Record<string, JSX.Element> = {
  "Home Repair & Maintenance": <Wrench className="h-7 w-7" />,
  "Cleaning & Hygiene": <Sparkles className="h-7 w-7" />,
  "Construction & Renovation": <Hammer className="h-7 w-7" />,
  "Carpentry, Glass & Metal": <Armchair className="h-7 w-7" />,
  "Vehicle Services": <Car className="h-7 w-7" />,
  "Driver & Transport": <Truck className="h-7 w-7" />,
  "Shifting & Labour": <Box className="h-7 w-7" />,
  "Electronics, IT & CCTV": <Cpu className="h-7 w-7" />,
  "Tutor & Education": <GraduationCap className="h-7 w-7" />,
  "Health & Care": <HeartPulse className="h-7 w-7" />,
  "Beauty & Personal Care": <Scissors className="h-7 w-7" />,
  "Food & Cooking": <Utensils className="h-7 w-7" />,
  "Event & Media": <Music className="h-7 w-7" />,
  "Digital & Office Support": <Briefcase className="h-7 w-7" />,
  "Security & Safety": <ShieldCheck className="h-7 w-7" />,
  "Legal, Paper & Documentation": <FileText className="h-7 w-7" />,
  "Daily Life & On-Demand": <Clock className="h-7 w-7" />,
  "Gardening & Landscaping": <Leaf className="h-7 w-7" />
};

const filterChips = [
  "All",
  "Home",
  "Technical",
  "Personal",
  "Corporate",
  "Emergency"
];

const categoryGroups: Record<string, string[]> = {
  "Home": ["Home Repair & Maintenance", "Cleaning & Hygiene", "Construction & Renovation", "Carpentry, Glass & Metal", "Gardening & Landscaping", "Food & Cooking"],
  "Technical": ["Electronics, IT & CCTV", "Vehicle Services", "Security & Safety"],
  "Personal": ["Tutor & Education", "Health & Care", "Beauty & Personal Care", "Daily Life & On-Demand"],
  "Corporate": ["Driver & Transport", "Digital & Office Support", "Legal, Paper & Documentation", "Shifting & Labour", "Event & Media"],
  "Emergency": ["Home Repair & Maintenance", "Vehicle Services", "Security & Safety", "Health & Care"]
};

const popularSuggestions = ["AC Repair", "Home Cleaning", "SSC Tutor", "Beauty Salon", "Handyman"];

// Helper component for search highlighting
const HighlightText = ({ text, highlight }: { text: string; highlight: string }) => {
  if (!highlight.trim()) return <span>{text}</span>;
  const regex = new RegExp(`(${highlight})`, "gi");
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-primary/20 text-primary p-0 rounded-sm">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
};

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredServices = useMemo(() => {
    return servicesData.filter(service => {
      const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          service.subServices.some(sub => sub.name.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = activeFilter === "All" || categoryGroups[activeFilter]?.includes(service.title);
      
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  return (
    <section className="py-32 bg-slate-50/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 -z-10"></div>

      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 mb-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
            </span>
            <span className="text-secondary font-black text-[10px] md:text-xs uppercase tracking-[0.3em]">
              Our Professional Categories
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-black leading-tight tracking-tight">
            Explore Our <span className="text-primary relative">Services
              <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                <path d="M0 7C30 7 70 2 100 2" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium max-w-2xl mx-auto">
            Find the perfect solution for your needs. Search across 18 categories and hundreds of specialized services.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto mb-16 space-y-6">
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-secondary transition-colors" />
            <input 
              type="text" 
              placeholder="Search services (e.g. AC, Cleaning, Tutor...)"
              className="w-full h-16 md:h-20 pl-16 pr-16 bg-white/80 backdrop-blur-xl rounded-3xl border border-slate-200 focus:border-secondary focus:ring-4 focus:ring-secondary/5 outline-none transition-all text-black font-semibold text-lg shadow-[0_10px_30px_rgba(0,0,0,0.03)]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                title="Clear Search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {filterChips.map(chip => (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={`px-6 py-2 rounded-full text-[11px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 border ${
                    activeFilter === chip 
                      ? "bg-secondary border-secondary text-white shadow-lg shadow-secondary/20" 
                      : "bg-white border-slate-200 text-slate-500 hover:border-secondary/30 hover:bg-slate-50"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
            
            {!searchQuery && (
              <div className="flex gap-4 items-center overflow-x-auto no-scrollbar pb-2">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap">Popular:</span>
                {popularSuggestions.map(suggest => (
                  <button 
                    key={suggest}
                    onClick={() => setSearchQuery(suggest)}
                    className="text-[10px] font-bold text-slate-500 hover:text-secondary transition-colors whitespace-nowrap px-2 py-1 bg-slate-100/50 rounded-md"
                  >
                    {suggest}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6 animate-in fade-in duration-700">
            {filteredServices.map((service, index) => (
              <Link key={service.slug} 
                    href={`/services/${service.slug}`}
                    className="group relative bg-white backdrop-blur-xl p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-slate-200 hover:border-secondary/60 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(67,147,74,0.18)] transition-all duration-500 flex flex-col items-center justify-center text-center aspect-square overflow-hidden hover:-translate-y-2"
              >
                {/* 3D Glow Effect Element */}
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative mb-3 md:mb-5">
                  <div className="h-12 w-12 md:h-14 md:w-14 bg-secondary/5 rounded-2xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-6 shadow-inner">
                    {iconMap[service.title] || <Wrench className="h-6 w-6 md:h-7 md:w-7" />}
                  </div>
                </div>
                
                <div className="flex-grow space-y-1 relative px-2.5">
                  <h3 className="text-[11px] md:text-[14px] font-black text-black group-hover:text-secondary transition-colors duration-300 leading-tight mb-1">
                    <HighlightText text={service.title} highlight={searchQuery} />
                  </h3>
                  
                  {/* Micro-data badges */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-100 group-hover:bg-secondary/5 group-hover:border-secondary/10 group-hover:text-secondary/80 transition-all">
                      <StarIcon className="h-2.5 w-2.5 text-amber-500 fill-amber-500" />
                      <span>{4.5 + (index % 5) * 0.1}</span>
                      <span className="opacity-50">•</span>
                      <span>({100 * (index + 1)}+)</span>
                    </div>
                    
                    <div className="flex items-center gap-1 text-[8px] font-black font-mono text-slate-300 uppercase tracking-widest group-hover:text-secondary/60">
                      <Users className="h-2.5 w-2.5" />
                      <span>150+ Experts</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 absolute bottom-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <div className="h-7 w-7 rounded-full bg-secondary text-white flex items-center justify-center shadow-xl shadow-secondary/40">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 px-6 bg-white/40 backdrop-blur-md rounded-[3rem] border border-dashed border-slate-300 animate-in zoom-in-95 duration-500">
            <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FilterX className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="text-2xl font-black text-secondary mb-2">No categories found</h3>
            <p className="text-slate-500 font-medium mb-8 max-w-md mx-auto">
              We couldn't find any results for "{searchQuery}". Try searching for something else or browse our popular categories.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSuggestions.map(suggest => (
                <button 
                  key={suggest}
                  onClick={() => setSearchQuery(suggest)}
                  className="px-6 py-3 bg-white rounded-2xl border border-slate-200 text-sm font-bold text-black hover:border-secondary hover:text-secondary transition-all shadow-sm"
                >
                  {suggest}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-24 text-center">
             <Link href="/services" 
                   className="inline-flex items-center justify-center px-12 py-6 text-sm font-black text-white transition-all duration-300 bg-secondary rounded-2xl hover:bg-primary shadow-[0_20px_40px_rgba(26,26,26,0.2)] hover:shadow-[0_20px_40px_rgba(255,127,0,0.3)] active:scale-95 uppercase tracking-[0.2em]"
             >
                View All categories
                <ArrowRight className="ml-3 h-5 w-5" />
             </Link>
        </div>
      </div>
    </section>
  );
}
