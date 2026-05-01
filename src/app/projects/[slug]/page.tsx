import Image from "next/image";
import { notFound } from "next/navigation";
import { Facebook, Twitter, Linkedin, ArrowLeft } from "lucide-react";
import { getAllProjects, getProjectBySlug } from "@/actions/project.actions";
import Link from "next/link";

interface ProjectDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const res = await getAllProjects();
  if (res.success && Array.isArray(res.data)) {
    return res.data.map((project: any) => ({
      slug: project.slug,
    }));
  }
  return [];
}

export default async function ProjectDetailsPage({ params }: ProjectDetailsPageProps) {
  const { slug } = await params;
  const res = await getProjectBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const project = res.data;
  const projectImage = project.imageRel?.url || project.image;

  return (
    <main className="min-h-screen bg-white pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={projectImage || "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200"}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-secondary/60 backdrop-blur-[2px]" />
        
        <div className="main-container relative z-10 text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-6 text-primary animate-fade-in">
             <div className="h-px w-8 bg-primary" />
             <span className="text-xs md:text-sm font-bold uppercase tracking-widest">{project.category}</span>
             <div className="h-px w-8 bg-primary" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-8 tracking-tight">
            {project.title}
          </h1>
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-primary transition-colors font-bold text-sm tracking-widest"
          >
            <ArrowLeft className="w-4 h-4" /> BACK TO HOME
          </Link>
        </div>
      </section>

      {/* Content Section */}
      <article className="py-12 md:py-20">
        <div className="main-container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {/* Project Overview */}
            <div className="grid md:grid-cols-3 gap-12 mb-20">
              <div className="md:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold text-secondary mb-6">Project Overview</h2>
                <p className="text-slate-600 leading-relaxed text-lg italic border-l-4 border-primary pl-6 py-2">
                  {project.description}
                </p>
              </div>
              <div className="bg-slate-50 p-8 rounded-3xl h-fit">
                <h3 className="text-lg font-bold text-secondary mb-6 border-b pb-4">Project Info</h3>
                <ul className="space-y-4">
                  <li className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</span>
                    <span className="font-bold text-secondary">{project.category}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Project Number</span>
                    <span className="font-bold text-secondary">{project.number}</span>
                  </li>
                  <li className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                    <span className="inline-flex items-center gap-2 font-bold text-primary italic">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      Active Project
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Main Content */}
            {project.content && (
              <div
                className="prose prose-lg max-w-none prose-headings:text-secondary prose-p:text-slate-600 prose-strong:text-secondary"
                dangerouslySetInnerHTML={{ __html: project.content }}
              />
            )}

            {/* Social Share */}
            <div className="flex items-center justify-center gap-6 mt-20 pt-10 border-t border-slate-100">
                <span className="text-sm font-bold text-secondary uppercase tracking-widest">Share Project</span>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-lg">
                    <Facebook className="w-5 h-5" />
                  </div>
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-lg">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm hover:shadow-lg">
                    <Linkedin className="w-5 h-5" />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
