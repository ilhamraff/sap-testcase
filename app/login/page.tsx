"use client";

import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { loginSchema, type LoginFormValues } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, BarChart3, Info, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { login, user, isLoading } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/dashboard");
    }
  }, [user, isLoading, router]);

  const onSubmit = async (data: LoginFormValues) => {
    setErrorMessage("");

    try {
      await login(data.username, data.password);
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Terjadi kesalahan sistem saat mencoba masuk.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-platinum-100">
        <div className="flex items-center gap-3 text-platinum-600">
          <Loader2 className="w-5 h-5 text-dusk-blue-600 animate-spin" />
          <span className="text-sm font-medium">Memeriksa session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-platinum-200 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-platinum-300/60 border border-platinum-200/90 overflow-hidden">
        {/* Header Kartu Login */}
        <div className="bg-dusk-blue-600 px-8 py-7 text-white text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 backdrop-blur-xs border border-white/20">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">SAP Analytics</h1>
        </div>

        {/* Konten Form */}
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-platinum-900">
              Masuk ke Akun Anda
            </h2>
            <p className="text-xs text-platinum-500 mt-0.5">
              Gunakan kredensial akun DummyJSON untuk mengakses dashboard.
            </p>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="mb-5 p-3.5 bg-crimson-50 border border-crimson-200 rounded-xl flex items-start gap-3 text-crimson-800 text-sm animate-in fade-in duration-200"
            >
              <AlertCircle className="w-5 h-5 text-crimson-500 shrink-0 mt-0.5" />
              <div className="leading-snug">
                <span className="font-semibold block text-xs text-crimson-900 uppercase tracking-wide">
                  Gagal Masuk
                </span>
                {errorMessage}
              </div>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-4"
          >
            {/* Input Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-xs font-semibold text-platinum-700 uppercase tracking-wider mb-1.5"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Masukkan username (cth: emilys)"
                {...register("username")}
                className={cn(
                  "w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-platinum-900 placeholder:text-platinum-400 focus:outline-hidden focus:ring-2 transition-all",
                  errors.username
                    ? "border-crimson-400 focus:ring-crimson-500 focus:border-crimson-500"
                    : "border-platinum-300 focus:ring-dusk-blue-500 focus:border-dusk-blue-500",
                )}
              />
              {errors.username && (
                <p className="mt-1.5 text-xs text-crimson-600 font-medium flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.username.message}</span>
                </p>
              )}
            </div>

            {/* Input Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-platinum-700 uppercase tracking-wider mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Masukkan password"
                {...register("password")}
                className={cn(
                  "w-full px-3.5 py-2.5 bg-white border rounded-lg text-sm text-platinum-900 placeholder:text-platinum-400 focus:outline-hidden focus:ring-2 transition-all",
                  errors.password
                    ? "border-crimson-400 focus:ring-crimson-500 focus:border-crimson-500"
                    : "border-platinum-300 focus:ring-dusk-blue-500 focus:border-dusk-blue-500",
                )}
              />
              {errors.password && (
                <p className="mt-1.5 text-xs text-crimson-600 font-medium flex items-center gap-1 animate-in fade-in">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.password.message}</span>
                </p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-2.5 px-4 bg-dusk-blue-600 hover:bg-dusk-blue-700 active:scale-[0.99] text-white text-sm font-semibold rounded-lg shadow-md shadow-dusk-blue-200 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-platinum-100 bg-platinum-50/80 -mx-8 -mb-8 px-8 py-4 text-xs text-platinum-600">
            <p className="font-semibold text-platinum-700 mb-1 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-dusk-blue-600 shrink-0" />
              Akun Uji Coba Resmi (DummyJSON API):
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-platinum-600">
              <span>
                Username: <strong className="text-platinum-900">emilys</strong>
              </span>
              <span>
                Password:{" "}
                <strong className="text-platinum-900">emilyspass</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
