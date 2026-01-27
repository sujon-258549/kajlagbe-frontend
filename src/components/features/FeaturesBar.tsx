import { Plus } from "lucide-react";

export default function FeaturesBar() {
  const items = [
    "Flavors You Love",
    "Naturally Delicious",
    "Everyday Nourishment",
    "Wholesome Goodness",
  ];

  return (
    <div className="bg-[#86b86b] py-3 lg:py-4 overflow-hidden">
      <div className="flex justify-center items-center gap-6 lg:gap-12 whitespace-nowrap animate-in slide-in-from-right-full duration-1000">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-4 lg:gap-8">
            <span className="text-white font-bold text-sm lg:text-base uppercase tracking-wider">
              {item}
            </span>
            <Plus className="w-4 h-4 text-white" />
          </div>
        ))}
        {/* Duplicate for scrolling effect if needed, but for now just one set */}
        {items.map((item, index) => (
          <div
            key={`dup-${index}`}
            className="flex items-center gap-4 lg:gap-8"
          >
            <span className="text-white font-bold text-sm lg:text-base uppercase tracking-wider">
              {item}
            </span>
            <Plus className="w-4 h-4 text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}
