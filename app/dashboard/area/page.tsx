"use client";

import ModulePlaceholder from "@/components/ModulePlaceholder";
import { MapPin } from "lucide-react";
import salesRawData from "@/data/sales.json";
import { formatRupiah } from "@/lib/utils";

export default function AreaPage() {
  const totalOmzet = salesRawData.reduce(
    (acc, curr) => acc + curr.total_order_rp,
    0
  );
  const avgEfektivitas = Math.round(
    salesRawData.reduce((acc, curr) => acc + curr.efektivitas_visit_persen, 0) /
      salesRawData.length
  );

  return (
    <ModulePlaceholder
      badge="Modul Geografis & Wilayah"
      title="Analisa Wilayah & Territory Sales"
      subtitle="Monitoring Kontribusi Penjualan Berdasarkan 5 Teritori Jawa Barat"
      description="Modul ini dirancang untuk memberikan pemetaan performa agregat per wilayah operasional. Membantu supervisor mengevaluasi penetrasi pasar, efektivitas rute salesman, serta mengidentifikasi area yang membutuhkan penambahan alokasi canvasser."
      icon={MapPin}
      metrics={[
        {
          label: "Total Wilayah Terpantau",
          value: "5 Territory",
          note: "Bandung Kota, Barat, Timur, Cimahi, Soreang",
        },
        {
          label: "Akumulasi Order Teritorial",
          value: formatRupiah(totalOmzet),
          note: "Kontribusi seluruh wilayah aktif",
        },
        {
          label: "Rata-rata Efektivitas Area",
          value: `${avgEfektivitas}%`,
          note: "Target efektivitas minimal tim: 80%",
        },
      ]}
      upcomingFeatures={[
        {
          title: "Distribusi Nilai Order per Area",
          desc: "Visualisasi Donut Chart untuk melihat persentase kontribusi omzet masing-masing cabang terhadap total penjualan.",
        },
        {
          title: "Peta Rute & Geotagging Validation",
          desc: "Integrasi titik koordinat check-in outlet per wilayah guna mencegah kunjungan dan order fiktif di lapangan.",
        },
        {
          title: "Benchmarking Kinerja Antar Cabang",
          desc: "Komparasi ketercapaian target kunjungan antar wilayah untuk evaluasi pemerataan beban kerja canvasser.",
        },
      ]}
    />
  );
}
