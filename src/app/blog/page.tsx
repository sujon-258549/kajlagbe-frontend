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
        title="Our Blogs"
        subtitle="Latest Updates"
        image="https://letsenhance.io/static/73136da51c245e80edc6ccfe44888a99/396e9/MainBefore.jpg"
      />

      <section className="py-20 lg:py-32">
        <div className="main-container mx-auto px-6">
          <BlogList />
        </div>
      </section>
    </main>
  );
}
