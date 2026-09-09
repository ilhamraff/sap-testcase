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
      <div className="bg-white rounded-xl border border-platinum-200 p-6 h-80 flex items-center justify-center text-platinum-400">
        <div className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 text-dusk-blue-500 animate-spin" />
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
    <div className="bg-white rounded-xl border border-platinum-200/90 shadow-xs p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-platinum-100 gap-2">
        <div>
          <h3 className="text-sm font-bold text-platinum-900">
            Grafik Efektivitas Kunjungan Sales (%)
          </h3>
          <p className="text-xs text-platinum-500 mt-0.5">
            Perbandingan persentase efektivitas kunjungan lapangan terhadap
            target (80%)
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-platinum-600">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-dusk-blue-600 inline-block" />
            &ge; 80% Target
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-amber-bronze-500 inline-block" />
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
              stroke="#e0e7eb"
            />
            <XAxis
              dataKey="name"
              tick={{ fill: "#526b7a", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#c2cfd6" }}
              interval={0}
              angle={-10}
              textAnchor="end"
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#526b7a", fontSize: 12 }}
              tickLine={false}
              axisLine={{ stroke: "#c2cfd6" }}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const d = payload[0].payload;
                  return (
                    <div className="bg-platinum-900 text-white p-3 rounded-lg shadow-lg text-xs space-y-1 border border-platinum-800">
                      <p className="font-bold text-sm text-dusk-blue-300">
                        {d.name}
                      </p>
                      <p className="text-platinum-300">Area: {d.area}</p>
                      <p className="font-semibold text-white">
                        Efektivitas:{" "}
                        <span
                          className={
                            d.efektivitas >= TARGET_EFEKTIVITAS
                              ? "text-jade-400 font-bold"
                              : "text-amber-bronze-300 font-bold"
                          }
                        >
                          {d.efektivitas}%
                        </span>
                      </p>
                      <p className="text-platinum-400">
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
              stroke="#df3b5d"
              strokeDasharray="4 4"
              label={{
                value: "Target 80%",
                position: "right",
                fill: "#df3b5d",
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
                      ? "#3e7bc1"
                      : "#d47e1d"
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
