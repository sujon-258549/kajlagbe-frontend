"use client";

import { motion } from "motion/react";
import {
  Users,
  Briefcase,
  Award,
  Clock,
  Star,
  Zap,
  Shield,
} from "lucide-react";
import Heading2 from "../common/Headings/Heading2";
import CustomImage from "../common/CustomImage";

const stats = [
  {
    icon: <Users className="w-9 h-9" />,
    value: "10k+",
    label: "Happy Clients",
    color: "from-secondary to-green-600",
  },
  {
    icon: <Briefcase className="w-9 h-9" />,
    value: "5k+",
    label: "Projects Done",
    color: "from-primary to-orange-600",
  },
  {
    icon: <Award className="w-9 h-9" />,
    value: "25+",
    label: "Awards Win",
    color: "from-secondary to-green-600",
  },
  {
    icon: <Clock className="w-9 h-9" />,
    value: "10+",
    label: "Years Experience",
    color: "from-primary to-orange-600",
  },
];

export default function StatsSection() {
  return (
    <section className="py-10 md:py-16 lg:py-24 relative overflow-hidden bg-secondary text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <CustomImage
          src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"
          alt="Background"
          fill
          unoptimized={true}
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-b from-secondary via-secondary/90 to-secondary"></div>
      </div>

      {/* Premium Background Decorations */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-size-[32px_32px] [background-image:radial-gradient(white_1px,transparent_1px)]"></div>

        {/* Floating Background Icons */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-[10%] text-white/10"
        >
          <Zap className="w-20 h-20" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-[15%] text-primary/20"
        >
          <Star className="w-24 h-24" />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-[5%] text-white/5"
        >
          <Shield className="w-16 h-16" />
        </motion.div>
      </div>

      <div className="main-container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex flex-col items-center text-center space-y-6 group"
            >
              {/* Icon main-container */}
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500 rounded-full`}
                ></div>
                <div
                  className={`relative w-20 h-20 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:border-transparent group-hover:bg-linear-to-br ${stat.color}`}
                >
                  {stat.icon}
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative inline-block">
                  <Heading2 className="text-4xl lg:text-6xl font-bold text-white tracking-tighter">
                    {stat.value}
                  </Heading2>
                  {/* <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    className={`h-1.5 absolute -bottom-1 left-0 bg-linear-to-r ${stat.color} rounded-full opacity-60`}
                  ></motion.div> */}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white/70 uppercase tracking-[0.2em] pt-1">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
