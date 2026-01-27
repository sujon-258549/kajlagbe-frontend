import Link from "next/link";

export default function FeaturesHero() {
  return (
    <section className="bg-secondary py-16 lg:py-24 text-center">
      <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
        Our features
      </h1>
      <div className="flex items-center justify-center gap-2 text-white/80 text-sm font-medium">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-white font-bold">Features</span>
      </div>
    </section>
  );
}
