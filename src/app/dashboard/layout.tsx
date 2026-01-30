import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50/50 pt-8 lg:pt-16 pb-20">
      <div className="main-container mx-auto px-4">
        {/* Mobile Header */}
        <div className="lg:hidden mb-6 flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-100">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
              Dashboard
            </span>
            <span className="text-lg font-bold text-secondary">Kajlagbe</span>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-xl bg-slate-50 hover:bg-slate-100"
              >
                <Menu className="w-6 h-6 text-secondary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-80 border-none">
              <DashboardSidebar className="border-none rounded-none h-full" />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-72">
            <DashboardSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
