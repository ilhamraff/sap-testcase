import { useAuth } from "@/context/AuthContext";
import { BarChart3, LogOut } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const [imageError, setImageError] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-platinum-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-dusk-blue-600 rounded-xl backdrop-blur-xs border border-white/20 shadow-xs shadow-dusk-blue-200">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-platinum-900 tracking-tight text-base sm:text-lg">
                SAP Analytics
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-dusk-blue-50 text-dusk-blue-700 border border-dusk-blue-200/70 rounded-full">
                Supervisor
              </span>
            </div>
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
                className="w-9 h-9 rounded-full border border-platinum-200 object-cover bg-platinum-100"
                unoptimized
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-dusk-blue-100 border border-dusk-blue-200 flex items-center justify-center text-dusk-blue-700 font-bold text-xs shadow-2xs">
                {user?.firstName ? user.firstName.charAt(0).toUpperCase() : "S"}
              </div>
            )}
            <div className="hidden sm:block text-left">
              <p className="text-xs text-platinum-500 leading-none">
                Selamat datang,
              </p>
              <p className="text-sm font-semibold text-platinum-800 leading-tight mt-0.5">
                {user?.firstName
                  ? `${user.firstName} ${user.lastName || ""}`
                  : "Supervisor"}
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-platinum-200" aria-hidden="true" />

          <button
            onClick={logout}
            title="Keluar dari sistem"
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
