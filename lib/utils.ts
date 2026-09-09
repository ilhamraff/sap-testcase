/**
 * Format angka ke format mata uang Rupiah (IDR).
 * Contoh: 1500000 -> "Rp 1.500.000"
 */
export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
