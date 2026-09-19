# CHANGELOG.md

## 2026-09-19 — Battle Tide v3 (3 part) masuk library

- Tambah `library/ref2va/battle/delia_vs_denise_tidev3/` — seri battle 3 klip x 15s
  (45s), Ref2VA multi-ref 9 gambar, 960x544 landscape, model Singularity v1.3 int8
  + scheduler `beta` (status: working)
  - `part1_first_contact/` — 14 micro-shot, fade-in ¼s + cut to white
  - `part2_arena_weapon/` — 11 micro-shot, hard cut
  - `part3_phoenix_leviathan/` — 15 micro-shot, hard cut to black
- Tambah `reference/delia_vs_denise_tidev3_series.md` — blok `subject_definitions`
  bersama (Delia + Denise + battlefield), craft rules/STYLE, constraints, ref map,
  tabel zone per part
- `type: battle` baru di `library/ref2va/` — kategori baru di luar swap/motion/manhwa/pov
- `TAGS.md` — tag `@battle`, `@sakuga`, `@singularity`, `@landscape`, `@denise`,
  `@battle-tidev3` + section Library
- Koreksi akurasi: `seed` di `delia_cook_15s` & `delia_serve_15s` diubah jadi `null`
  (nilai 688612808118544 itu default widget, `control_mode` = `randomize`)

## 2026-09-12 — Import validated POV prompts dari eikei-plan

- Tambah `library/ref2va/pov/delia_cook_15s/` — POV cooking, Ref2VA multi-ref 6 gambar,
  8 shot 15.08s vertical, 100% non-verbal (status: working)
- Tambah `library/ref2va/pov/delia_serve_15s/` — part 2, Ref2VA 7 ref
  (6 identitas + `<Picture 7>` end-frame anchor), opening fade + closing fade (status: working)
- Tambah `reference/delia_character_ref.md` — blok `subject_definitions` Delia yang bisa
  dipakai ulang; folder `reference/` sengaja di luar tree yang di-scan web
- `library/` sekarang pakai **folder per prompt** (`prompt.md` + `notes.md`) supaya
  `notes.md` bisa dibaca per prompt oleh `scripts/generate-index.py`
- `README.md` — diagram struktur + aturan isi file prompt (mentah, tanpa pagar kode)
- `TAGS.md` — tag `@multi-ref`, `@keyframe-completion`, `@cooking`, `@vertical`, `@loop`,
  section `## Library`, grep recipes

## 2026-09-08 — Web catalog + eksperimen Nahida

- Vite + GitHub Pages: katalog prompt dengan pencarian isi prompt/notes, filter
  mode/status/tag, favorit lokal, detail per section, salin, unduh Markdown
- `scripts/generate-index.py` di-rewrite: PyYAML, emit `content` + `notes` + `resources`,
  watch mode; `index.json` jadi satu-satunya sumber data situs
- `src/` (catalog, dropdown, main, style), `tests/` (catalog, index, browser),
  `.github/workflows/pages.yml`
- Tambah `experiments/002-nahida-cafe/` — v1 draft, v2 working (promenade + dialog Jepang, 15s)

## 2026-09-07 — Initial structure

- Create repo `prompt-eiken-h3`
- Add experiments/ as workspace, library/ as archive per mode
- Add guides (base + ref), templates (6 modes), TAGS.md
- Add `scripts/generate-index.py` + `index.json` (auto-generated, buat web)
- Add `AGENTS.md` (root), `cspell.json`
