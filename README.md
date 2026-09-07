# Prompt-Eiken-H3 (プロンプト映像計画)

Prompt design & experimentation repository for **MiniMax H3** — T2V, FL2V, and R2V (swap/motion/manhwa/POV) prompt engineering.

> Murni prompt. No ComfyUI workflow, no model config.

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

Naming: `<mode>_<descriptor>_v<N>.md`