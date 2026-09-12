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
- `@loop` — Designed buat seamless loop

### Condition
- `@draft` — Belum di-test
- `@working` — Hasil oke
- `@failed` — Gagal, catat kenapa

### Subject / Scene
- `@nahida`, `@genshin-impact` - Nahida character interaction
- `@cafe`, `@sharing-food` - Cafe scene and taking turns sharing cake
- `@mixed-media`, `@two-characters` - Live-action person with a stylized character
- `@delia` - Delia, karakter anime manor (mantan MV, dipakai ulang di POV cooking)

## Experiments

- [002 - Nahida Cafe](experiments/002-nahida-cafe/ref2va_nahida_cafe_v1.md): `@ref2va`, `@motion`, `@nahida`, `@cafe`, `@mixed-media`, `@sharing-food`
- [002 v2 - Nahida Promenade (working)](experiments/002-nahida-cafe/ref2va_nahida_cafe_v2.md): `@ref2va`, `@nahida`, `@promenade`, `@front-facing`, `@multi-shot`, `@japanese-dialogue`, `@working`

## Library

- [Delia Cook — POV Cooking 15s (working)](library/ref2va/pov/delia_cook_15s/prompt.md): `@ref2va`, `@pov`, `@cooking`, `@multi-ref`, `@turbo`, `@non-verbal`, `@anime`, `@vertical`, `@delia`, `@working`
- [Delia Serve — POV Serve & Eat 15s (working)](library/ref2va/pov/delia_serve_15s/prompt.md): `@ref2va`, `@pov`, `@cooking`, `@multi-ref`, `@keyframe-completion`, `@turbo`, `@non-verbal`, `@anime`, `@vertical`, `@delia`, `@working`

## Grep recipes

```bash
# Semua prompt POV yang udah working
grep -rl "status: working" library/ref2va/pov/

# Semua prompt vertical (short-form)
grep -rl "vertical" library/ --include=*.md

# Semua yang pakai multi-ref
grep -rl "multi-ref" library/ --include=*.md
```
