# Prompt-Eiken-H3 (プロンプト映像計画)

Prompt design & experimentation repository for **MiniMax H3** — T2V, FL2V, and R2V (swap/motion/manhwa/POV) prompt engineering.

> Murni prompt. No ComfyUI workflow, no model config.

## Website

Katalog web mencakup pencarian isi prompt dan catatan, filter mode/status/tag,
favorit lokal, detail per bagian, salin prompt, unduh Markdown, dan panduan.
Tema terang/gelap serta favorit tersimpan di browser. Filter dan detail menggunakan
URL hash sehingga tautan bisa dibagikan tanpa konfigurasi routing server.

### Development

```bash
python -m pip install -r requirements.txt
npm install
python scripts/generate-index.py
npm run dev
```

Jalankan `python scripts/generate-index.py --watch` di terminal lain ketika
mengedit prompt. Refresh halaman untuk membaca indeks terbaru.

```bash
npm test
python -m unittest discover -s tests -p "test_*.py"
npm run build
```

`index.json` adalah satu-satunya sumber data situs: metadata, isi prompt, catatan,
dan panduan. Template tetap tersedia di repository. Output produksi ada di `dist/`. Build menggunakan URL aset
relatif agar mendukung GitHub Pages di subpath repository.

### GitHub Pages

Di repository GitHub, buka **Settings > Pages > Build and deployment > Source**
dan pilih **GitHub Actions**. Push ke branch `master` akan menjalankan workflow
`.github/workflows/pages.yml`: validasi, regenerasi indeks, build, dan deploy.
Alamat yang dituju: https://paimonchan.github.io/prompt-eiken-h3/.

Situs tidak memerlukan API key atau backend. Font DM Sans dan IBM Plex Mono
disertakan lokal melalui Fontsource; foto clapperboard dekoratif dari
[Unsplash](https://images.unsplash.com/photo-1485846234645-a62644f84728) juga disimpan lokal.
Isi prompt tetap dari repository.

Pengujian browser lokal: jalankan dev server, lalu `node tests/browser.mjs`.
Pengujian ini memakai Microsoft Edge melalui Playwright dan menyimpan screenshot
desktop/mobile di `test-results/`.

## Structure

```
prompt-eiken-h3/
├── experiments/     ← ✨ WORKSPACE: satu folder per experiment session
│   └── 001-<deskripsi>/
│       ├── prompt.md       ← prompt + YAML frontmatter
│       ├── notes.md        ← observasi, hasil, diff antar versi
│       └── ref/            ← reference files kalo ada
├── library/         ← 📚 Prompt yang udah settle, diarsip per mode
│   ├── t2va/
│   ├── fl2va/
│   └── ref2va/
│       ├── swap/
│       ├── motion/
│       ├── manhwa/
│       └── pov/
│           └── <nama-prompt>/
│               ├── prompt.md   ← prompt mentah + frontmatter
│               └── notes.md    ← konteks, konfigurasi, sumber
├── reference/       ← Blok identitas/subject yang dipakai ulang (tidak masuk katalog web)
├── guides/          ← Official prompt rules
├── templates/       ← Skeleton prompt per mode
├── TAGS.md          ← Cross-reference tag index
└── CHANGELOG.md
```

## Workflow

```
Experiment → iterate di experiments/ 
  → kalau udah mateng → copy ke library/ dengan nama final
  → update TAGS.md
```

## File Format

```yaml
---
title: ""
mode: t2va       # t2va | i2va | fl2va | ref2va
type:           # ref2va only: swap | motion | manhwa | pov
ver: 1
date: 2026-09-07
status: draft   # draft | tested | working | failed
seed: 42
steps: 20
duration: 5
ratio: "16:9"
resolution: "2K"
tags: [cinematic, character]
---
```

Naming: `<mode>_<descriptor>_v<N>.md` (di dalam folder per prompt), atau `prompt.md`.

Isi file prompt = frontmatter + **prompt mentah** tanpa pagar kode atau basa-basi,
supaya `src/catalog.js` bisa memecahnya per section (`subject_definitions:`,
`summary:`, dst). Catatan/konteks ditaruh di `notes.md` sebagai sibling, bukan di
dalam file prompt.
