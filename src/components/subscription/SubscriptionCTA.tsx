"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SubscriptionCTA() {
  return (
    <section className="py-10 md:py-16 lg:py-24">
      <div className="main-container">
        <div className="bg-secondary rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Circles */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Ready to Accelerate Your Success?
            </h2>
            <p className="text-white/80 text-lg md:text-xl">
              Join thousands of satisfied customers who have transformed their
              workflow with our premium subscription.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/login">
                <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white hover:text-secondary transition-all flex items-center gap-2 group">
                  Get Started Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="bg-transparent border border-white text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-white hover:text-secondary transition-all">
                  Contact Sales
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
