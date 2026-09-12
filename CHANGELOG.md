# CHANGELOG.md

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
