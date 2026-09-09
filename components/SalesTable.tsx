"use client";

import { SalesItem } from "@/types";
import { cn, formatRupiah } from "@/lib/utils";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Check,
  SearchX,
} from "lucide-react";
import { useMemo, useState } from "react";

interface SalesTableProps {
  data: SalesItem[];
}

type SortField =
  | "nama_sales"
  | "area"
  | "kunjungan_realisasi"
  | "efektivitas_visit_persen"
  | "total_order_rp"
  | "jumlah_order_oos";

type SortDirection = "asc" | "desc";

function SortIndicator({
  field,
  currentField,
  direction,
}: {
  field: SortField;
  currentField: SortField | null;
  direction: SortDirection;
}) {
  const isActive = currentField === field;

  if (!isActive) {
    return (
      <ArrowUpDown
        className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors shrink-0"
        aria-hidden="true"
      />
    );
  }

  return direction === "asc" ? (
    <ArrowUp
      className="w-3.5 h-3.5 text-indigo-600 shrink-0 animate-in fade-in"
      aria-label="Urutkan menaik"
    />
  ) : (
    <ArrowDown
      className="w-3.5 h-3.5 text-indigo-600 shrink-0 animate-in fade-in"
      aria-label="Urutkan menurun"
    />
  );
}

export default function SalesTable({ data }: SalesTableProps) {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else {
        // Siklus ketiga: kembalikan ke urutan default dataset
        setSortField(null);
        setSortDirection("asc");
      }
    } else {
      const initialDirection: SortDirection =
        field === "nama_sales" || field === "area" ? "asc" : "desc";
      setSortField(field);
      setSortDirection(initialDirection);
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        const comparison = aValue.localeCompare(bValue, "id");
        return sortDirection === "asc" ? comparison : -comparison;
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortField, sortDirection]);

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-3">
          <SearchX className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-800">
          Tidak ada data ditemukan
        </h4>
        <p className="text-xs text-slate-500 mt-1">
          Coba sesuaikan kata kunci pencarian atau filter area Anda.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Rincian Performa Salesman
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar lengkap efektivitas kunjungan dan pencapaian order &bull;{" "}
            <span className="text-indigo-600 font-medium">
              Klik header kolom untuk mengurutkan
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          {sortField && (
            <button
              onClick={() => {
                setSortField(null);
                setSortDirection("asc");
              }}
              className="text-[11px] font-medium text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
            >
              Reset Urutan
            </button>
          )}
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
            {data.length} Orang
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              {/* Nama Sales */}
              <th scope="col" className="py-3.5 px-5">
                <button
                  onClick={() => handleSort("nama_sales")}
                  className="group flex items-center gap-1.5 text-left font-semibold hover:text-slate-900 transition-colors cursor-pointer select-none"
                  title="Urutkan berdasarkan Nama Sales"
                >
                  <span>Nama Sales</span>
                  <SortIndicator
                    field="nama_sales"
                    currentField={sortField}
                    direction={sortDirection}
                  />
                </button>
              </th>

              {/* Area */}
              <th scope="col" className="py-3.5 px-4">
                <button
                  onClick={() => handleSort("area")}
                  className="group flex items-center gap-1.5 text-left font-semibold hover:text-slate-900 transition-colors cursor-pointer select-none"
                  title="Urutkan berdasarkan Area"
                >
                  <span>Area</span>
                  <SortIndicator
                    field="area"
                    currentField={sortField}
                    direction={sortDirection}
                  />
                </button>
              </th>

              {/* Kunjungan */}
              <th scope="col" className="py-3.5 px-4">
                <button
                  onClick={() => handleSort("kunjungan_realisasi")}
                  className="group flex items-center justify-center gap-1.5 w-full font-semibold hover:text-slate-900 transition-colors cursor-pointer select-none"
                  title="Urutkan berdasarkan Realisasi Kunjungan"
                >
                  <span>Kunjungan (Realisasi / Rencana)</span>
                  <SortIndicator
                    field="kunjungan_realisasi"
                    currentField={sortField}
                    direction={sortDirection}
                  />
                </button>
              </th>

              {/* Efektivitas Kunjungan */}
              <th scope="col" className="py-3.5 px-4">
                <button
                  onClick={() => handleSort("efektivitas_visit_persen")}
                  className="group flex items-center gap-1.5 font-semibold hover:text-slate-900 transition-colors cursor-pointer select-none"
                  title="Urutkan berdasarkan Efektivitas Kunjungan"
                >
                  <span>Efektivitas Kunjungan</span>
                  <SortIndicator
                    field="efektivitas_visit_persen"
                    currentField={sortField}
                    direction={sortDirection}
                  />
                </button>
              </th>

              {/* Total Order */}
              <th scope="col" className="py-3.5 px-4">
                <button
                  onClick={() => handleSort("total_order_rp")}
                  className="group flex items-center justify-end gap-1.5 w-full font-semibold hover:text-slate-900 transition-colors cursor-pointer select-none"
                  title="Urutkan berdasarkan Total Nilai Order"
                >
                  <span>Total Order (Rp)</span>
                  <SortIndicator
                    field="total_order_rp"
                    currentField={sortField}
                    direction={sortDirection}
                  />
                </button>
              </th>

              {/* Order OOS */}
              <th scope="col" className="py-3.5 px-5">
                <button
                  onClick={() => handleSort("jumlah_order_oos")}
                  className="group flex items-center justify-center gap-1.5 w-full font-semibold hover:text-slate-900 transition-colors cursor-pointer select-none"
                  title="Urutkan berdasarkan Jumlah Order OOS"
                >
                  <span>Order OOS</span>
                  <SortIndicator
                    field="jumlah_order_oos"
                    currentField={sortField}
                    direction={sortDirection}
                  />
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedData.map((item, index) => {
              const efektivitas = item.efektivitas_visit_persen;
              const badgeStyle =
                efektivitas >= 85
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : efektivitas >= 70
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-amber-50 text-amber-700 border-amber-200";

              return (
                <tr
                  key={`${item.nama_sales}-${index}`}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  {/* Nama Sales */}
                  <td className="py-3.5 px-5 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-semibold text-xs flex items-center justify-center shrink-0">
                        {item.nama_sales.charAt(0)}
                      </div>
                      <span className="font-semibold text-slate-800">
                        {item.nama_sales}
                      </span>
                    </div>
                  </td>

                  {/* Area */}
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {item.area}
                    </span>
                  </td>

                  {/* Kunjungan (Realisasi / Target) */}
                  <td className="py-3.5 px-4 text-center text-slate-700 font-medium">
                    <span className="text-slate-900 font-semibold">
                      {item.kunjungan_realisasi}
                    </span>
                    <span className="text-slate-400 font-normal">
                      {" "}
                      / {item.kunjungan_planned} visit
                    </span>
                  </td>

                  {/* Efektivitas Kunjungan (%) */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "inline-block px-2 py-0.5 rounded-full text-xs font-bold border",
                          badgeStyle,
                        )}
                      >
                        {item.efektivitas_visit_persen}%
                      </span>
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={cn(
                            "h-full rounded-full",
                            efektivitas >= 85
                              ? "bg-emerald-500"
                              : efektivitas >= 70
                                ? "bg-blue-500"
                                : "bg-amber-500",
                          )}
                          style={{ width: `${Math.min(efektivitas, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Total Order (Rp) */}
                  <td className="py-3.5 px-4 text-right font-semibold text-slate-900">
                    {formatRupiah(item.total_order_rp)}
                  </td>

                  {/* Jumlah Order Gagal OOS (Out of Stock) */}
                  <td className="py-3.5 px-5 text-center">
                    {item.jumlah_order_oos > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                        {item.jumlah_order_oos} kasus
                      </span>
                    ) : (
                      <span className="text-xs text-emerald-600 font-medium flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        Nol OOS
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
