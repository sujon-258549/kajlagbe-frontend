import { Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Happy Mom",
    content:
      "The freshest vegetables I've ever tasted! My kids actually love eating greens now.",
    rating: 5,
  },
  {
    name: "Mike Peters",
    role: "Chef",
    content:
      "As a chef, quality is everything. This farm delivers the best produce consistently.",
    rating: 5,
  },
  {
    name: "Emily Davis",
    role: "Health Coach",
    content:
      "I recommend this farm to all my clients. The nutritional density is unmatched.",
    rating: 5,
  },
];

export default function AboutTestimonials() {
  return (
    <section className="py-10 md:py-16 lg:py-24 bg-[#f2f9ec]">
      <div className="main-container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[#86b86b] font-bold text-sm tracking-uppercase mb-2 block lowercase">
            TESTIMONIALS
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-secondary leading-tight">
            Trusted by families, loved for flavor, known for quality
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl border border-gray-200 relative pt-12"
            >
              <div className="absolute -top-6 left-8 w-12 h-12 bg-[#86b86b] rounded-full flex items-center justify-center text-white">
                <Quote size={20} fill="currentColor" />
              </div>

              <div className="flex gap-1 mb-4 text-yellow-400">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <p className="text-slate-600 mb-6 italic">{t.content}</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden relative">
                  <Image
                    src={`https://placehold.co/100x100/154d2e/FFFFFF/png?text=${t.name.charAt(0)}`}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-secondary leading-snug">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 uppercase">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
