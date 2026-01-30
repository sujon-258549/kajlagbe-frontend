import CommonHero from "@/components/common/CommonHero";
import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "Blog | Kajlagbe",
  description:
    "Stay updated with our latest news, recipes, and organic living tips.",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-white">
      <CommonHero
        title="Blog Grid"
        breadcrumb="Blog Grid"
        image="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2664&auto=format&fit=crop"
      />

      <section className="py-20 lg:py-32">
        <div className="main-container mx-auto px-6">
          <BlogList />
        </div>
      </section>
    </main>
  );
}
