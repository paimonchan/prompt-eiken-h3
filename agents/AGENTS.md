# Prompt-Eiken-H3 — AGENTS.md

> Prompt design & experimentation repository for MiniMax H3.
> T2V, FL2V (I2V), and R2V (swap/motion/manhwa/POV) prompt engineering.

## Structure

```
prompt-eiken-h3/
├── agents/            ← AI context files
├── experiments/       ← WORKSPACE: satu folder per experiment session
│   └── 001-<name>/
│       ├── prompt.md  ← prompt + YAML frontmatter
│       └── notes.md   ← observasi, hasil, diff
├── library/           ← Prompt yang udah settle, diarsip per mode
│   ├── t2va/
│   ├── fl2va/
│   └── ref2va/
│       ├── swap/
│       ├── motion/
│       ├── manhwa/
│       └── pov/
├── guides/            ← Official prompt rules
├── templates/         ← Skeleton prompt per mode
├── scripts/           ← Utility scripts
│   └── generate-index.py  ← Scan frontmatter → index.json
├── index.json         ← Auto-generated data source for web
├── TAGS.md            ← Cross-reference tag index
└── CHANGELOG.md       ← Kronologi perubahan teknik/format
```

## Workflow

```
experiments/ → iterate → kalau udah mateng → copy ke library/
```

## File Convention

Setiap prompt `.md` wajib YAML frontmatter:

```yaml
---
title: ""
mode: t2va       # t2va | i2va | fl2va | ref2va
type:            # ref2va only: swap | motion | manhwa | pov
ver: 1
date: 2026-09-07
status: draft    # draft | tested | working | failed
seed: null
steps: 20
duration: 5
ratio: "9:16"
resolution: "2K"
tags: []
---
```

Naming: `<mode>_<descriptor>_v<N>.md`

## Prompt Modes

- **T2VA** — text-only, 3 fields: integrated_multimodal_description, overall_soundscape, non_diegetic_music
- **I2VA/FL2VA/L2VA** — 1-2 images + text + alignment instruction, 3 fields
- **Ref2VA** — 6 sections: subject_definitions, summary, retention_analysis, detailed_description, overall_soundscape, non_diegetic_music

## Key Rules

- `overall_soundscape` = ambience ONLY. Dialog via `<d>[Language] text</d>` in detailed_description
- `non_diegetic_music` = instrumentation + dynamics, NOT mood words
- Anti-jitter: "One single continuous unbroken take — no cuts, no scene changes"
- Negative >3x → bingung. Positive framing max 2-3x
- FL2VA: single shot dominant. Multiple shots trigger background changes
- Speaker ID (S1) stable across shots, delivery outside `<d>`

## Maintain index.json

Setelah nambah/edit prompt, jalanin:
```bash
python scripts/generate-index.py
```

## Web

`index.json` adalah single source of truth buat GitHub Pages / web terpisah.
Web cukup fetch `index.json` → render list + detail page.