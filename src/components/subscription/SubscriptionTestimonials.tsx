"use client";

import Image from "next/image";

export default function SubscriptionTestimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
      quote:
        "Switching to the Pro plan was the best decision for my business. The advanced analytics have helped us grow by 30% in just three months.",
    },
    {
      name: "James Wilson",
      role: "Freelance Designer",
      image:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=250&auto=format&fit=crop",
      quote:
        "The workflow tools in the Basic plan are incredibly intuitive. It saves me hours every week, allowing me to focus on creative work.",
    },
    {
      name: "Emily Chen",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop",
      quote:
        "Enterprise support is top-notch. Whenever we have a question, the team responds almost instantly. Highly recommended!",
    },
  ];

  return (
    <section className="py-10 md:py-16 lg:py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative Background Blobs for Glassmorphism */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-blue-400/20 rounded-full blur-[100px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg h-full max-h-[500px] bg-purple-300/20 rounded-full blur-[120px]" />

      <div className="main-container relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            See what our subscribers are saying about their experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white/60 backdrop-blur-md p-8 rounded-xl border border-white/50 shadow-xl flex flex-col items-center text-center transition-all duration-300"
            >
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md mb-6 duration-300">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed">
                &quot;{item.quote}&quot;
              </p>
              <div>
                <h4 className="text-lg font-bold text-secondary">
                  {item.name}
                </h4>
                <span className="text-primary text-sm font-bold uppercase tracking-wide">
                  {item.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
