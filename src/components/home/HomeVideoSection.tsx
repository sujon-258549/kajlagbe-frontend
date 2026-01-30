"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";

export default function HomeVideoSection() {
  const [isOpen, setIsOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Optional: Slow motion for cinematic feel
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/images/home/video_bg.png"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-fresh-vegetables-in-a-market-12821-large.mp4"
            type="video/mp4"
          />
          <source
            src="https://v1.covered.ly/video/6b177d70-3d7c-4740-9b63-d08316c02a7b"
            type="video/mp4"
          />
          {/* Fallback Image */}
          <Image
            src="/images/home/video_bg.png"
            alt="Cinematic Food background"
            fill
            className="object-cover"
          />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="text-center">
          <button
            onClick={() => setIsOpen(true)}
            className="group relative flex flex-col items-center gap-4 transition-transform duration-300 hover:scale-110"
          >
            {/* Play Button Outer Ring */}
            <div className="relative w-20 h-20 md:w-28 md:h-28 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30 group-hover:bg-white/30 transition-all duration-300">
              {/* Play Button Inner */}
              <div className="w-14 h-14 md:w-18 md:h-18 flex items-center justify-center rounded-full bg-white text-secondary shadow-xl animate-pulse-slow">
                <Play className="w-6 h-6 md:w-8 md:h-8 fill-current ml-1" />
              </div>
            </div>

            <span className="text-white font-bold text-sm md:text-base tracking-widest uppercase bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
              Watch Video
            </span>
          </button>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#86b86b] transition-colors z-50"
          >
            <X className="w-10 h-10" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/CVHj7Wxhvdo?autoplay=1&rel=0"
              title="KajLagbe Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Decorative Wave (Optional, matching common food site aesthetics) */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-white flex flex-col justify-end">
        <div className="w-full h-full bg-[#fcfdfa] clip-path-wave"></div>
      </div>

      <style jsx>{`
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }
      `}</style>
    </section>
  );
}
