# Experiment 002 - Real Human and Nahida at a Cafe

## Status

v2 dilaporkan **working** oleh pengguna pada 2026-09-08. Isi prompt v2 disimpan
persis dari teks yang dikirim pengguna, termasuk deskripsi identitas dan dialog
Jepang. Konfigurasi durasi diperbarui menjadi **15 detik**. Hasil video dan gambar
referensi belum diperiksa langsung di repository ini.

v1 tetap disimpan sebagai draft awal adegan saling menyuapi di cafe.

## v2 - Working Baseline

- File: `ref2va_nahida_cafe_v2.md`.
- Adegan: berjalan bersama di promenade, berbicara bahasa Jepang, kemudian
  duduk di cafe outdoor dan masing-masing makan kue.
- Kamera: multi-shot, wide two-shot dan close-up frontal; semua wajah menghadap lensa.
- Identitas: pria berkacamata dengan polo cokelat gelap dan name tag, serta Nahida.
- Speaker: pria `(S1)` dan Nahida `(S2)`, masing-masing dua dialog Jepang.
- Durasi konfigurasi: 15 detik, sesuai informasi pengguna.
- Timeline tertulis masih 0-10 detik. Tidak diretime agar teks yang dilaporkan
  work tetap utuh; perilaku detik 10-15 belum dijelaskan atau dievaluasi di notes ini.
- Steps 20, rasio 16:9, dan resolusi 2K diwarisi dari konfigurasi draft v1;
  belum ada konfirmasi baru untuk ketiganya. Seed aktual belum diberikan.
- Instruksi asli, termasuk negative framing dan penutup, dipertahankan sebagai
  rekaman hasil eksperimen, bukan dinormalisasi ke aturan template.

## v1 - Draft Awal

Bagian di bawah ini mendokumentasikan desain awal v1, bukan hasil v2.

## Input yang Dibutuhkan

| Label | Isi |
|-------|-----|
| `<Picture 1>` | Foto orang dewasa yang akan tampil, wajah jelas dan outfit terlihat; idealnya sudut tiga-perempat dengan tangan terlihat. |
| `<Picture 2>` | Gambar Nahida dari Genshin Impact dengan wajah, outfit, aksesori, dan proporsi terlihat jelas; gunakan render 3D game agar sesuai dengan arah visual v1. |

Pasangkan label tersebut dengan urutan gambar di workflow Ref2VA yang dipakai.
Periksa kedua gambar sebelum menjalankan prompt. Latar cafe dibuat dari teks;
tidak perlu gambar cafe atau video sumber untuk versi ini.

## Parameter Awal

| Parameter | Nilai |
|-----------|-------|
| Mode | Ref2VA, reference generation dengan dua identitas |
| Kategori repo | `motion`, untuk eksperimen koreografi interaksi; bukan motion transfer dari video |
| Durasi target | 10 detik; sesuaikan dengan pilihan durasi yang tersedia pada workflow |
| Rasio | 16:9 agar dua wajah, tangan, dan meja muat dalam satu shot |
| Steps | 20 sebagai titik awal |
| Seed | Belum ditetapkan; catat seed aktual setelah run pertama |
| Resolusi target | 2K |

## Arah Visual dan Interaksi

Orang asli tetap fotorealistis, Nahida tetap karakter 3D bergaya game, dan cafe
tetap real life. Pencahayaan, perspektif, serta bayangan kontak menyatukan
ketiganya. Interaksi berupa teman berbagi kue dengan ekspresi ringan, tanpa
dialog pada v1 agar evaluasi fokus ke identitas, tangan, dan kontak sendok.

Kedua karakter duduk pada sisi meja yang berdekatan dan saling menghadap
serong. Posisi duduk Nahida disesuaikan agar tangan dan wajah tidak tertutup
meja. Kamera statis membantu mengevaluasi stabilitas latar dan identitas.

## Urutan Gerak

| Waktu | Aksi |
|-------|------|
| 0-1s | Saling melihat; masing-masing sudah memegang sendok berisi satu suapan. |
| 1-4s | Orang asli menyuapi Nahida, lalu menarik sendoknya. |
| 4-5s | Sendok pertama diturunkan; Nahida selesai menerima suapan. |
| 5-8s | Nahida menyuapi orang asli, lalu menarik sendoknya. |
| 8-10s | Keduanya kembali duduk santai dan tersenyum. |

Sendok sudah terisi pada awal shot untuk mengurangi kompleksitas mengambil
kue dari piring. Setiap tangan kanan memegang sendok yang sama sepanjang shot.
Gerakan bergantian membatasi kontak tangan dan sendok yang terjadi bersamaan.
Ini target koreografi, bukan jaminan hasil generasi.

## Evaluasi Hasil

- Identitas orang asli konsisten dengan `<Picture 1>`.
- Nahida tetap sesuai `<Picture 2>` dan tidak berubah menjadi manusia realistis.
- Wajah kedua karakter tidak bercampur; outfit dan proporsi tetap konsisten.
- Jari, pegangan, dan jumlah sendok stabil; sendok tidak berpindah pemilik.
- Kontak sendok berhenti di bibir, bukan menembus wajah atau pipi.
- Suapan berpindah saat diterima; sendok kembali kosong sesudahnya.
- Gerakan terjadi bergantian sesuai urutan, bukan serentak.
- Meja, piring, cangkir, dan pencahayaan tidak berpindah atau berubah mendadak.
- Cafe tetap fotorealistis, sementara Nahida mempertahankan gaya game.

## Iterasi Berikutnya

| Varian | Satu perubahan yang diuji |
|--------|--------------------------|
| Usulan v1 - satu arah | Hanya orang asli menyuapi Nahida; uji bila dua giliran belum stabil. |
| Usulan v1 - tanpa musik | Set `non_diegetic_music: N/A` untuk mengevaluasi ambience. |
| Usulan v1 - vertikal | Ubah ke 9:16 dan rapatkan komposisi; pastikan wajah serta kedua tangan tetap masuk frame. |
| Usulan v1 - first frame | Siapkan gambar komposit dua karakter di cafe, lalu adaptasi ke FL2VA/I2VA jika penempatan subjek dari referensi terpisah belum stabil. |

## Log Pengujian

| Run | Seed | Pengaturan aktual | Hasil | Perubahan berikutnya |
|-----|------|-------------------|-------|----------------------|
| v1 | - | Draft 10 detik | Belum diuji | - |
| v2, laporan pengguna 2026-09-08 | Belum diberikan | Durasi 15 detik; pengaturan lain belum dikonfirmasi ulang | Working menurut pengguna | Catat seed, pengaturan aktual lainnya, dan observasi detik 10-15 |
