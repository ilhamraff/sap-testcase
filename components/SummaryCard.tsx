import { SalesItem } from "@/types";
import { cn, formatRupiah } from "@/lib/utils";
import { Banknote, CheckCircle2, MapPin } from "lucide-react";

export { formatRupiah };

interface SummaryCardsProps {
  data: SalesItem[];
}

interface SingleCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  icon: React.ReactNode;
}

function MetricCard({
  title,
  value,
  subtitle,
  badge,
  badgeColor = "bg-slate-100 text-slate-700",
  icon,
}: SingleCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-slate-600">
          {icon}
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-baseline gap-2">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
            {value}
          </h3>
          {badge && (
            <span
              className={cn(
                "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                badgeColor,
              )}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export default function SummaryCards({ data }: SummaryCardsProps) {
  const totalRealisasi = data.reduce(
    (acc, curr) => acc + curr.kunjungan_realisasi,
    0,
  );
  const totalPlanned = data.reduce(
    (acc, curr) => acc + curr.kunjungan_planned,
    0,
  );

  const avgEfektivitas =
    data.length > 0
      ? Math.round(
          data.reduce((acc, curr) => acc + curr.efektivitas_visit_persen, 0) /
            data.length,
        )
      : 0;

  const totalNilaiOrder = data.reduce(
    (acc, curr) => acc + curr.total_order_rp,
    0,
  );
  const totalOOS = data.reduce((acc, curr) => acc + curr.jumlah_order_oos, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Kunjungan Realisasi */}
      <MetricCard
        title="Total Kunjungan Realisasi"
        value={`${totalRealisasi} Visit`}
        subtitle={`Dari target rencana ${totalPlanned} kunjungan`}
        badge={`${Math.round((totalRealisasi / (totalPlanned || 1)) * 100)}% tercapai`}
        badgeColor="bg-blue-50 text-blue-700"
        icon={<MapPin className="w-5 h-5 text-blue-600" />}
      />

      {/* Rata-rata Efektivitas Tim */}
      <MetricCard
        title="Rata-rata Efektivitas Tim"
        value={`${avgEfektivitas}%`}
        subtitle={`Rerata keberhasilan dari ${data.length} salesman`}
        badge={avgEfektivitas >= 80 ? "Sangat Baik" : "Perlu Perhatian"}
        badgeColor={
          avgEfektivitas >= 80
            ? "bg-emerald-50 text-emerald-700"
            : "bg-amber-50 text-amber-700"
        }
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600" />}
      />

      {/* Total Nilai Order */}
      <MetricCard
        title="Total Nilai Order"
        value={formatRupiah(totalNilaiOrder)}
        subtitle={`Akumulasi order berhasil (OOS: ${totalOOS} order)`}
        badge={`${data.length} Sales Aktif`}
        badgeColor="bg-indigo-50 text-indigo-700"
        icon={<Banknote className="w-5 h-5 text-indigo-600" />}
      />
    </div>
  );
}
