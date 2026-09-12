# Delia Cook - POV Cooking Clip

**Status:** working - divalidasi di `eikei-plan`, part 1 dari seri POV cooking.

## Ringkas

- Genre baru: **POV masak** - kamera = mata penonton berdiri di depan counter dapur,
  dan `<Subject 1>` memasak *untuk* penonton.
- Ref2VA **multi-ref 6 gambar** tanpa scene anchor; dapur dibangun penuh dari teks
  lewat tag `[reference generation]`.
- 8 shot / 7 cut @ 1.875s = 15.08s, 544x960 (9:16), 24fps.
- **100% non-verbal**: tanpa dialog sama sekali, cuma suara non-verbal halus.
  Ini yang bikin risiko lip-sync = nol.
- Audio: soundscape dapur (chop/sizzle/flambe) + waltz kamar (`non_diegetic_music`).

## Identitas

`<Subject 1>` dikunci lewat `<Picture 1>`-`<Picture 6>`; tiap gambar memetakan
bagian tubuh/atribut spesifik. Lihat `reference/delia_character_ref.md` untuk
blok `subject_definitions` yang bisa dipakai ulang.

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

## Refs

| Tag | File |
|---|---|
| `<Picture 1>` | `delia_ref_01_fullbody.png` |
| `<Picture 2>` | `delia_ref_02_posed.png` |
| `<Picture 3>` | `delia_ref_03_face.png` |
| `<Picture 4>` | `delia_ref_04_eyes.png` |
| `<Picture 5>` | `delia_ref_05_back.png` |
| `<Picture 6>` | `delia_ref_06_outfit.png` |

## Risiko / pelajaran

R2V text-driven bisa freeze lalu snap/jitter. Kalau kena: test murah dulu dengan
menurunkan `length` 362 -> 124 (5.2s). Untuk kualitas final 20-step, lepas LoRA
dan ganti sampler ke `res_multistep`.

## Sumber

- Workflow: `eikei-plan/custom/workflows/mv_15s/h3_r2v_pov_delia_cook_15s_turbo.json`
- Builder: `eikei-plan/custom/scripts/build_mv_delia_cook_01.py`
