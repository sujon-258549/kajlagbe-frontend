import CommonHero from "@/components/common/CommonHero";
import FeaturesBar from "@/components/features/FeaturesBar";
import FeaturesGrid from "@/components/features/FeaturesGrid";
import ArtisanSection from "@/components/features/ArtisanSection";
import PuritySection from "@/components/features/PuritySection";
import FeaturesFAQ from "@/components/features/FeaturesFAQ";
import FeaturesTrust from "@/components/features/FeaturesTrust";

export const metadata = {
  title: "Features | Kajlagbe",
  description: "Explore the premium features and artisan products of Kajlagbe.",
};

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white">
      <CommonHero
        title="Our Features"
        subtitle="Premium Quality"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      />
      <FeaturesBar />
      <FeaturesGrid />
      <ArtisanSection />
      <PuritySection />
      <FeaturesFAQ />
      <FeaturesTrust />
    </main>
  );
}
