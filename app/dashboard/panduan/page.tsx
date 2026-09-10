"use client";

import ModulePlaceholder from "@/components/ModulePlaceholder";
import { BookOpen } from "lucide-react";

export default function PanduanPage() {
  const glossaryList = [
    {
      term: "SFA (Sales Force Automation)",
      definition:
        "Sistem digital yang mendigitalkan seluruh aktivitas tim sales lapangan, mulai dari jadwal kunjungan, pencatatan rute, hingga pengambilan pesanan (taking order).",
    },
    {
      term: "Canvasser / Sales",
      definition:
        "Tenaga penjual lapangan yang bertugas mengunjungi outlet/toko secara langsung untuk memeriksa stok dan mencatat pesanan barang di lokasi.",
    },
    {
      term: "Outlet",
      definition:
        "Toko, pelanggan ritel, warung, minimarket, atau grosir yang menjadi titik tujuan kunjungan rutin tim sales.",
    },
    {
      term: "Geotagging",
      definition:
        "Pencatatan koordinat geografis (latitude & longitude) secara presisi pada saat aktivitas check-in untuk memverifikasi kehadiran fisik sales di lokasi outlet.",
    },
    {
      term: "NOO (New Outlet Onboarding)",
      definition:
        "Prosedur pendaftaran toko baru ke dalam sistem langsung dari aplikasi mobile ketika sales pertama kali membuka relasi dengan outlet tersebut.",
    },
    {
      term: "OOS (Out of Stock)",
      definition:
        "Kondisi ketika produk yang ingin dipesan oleh outlet sedang kosong di persediaan atau gudang, sehingga pesanan tidak dapat terpenuhi.",
    },
    {
      term: "Check-in / Check-out",
      definition:
        "Penanda waktu mulai dan selesai durasi kunjungan sales di outlet untuk mengukur efektivitas waktu kerja di lapangan.",
    },
    {
      term: "Skema Promo & Discount",
      definition:
        "Aturan potongan harga, bonus kuantiti, atau insentif bertingkat otomatis yang diterapkan sistem saat sales mencatat transaksi pesanan.",
    },
  ];

  return (
    <ModulePlaceholder
      badge="Knowledge Base & SOP Distrilink"
      title="Panduan & Glosarium Sistem SFA"
      subtitle="Dokumentasi Standar Operasional Sales Automation Platform (SAP)"
      description="Referensi terpadu konsep bisnis dan terminologi operasional yang digunakan di seluruh ekosistem Sales Automation Platform (SAP) Distrilink. Dirancang untuk mempercepat onboarding supervisor baru dan menyelaraskan pemahaman metrik kinerja."
      icon={BookOpen}
      metrics={[
        {
          label: "Jumlah Definisi",
          value: `${glossaryList.length} Istilah`,
          note: "Standar industri SFA & FMCG",
        },
        {
          label: "Fokus Operasional",
          value: "SFA & Taking Order",
          note: "Mobile & Web Centralized",
        },
        {
          label: "Status Kepatuhan SOP",
          value: "100% Terstandar",
          note: "Sesuai petunjuk teknis Distrilink",
        },
      ]}
      glossaryItems={glossaryList}
    />
  );
}
