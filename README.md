# Prompt-Eiken-H3 (プロンプト映像計画)

Prompt design & experimentation repository for **MiniMax H3** — T2V, FL2V (I2V), and R2V (swap/motion/manhwa/POV) prompt engineering.

> Repo ini **pure fokus ke prompt**. Tidak ada ComfyUI workflow, tidak ada model config. Cuma prompt structure, experiment, dan teknik penulisan.

## Structure

```
prompt-eiken-h3/
├── guides/          ← Official prompt rules dari MiniMax + trial-error
│   ├── prompt-writing-guide-base.md   ← T2VA/I2VA/FL2VA/L2VA
│   └── prompt-writing-guide-ref.md    ← Ref2VA (6-section format)
├── templates/       ← Skeleton prompt per mode, tinggal isi
├── t2va/            ← Text-to-Video-Audio prompts
├── fl2va/           ← First/Last-Frame-to-Video-Audio prompts
├── ref2va/
│   ├── swap/        ← Character swap (bg from video)
│   ├── motion/      ← Motion transfer (bg from image)
│   ├── manhwa/      ← Manhwa dance (motion from audio)
│   └── pov/         ← First-person interaction
├── TAGS.md          ← Tag index for cross-reference
└── CHANGELOG.md     ← Kronologi perubahan teknik/format
```

## File Format

Setiap prompt adalah `.md` dengan YAML frontmatter:

```yaml
---
title: "Experiment title"
mode: t2va        # t2va | i2va | fl2va | ref2va
type: swap        # ref2va only
ver: 1
date: 2026-09-07
seed: 42
steps: 20
duration: 5
ratio: "16:9"
resolution: "2K"
tags: [cinematic, character, japanese-dialogue]
---
```

Naming: `<mode>_<descriptor>_v<N>.md`

## Quick Links

| Mode | Template | Guide |
|------|----------|-------|
| T2VA | `templates/t2va.md` | `guides/prompt-writing-guide-base.md` |
| FL2VA | `templates/fl2va.md` | `guides/prompt-writing-guide-base.md` |
| Ref2VA Swap | `templates/ref2va_swap.md` | `guides/prompt-writing-guide-ref.md` |
| Ref2VA Motion | `templates/ref2va_motion.md` | `guides/prompt-writing-guide-ref.md` |
| Ref2VA Manhwa | `templates/ref2va_manhwa.md` | `guides/prompt-writing-guide-ref.md` |
| Ref2VA POV | `templates/ref2va_pov.md` | `guides/prompt-writing-guide-ref.md` |