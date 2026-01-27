import { ArrowUpRight, Phone, Mail } from "lucide-react";
import Image from "next/image";

const categories = [
  { name: "Product Related Questions", id: "product" },
  { name: "Ordering And Shipping", id: "shipping" },
  { name: "Ingredients And Nutrition", id: "nutrition" },
  { name: "Returns And Refunds", id: "returns" },
];

export default function FAQSidebar() {
  return (
    <div className="space-y-8">
      {/* Categories Box */}
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
        <ul className="space-y-4">
          {categories.map((cat, idx) => (
            <li key={idx}>
              <a
                href={`#${cat.id}`}
                className="flex items-center justify-between group text-[#154d2e] font-bold hover:text-[#86b86b] transition-all"
              >
                <span className="text-[15px]">{cat.name}</span>
                <ArrowUpRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>
              {idx < categories.length - 1 && (
                <div className="h-px bg-slate-200 mt-4" />
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Support Info Box */}
      <div className="bg-[#154d2e] p-8 rounded-2xl text-white space-y-8 relative overflow-hidden">
        {/* Decorative Logo Background */}
        <div className="absolute -bottom-10 -right-10 opacity-5 w-48 h-48">
          <Image
            src="/images/logo/logo.png"
            alt="Logo Pattern"
            width={200}
            height={200}
            className="object-contain grayscale invert"
          />
        </div>

        <div className="space-y-4 relative z-10">
          <Image
            src="/images/logo/logo.png"
            alt="Kajlagbe Logo"
            width={120}
            height={40}
            className="h-10 w-auto object-contain grayscale invert brightness-200"
            unoptimized
          />
          <h3 className="text-xl font-bold leading-tight">
            Fresh Support, Always on Standby—Anytime You Need Us!
          </h3>
        </div>

        <div className="space-y-4 relative z-10">
          <a href="tel:+1123456789" className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#86b86b] transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">+ (123) 456-789</span>
          </a>
          <a
            href="mailto:support@domain.com"
            className="flex items-center gap-4 group"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#86b86b] transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-bold text-sm">support@domain.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
