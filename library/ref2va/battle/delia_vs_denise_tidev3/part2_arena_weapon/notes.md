# Battle Tide v3 - Part 2: The Arena Becomes a Weapon (Delia vs Denise)

**Status:** working - dilaporkan jalan; bagian dari seri **Battle Tide v3** (3 klip x 15s = 45s).

## Ringkas

Klip 2 dari 3. Lanjut langsung dari Cinder Burst part 1: Delia menyerang dari atas, Denise selamat dari barrage api lalu mengubah sisa-sisanya jadi steam dan ice ambush; Delia memakai es Denise sendiri sebagai ramp peluncur dan kabur vertikal; Denise langsung mengejar di spiral air yang naik. Arena berubah jadi senjata.

- **Micro-shot:** 11 shot — 0–2.0 Scarlet Bloom / 2.0–3.4 Barrage Glide / 3.4–4.8 Ice Plate Block / 4.8–6.2 Aerial Near-Miss / 6.2–7.9 Glacial Sanctum / 7.9–9.3 Vapor Explosion / 9.3–10.7 POV Warning / 10.7–12.3 Frostbite Garden / 12.3–13.6 Ice Spear Ramp / 13.6–14.35 Phoenix Ascension / 14.35–15.1 Tidal Pursuit
- **Transisi:** hard cut, penutup cut langsung ke Part 3
- **Zone klip ini:** Part two stays on the same plaza of <Picture 6>, now littered with shattered ice crystals, scorch marks and drifting steam; the action rises vertically above the colonnade into the open golden sky — the fight never leaves the ruin.
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

- glyph → "compact flower-shaped masses of fire, curling flame" (bukan rune/magic-circle) + release ke arah Denise
- spiral diperjelas: ember yang turun
- hair: "ends of her straight hair lifting sharply in the heat wake"
- Glacial Sanctum = 3 layer konsentris × 6 plate (outer shatter / middle melt / inner hold) + shake bertingkat (subtle → one strong)
- "ember gauntlets" → "residual flames around her forearms"
- POV = head movement (gaze dips), bukan camera push
- Frostbite = 2 near-miss + chain pursuit + "predicts her next step half a beat ahead"
- shot 9/10 di-split (ramp + wing ignition → wings penuh di steam layer)
- ending = Denise naik Tidal Spiral, tanpa tableau extreme-wide (continuity langsung ke Crystal Rain part 3)

## Risiko

- 11-15 shot per 15 detik = cut rata-rata ~1.0-1.4s; kalau hero beat nggak terbaca, itu batas density yang perlu turun.
- Test murah dulu: `length` 362 → 124 (5.2s) sebelum render penuh.
- Scheduler di sini `beta` (bukan `simple`) — untuk prompt reference-heavy, `beta`/`normal` biasanya lebih baik dari `simple`.

## Post-process

SeedVR2 upscale → RIFE 2x (48fps) → concat 3 part (ffmpeg).

## Sumber

- Workflow: `eikei-plan/custom/workflows/mv_15s/complete/h3_r2v_tidev3_delia_02_15s_turbo_singularity_spec.json`
- Builder: `eikei-plan/custom/scripts/build_mv_delia_tidev3_01.py`
- Script asal (narasi + craft rules): `eikei-plan/scripts/delia_vs_denise_v3.txt` (25.087 char)
