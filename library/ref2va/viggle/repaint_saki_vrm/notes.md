# Viggle - Repaint Frame: Saki

**Status:** working.

## Ini prompt buat apa

Dijalankan di **GPT Image** (bukan text encoder H3) untuk membuat satu still repaint
dari frame driving; still itu jadi reference image (`LoadImage`) di template Viggle-Animate.

```
[GPT Image — repaint frame] Input: (1) frame driving (repaint_src_*.png), (2) sheet Saki (saki_02_sheet.png).
Simpan hasil sebagai: E:\AI\ComfyUI\input\saki_02\saki_02_repaint_01.png (kalau bukan 720x1280, rescale dulu).
```

## Tips

- Tangan ikut berubah / jadi glove: tambah "the hand is a bare human hand with green nail polish, never a glove; do not repaint the hand".
- Ke-reframe/zoom: tambah "do not crop or zoom; output must have the same framing as image 1".

## Catatan

- Ini resep **resmi** dari README Saki. Varian sheet lain (02-06) belum diadopsi.
- Tangan foreground (jari di bibir + kuteks hijau) HARUS dipertahankan persis - jangan ikut diganti.
- Tujuan varian euler+4 titik: kurangi soft/blur artifact dari `er_sde` + 6 titik.

## Konfigurasi workflow

| Param | Value |
|---|---|
| Driving video | `saki_02/saki_02_hd_clean.mp4` (720x1280, watermark dibuang via delogo) |
| Resolution | 0.5 MP |
| Sigma | `euler` + 4 titik CustomSigmas (upstream baseline) - setelan run 00001 yang dinilai paling oke |
| Model | `minimax_h3_ref2va_viggle_pruned_int8_convrot.safetensors` |
| LoRA | `viggle_animate_dmd_lora_r64.safetensors` (strength 1) |
| Text cond | `fixed_embed_fwd_anyframe.safetensors` (tanpa text prompt) |
| Chunk | 124 frame, overlap 22, anchor `five_frame_anchor` |
| fps | 24 |
| Audio | model senyap -> mux audio driving saat save |

## Lihat juga

- Workflow: `eikei-plan/custom/workflows/mv_15s/ongoing/h3_r2v_viggle_saki_01_chunked_euler4.json (+ `..._rerender.json`)`
- Resep generik + troubleshooting GPT Image: `library/ref2va/viggle/generic_repaint_frame/notes.md`
