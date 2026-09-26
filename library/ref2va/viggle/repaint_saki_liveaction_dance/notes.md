# Viggle - Repaint Frame: Saki (live-action dance)

**Status:** working.

## Ini prompt buat apa

Dijalankan di **GPT Image** (bukan text encoder H3) untuk membuat satu still repaint
dari frame driving; still itu jadi reference image (`LoadImage`) di template Viggle-Animate.

```
[GPT Image - repaint frame LIVE-ACTION dance -> karakter anime Saki]
Input: (1) frame dari klip dance (repaint_dance_*.png), (2) sheet Saki (saki_02_sheet.png).
Simpan hasil: E:\AI\ComfyUI\input\saki_02\saki_02_repaint_dance.png (resolusi bebas, lebih tinggi malah bagus)
```

## Tips

- Kalau background ikut jadi ilustrasi: tambah "the background stays a real photograph - no illustration, no repaint of the background".
- Kalau pose berubah: "keep the exact pose of the dancer, including both arms and both hands at the same positions as image 1".
- Kalau wajah terlalu kecil/kabur: repaint di frame yang lebih close-up (kandidat lain).

## Catatan

- Beda dari sumber VRM: background HARUS tetap foto asli, tidak boleh jadi ilustrasi.
- Karakter harus terlihat seperti anime 2D yang dikompositkan ke foto nyata (perspective, arah cahaya, contact shadow).
- Kalau background ikut jadi ilustrasi: tambah "the background stays a real photograph - no illustration, no repaint of the background".

## Konfigurasi workflow

| Param | Value |
|---|---|
| Driving video | klip dance live-action (`repaint_dance_*.png` sebagai kandidat frame) |
| Resolution | bebas (makin tinggi makin bagus) |
| Sigma | `euler` + 4 titik (varian upstream) |
| Model | `minimax_h3_ref2va_viggle_pruned_int8_convrot.safetensors` |
| LoRA | `viggle_animate_dmd_lora_r64.safetensors` (strength 1) |
| Text cond | `fixed_embed_fwd_anyframe.safetensors` (tanpa text prompt) |
| Chunk | 124 frame, overlap 22, anchor `five_frame_anchor` |
| fps | 24 |
| Audio | model senyap -> mux audio driving saat save |

## Lihat juga

- Workflow: `eikei-plan/custom/workflows/mv_15s/ongoing/h3_r2v_viggle_saki_01_chunked_euler4.json`
- Resep generik + troubleshooting GPT Image: `library/ref2va/viggle/generic_repaint_frame/notes.md`
