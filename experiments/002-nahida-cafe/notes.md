# Experiment 002 - Real Human and Nahida at a Cafe

## Status

Draft template; belum digenerate atau diuji. Belum ada gambar referensi yang
disertakan atau diperiksa. Detail identitas mengikuti gambar input, bukan
asumsi tentang penampilan orang yang akan digunakan.

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
| v2 - satu arah | Hanya orang asli menyuapi Nahida; uji bila dua giliran belum stabil. |
| v3 - tanpa musik | Set `non_diegetic_music: N/A` untuk mengevaluasi ambience. |
| v4 - vertikal | Ubah ke 9:16 dan rapatkan komposisi; pastikan wajah serta kedua tangan tetap masuk frame. |
| v5 - first frame | Siapkan gambar komposit dua karakter di cafe, lalu adaptasi ke FL2VA/I2VA jika penempatan subjek dari referensi terpisah belum stabil. |

## Log Pengujian

| Run | Seed | Pengaturan aktual | Hasil | Perubahan berikutnya |
|-----|------|-------------------|-------|----------------------|
| Belum diuji | - | - | - | - |
