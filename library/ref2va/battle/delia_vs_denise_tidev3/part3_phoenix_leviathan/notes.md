# Battle Tide v3 - Part 3: Phoenix and Leviathan (Delia vs Denise)

**Status:** working - dilaporkan jalan; bagian dari seri **Battle Tide v3** (3 klip x 15s = 45s).

## Ringkas

Klip 3 dari 3. Jauh di atas arena, volley jarum es Denise disapu fire wings Delia; setelah face-off senyap keduanya memanifestasikan ultimate — leviathan air kolosal bertanduk es dan sirip kristal melawan phoenix raksasa bermahkota api putih-emas. Keduanya bertumbukan di tengah dan berakhir ledakan putih besar.

- **Micro-shot:** 15 shot — 0 / 1.3 / 2.7 / 3.5 / 4.3 / 5.1 / 5.8 / 7.1 / 8.4 / 9.1 / 10.1 / 11.4 / 12.1 / 13.1 / 14.2 (window per shot, bukan titik 'At')
- **Transisi:** buka langsung tanpa pause, penutup hard cut to black
- **Zone klip ini:** Part three stays on the same plaza of <Picture 6>, now split in two — one half glowing ember-red with burning stone, the other half sheeted in transparent blue ice with meltwater running through the cracks — under the open golden sky.
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

- grid timing dikoreksi presisi ke script; barrel roll pindah ke shot 2 (31–32.5s)
- STYLE_P3 = fluid & continuous + follow-through (larangan "never smooth" dihapus)
- adopsi spec Singularity (Prompt Writing Spec Enhanced): efek menerangi sekitar (fire warm, water/ice cyan, detonasi mengganti cahaya shot), acting observasional (napas/bahu), kontinuitas luka (goresan pipi tetap ada di shot 8), camera chain lengkap (amplitude + speed di semua shot)
- penutup: beat slow-mo di melee — clash pedang 1/3 speed + hard ramp; cross penutup 1/4 speed dengan sparks/embers/droplets suspended
- camera pass: staging flat ala fighting-game → kamera sinematis; STYLE_P3 axis "fixed" → "readable" + larangan side-scrolling/fighting-game/retro view; shot 5 low arc, 6 slow orbit, 10 arc shot, 11 swoop, 13 dive+spiral, 14 tight circle, 15 slow orbit final
- retime: density 12–15s dikurangi — melee 5 beat (bukan 9), cross tanpa garis es/api & head-turn, orbit 180° → arc 60–90°, shot 7/8 pakai prinsip shape → identity → scale
- constraint: crown bukan "ornament" + "traveling strike" bukan untuk movement/defensive

## Risiko

- 11-15 shot per 15 detik = cut rata-rata ~1.0-1.4s; kalau hero beat nggak terbaca, itu batas density yang perlu turun.
- Test murah dulu: `length` 362 → 124 (5.2s) sebelum render penuh.
- Scheduler di sini `beta` (bukan `simple`) — untuk prompt reference-heavy, `beta`/`normal` biasanya lebih baik dari `simple`.

## Post-process

SeedVR2 upscale → RIFE 2x (48fps) → concat 3 part (ffmpeg).

## Sumber

- Workflow: `eikei-plan/custom/workflows/mv_15s/complete/h3_r2v_tidev3_delia_03_15s_turbo_singularity_spec.json`
- Builder: `eikei-plan/custom/scripts/build_mv_delia_tidev3_01.py`
- Script asal (narasi + craft rules): `eikei-plan/scripts/delia_vs_denise_v3.txt` (25.087 char)
