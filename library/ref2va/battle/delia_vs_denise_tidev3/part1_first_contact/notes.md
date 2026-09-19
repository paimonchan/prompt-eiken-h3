# Battle Tide v3 - Part 1: First Contact (Delia vs Denise)

**Status:** working - dilaporkan jalan; bagian dari seri **Battle Tide v3** (3 klip x 15s = 45s).

## Ringkas

Klip 1 dari 3. Standoff 18 meter di plaza reruntuhan saat golden hour; droplet tertahan + flame kecil, fire lance 2 meter dilempar seperti javelin dan dibelokkan ribbon air dalam slow-mo, pilar hancur di impact frame, Delia menerobos steam-nya sendiri jadi kombinasi ember-gauntlet, ice-step glide lolos dari tumit, water trap 3 ribbon yang menyeret Delia — ditutup cut to white saat Delia meledak radial dan terlempar ke udara.

- **Micro-shot:** 14 shot — 0–1.5 Establishing / 1.5–2.1 Denise Water Cue / 2.1–3.5 Ignis Lance / 3.5–4.5 Projectile Chase / 4.5–5.7 Aqua Veil / 5.7–6.4 Pillar Impact / 6.4–7.1 Delia Enters Steam / 7.1–9.0 Melee Combination / 9.0–10.0 Frost Step Slow-Mo / 10.0–10.8 Separation / 10.8–12.0 Riptide Whip / 12.0–13.0 Ankle Catch / 13.0–14.0 Swing / 14.0–15.1 Cinder Burst Escape
- **Transisi:** opening fade-in ¼ detik, penutup cut to white
- **Zone klip ini:** Part one stays on the open plaza of <Picture 6> — cracked circular flagstones, broken columns, the fallen statue and red sun banners, shallow rain pools between the stones — the arena still largely intact, and the fight never leaves it.
- 100% non-verbal — tanpa dialog; cuma effort/breath non-verbal.

## Konfigurasi workflow

| Param | Value |
|---|---|
| Model | `Minimax-h3_Singularity_ref2va_Pruned_v1.3_int8.safetensors` |
| Text encoder | `qwen3vl_32b_minimax_h3_nvfp4_awq.safetensors` |
| LoRA | `minimax_h3_turbo_v4_step600_ema.safetensors` (strength 1.0, low_vram) |
| Sampler | `euler` + `MiniMaxH3TurboSampler` |
| Scheduler | `beta`, 8 steps, denoise 1.0 |
| Resolution | 960x544 (16:9, 0.5 MP, multiple 32) |
| Length | 362 frames @ 24fps = 15.08s |
| ref_image_size | `match` |
| Seed | randomize (`RandomNoise` terisi 688612808118544 tapi control_mode = `randomize`) |
| Audio ref | tidak ada (audio full-generate) |

## Refs (9 gambar)

| Tag | File | Isi |
|---|---|---|
| `<Picture 1>` | `delia_mv/refs/delia_ref_01_fullbody.png` | Delia fullbody |
| `<Picture 2>` | `delia_mv/refs/delia_ref_03_face.png` | Delia face |
| `<Picture 3>` | `delia_mv/refs/delia_ref_04_eyes.png` | Delia eyes |
| `<Picture 4>` | `delia_mv/denise_refs/denise_ref_01_fullbody.png` | Denise fullbody |
| `<Picture 5>` | `delia_mv/denise_refs/denise_ref_02_face.png` | Denise face |
| `<Picture 6>` | `delia_mv/arena_anchors/arena_anchor_01_ruins_wide.png` | arena plaza wide (battlefield aktif) |
| `<Picture 7>` | `delia_mv/arena_anchors/arena_anchor_04_hall.png` | colonnade hall (continuity only) |
| `<Picture 8>` | `delia_mv/arena_anchors/arena_anchor_03_bridge.png` | gorge bridge (continuity only) |
| `<Picture 9>` | `delia_mv/arena_anchors/arena_anchor_05_waterfall.png` | waterfall terrace (continuity only) |

Blok `subject_definitions` lengkap ada di `reference/delia_vs_denise_tidev3_series.md`.
Yang beda antar part **hanya** kalimat zone di `<Subject 3>`.

## Fix dari review

- fade jadi ¼ detik; shot 2 fokus Denise saja (flame Delia pindah ke shot 3)
- shot 3 camera "short reactive push" saat step
- slow-mo hanya di shot 9 (shot 8 eksplisit full speed)
- impact frame cuma 1 putih + 1 hitam
- whip high → torso → low-behind dibuat jelas urutannya
- swing rendah + destinasi "shattered stone wall" (biar kontak telapak masuk akal)
- shot 14 = 3 sub-beat (palm → ECU mata → burst) tanpa zoom-in terpisah
- hair boleh bergerak natural (bukan dipaksa "perfectly straight")
- constraint: traveling strike hanya untuk ofensif; movement/defensive boleh ke terrain

## Risiko

- 11-15 shot per 15 detik = cut rata-rata ~1.0-1.4s; kalau hero beat nggak terbaca, itu batas density yang perlu turun.
- Test murah dulu: `length` 362 → 124 (5.2s) sebelum render penuh.
- Scheduler di sini `beta` (bukan `simple`) — untuk prompt reference-heavy, `beta`/`normal` biasanya lebih baik dari `simple`.

## Post-process

SeedVR2 upscale → RIFE 2x (48fps) → concat 3 part (ffmpeg).

## Sumber

- Workflow: `eikei-plan/custom/workflows/mv_15s/complete/h3_r2v_tidev3_delia_01_15s_turbo_singularity_spec.json`
- Builder: `eikei-plan/custom/scripts/build_mv_delia_tidev3_01.py`
- Script asal (narasi + craft rules): `eikei-plan/scripts/delia_vs_denise_v3.txt` (25.087 char)
