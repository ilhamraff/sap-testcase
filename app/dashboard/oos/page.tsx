"use client";

import ModulePlaceholder from "@/components/ModulePlaceholder";
import { AlertTriangle } from "lucide-react";
import salesRawData from "@/data/sales.json";

export default function OosPage() {
  const totalOOS = salesRawData.reduce(
    (acc, curr) => acc + curr.jumlah_order_oos,
    0
  );
  const highestOOS = [...salesRawData].sort(
    (a, b) => b.jumlah_order_oos - a.jumlah_order_oos
  )[0];

  return (
    <ModulePlaceholder
      badge="Modul Pengendalian Stok & Risiko"
      title="Monitoring Out-of-Stock (OOS)"
      subtitle="Deteksi Dini Kendala Pesanan Gagal Akibat Ketiadaan Stok Produk"
      description="Modul khusus pengawasan pesanan yang tidak dapat dipenuhi (out-of-stock). Membantu supervisor mengidentifikasi produk yang sering kehabisan stok di gudang dan mengukur dampaknya terhadap kepuasan outlet serta kehilangan potensi pendapatan."
      icon={AlertTriangle}
      metrics={[
        {
          label: "Total Pesanan Gagal (OOS)",
          value: `${totalOOS} Kasus`,
          note: "Akumulasi seluruh tim sales hari ini",
        },
        {
          label: "Kasus OOS Terbanyak",
          value: `${highestOOS.jumlah_order_oos} Kasus`,
          note: `${highestOOS.nama_sales} (${highestOOS.area})`,
        },
        {
          label: "Status Risiko Gudang",
          value: totalOOS > 5 ? "Perlu Perhatian" : "Terkendali",
          note: "Tingkat OOS > 5 pesanan memerlukan audit stok",
        },
      ]}
      upcomingFeatures={[
        {
          title: "Analisis Produk Sering Habis",
          desc: "Pelacakan SKU barang yang paling sering gagal dipesan oleh outlet saat canvasser melakukan taking order.",
        },
        {
          title: "Estimasi Potensi Omzet Terbuang",
          desc: "Kalkulasi nilai estimasi pendapatan yang hilang akibat pesanan ditolak karena ketiadaan stok barang.",
        },
        {
          title: "Sistem Peringatan Restock Cepat",
          desc: "Notifikasi otomatis ke bagian supply chain/warehouse ketika tren OOS di suatu area melebihi ambang batas aman.",
        },
      ]}
    />
  );
}
