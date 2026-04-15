# 📸 CodeSnap — "Koding secukupnya, estetik semampunya."

**CodeSnap** adalah aplikasi berbasis web yang dirancang khusus untuk para pengembang yang ingin membagikan potongan kode (snippets) mereka dengan gaya jendela macOS yang elegan dan bersih. Dibangun dengan perpaduan desain antarmuka **Brutalist** yang berani namun tetap menghasilkan output gambar yang sangat profesional.

---

## ✨ Fitur Utama

- **🖼️ macOS Window Frame**: Hasil export otomatis menggunakan frame jendela macOS lengkap dengan tombol kontrol ikonik (red, yellow, green).
- **🚀 Ultra-Clean Export**: Menggunakan library `html-to-image` dengan rasio pixel tinggi (3x) untuk hasil PNG yang tajam tanpa pecah.
- **🛠️ Raw Input Anti-Hantu**: Editor input yang stabil, berwarna putih bersih, dan responsif untuk penulisan kode cepat.
- **🌈 Syntax Highlighting Pro**: Didukung oleh **Shiki** untuk pewarnaan kode tingkat profesional.
- **✒️ Signature Watermark**: Otomatis menyertakan "By Hikmal Apriliano" di pojok setiap foto.
- **📱 Responsive Layout**: Tetap nyaman digunakan baik di layar monitor besar maupun perangkat mobile.

---

## 🚀 Teknologi yang Digunakan

- **Next.js** - Core Framework.
- **Tailwind CSS** - Styling antarmuka Brutalist.
- **Shiki** - Engine Syntax Highlighting.
- **Lucide React** - Paket Ikon minimalis.
- **HTML-to-Image** - Engine konversi DOM ke Gambar.

---

## 🛠️ Instalasi Lokal

Ingin mengembangkan CodeSnap di komputer sendiri? Ikuti langkah ini:

1. Clone Repository:
   git clone https://github.com/hikmal-apriliano/codesnap.git

2. Masuk ke Direktori:
   cd codesnap

3. Install Dependencies:
   npm install

4. Jalankan Development Server:
   npm run dev

Buka http://localhost:3000 pada browser favoritmu.

---

## 📸 Cara Penggunaan

1. **Input Kode**: Ketik atau tempel potongan kode kamu di kotak `RAW_CODE_INPUT`.
2. **Konfigurasi**: Pilih bahasa pemrograman dan tema warna yang kamu suka di `CONFIG_PANEL`.
3. **Preview**: Lihat hasil jendela macOS secara real-time.
4. **Export**: Klik tombol **EXPORT PNG** dan file `codesnap-xxx.png` akan otomatis terunduh.

---

## 👤 Author

- **Hikmal Apriliano** - Full Stack Web Developer

---
