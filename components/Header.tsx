import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();

  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-200">
            S
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                SAP Analytics
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/60 rounded-full">
                Supervisor
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden md:block">
              Sales Automation Platform &bull; Analisa Performa Lapangan
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <div className="flex items-center gap-2.5 text-right">
            {user?.image && !imageError ? (
              <Image
                src={user.image}
                alt={user.firstName || "User"}
                width={36}
                height={36}
                onError={() => setImageError(true)}
                className="w-9 h-9 rounded-full border border-slate-200 object-cover bg-slate-100"
                unoptimized
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs shadow-2xs">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : "S"}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-xs text-slate-500 leading-none">
                Selamat datang,
              </p>
              <p className="text-sm font-semibold text-slate-800 leading-tight mt-0.5">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : "Supervisor"}
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200" aria-hidden="true" />

          <button
            onClick={logout}
            title="Keluar dari sistem"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 active:scale-95 border border-rose-200/60 rounded-lg transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}
