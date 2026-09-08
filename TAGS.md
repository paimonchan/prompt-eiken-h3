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

### Condition
- `@draft` — Belum di-test
- `@working` — Hasil oke
- `@failed` — Gagal, catat kenapa

### Subject / Scene
- `@nahida`, `@genshin-impact` - Nahida character interaction
- `@cafe`, `@sharing-food` - Cafe scene and taking turns sharing cake
- `@mixed-media`, `@two-characters` - Live-action person with a stylized character

## Experiments

- [002 - Nahida Cafe](experiments/002-nahida-cafe/ref2va_nahida_cafe_v1.md): `@ref2va`, `@motion`, `@nahida`, `@cafe`, `@mixed-media`, `@sharing-food`
- [002 v2 - Nahida Promenade (working)](experiments/002-nahida-cafe/ref2va_nahida_cafe_v2.md): `@ref2va`, `@nahida`, `@promenade`, `@front-facing`, `@multi-shot`, `@japanese-dialogue`, `@working`
