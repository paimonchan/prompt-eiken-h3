# TAGS.md — Quick Cross-Reference

Tag system untuk nyari prompt cepat via grep.

## Tags aktif

### Mode
- `@t2va` — Text-only prompts
- `@fl2va` — First+last frame image prompts
- `@ref2va` — All reference generation
- `@swap` — Character swap
- `@motion` — Motion transfer
- `@manhwa` — Manhwa dance
- `@pov` — First-person POV

### Teknik
- `@cinematic` — Cinematic/film-like
- `@anime` — Anime style
- `@live-action` — Live action style
- `@single-shot` — Continuous single shot
- `@multi-shot` — Multiple shots/cuts
- `@japanese-dialogue` — `<d>[Japanese] ...</d>`
- `@english-dialogue` — `<d>[English] ...</d>`
- `@non-verbal` — No dialogue, gesture only
- `@turbo` — Turbo LoRA variant
- `@multi-ref` — Banyak reference images (identity lock)
- `@keyframe-completion` — Pakai frame akhir clip sebelumnya sebagai anchor
- `@cooking` — Cooking / food theme
- `@vertical` — 9:16 portrait (TikTok/Reels/Shorts)
- `@landscape` — 16:9 widescreen (sinematik)
- `@loop` — Designed buat seamless loop
- `@battle` — Pertarungan / combat choreography
- `@sakuga` — High-end animation choreography (micro-shot, impact frame, slow-mo terkontrol)
- `@singularity` — Digenerate pakai model Singularity (bukan fp8 standar)
- `@viggle` — Viggle-Animate (motion transfer dari driving video, H3 ref2va weights + LoRA viggle)
- `@repaint` — Repaint frame (still GPT Image yang jadi reference image Viggle)
- `@gpt-image` — Prompt-nya dijalankan di GPT Image, bukan text encoder H3
- `@motion-transfer` — Ambil gerak dari video sumber
- `@video-to-video` — Sumber berupa video, bukan gambar tunggal

### Condition
- `@draft` — Belum di-test
- `@working` — Hasil oke
- `@failed` — Gagal, catat kenapa

### Subject / Scene
- `@nahida`, `@genshin-impact` - Nahida character interaction
- `@cafe`, `@sharing-food` - Cafe scene and taking turns sharing cake
- `@mixed-media`, `@two-characters` - Live-action person with a stylized character
- `@delia` - Delia, karakter anime manor (mantan MV, dipakai ulang di POV cooking)
- `@denise` - Denise, counter fighter water/ice, lawan Delia di Battle Tide v3
- `@battle-tidev3` - Seri Battle Tide v3 (3 klip x 15s, Delia vs Denise)
- `@saki`, `@yonari` - Karakter dalam pipeline Viggle

## Experiments

- [002 - Nahida Cafe](experiments/002-nahida-cafe/ref2va_nahida_cafe_v1.md): `@ref2va`, `@motion`, `@nahida`, `@cafe`, `@mixed-media`, `@sharing-food`
- [002 v2 - Nahida Promenade (working)](experiments/002-nahida-cafe/ref2va_nahida_cafe_v2.md): `@ref2va`, `@nahida`, `@promenade`, `@front-facing`, `@multi-shot`, `@japanese-dialogue`, `@working`

## Library

- [Delia Cook — POV Cooking 15s (working)](library/ref2va/pov/delia_cook_15s/prompt.md): `@ref2va`, `@pov`, `@cooking`, `@multi-ref`, `@turbo`, `@non-verbal`, `@anime`, `@vertical`, `@delia`, `@working`
- [Delia Serve — POV Serve & Eat 15s (working)](library/ref2va/pov/delia_serve_15s/prompt.md): `@ref2va`, `@pov`, `@cooking`, `@multi-ref`, `@keyframe-completion`, `@turbo`, `@non-verbal`, `@anime`, `@vertical`, `@delia`, `@working`
- [Battle Tide v3 — Part 1: First Contact (working)](library/ref2va/battle/delia_vs_denise_tidev3/part1_first_contact/prompt.md): `@ref2va`, `@battle`, `@battle-tidev3`, `@sakuga`, `@multi-ref`, `@singularity`, `@non-verbal`, `@anime`, `@landscape`, `@delia`, `@denise`, `@working`
- [Battle Tide v3 — Part 2: The Arena Becomes a Weapon (working)](library/ref2va/battle/delia_vs_denise_tidev3/part2_arena_weapon/prompt.md): `@ref2va`, `@battle`, `@battle-tidev3`, `@sakuga`, `@multi-ref`, `@singularity`, `@non-verbal`, `@anime`, `@landscape`, `@delia`, `@denise`, `@working`
- [Battle Tide v3 — Part 3: Phoenix and Leviathan (working)](library/ref2va/battle/delia_vs_denise_tidev3/part3_phoenix_leviathan/prompt.md): `@ref2va`, `@battle`, `@battle-tidev3`, `@sakuga`, `@multi-ref`, `@singularity`, `@non-verbal`, `@anime`, `@landscape`, `@delia`, `@denise`, `@working`
- [Viggle — Generic Repaint Frame Template (PROMPT A/B/C)](library/ref2va/viggle/generic_repaint_frame/prompt.md): `@viggle`, `@repaint`, `@gpt-image`, `@template`, `@motion-transfer`, `@working`
- [Viggle — Repaint: Delia](library/ref2va/viggle/repaint_delia_vrm/prompt.md): `@viggle`, `@repaint`, `@gpt-image`, `@delia`, `@working`
- [Viggle — Repaint: Denise](library/ref2va/viggle/repaint_denise_vrm/prompt.md): `@viggle`, `@repaint`, `@gpt-image`, `@denise`, `@working`
- [Viggle — Repaint: Yonari](library/ref2va/viggle/repaint_yonari_vrm/prompt.md): `@viggle`, `@repaint`, `@gpt-image`, `@yonari`, `@working`
- [Viggle — Repaint: Saki](library/ref2va/viggle/repaint_saki_vrm/prompt.md): `@viggle`, `@repaint`, `@gpt-image`, `@saki`, `@working`
- [Viggle — Repaint: Saki live-action dance](library/ref2va/viggle/repaint_saki_liveaction_dance/prompt.md): `@viggle`, `@repaint`, `@gpt-image`, `@saki`, `@live-action`, `@working`
- [Viggle — Sheet + panel muka & tangan (Saki)](library/ref2va/viggle/sheet_plus_face_hand_saki/prompt.md): `@viggle`, `@repaint`, `@gpt-image`, `@saki`, `@experiment`

## Grep recipes

```bash
# Semua prompt POV yang udah working
grep -rl "status: working" library/ref2va/pov/

# Semua prompt vertical (short-form)
grep -rl "vertical" library/ --include=*.md

# Semua yang pakai multi-ref
grep -rl "multi-ref" library/ --include=*.md
```
