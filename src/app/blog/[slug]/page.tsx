import Image from "next/image";
import { notFound } from "next/navigation";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { blogPosts } from "@/data/blogData";
import BlogHero from "@/components/blog/BlogHero";
import CommentForm from "@/components/blog/CommentForm";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <BlogHero
        title={post.title}
        date={post.date}
        category={post.category}
        isDetails
      />

      <article className="py-20 lg:py-32">
        <div className="main-container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Content Area */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags and Social Share */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16 pt-8 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-bold text-secondary">Tags:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1 bg-[#86b86b]/10 text-[#86b86b] text-sm font-bold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-secondary hover:bg-[#86b86b] hover:text-white transition-all cursor-pointer">
                  <Facebook className="w-4 h-4" />
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-secondary hover:bg-[#86b86b] hover:text-white transition-all cursor-pointer">
                  <Twitter className="w-4 h-4" />
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-secondary hover:bg-[#86b86b] hover:text-white transition-all cursor-pointer">
                  <Linkedin className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Comment Form Section */}
            <CommentForm />
          </div>
        </div>
      </article>
    </main>
  );
}
