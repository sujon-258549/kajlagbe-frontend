"use client";

import { FlipCard } from "@/components/animate-ui/components/community/flip-card";

const data = {
  name: "Animate UI Service",
  image:
    "https://pbs.twimg.com/profile_images/1950218390741618688/72447Y7e_400x400.jpg",
  description:
    "A fully animated, open-source component distribution built with React, TypeScript, Tailwind CSS, and Motion.",
  slug: "animate-ui-service",
  stats: {
    rating: 4.9,
    jobs: 120,
    experience: "2Y",
  },
};

export const FlipCardDemo = () => {
  return <FlipCard data={data} />;
};
