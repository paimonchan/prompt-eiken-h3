# MiniMax H3 — Video Prompt Writing Guide (Base)

> Source: official `H3_guide_base_en.md` from MiniMax-H3 HF repo. Untuk T2VA / I2VA / FL2VA / L2VA.

## 1. Task Overview

| Mode | Description |
|------|-------------|
| **T2VA** | Complete audiovisual timeline from text |
| **I2VA** | T2VA body + first-frame instruction + forward development |
| **FL2VA** | T2VA body + first-and-last-frame instruction + continuous path |
| **L2VA** | T2VA body + last-frame instruction + converging path |

## 2. Final Prompt Structure

### Instruction Alignment

**T2VA**: No image-alignment instruction, langsung core fields.

**I2VA**:
```
For the target video, at 0.00 seconds into the target video, <Picture 1> (from [Shot 1]) is fully referenced.
```

**FL2VA**:
```
How the reference pictures align with the target video — Picture 1 (from Shot 1) aligns with the 0.00-second mark of the target video; Picture 2 (from Shot N) aligns with the S.SS-second mark of the target video.
```

**L2VA**:
```
How the reference pictures align with the target video — <Picture 1> (from [Shot N]) aligns with the S.SS-second mark of the target video.
```

### Three Core Fields

```
integrated_multimodal_description: [Shot 1] ...
(empty line)
overall_soundscape: ...
(empty line)
non_diegetic_music: ...
```

## 3. Shots & Cuts

- Shot 1: no timestamp
- Shot N+: `[Shot N] At 00:S.SS, the camera cuts to...`
- Cut verbs: `the camera cuts to`, `the shot cuts to/transitions to/changes to/switches to`
- Cross-dissolve/fade/wipe: only when explicitly requested

## 4. Camera Motion

Format: **Motion Type + Amplitude + Speed**

| Motion | Phrase |
|--------|--------|
| Zoom | `Zoom In / Zoom Out` |
| Push | `Push In / Pull Out` |
| Pan | `Pan Left / Pan Right` |
| Truck | `Truck Left / Truck Right` |
| Tilt | `Tilt Up / Tilt Down` |
| Pedestal | `Pedestal Up / Pedestal Down` |
| Arc | `Arc Shot` |
| Tracking | `Tracking Shot` |
| Static | `Static Shot` |
| Shake | `Shake Slightly / Shake Strongly` |
| POV | `POV` |
| Roll | `Roll Clockwise / Roll Counterclockwise` |

Write naturally within shot description, not as separate labels.

## 5. Dialogue Rules

- Speaker ID: `(S1)`, `(S2)` — stable across shots
- Delivery + ID: **outside** `<d>` tag
- Inside `<d>`: ONLY `[Language] text`
- Voiceover: `says in an off-screen voiceover:` + `while his/her lips remain completely closed`
- Cross-cut dialogue: use `<scenetrans>` at connecting points
- Truncated by video end: use `<cutoff>`
- Words inside `<d>`: preserve verbatim, no translation

## 6. `overall_soundscape`

- 1-4 sentences, continuous paragraph
- Ambient + physical action + non-verbal human sounds ONLY
- Dialogue/singing already in multimodal description
- Use `N/A` only for complete silence

## 7. `non_diegetic_music`

- 1-3 sentences
- Instrumentation, speed, rhythm, dynamic changes ONLY
- NO abstract mood words, NO emotional function
- Diegetic music (heard by characters) goes in multimodal description
- Use `N/A` for no background music