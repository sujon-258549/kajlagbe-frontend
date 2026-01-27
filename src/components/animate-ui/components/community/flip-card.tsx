"use client";

import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import * as React from "react";
import { ArrowRight, Star, Briefcase, Clock } from "lucide-react";
import CustomImage from "@/components/common/CustomImage";
import Link from "next/link";

export interface FlipCardData {
  name: string;
  description: string;
  image: string;
  slug: string;
  stats?: {
    rating: number;
    jobs: number;
    experience: string;
  };
}

interface FlipCardProps {
  data: FlipCardData;
}

export function FlipCard({ data }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = React.useState(false);

  return (
    <div
      className="relative h-[320px] w-full perspective-1000 cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className="relative h-full w-full transition-all duration-500"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT FACE */}
        <motion.div
          className="absolute inset-0 backface-hidden flex flex-col rounded-2xl bg-white shadow-sm border border-slate-200 overflow-hidden"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Image Area */}
          <div className="relative h-48 w-full bg-slate-100">
            <CustomImage
              src={data.image}
              alt={data.name}
              fill
              wrapperClassName="w-full h-full"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-4 text-white">
              <p className="text-xs font-medium uppercase tracking-wider opacity-90">
                Service
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-5 flex flex-col justify-between flex-1 bg-white">
            <h3 className="text-lg font-bold text-slate-800 leading-tight line-clamp-2">
              {data.name}
            </h3>
            <div className="flex items-center text-sm font-semibold text-primary mt-auto">
              <span>View Details</span>
              <ArrowRight className="h-4 w-4 ml-2" />
            </div>
          </div>
        </motion.div>

        {/* BACK FACE */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-2xl bg-primary text-white p-6 flex flex-col items-center justify-center text-center shadow-xl border border-primary overflow-hidden"
          initial={{ rotateY: 180 }}
          animate={{ rotateY: isFlipped ? 0 : 180 }}
          transition={{
            duration: 0.6,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-xl font-bold mb-2 leading-tight">{data.name}</h3>
          <p className="text-white/80 text-sm mb-6 line-clamp-3">
            {data.description ||
              "Professional services at your doorstep. Verified experts, guaranteed satisfaction."}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-2 w-full mb-6">
            <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
              <Star className="h-4 w-4 mb-1 text-yellow-300 fill-yellow-300" />
              <span className="font-bold text-sm">
                {data.stats?.rating || 4.9}
              </span>
              <span className="text-[10px] opacity-75">Rating</span>
            </div>
            <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
              <Briefcase className="h-4 w-4 mb-1 text-blue-200" />
              <span className="font-bold text-sm">
                {data.stats?.jobs || "100+"}
              </span>
              <span className="text-[10px] opacity-75">Jobs</span>
            </div>
            <div className="bg-white/10 rounded-lg p-2 flex flex-col items-center">
              <Clock className="h-4 w-4 mb-1 text-green-200" />
              <span className="font-bold text-sm">
                {data.stats?.experience || "5Y"}
              </span>
              <span className="text-[10px] opacity-75">Exp.</span>
            </div>
          </div>

          <Link href={`/services/${data.slug}`} className="w-full">
            <Button variant="secondary" className="w-full font-bold shadow-lg">
              Book Now
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
