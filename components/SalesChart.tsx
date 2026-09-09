import { SalesItem } from "@/types";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SalesChartProps {
  data: SalesItem[];
}

export default function SalesChart({ data }: SalesChartProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 h-80 flex items-center justify-center text-slate-400">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
          <span className="text-xs">Memuat visualisasi chart...</span>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return null;
  }

  const chartData = data.map((item) => ({
    name: item.nama_sales,
    area: item.area,
    efektivitas: item.efektivitas_visit_persen,
    realisasi: item.kunjungan_realisasi,
    planned: item.kunjungan_planned,
  }));

  const TARGET_EFEKTIVITAS = 80;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            Grafik Efektivitas Kunjungan Sales (%)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Perbandingan persentase efektivitas kunjungan lapangan terhadap
            target (80%)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-indigo-600 inline-block" />
            &ge; 80% Target
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-amber-500 inline-block" />
            &lt; 80% Perlu Ditingkatkan
          </span>
        </div>
      </div>

      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 20, left: -10, bottom: 25 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              interval={0}
              angle={-10}
              textAnchor="end"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#64748b", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#e2e8f0" }}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg text-xs space-y-1 border border-slate-800">
                      <p className="font-bold text-sm text-indigo-300">
                        {d.name}
                      </p>
                      <p className="text-slate-300">Area: {d.area}</p>
                      <p className="font-semibold text-white">
                        Efektivitas:{" "}
                        <span
                          className={
                            d.efektivitas >= TARGET_EFEKTIVITAS
                              ? "text-emerald-400 font-bold"
                              : "text-amber-400 font-bold"
                          }
                        >
                          {d.efektivitas}%
                        </span>
                      </p>
                      <p className="text-slate-400">
                        Kunjungan: {d.realisasi} realisasi / {d.planned} rencana
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ fontSize: "11px", paddingBottom: "10px" }}
            />
            <ReferenceLine
              y={TARGET_EFEKTIVITAS}
              stroke="#ef4444"
              strokeDasharray="4 4"
              label={{
                value: "Target 80%",
                position: "right",
                fill: "#ef4444",
                fontSize: 11,
              }}
            />
            <Bar
              dataKey="efektivitas"
              name="Efektivitas Kunjungan (%)"
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.efektivitas >= TARGET_EFEKTIVITAS
                      ? "#4f46e5"
                      : "#f59e0b"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
