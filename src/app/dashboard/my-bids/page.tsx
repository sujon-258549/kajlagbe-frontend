"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowUpDown, Eye } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";
import Heading4 from "@/components/common/Headings/Heading4";

interface BidData {
  id: string;
  jobTitle: string;
  amount: string;
  status: string;
  time: string;
  owner: string;
}

const data: BidData[] = [
  {
    id: "B001",
    jobTitle: "Fullstack Developer for Organic Store",
    amount: "$1,200",
    status: "Active",
    time: "2 hours ago",
    owner: "Green Roots Co.",
  },
  {
    id: "B002",
    jobTitle: "SEO Optimization for Blog",
    amount: "$300",
    status: "Rejected",
    time: "1 day ago",
    owner: "Harvest Market",
  },
  {
    id: "B003",
    jobTitle: "Mobile App Wireframes",
    amount: "$850",
    status: "Winner",
    time: "3 days ago",
    owner: "Farm Link",
  },
  {
    id: "B004",
    jobTitle: "Content Strategy & Copywriting",
    amount: "$500",
    status: "Pending",
    time: "4 days ago",
    owner: "Eco Life",
  },
  {
    id: "B005",
    jobTitle: "Logo redesign for startup",
    amount: "$250",
    status: "Active",
    time: "5 days ago",
    owner: "Fresh Bites",
  },
];

export default function MyBidsPage() {
  const columns: ColumnDef<BidData>[] = [
    {
      accessorKey: "jobTitle",
      header: ({ column }) => {
        return (
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-2 hover:text-secondary group font-bold"
          >
            Job Proposal
            <ArrowUpDown className="ml-2 h-4 w-4 text-slate-300 group-hover:text-secondary" />
          </button>
        );
      },
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-bold text-secondary">
            {row.getValue("jobTitle")}
          </span>
          <span className="text-[10px] text-slate-400 font-semibold uppercase mt-0.5">
            ID: {row.original.id} • {row.original.time}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "owner",
      header: "Client",
      cell: ({ row }) => (
        <span className="font-bold text-slate-500 text-sm italic">
          {row.getValue("owner")}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "My Bid",
      cell: ({ row }) => (
        <span className="font-bold text-secondary">
          {row.getValue("amount")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return (
          <Badge
            className={cn(
              "rounded-full font-bold text-[10px] uppercase px-3 py-1 border-none shadow-none hover:opacity-90 transition-none",
              status === "Active"
                ? "bg-blue-500 text-white"
                : status === "Rejected"
                  ? "bg-red-500 text-white"
                  : status === "Winner"
                    ? "bg-[#86b86b] text-white"
                    : "bg-orange-500 text-white",
            )}
          >
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: () => (
        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="sm"
            className="h-9 px-4 rounded-lg border-gray-100 font-bold text-xs hover:bg-gray-50 shadow-none text-secondary"
          >
            <Eye className="w-3.5 h-3.5 mr-1" /> View Job
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-lg border-gray-100 text-red-500 hover:bg-red-50 shadow-none"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <Heading4>My Bids</Heading4>
        <p className="text-slate-500 font-medium">
          Track your active bids and proposals sent to clients.
        </p>
      </div>

      <div className="bg-white p-2 rounded-lg border border-gray-200 overflow-hidden">
        <DataTable columns={columns} data={data} searchKey="jobTitle" />
      </div>
    </div>
  );
}
