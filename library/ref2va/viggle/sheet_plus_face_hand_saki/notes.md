# Viggle - Repaint Frame: Saki (sheet + panel muka & tangan)

**Status:** working.

## Ini prompt buat apa

Dijalankan di **GPT Image** (bukan text encoder H3) untuk membuat satu still repaint
dari frame driving; still itu jadi reference image (`LoadImage`) di template Viggle-Animate.

```
[GPT Image — sheet + panel muka & tangan] Input: (1) sheet Saki (saki_02_sheet.png), (2) frame close-up + tangan (repaint_src_6p2s.png).
Simpan hasil sebagai: E:\AI\ComfyUI\input\saki_02\saki_02_sheet_hand_ai.png (kalau bukan 720x1280, rescale dulu).
Dipakai sebagai ref_image di template Viggle (LoadImage) - alternatif dari repaint frame murni.
```

## Tips

- Panel A malah jadi gloved hand: tegas "the hand is a bare human hand with green nail polish, never a glove".
- Hasil bukan 9:16 / panel A kekecilan: minta "PART A should fill the top 60% and stay large and sharp".

## Catatan

- Ini **alternatif** dari repaint frame murni: satu gambar berisi PART A (muka close-up dengan framing image 2) + PART B (design reference 3 view di atas putih).
- Dipakai sebagai `ref_image` di `LoadImage` template Viggle.
- Eksperimen: docs Viggle bilang referensi sebaiknya **satu frame**, bukan multi-panel - jadi ini belum tentu sekonsisten repaint frame tunggal.

## Konfigurasi workflow

| Param | Value |
|---|---|
| Driving video | `saki_02/saki_02_hd_clean.mp4` (720x1280) |
| Resolution | 0.5 MP |
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
