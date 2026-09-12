# Delia Serve - POV Serve & Eat Clip

**Status:** working - divalidasi di `eikei-plan`, part 2 dari seri POV cooking.

## Ringkas

- Lanjutan langsung dari `library/ref2va/pov/delia_cook_15s/`.
- Ref2VA multi-ref **7 gambar**: 6 identitas (sama seperti part 1) + 1 anchor.
- `<Picture 7>` = `delia_mv/delia_part1_end.png` (1080x1904) - frame akhir part 1,
  jadi anchor **lunak** untuk framing/pose yang dituju `[Shot 1]` setelah opening
  transition.
- Tag summary beda dari part 1: `[keyframe completion + reference generation]`.

## Opening & closing

- **Opening:** fade in from black -> bloom api tungku + ember melayang ->
  cross-dissolve ke `<Picture 7>`.
- **Closing:** fade to black di akhir `[Shot 8]`.
- Guide 4.2 mengizinkan cross-dissolve/fade **bila diminta eksplisit** - makanya
  transisi ini ditulis eksplisit di prompt, bukan default.
- Setting pindah dari dapur hangat ke ruang makan berlilin.

## Audio

**FULL GENERATE** - ref audio part 1 dihapus karena H3 menyalinnya 1:1 (r ~ 0.95).
Waltz lanjut cuma dideskripsikan teks: *"newly performed in the same style as the
previous cooking clip"*.

## Konfigurasi workflow

| Param | Value |
|---|---|
| Model | `minimax_h3_ref2va_pruned_fp8_scaled.safetensors` |
| Text encoder | `qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors` |
| LoRA | `minimax_h3_turbo_v4_step600_ema.safetensors` (strength 1.0, low_vram) |
| Sampler | `euler` + `MiniMaxH3TurboSampler` |
| Scheduler | `simple`, 8 steps, denoise 1.0 |
| Resolution | 544x960 (9:16, 0.5 MP, multiple 32) |
| Length | 362 frames @ 24fps = 15.08s |
| ref_image_size | `match` |
| Seed | 688612808118544 |

## Post-process

1. SeedVR2 upscale ke 1080p (input 24fps)
2. RIFE 2x -> 48fps
3. Stitch dengan part 1: ffmpeg concat + audio crossfade ~150-300ms di join

## Sumber

- Workflow: `eikei-plan/custom/workflows/mv_15s/h3_r2v_pov_delia_serve_15s_turbo.json`
- Builder: `eikei-plan/custom/scripts/build_mv_delia_serve_01.py`
