"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-platinum-100">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-dusk-blue-600 animate-spin" />
          <p className="text-xs font-medium text-platinum-500">
            Memuat dashboard supervisor...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-platinum-50">
      {/* Shared Sidebar */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
      />

      {/* Main Column */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Shared Header */}
        <Header onOpenMobileSidebar={() => setIsMobileOpen(true)} />

        {/* Dynamic Page Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8 overflow-y-auto">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="border-t border-platinum-200 bg-white py-4 text-center text-xs text-platinum-400 shrink-0">
          <p>
            &copy; {new Date().getFullYear()} Distrilink Sales Automation Platform (SAP) &bull; Supervisor Suite
          </p>
        </footer>
      </div>
    </div>
  );
}
