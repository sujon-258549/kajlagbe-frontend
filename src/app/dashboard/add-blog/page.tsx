"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "react-toastify";
import {
  Plus,
  RotateCw,
  Pencil,
  Trash2,
  Eye,
  MessageSquare,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { DataTable } from "@/components/ui/data-table";
import Heading4 from "@/components/common/Headings/Heading4";
import {
  getAllBlogs,
  deleteBlog,
  updateBlogStatus,
} from "@/actions/blog.actions";

interface BlogRow {
  id: string;
  title: string;
  tagline?: string;
  cover?: { url?: string } | null;
  category?: string;
  author?: { profile?: { name?: string; photo?: string } | null } | null;
  tags?: string[];
  isPublished?: boolean;
  createdAt: string;
  _count?: { comments?: number };
}

const formatDate = (iso: string) => {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  } catch {
    return iso;
  }
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<BlogRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllBlogs({ page: 1, limit: 50 });
      if (res?.success) {
        const list = Array.isArray(res.data) ? res.data : res.data?.data ?? [];
        setBlogs(list);
      } else {
        toast.error(res?.message || "Failed to load blogs");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this blog post?")) return;
    setDeletingId(id);
    try {
      const res = await deleteBlog(id);
      if (res?.success) {
        toast.success(res?.message || "Blog deleted");
        setBlogs((prev) => prev.filter((b) => b.id !== id));
      } else {
        toast.error(res?.message || "Delete failed");
      }
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (row: BlogRow) => {
    const next = !row.isPublished;
    setStatusLoadingId(row.id);
    try {
      const res = await updateBlogStatus(row.id, next);
      if (res?.success) {
        setBlogs((prev) =>
          prev.map((b) => (b.id === row.id ? { ...b, isPublished: next } : b)),
        );
        toast.success("Status updated");
      } else {
        toast.error(res?.message || "Failed to update status");
      }
    } finally {
      setStatusLoadingId(null);
    }
  };

  const columns: ColumnDef<BlogRow>[] = [
    {
      id: "cover",
      header: "Cover",
      cell: ({ row }) => {
        const url = row.original.cover?.url;
        return (
          <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
            {url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={url}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <Newspaper className="w-4 h-4 text-slate-300" />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span
            className="font-semibold text-slate-700 line-clamp-1 max-w-65"
            title={row.original.title}
          >
            {row.original.title}
          </span>
          {row.original.tagline && (
            <span
              className="text-[10px] text-slate-400 line-clamp-1 max-w-65"
              title={row.original.tagline}
            >
              {row.original.tagline}
            </span>
          )}
        </div>
      ),
    },
    {
      id: "comments",
      header: "Comments",
      cell: ({ row }) => {
        const n = row.original._count?.comments ?? 0;
        return (
          <Badge
            variant={n > 0 ? "default" : "secondary"}
            className="text-[10px]"
          >
            {n}
          </Badge>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) =>
        row.original.category ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
            {row.original.category}
          </span>
        ) : (
          <span className="text-slate-300">-</span>
        ),
    },
    {
      id: "author",
      header: "Author",
      cell: ({ row }) => {
        const author = row.original.author;
        const name = author?.profile?.name || "Unknown";
        const photo = author?.profile?.photo;
        return (
          <div className="flex items-center gap-2">
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={photo}
                alt={name}
                className="w-6 h-6 rounded-full object-cover border border-slate-200"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200" />
            )}
            <span
              className="text-xs font-medium text-slate-600 line-clamp-1"
              title={name}
            >
              {name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "tags",
      header: "Tags",
      cell: ({ row }) => {
        const tags = row.original.tags ?? [];
        if (!tags.length) return <span className="text-slate-300">-</span>;
        return (
          <div className="flex items-center gap-1 max-w-40">
            {tags.slice(0, 2).map((t) => (
              <span
                key={t}
                className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200"
              >
                {t}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-50 text-slate-500 border border-dashed border-slate-200">
                +{tags.length - 2}
              </span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "isPublished",
      header: "Published",
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <Switch
            checked={!!row.original.isPublished}
            disabled={statusLoadingId === row.original.id}
            onCheckedChange={() => handleToggleStatus(row.original)}
          />
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <span className="text-xs text-slate-500 font-medium">
          {formatDate(row.original.createdAt)}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            asChild
            variant="outline"
            size="icon-sm"
            className="rounded-lg border-slate-200"
            title="View"
          >
            <Link href={`/blog/${row.original.id}`}>
              <Eye className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon-sm"
            className="rounded-lg border-slate-200"
            title="Comments"
          >
            <Link href={`/blog/${row.original.id}#comments`}>
              <MessageSquare className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="icon-sm"
            className="rounded-lg border-slate-200"
            title="Edit"
          >
            <Link href={`/dashboard/add-blog/${row.original.id}`}>
              <Pencil className="w-3.5 h-3.5" />
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon-sm"
            disabled={deletingId === row.original.id}
            onClick={() => handleDelete(row.original.id)}
            title="Delete"
            className="rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Heading4>Blog Posts</Heading4>
          <p className="text-slate-500 font-medium text-sm">
            Manage and publish articles on your platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchBlogs}
            disabled={isLoading}
          >
            <RotateCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button asChild size="sm">
            <Link href="/dashboard/add-blog/create">
              <Plus className="w-4 h-4" />
              Create Blog
            </Link>
          </Button>
        </div>
      </div>

      {isLoading && blogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-100 p-16 text-center text-slate-400 font-semibold">
          Loading blogs...
        </div>
      ) : (
        <DataTable columns={columns} data={blogs} searchKey="title" />
      )}
    </div>
  );
}
