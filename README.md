# Web Dashboard "Analisa Performa Salesman" - SAP (Sales Automation Platform)

Aplikasi dashboard prototype untuk supervisor Sales Automation Platform (SAP) guna memantau dan menganalisa efektivitas kunjungan salesman lapangan, total pencapaian order, serta mendeteksi kendala pesanan gagal akibat kehabisan stok (_out-of-stock_ / OOS).

---

## Panduan Instalasi & Menjalankan Aplikasi

### 1. Prasyarat

- **Node.js**: Versi 18.18+ atau 20+
- **npm** (atau pnpm / yarn)

### 2. Instalasi Dependency

Buka terminal di direktori proyek, lalu jalankan:

```bash
npm install
```

### 3. Menjalankan Server Development

Jalankan perintah berikut:

```bash
npm run dev
```

Setelah server menyala, buka peramban (_browser_) dan akses:
**[http://localhost:3000](http://localhost:3000)**

Rute `/` akan otomatis mengarahkan ke `/dashboard`, dan karena belum login, Anda akan diarahkan ke `/login`.

---

## Kredensial Akun Pengujian (Live API DummyJSON)

Autentikasi terhubung langsung ke REST API publik DummyJSON (`POST https://dummyjson.com/auth/login`). Gunakan akun pengujian berikut:

| Keterangan   | Nilai        |
| :----------- | :----------- |
| **Username** | `emilys`     |
| **Password** | `emilyspass` |

> 💡 _Catatan:_ Form login juga mendukung pengujian kredensial yang salah (misal: username atau password diisi sembarang) untuk melihat pesan penanganan error secara langsung dari API.
