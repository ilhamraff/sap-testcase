export interface SalesItem {
  nama_sales: string;
  area: string;
  kunjungan_planned: number;
  kunjungan_realisasi: number;
  efektivitas_visit_persen: number;
  total_order_rp: number;
  jumlah_order_oos: number;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  accessToken: string;
}

export interface LoginResponse extends AuthUser {
  refreshToken?: string;
}
