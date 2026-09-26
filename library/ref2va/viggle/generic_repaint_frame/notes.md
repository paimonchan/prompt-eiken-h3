# Viggle - Generic Repaint Frame Template

**Status:** working - resep ini yang terbukti (denise / delia / yonari).

## Ini prompt buat apa

Prompt ini **bukan** untuk text encoder H3. Dijalankan di **GPT Image** untuk membuat
satu still repaint dari frame driving video; still itu lalu jadi `LoadImage` (reference
frame) di template Viggle-Animate. Viggle menganimasikan driving video dengan identitas
dari still itu.

```
frame driving (3D/real)  +  sheet karakter
        -> GPT Image (prompt ini)  -> 1 still repaint
        -> LoadImage di template Viggle  -> output video
```

## Cara pakai (ringkas)

[TEMPLATE GENERIC - GPT Image repaint frame untuk Viggle-Animate (video sumber 3D/real -> karakter anime 2D)]
Resep ini yang sudah terbukti (denise/delia/yonari): frame driving + sheet karakter -> 1 still repaint
-> dipakai sebagai LoadImage di template Viggle.

CARA PAKAI (ringkas)
1. Simpan sheet karakter ke disk, lalu BUKA dan lihat gambarnya dulu (jangan asumsi dari nama folder).
2. Upload ke GPT Image: (1) frame dari klip driving, (2) sheet karakter.
3. Paste **PROMPT A** (zero-edit - desain diambil langsung dari sheet, tidak perlu ganti apa pun).
   Kalau hasilnya kurang akurat (detail hair/outfit tidak ikut), pakai **PROMPT B** dan isi manual.
4. Simpan hasil (resolusi bebas, makin tinggi makin bagus) dengan pola nama:
   E:\AI\ComfyUI\input\<video>\repaint\<nama>_repaint_<frame>.png
   (mis. input/denise_01/repaint/kira_repaint_5p8s.png)

PILIH FRAME (pilih 1, opsional 2 untuk A/B)
- Prioritas: frame yang MEMPERLIHATKAN area rawan leak - tangan (jari) dan/atau kaki.
  Contoh terbaik untuk klip denise_01: `repaint_src_5p8s_1080.png` (tangan ke atas, kaki terlihat
  penuh) dan `repaint_src_11p5s_1080.png` (jari terbuka).
- Hindari: wajah tertutup tangan, ada sticker (heart/XOX/centang), badan terpotong di area artefak.

## Troubleshooting GPT Image

--- TROUBLESHOOTING GPT IMAGE ---
- Kena guardrail "fraudulent or scam activity": pakai PROMPT C di **chat baru** (guardrail bisa nyangkut di
  thread lama), upload ulang 2 gambar, lalu retry. Hindari kata replace/swap/face.
- Masih diblok: rute tanpa image-edit - deskripsikan pose dari frame ke teks ("Draw an anime illustration
  of my original character from image 2 standing with both arms raised, in a room with ..."), hasil
  pose lebih longgar tapi tidak kena klasifikasi identity-edit.
- Alternatif: generate ulang pose pakai model T2I lokal (FLUX) dengan deskripsi pose + sheet sebagai
  referensi teks.

--- PENYESUAIAN (tergantung video sumber & desain) ---
- Sumber punya glove/arm cover hitam -> baris "hands are BARE skin..." WAJIB (biar tidak leak).
- Sumber punya stocking/thigh-high -> baris "legs are BARE..." wajib; KALAU desain karakternya sendiri
  pakai stocking, ganti jadi deskripsi miliknya: "her legs wear her own black thigh-high stockings" -
  model butuh acuan, bukan larangan.
- Karakter pria / pronoun lain: ganti "she/her" sesuai karakter.
- Nama karakter tidak wajib - "the anime character from image 2" sudah cukup.
- Background ikut berubah gaya: tambah "the room, wallpaper and floor stay exactly as in image 1 -
  do not illustrate the background".
- Pose berubah: tambah "keep the exact pose of the original character, including both arms and hands".
- Ada sticker di frame: pilih frame lain, atau bersihkan dulu di video sumbernya
  (contoh: custom/scripts/clean_green_check.py).

## Checklist hasil

--- CHECKLIST HASIL ---
- [ ] Pose/bingkai/kamera persis frame asli
- [ ] Tangan = kulit (tidak ada glove hitam sumber yang nyangkut), jari terbaca
- [ ] Kaki sesuai desain (tidak ada stocking/boot halusinasi dari sumber)
- [ ] Warna rambut & outfit = sheet (bukan karakter sumber)
- [ ] Tidak ada teks/watermark/sticker
- [ ] Simpan ke path yang benar + catat di changelog kalau dipakai untuk project

## Quick guide Chunked Sampler (dari template)

### Start
- Load driving video penuh di **24 fps**, pilih reference image.
- Mulai dari **124 chunk frames / 22 overlap frames**.
- Windowed Conditioning hitung chunk otomatis.
- Seed sampler **fixed**, `rerender_chunk = 0`.
- `RandomNoise` seed control **fixed** biar cache reusable.

### Progress & output
- Pantau `live_progress`: chunk sampling/cached -> final decoding -> completed.
- Sambung `chunk_map` ke Show Text buat laporan chunk lengkap.
- Sambung `frames` langsung ke Video Combine (sampler sudah decode).
- `save_output` ON di Video Combine.

### Retry satu chunk
- Set `rerender_chunk` ke nomornya: **1 = chunk pertama**, **0 = off**.
- Ganti `rerender_seed` buat take lain.
- Chunk itu + semua chunk sesudahnya regenerate (overlap-nya chained).
- Chunk sebelumnya reuse cache kalau cocok. Balikin ke 0 = kembali ke seed asli.

### Batas cache
- Cache **memory-only**, tanpa run folder / disk resume.
- Cancel bisa ninggalin chunk selesai yang masih reusable selama ComfyUI hidup, tapi tidak dijamin.
- Restart ComfyUI = cache hilang. Buat progres yang tahan restart: pakai **Loop workflow**.
- Save 24 fps, trim audio driving ke panjang final video. Overlap bantu continuity tapi tidak menjamin bebas deformasi/stutter.

## Catatan sigma

```
basic scheduler : 6-8 steps, simple / beta / normal / bong_tangent
manual sigmas   : 3 forwards = 4 titik (termasuk 0.0) | 5 = 6 titik | 7 = 8 titik
```

## Cara kerja Viggle (dari dokumentasi resmi)

- Referensi = **satu frame dari video itu sendiri**; jangan multi-panel/kekecilan
- Yang tidak terlihat di frame referensi tidak akan direproduksi konsisten
- Lip-sync lemah di close-up; adegan interaksi dekat (tangan orang lain) = kasus tersulit
- Kuasai apa yang **tidak boleh berubah**: pose, tangan, props, framing, background, lighting

Konsekuensi praktis: pilih frame driving yang **memperlihatkan area rawan leak** (tangan/jari, kaki).
Kalau area itu tidak ada di frame referensi, area itu bebas dihalusinasi model.

## Konfigurasi workflow Viggle

| Param | Value |
|---|---|
| Model | `minimax_h3_ref2va_viggle_pruned_int8_convrot.safetensors` |
| LoRA | `viggle_animate_dmd_lora_r64.safetensors` (strength 1) |
| Text cond | `fixed_embed_fwd_anyframe.safetensors` (`ViggleTextCondLoader` - tanpa text prompt) |
| Sampler | `euler` + `ViggleChunkedSampler` |
| Scheduler | `bong_tangent` 8 steps, atau `CustomSigmas` 4/6/8 titik (upstream) |
| Chunk | 124 frame, overlap 22, anchor `five_frame_anchor` |
| Attention | `BlockSparseAttention` sol-attn 1.3 / 0.2, 12288x256 |
| fps | 24 |
| Seed | `fixed` (wajib - biar cache chunk reusable) |
| Audio | model viggle senyap -> mux audio dari driving video saat save |

## Lihat juga

- Per-karakter: `library/ref2va/viggle/repaint_*`
- Workflow: `eikei-plan/custom/workflows/mv_15s/ongoing/h3_r2v_viggle_saki_01_chunked.json`
- README alur kerja: `eikei-plan/custom/prompts/saki_02_viggle/README.md`
