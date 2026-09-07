# MiniMax H3 — Full-Reference Mode Rewrite Output Format Guide

> Source: official `H3_guide_ref_en.md` from MiniMax-H3 HF repo. Untuk Ref2VA (swap/motion/manhwa/POV).

## 1. Overall Structure — 6 Sections

| Order | Section | Purpose |
|-------|---------|---------|
| 1 | `subject_definitions:` | Defines referenced content & labels |
| 2 | `summary:` | Task type + main reference relationships |
| 3 | `retention_analysis:` | How each reference is preserved/reused |
| 4 | `detailed_description:` | Visuals, actions, shots, dialog in playback order |
| 5 | `overall_soundscape:` | Ambience + physical sounds |
| 6 | `non_diegetic_music:` | Background music (audience only) |

## 2. Reference Labels

| Label | Meaning |
|-------|---------|
| `<Subject N>` | Visible content abstracted from references |
| `<Picture N>` | Reference image (keyframe/storyboard) |
| `<Video N>` | Reference video (editing source/continuation/temporal structure) |
| `<Audio N>` | Audio signal (copied or referenced) |

Labels keep same meaning across all 6 sections.

## 3. `summary` Task Types

| Type | When |
|------|------|
| `keyframe completion` | Image serves as first/last/keyframe anchor |
| `reference generation` | Asset provides guidance (not concrete frame) |
| `video editing` | Source video is directly modified |
| `video continuation` | New content continues from source video |
| `audio reuse` | Same audio signal reused |
| `audio reference` | Style/timbre/beat referenced, not copied |

Combine with ` + `: `[video editing + audio reuse]`

## 4. Retention Status Values

- `fully_preserved` — character/appearance retained exactly
- `fully_copy` — audio signal copied unchanged
- `fully_generated` — new content (dialog, motion) generated fresh
- `transferred` — motion/pose transferred from one subject to another
- `partially_preserved` — some elements kept, some changed

## 5. Key Rules (from eikei-plan trial-error)

- **HINDARI** negative instructions >3x → bikin model bingung
- Gunakan **positive framing**: "The background is from <Video 1>" (max 2-3x)
- `ref_mode`: `match` untuk swap & motion (bukan `max`)
- Steps: **20** standar, 25 untuk animasi smoother
- Durasi output WAJIB ≤ durasi video source
- **Selalu baca gambar dari disk** sebelum buat prompt — jangan asumsi