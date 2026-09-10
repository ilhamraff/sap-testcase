"use client";

import { useAuth } from "@/context/AuthContext";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface HeaderProps {
  onOpenMobileSidebar?: () => void;
}

export default function Header({ onOpenMobileSidebar }: HeaderProps) {
  const { user, logout } = useAuth();
  const [imageError, setImageError] = useState<boolean>(false);
  const pathname = usePathname();

  // Dynamic breadcrumb / title
  const getPageTitle = () => {
    if (pathname.startsWith("/dashboard/area")) {
      return { section: "Distrilink SAP", page: "Analisa Wilayah & Territory" };
    }
    if (pathname.startsWith("/dashboard/oos")) {
      return { section: "Distrilink SAP", page: "Monitoring Out-of-Stock (OOS)" };
    }
    if (pathname.startsWith("/dashboard/panduan")) {
      return { section: "Distrilink SAP", page: "Panduan & Glosarium SFA" };
    }
    return { section: "Distrilink SAP", page: "Analisa Performa Salesman" };
  };

  const currentRoute = getPageTitle();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-platinum-200">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Breadcrumbs */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile hamburger trigger */}
          <button
            onClick={onOpenMobileSidebar}
            aria-label="Buka menu navigasi"
            className="lg:hidden p-2 rounded-xl text-platinum-600 hover:text-platinum-900 hover:bg-platinum-100 transition-colors cursor-pointer shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb / Page Title */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] text-platinum-400 font-medium">
              <span>{currentRoute.section}</span>
              <span>/</span>
              <span className="text-dusk-blue-600 font-semibold truncate">
                Dashboard
              </span>
            </div>
            <h2 className="text-xs sm:text-sm font-bold text-platinum-900 tracking-tight truncate">
              {currentRoute.page}
            </h2>
          </div>
        </div>

        {/* Right Side: Region Status, User Profile & Logout */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Region Tag */}
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-platinum-50 border border-platinum-200/80 rounded-lg text-xs text-platinum-600">
            <span className="w-2 h-2 rounded-full bg-jade-500 animate-pulse" />
            <span className="font-medium">Region Jawa Barat</span>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-2.5 text-right">
            {user?.image && !imageError ? (
              <Image
                src={user.image}
                alt={user.firstName || "User"}
                width={36}
                height={36}
                onError={() => setImageError(true)}
                className="w-9 h-9 rounded-full border border-platinum-200 object-cover bg-platinum-100"
                unoptimized
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-dusk-blue-100 border border-dusk-blue-200 flex items-center justify-center text-dusk-blue-700 font-bold text-xs shadow-2xs">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : "S"}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-[11px] text-platinum-400 leading-none">
                Supervisor
              </p>
              <p className="text-xs sm:text-sm font-semibold text-platinum-800 leading-tight mt-0.5">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : "Supervisor"}
              </p>
            </div>
          </div>

          <div className="h-5 w-px bg-platinum-200 hidden sm:block" aria-hidden="true" />

          {/* Logout Button */}
          <button
            onClick={logout}
            title="Keluar dari sesi"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-crimson-600 hover:text-crimson-700 bg-crimson-50 hover:bg-crimson-100/80 active:scale-95 border border-crimson-200/70 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
