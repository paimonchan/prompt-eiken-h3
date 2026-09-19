# Delia vs Denise — Battle Tide v3 (series reference)

Seri **3 klip x 15 detik = 45 detik** battle anime, Ref2VA multi-ref 9 gambar.
Blok di bawah ini dipakai ulang di ketiga part; yang berubah antar part **hanya
kalimat zone di `<Subject 3>`**.

Folder `reference/` sengaja di luar `experiments/` dan `library/` supaya tidak
ter-scan jadi kartu prompt di web (`scripts/generate-index.py` cuma glob dua
folder itu).

## Subject definitions (dipakai ulang)

```text
subject_definitions:
<Subject 1> is Delia, shown in <Picture 1> through <Picture 3>; together they define her complete appearance. A young woman with extremely long straight pale-blonde hair with a full straight fringe and long side locks, perfectly straight with no curls, drills or ringlets (<Picture 1>), pale-blue eyes with dark lashes (<Picture 2>, <Picture 3>), fair skin and a composed, faintly smug expression. She wears a dark-red long-sleeved dress with softly puffed sleeves gathered by thin black ribbon ties at the upper arms and wide black cuffs at the wrists (<Picture 1>); a white ruffled jabot with a black bow and an oval red jewel on a gold mount sits at her throat (<Picture 2>); a black underbust corset with criss-cross lacing cinches her waist; the skirt is pleated dark red with a white ruffled hem; she is barefoot, with bare legs and bare feet (<Picture 1>). Her magic is fire — deep red fading to orange when loose, orange with a white-hot core when compressed, golden-white at maximum output — and she is a pressure fighter who never grants a breathing gap: she uses it for acceleration, sudden direction changes, aerial propulsion and to reinforce her punches and kicks, and to blind her opponent behind bursts of explosion and steam. Her fire forms a compressed two-meter lance with a spiral exterior and a white-hot core, dense gauntlets of flame that follow her arms without hiding their silhouette, short radial propulsion bursts, burning knots of curling flame that shatter into ember projectiles, flame wings that reshape with every movement, and layered-flame phoenix manifestations; her quick movements leave ribbon-like fire trails. Every cast has a visible gathering beat, and the fire travels, strikes and bursts rather than circling her. Her face, hair, outfit and body proportions must match <Picture 1> through <Picture 3> exactly.
<Subject 2> is Denise, shown in <Picture 4> and <Picture 5>; together they define her complete appearance. A young woman with extremely long straight silver-white hair with a full straight fringe and long side locks, perfectly straight with no curls, drills or ringlets (<Picture 4>), big sky-blue eyes with dark lashes and a gentle, quietly confident smile (<Picture 5>), and fair skin. She wears a white halter-neck top with a delicate lace pattern and a small white flower ornament at the collar (<Picture 5>), white off-shoulder draped sleeves, a light-blue fitted bodice with a V-shaped waistline, and a long light-blue high-low skirt with a front slit and a soft white under-layer; she is barefoot, with bare legs and bare feet (<Picture 4>). Her magic is clear water that glows faint cyan and transparent blue ice with sharp geometric crystal facets, and she is a counter fighter who prefers stealing her opponent's momentum over blocking head-on: water redirects attacks, binds limbs, forms whips and ribbons that change length and direction mid-strike, carries her movement and creates steam; ice appears as footing a heartbeat before her foot lands, as thin translucent blades, as spears that follow her opponent's trajectory as if she were predicting their path, and as ramps, barriers and instant traps. She moves like martial arts, figure skating and waterbending combined — fluid, precise, always reading. Every spell gathers and swells visibly before it releases, and the effects stay sharp and physical, never small sparks. Her face, hair, outfit and body proportions must match <Picture 4> and <Picture 5> exactly.
<Subject 3> is the battlefield, shown in <Picture 6> through <Picture 9>; together they define its complete appearance. <Picture 6> is the ancient ruin at golden sunset seen wide: a vast circular plaza of huge cracked flagstones with an old circular pattern carved into its center, ringed by a raised colonnade of tall broken marble columns and arches hung with red sun banners, all overgrown with ivy; a grand stone staircase climbs the far side, and a colossal fallen statue lies shattered among rubble and dry golden grass, with jagged snow-capped mountains, a cloud-filled valley and a ruined fortress on a peak beyond. <Picture 7> through <Picture 9> are continuity references only — the colonnade hall, the gorge bridge and the waterfall terrace of the surrounding ruin — defining its architecture, materials and golden-hour light. The active battlefield in this clip is the circular plaza of <Picture 6> only, and the light, palette and architecture of the ruin stay exactly the same through the whole battle; the fighters never enter the colonnade hall, the bridge or the waterfall terrace. [PART ZONE GOES HERE — lihat daftar zone di bawah]
```

## Zone per part

Sisipkan salah satu kalimat ini di akhir `<Subject 3>`:

| Part | Zone |
|---|---|
| 1 | Part one stays on the open plaza of <Picture 6> — cracked circular flagstones, broken columns, the fallen statue and red sun banners, shallow rain pools between the stones — the arena still largely intact, and the fight never leaves it. |
| 2 | Part two stays on the same plaza of <Picture 6>, now littered with shattered ice crystals, scorch marks and drifting steam; the action rises vertically above the colonnade into the open golden sky — the fight never leaves the ruin. |
| 3 | Part three stays on the same plaza of <Picture 6>, now split in two — one half glowing ember-red with burning stone, the other half sheeted in transparent blue ice with meltwater running through the cracks — under the open golden sky. |

## Craft rules (STYLE) — dipakai part 1 & 2

```text
The target video is a 2D-animated anime battle in a ruined plaza at golden sunset, in TV-anime cel style with flat color fills, hard cel shadows and clean lineart. All movement obeys clear cause and effect: anticipation, action, contact or near-miss, a visible reaction and a recovery; ordinary attacks use normal contact animation, and white-flash impact frames are used only where a shot explicitly asks for a hard impact frame. Every hit has physical consequences: the struck fighter is thrown, skids or staggers, hair and skirt snap, dust and gravel blast off the stones, ice cracks, banners tear, and loose debris keeps moving after the hit; the damage and debris stay where they happened in later shots. The staging maintains coherent world-space positions and facing directions across cuts — never teleport or swap the fighters' physical locations merely to preserve screen-left or screen-right composition — and each shot uses exactly one camera move, written with direction and speed and bound to what it follows — for example the camera arcs around the caster with large amplitude at fast speed as the spell releases, or pushes in with small amplitude at slow speed toward the impact. Both fighters stay spatially understandable across cuts; they do not need to share the frame unless a shot description says so. The animation uses snappy anime timing: wind-ups hold for a beat and fast motions carry a quick smear, never smooth or floaty. Every spell is cast, not conjured instantly: it gathers visibly — water rising out of the air and the pooled stone into ribbons and spheres, fire winding around Delia's limbs and condensing into a dense core — swells, and then releases as a complete form: a lance, a whip, a wall, a bloom of projectiles or a pair of burning wings. The effects are drawn crisp: water is cel-shaded, clear with a faint cyan glow, in flowing ribbons and spirals with foaming crests and flying droplets; ice is transparent blue crystal with sharp geometric facets and petal-like fracture patterns; fire is red-orange with a white-gold core, drawn as crisp cel flame with ribbon-like trails and flying embers; golden sunlight blazes through the steam. Physical combat is filmed close — a hand or a foot may leave the frame while the movement stays readable — but whenever magic grows the camera pulls away, the fighters shrinking in the frame so the scale reads huge, and for the lance, the ice-garden chase, the ascent and the needle rain the camera runs with its target instead of watching from the side. The duel must read as one living exchange: Delia attacks, Denise reads the attack and steals its momentum, Delia understands the counter and changes her attack, the environment changes, and the next move is built from that change. Most of the fight runs at fast anime speed; slow motion appears only for near misses, decision moments and reveals — brief controlled slow motion at a 25-to-40-percent drop held for a fraction of a second — always snapping back with a hard speed ramp, and impact frames are reserved for the biggest hits only — the lance into the pillar, the radial burst, the collision of the two ultimates — never for every punch.
```

Part 3 pakai versi modifikasi: `never smooth` dihapus (diganti fluid & continuous +
follow-through), ditambah spec Singularity — efek menerangi sekitar (fire warm,
water/ice cyan, detonasi mengganti cahaya shot), acting observasional (napas/bahu),
kontinuitas luka (goresan pipi tetap ada di shot berikutnya), camera chain lengkap
(amplitude + speed di semua shot).

## Constraints (penutup) — dipakai part 1 & 2

```text
The video contains exactly two people: <Subject 1> and <Subject 2> — they are the only characters in the video, and no third person, double, twin, clone or reflection of either of them appears at any moment; close inserts frame only one of the two. Their faces, hair and outfits stay exactly consistent with <Picture 1> through <Picture 5> in every shot, and the battlefield stays exactly consistent with <Picture 6> through <Picture 9>. Spells never collapse into glowing rings, halos or floating ornaments. Every major offensive spell has a clearly readable gathering beat, release direction and travel path; defensive and movement magic forms directly around the fighter or the terrain as described. Both fighters retain their straight-hair design and hairstyle in every shot; the hair may flow, bend and whip naturally under wind, acceleration and impact, but it never becomes curly, wavy or changes hairstyle. The plaza and the bridge are open to the sky at golden hour — no closed interior, no ceiling and no night. Every offensive attack is clearly aimed at the opposing fighter and is blocked, dodged or answered within the same exchange, so the two are always visibly fighting each other; defensive and movement magic may target the terrain or the caster's immediate surroundings. Contact stays clean: no fused or merged bodies, no extra arms or legs, no swapped or teleporting positions, no weightless impacts and no missing reactions — every hit shows a clear visible reaction from whoever takes it. Neither of them speaks at any point — no dialogue, no words; the only sounds they make are non-verbal effort and breath. Neither of them ever stops moving to pose; slow motion appears only in the brief controlled hero beats the shots describe.
```

## Ref map (9 gambar)

| Tag | File |
|---|---|
| `<Picture 1>` | `delia_mv/refs/delia_ref_01_fullbody.png` |
| `<Picture 2>` | `delia_mv/refs/delia_ref_03_face.png` |
| `<Picture 3>` | `delia_mv/refs/delia_ref_04_eyes.png` |
| `<Picture 4>` | `delia_mv/denise_refs/denise_ref_01_fullbody.png` |
| `<Picture 5>` | `delia_mv/denise_refs/denise_ref_02_face.png` |
| `<Picture 6>` | `delia_mv/arena_anchors/arena_anchor_01_ruins_wide.png` |
| `<Picture 7>` | `delia_mv/arena_anchors/arena_anchor_04_hall.png` |
| `<Picture 8>` | `delia_mv/arena_anchors/arena_anchor_03_bridge.png` |
| `<Picture 9>` | `delia_mv/arena_anchors/arena_anchor_05_waterfall.png` |

`<Picture 6>`-`<Picture 9>` = subject 3 (battlefield). Hanya `<Picture 6>` (plaza)
yang jadi battlefield aktif; `<Picture 7>`-`<Picture 9>` cuma continuity reference
(arsitektur, material, cahaya golden hour).

## Dipakai di

- `library/ref2va/battle/delia_vs_denise_tidev3/part1_first_contact/`
- `library/ref2va/battle/delia_vs_denise_tidev3/part2_arena_weapon/`
- `library/ref2va/battle/delia_vs_denise_tidev3/part3_phoenix_leviathan/`

## Sumber

Narasi + craft rules asal: `eikei-plan/scripts/delia_vs_denise_v3.txt` (25.087 char).
Builder: `eikei-plan/custom/scripts/build_mv_delia_tidev3_01.py` (punya flag
`--spec` / `--singularity` / `--nonturbo`; `%ZONE%` di script = slot yang diisi
per part).
