import { SalesItem } from "@/types";
import { formatRupiah } from "@/lib/utils";

interface SalesTableProps {
  data: SalesItem[];
}

export default function SalesTable({ data }: SalesTableProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-3">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
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
      <div className="px-5 py-4 border-b border-slate-200/80 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Rincian Performa Salesman
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftar lengkap efektivitas kunjungan dan pencapaian order
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
          {data.length} Orang
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
              <th scope="col" className="py-3.5 px-5">
                Nama Sales
              </th>
              <th scope="col" className="py-3.5 px-4">
                Area
              </th>
              <th scope="col" className="py-3.5 px-4 text-center">
                Kunjungan (Realisasi / Rencana)
              </th>
              <th scope="col" className="py-3.5 px-4">
                Efektivitas Kunjungan
              </th>
              <th scope="col" className="py-3.5 px-4 text-right">
                Total Order (Rp)
              </th>
              <th scope="col" className="py-3.5 px-5 text-center">
                Order OOS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item, index) => {
              const efektivitas = item.efektivitas_visit_persen;
              const badgeStyle =
                efektivitas >= 85
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : efektivitas >= 70
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-amber-50 text-amber-700 border-amber-200";

              return (
                <tr
                  key={index}
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
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold border ${badgeStyle}`}
                      >
                        {item.efektivitas_visit_persen}%
                      </span>
                      <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full ${
                            efektivitas >= 85
                              ? "bg-emerald-500"
                              : efektivitas >= 70
                                ? "bg-blue-500"
                                : "bg-amber-500"
                          }`}
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
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
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
