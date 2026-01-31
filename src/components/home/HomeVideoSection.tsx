import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, X, Edit } from "lucide-react";
import AdminOnly from "../common/auth/AdminOnly";
import HomeVideoModal from "../modal/home/HomeVideoModal";
import { HomeVideoFormData } from "@/schemas/home/homeVideo.schema";

export default function HomeVideoSection() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [data, setData] = useState<HomeVideoFormData>({
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-fresh-vegetables-in-a-market-12821-large.mp4",
    posterImage: "/images/home/video_bg.png",
    youtubeEmbedUrl:
      "https://www.youtube.com/embed/CVHj7Wxhvdo?autoplay=1&rel=0",
    buttonText: "Watch Video",
  });

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
      videoRef.current.play().catch((error) => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, [data.videoUrl]);

  return (
    <section className="relative h-[400px] md:h-[600px] w-full overflow-hidden group/section">
      <AdminOnly>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="absolute top-4 right-8 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white opacity-0 group-hover/section:opacity-100 transition-all hover:bg-white hover:text-secondary shadow-lg backdrop-blur-md"
          title="Edit Video Settings"
        >
          <Edit className="w-4 h-4" />
        </button>
      </AdminOnly>

      {/* Background Video/Image */}
      <div className="absolute inset-0">
        <video
          key={data.videoUrl}
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster={data.posterImage}
        >
          <source src={data.videoUrl} type="video/mp4" />
          {/* Fallback Image */}
          <Image
            src={data.posterImage}
            alt="Cinematic background"
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
            onClick={() => setIsVideoModalOpen(true)}
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
              {data.buttonText}
            </span>
          </button>
        </div>
      </div>

      {/* Video Modal Overlay */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-10">
          <button
            onClick={() => setIsVideoModalOpen(false)}
            className="absolute top-6 right-6 text-white hover:text-[#86b86b] transition-colors z-50"
          >
            <X className="w-10 h-10" />
          </button>

          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="w-full h-full"
              src={data.youtubeEmbedUrl}
              title="KajLagbe Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 w-full h-12 bg-white flex flex-col justify-end">
        <div className="w-full h-full bg-[#fcfdfa] clip-path-wave"></div>
      </div>

      <HomeVideoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={data}
        onUpdate={(newData: HomeVideoFormData) => setData(newData)}
      />

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
