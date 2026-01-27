"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, Trash2, Edit2, ArrowUpDown } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import Heading4 from "@/components/common/Headings/Heading4";

interface WorkData {
  id: string;
  title: string;
  category: string;
  budget: string;
  bids: number;
  status: string;
  date: string;
}

const data: WorkData[] = [
  {
    id: "J001",
    title: "Landing Page Design",
    category: "UI/UX Design",
    budget: "$450",
    bids: 12,
    status: "Active",
    date: "Jan 20, 2024",
  },
  {
    id: "J002",
    title: "Python Script for Automation",
    category: "Development",
    budget: "$120",
    bids: 4,
    status: "Closed",
    date: "Jan 18, 2024",
  },
  {
    id: "J003",
    title: "Organic Food Logo",
    category: "Graphic Design",
    budget: "$200",
    bids: 28,
    status: "Active",
    date: "Jan 15, 2024",
  },
  {
    id: "J004",
    title: "Content Writing for Blog",
    category: "Writing",
    budget: "$80",
    bids: 6,
    status: "In Progress",
    date: "Jan 12, 2024",
  },
  {
    id: "J005",
    title: "Next.js E-commerce Site",
    category: "Development",
    budget: "$1,500",
    bids: 15,
    status: "Pending",
    date: "Jan 10, 2024",
  },
  {
    id: "J006",
    title: "Marketing Campaign Setup",
    category: "Marketing",
    budget: "$600",
    bids: 8,
    status: "Active",
    date: "Jan 08, 2024",
  },
];

export default function MyWorksPage() {
  const columns: ColumnDef<WorkData>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <span className="font-bold text-xs text-slate-400">
          {row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2 hover:text-secondary group font-bold"
          >
            Work Title
            <ArrowUpDown className="ml-2 h-4 w-4 text-slate-300 group-hover:text-secondary" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-secondary">
            {row.getValue("title")}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
            {row.original.date}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge
          variant="outline"
          className="rounded-full font-bold border-gray-200 text-slate-600 px-3 whitespace-nowrap shadow-none"
        >
          {row.getValue("category")}
        </Badge>
      ),
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => (
        <span className="font-bold text-secondary">
          {row.getValue("budget")}
        </span>
      ),
    },
    {
      accessorKey: "bids",
      header: "Bids",
      cell: ({ row }) => (
        <span className="font-bold">{row.getValue("bids")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-2 h-2 rounded-full shadow-none",
                status === "Active"
                  ? "bg-green-500 animate-pulse"
                  : status === "Closed"
                    ? "bg-red-500"
                    : status === "Pending"
                      ? "bg-orange-500"
                      : "bg-blue-500",
              )}
            />
            <span className="font-bold text-xs">{status}</span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg border-gray-100 text-secondary hover:bg-gray-50 shadow-none"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg border-gray-100 text-red-500 hover:bg-red-50 shadow-none"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-lg border-gray-100 text-slate-400 hover:bg-gray-50 shadow-none"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <Heading4>My Posted Works</Heading4>
          <p className="text-slate-500 font-medium text-sm lg:text-base">
            Manage and track all the jobs you have posted.
          </p>
        </div>
        <Button className="rounded-xl px-6 bg-secondary font-bold h-12 shadow-none hover:opacity-90">
          Post New Work
        </Button>
      </div>

      <div className="bg-white p-2 rounded-lg border border-gray-200 overflow-hidden">
        <DataTable columns={columns} data={data} searchKey="title" />
      </div>
    </div>
  );
}
