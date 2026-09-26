# Viggle - Repaint Frame: Denise

**Status:** working.

## Ini prompt buat apa

Dijalankan di **GPT Image** (bukan text encoder H3) untuk membuat satu still repaint
dari frame driving; still itu jadi reference image (`LoadImage`) di template Viggle-Animate.

```
[GPT Image - repaint frame untuk DENISE (video VRM 3D -> karakter anime 2D)]
Input: (1) frame dari klip denise_01 (repaint_src_*.png), (2) sheet Denise (delia_denise_pose_01/denise_ref_sheet_01.png)
Simpan hasil: E:\AI\ComfyUI\input\denise_01\repaint\denise_repaint_5p8s.png (resolusi bebas; makin tinggi makin bagus)
(opsional kandidat kedua: repaint_src_11p5s_1080.png -> simpan denise_repaint_11p5s.png)
```

## Tips

- Frame terpilih = `repaint_src_5p8s` (tangan ke atas, kaki telanjang terlihat penuh) -> mematikan
  halusinasi stocking/boot di seluruh klip; tangan sumber = glove hitam, wajib jadi kulit.
- Frame `repaint_src_11p5s` (jari terbuka) = kandidat kedua kalau tangan masih ghost (uji lanjutan).
- Background ikut berubah gaya: tambah "the room, wallpaper and floor stay exactly as in image 1 - do not illustrate the background".
- Pose berubah: "keep the exact pose of the original character, including both arms and hands".
- Kalau ada sticker (heart/XOX) di frame: pilih frame lain, atau bersihkan dulu di video sumbernya.

## Catatan

- Kandidat frame repaint ada di `input/denise_01/repaint/` (4s / 6,5s / 11,5s).
- Video sumber punya sticker heart/`XOX` - kalau ikut muncul di output, bersihkan seperti centang hijau.
- Placeholder `LoadImage` sekarang masih `delia_denise_pose_01/denise_ref_sheet_01.png`; ganti ke hasil repaint.

## Konfigurasi workflow

| Param | Value |
|---|---|
| Driving video | `denise_01/denise_01.mp4` (360x640, 30fps, 12,7s = ~305 frame @24fps -> 3 window) |
| Resolution | 0.4 MP |
| Sigma | `euler` + 4 titik CustomSigmas (3 update, upstream) |
| Model | `minimax_h3_ref2va_viggle_pruned_int8_convrot.safetensors` |
| LoRA | `viggle_animate_dmd_lora_r64.safetensors` (strength 1) |
| Text cond | `fixed_embed_fwd_anyframe.safetensors` (tanpa text prompt) |
| Chunk | 124 frame, overlap 22, anchor `five_frame_anchor` |
| fps | 24 |
| Audio | model senyap -> mux audio driving saat save |

## Lihat juga

- Workflow: `eikei-plan/custom/workflows/mv_15s/ongoing/h3_r2v_viggle_denise_01_chunked_euler4.json`
- Resep generik + troubleshooting GPT Image: `library/ref2va/viggle/generic_repaint_frame/notes.md`
