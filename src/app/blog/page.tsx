import BlogHero from "@/components/blog/BlogHero";
import BlogList from "@/components/blog/BlogList";
import ServicesVerticalSlider from "@/components/services/ServicesVerticalSlider";
import BlogShowcase from "@/components/blog/BlogShowcase";

export const metadata = {
  title: "Blog | Kajlagbe",
  description:
    "Stay updated with our latest news, recipes, and organic living tips.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <BlogHero />

      <section className="py-6 md:py-8 lg:py-12">
        <div className="main-container">
          <BlogList />
        </div>
      </section>

      <ServicesVerticalSlider />

      <BlogShowcase />
    </main>
  );
}
