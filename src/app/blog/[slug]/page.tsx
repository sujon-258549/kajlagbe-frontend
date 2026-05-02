import Image from "next/image";
import { notFound } from "next/navigation";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { getAllBlogs, getBlogBySlug } from "@/actions/blog.actions";
import { getCommentsByBlogId } from "@/actions/blog-comment.actions";
import BlogHero from "@/components/blog/BlogHero";
import CommentForm from "@/components/blog/CommentForm";
import CommentList from "@/components/blog/CommentList";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const res = await getAllBlogs();
  if (res.success && Array.isArray(res.data)) {
    return res.data.map((post: any) => ({
      slug: post.slug,
    }));
  }
  return [];
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const res = await getBlogBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const post = res.data;
  
  // Fetch comments for this blog
  const commentsRes = await getCommentsByBlogId(post.id);
  const comments = commentsRes.success ? commentsRes.data : [];

  const postImage = post.cover?.url || post.image;
  const postDate = post.publishedAt || post.createdAt;
  const formattedDate = new Date(postDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-white">
      <BlogHero
        title={post.title}
        date={formattedDate}
        category={post.category}
        isDetails
      />

      <article className="py-6 md:py-8 lg:py-12">
        <div className="main-container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative aspect-[2/1] md:aspect-[21/9] w-full rounded-xl overflow-hidden mb-10 ">
              <Image
                src={postImage || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=800"}
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-5 md:mt-8 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-sm font-bold text-secondary">Tags:</span>
                {Array.isArray(post.tags) && post.tags.map((tag: string) => (
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

            {/* Comments List Section */}
            <CommentList comments={comments} />

            {/* Comment Form Section */}
            <CommentForm blogId={post.id} blogSlug={slug} />
          </div>
        </div>
      </article>
    </main>
  );
}
