"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  MapPin,
  AlertTriangle,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  X,
  Radio,
  Layers,
} from "lucide-react";
import clsx from "clsx";

interface SidebarProps {
  isMobileOpen: boolean;
  onMobileClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
  badge?: string;
  badgeType?: "soon" | "info";
  exact?: boolean;
}

const navItems: NavItem[] = [
  {
    name: "Performa Sales",
    href: "/dashboard",
    icon: BarChart3,
    description: "Analisa KPI & pesanan",
    exact: true,
  },
  {
    name: "Analisa Wilayah",
    href: "/dashboard/area",
    icon: MapPin,
    description: "Distribusi 5 teritori",
    badge: "Soon",
    badgeType: "soon",
  },
  {
    name: "Monitoring OOS",
    href: "/dashboard/oos",
    icon: AlertTriangle,
    description: "Risiko stok kosong",
    badge: "Soon",
    badgeType: "soon",
  },
  {
    name: "Panduan SFA",
    href: "/dashboard/panduan",
    icon: BookOpen,
    description: "Standar & glosarium",
    badge: "Info",
    badgeType: "info",
  },
];

export default function Sidebar({
  isMobileOpen,
  onMobileClose,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: NavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  const renderNavList = (collapsed: boolean = false) => (
    <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
      <div className={clsx("px-3 mb-2", collapsed && "text-center px-0")}>
        <span
          className={clsx(
            "text-[10px] font-bold text-platinum-400 uppercase tracking-widest",
            collapsed && "hidden"
          )}
        >
          Modul Analitik
        </span>
      </div>

      {navItems.map((item) => {
        const active = isItemActive(item);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => onMobileClose()}
            title={collapsed ? `${item.name} - ${item.description}` : undefined}
            className={clsx(
              "group relative flex items-center rounded-xl transition-all font-medium text-xs sm:text-sm",
              collapsed
                ? "justify-center p-3"
                : "gap-3 px-3.5 py-2.5",
              active
                ? "bg-dusk-blue-50 text-dusk-blue-700 font-semibold shadow-2xs border border-dusk-blue-200/60"
                : "text-platinum-600 hover:text-platinum-900 hover:bg-platinum-100/70 border border-transparent"
            )}
          >
            <div
              className={clsx(
                "flex items-center justify-center shrink-0 transition-colors",
                active
                  ? "text-dusk-blue-600"
                  : "text-platinum-400 group-hover:text-platinum-700"
              )}
            >
              <Icon className="w-5 h-5" />
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                <div className="truncate">
                  <p className="truncate leading-tight">{item.name}</p>
                  <p className="text-[11px] text-platinum-400 font-normal truncate mt-0.5">
                    {item.description}
                  </p>
                </div>

                {item.badge && (
                  <span
                    className={clsx(
                      "shrink-0 px-2 py-0.5 text-[10px] font-semibold rounded-md border",
                      item.badgeType === "soon"
                        ? "bg-amber-bronze-50 text-amber-bronze-700 border-amber-bronze-200"
                        : "bg-platinum-100 text-platinum-600 border-platinum-200"
                    )}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
            )}

            {/* Active Pill Indicator on border */}
            {active && (
              <span
                className={clsx(
                  "absolute left-0 top-2 bottom-2 w-1 bg-dusk-blue-600 rounded-r-full",
                  collapsed && "-left-1"
                )}
                aria-hidden="true"
              />
            )}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* 1. Mobile & Tablet Drawer (Overlay) */}
      <div
        className={clsx(
          "fixed inset-0 z-50 lg:hidden transition-opacity duration-300",
          isMobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div
          onClick={onMobileClose}
          className="fixed inset-0 bg-platinum-950/40 backdrop-blur-xs"
          aria-hidden="true"
        />

        {/* Slide-over panel */}
        <div
          className={clsx(
            "fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-white border-r border-platinum-200 shadow-xl flex flex-col z-50 transform transition-transform duration-300 ease-out",
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Drawer Header */}
          <div className="h-16 px-4 border-b border-platinum-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-dusk-blue-600 text-white flex items-center justify-center shadow-xs">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-platinum-900 tracking-tight text-sm">
                  Distrilink SAP
                </span>
                <p className="text-[10px] text-platinum-400">Sales Automation</p>
              </div>
            </div>

            <button
              onClick={onMobileClose}
              aria-label="Tutup menu sidebar"
              className="p-1.5 rounded-lg text-platinum-400 hover:text-platinum-700 hover:bg-platinum-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Navigation List */}
          {renderNavList(false)}

          {/* Drawer Footer */}
          <div className="p-4 border-t border-platinum-200 bg-platinum-50/50">
            <div className="flex items-center gap-2 text-xs text-platinum-500">
              <Radio className="w-3.5 h-3.5 text-jade-500 animate-pulse" />
              <span>SFA Live Sync Active</span>
            </div>
            <p className="text-[10px] text-platinum-400 mt-1">
              Distrilink Enterprise v1.0
            </p>
          </div>
        </div>
      </div>

      {/* 2. Desktop Sidebar (Sticky, Collapsible) */}
      <aside
        className={clsx(
          "hidden lg:flex flex-col border-r border-platinum-200 bg-white sticky top-0 h-screen transition-[width] duration-300 ease-in-out shrink-0 z-20",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        {/* Brand Header */}
        <div className="h-16 px-4 border-b border-platinum-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-dusk-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs shadow-dusk-blue-200">
              <Layers className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-platinum-900 tracking-tight text-sm">
                    Distrilink SAP
                  </span>
                </div>
                <p className="text-[11px] text-platinum-400 truncate">
                  Supervisor Platform
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Nav List */}
        {renderNavList(isCollapsed)}

        {/* Footer & Collapse Toggle */}
        <div className="p-3 border-t border-platinum-200 bg-white shrink-0 space-y-2">
          {!isCollapsed && (
            <div className="px-2 py-1.5 bg-platinum-50 rounded-lg border border-platinum-200/70 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-jade-500 animate-pulse" />
                <span className="text-[11px] font-medium text-platinum-600">
                  SFA Cloud Sync
                </span>
              </div>
              <span className="text-[10px] font-semibold text-platinum-400">
                v1.0
              </span>
            </div>
          )}

          <button
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? "Perluas sidebar" : "Kecilkan sidebar"}
            className={clsx(
              "w-full flex items-center rounded-xl p-2 text-platinum-500 hover:text-platinum-900 hover:bg-platinum-100 transition-colors text-xs font-medium cursor-pointer",
              isCollapsed ? "justify-center" : "justify-between px-3"
            )}
          >
            {!isCollapsed && <span>Ciutkan Sidebar</span>}
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
