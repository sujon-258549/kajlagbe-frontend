import CommonHero from "@/components/common/CommonHero";
import FeaturesBar from "@/components/features/FeaturesBar";
import FAQSidebar from "@/components/faq/FAQSidebar";
import FAQContent from "@/components/faq/FAQContent";

export const metadata = {
  title: "FAQ | Kajlagbe",
  description:
    "Find answers to frequently asked questions about Kajlagbe products and services.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <CommonHero
        title="FAQ"
        subtitle="Common Questions"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      />
      <FeaturesBar />

      <section className="py-24">
        <div className="main-container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Sidebar */}
            <aside className="lg:w-1/3">
              <div className="sticky top-32">
                <FAQSidebar />
              </div>
            </aside>

            {/* Content */}
            <div className="lg:w-2/3">
              <FAQContent />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
