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
  Clock 
} from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

interface ServiceCategory {
  title: string;
  count: string;
  icon: JSX.Element;
  description: string;
}

const services: ServiceCategory[] = [
  {
    title: "Home Repair & Maintenance",
    count: "25 Services",
    icon: <Wrench className="h-7 w-7" />,
    description: "Electric, Plumbing, AC, Appliances, and general home fixes."
  },
  {
    title: "Cleaning & Hygiene",
    count: "20 Services",
    icon: <Sparkles className="h-7 w-7" />,
    description: "Deep cleaning, pest control, disinfection, and more."
  },
  {
    title: "Construction & Renovation",
    count: "20 Services",
    icon: <Hammer className="h-7 w-7" />,
    description: "Masonry, painting, tiling, and complete renovations."
  },
  {
    title: "Carpentry, Glass & Metal",
    count: "20 Services",
    icon: <Armchair className="h-7 w-7" />,
    description: "Furniture making, glass fitting, welding, and repairs."
  },
  {
    title: "Vehicle Services",
    count: "25 Services",
    icon: <Car className="h-7 w-7" />,
    description: "Car was, engine repair, denting, painting, and maintenance."
  },
  {
    title: "Driver & Transport",
    count: "15 Services",
    icon: <Truck className="h-7 w-7" />,
    description: "Professional drivers for personal, office, or trip needs."
  },
  {
    title: "Shifting & Labour",
    count: "20 Services",
    icon: <Box className="h-7 w-7" />,
    description: "Home/Office shifting, packing, and general labour support."
  },
  {
    title: "Electronics, IT & CCTV",
    count: "20 Services",
    icon: <Cpu className="h-7 w-7" />,
    description: "Computer repair, network setup, CCTV, and smart devices."
  },
  {
    title: "Tutor & Education",
    count: "20 Services",
    icon: <GraduationCap className="h-7 w-7" />,
    description: "Academic tutors, skill training, and exam preparation."
  },
  {
    title: "Health & Care",
    count: "20 Services",
    icon: <HeartPulse className="h-7 w-7" />,
    description: "Nursing, elderly care, physiotherapy, and medical support."
  },
  {
    title: "Beauty & Personal Care",
    count: "20 Services",
    icon: <Scissors className="h-7 w-7" />,
    description: "Salon services at home for men and women."
  },
  {
    title: "Food & Cooking",
    count: "15 Services",
    icon: <Utensils className="h-7 w-7" />,
    description: "Home cooks, catering, and event food management."
  },
  {
    title: "Event & Media",
    count: "15 Services",
    icon: <Music className="h-7 w-7" />,
    description: "Decor, photography, sound systems, and event management."
  },
  {
    title: "Digital & Office Support",
    count: "15 Services",
    icon: <Briefcase className="h-7 w-7" />,
    description: "Data entry, admin support, marketing, and office help."
  },
  {
    title: "Security & Safety",
    count: "10 Services",
    icon: <ShieldCheck className="h-7 w-7" />,
    description: "Guards for home, office, events, and personal security."
  },
  {
    title: "Legal & Documentation",
    count: "10 Services",
    icon: <FileText className="h-7 w-7" />,
    description: "Legal aid, license assistance, and document preparation."
  },
  {
    title: "Daily Life & On-Demand",
    count: "15 Services",
    icon: <Clock className="h-7 w-7" />,
    description: "Personal assistants, errand runners, and emergency help."
  }
];

export default function Services() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-bold text-sm uppercase tracking-widest">Our Categories</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary">Explore Our Services</h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="text-slate-600">Find the right professional for your needs from our extensive list of services.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100 hover:border-primary/20 flex flex-col items-start h-full">
              <div className="h-14 w-14 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-secondary mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
              <div className="text-xs font-semibold text-primary/80 bg-primary/5 px-2 py-1 rounded mb-3">
                {service.count}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {service.description}
              </p>
              <Link href="#" className="flex items-center text-secondary font-bold text-sm hover:text-primary transition-colors mt-auto">
                View Services <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
             <Link href="/services" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-primary rounded-full hover:bg-primary/90 hover:shadow-lg hover:-translate-y-1">
                View All Categories
             </Link>
        </div>
      </div>
    </section>
  );
}
