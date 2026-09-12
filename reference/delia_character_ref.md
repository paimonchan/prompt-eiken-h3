# Delia - Shared Identity Block

Blok `subject_definitions` yang bisa dipakai ulang untuk karakter Delia.
Copy ke section `subject_definitions:` di prompt Ref2VA mana pun yang pakai
6 ref yang sama.

Folder `reference/` sengaja di luar `experiments/` dan `library/` supaya tidak
ter-scan jadi kartu prompt di web (`scripts/generate-index.py` cuma glob dua
folder itu).

## subject_definitions

```text
subject_definitions:
<Subject 1> is the young woman shown in <Picture 1> through <Picture 6>; together they define her complete appearance. Extremely long straight pale-blonde hair with a full straight fringe and long side locks flowing down past her hips (<Picture 1>, <Picture 2>, <Picture 5>), pale-blue eyes with dark lashes and a cool half-lidded gaze (<Picture 3>, <Picture 4>), fair skin, and a composed, faintly smug expression. She wears a dark-red long-sleeved dress with softly puffed sleeves gathered by thin black ribbon ties at the upper arms and wide black cuffs at the wrists (<Picture 1>, <Picture 6>); a white ruffled jabot with a black bow and an oval red jewel on a gold mount sits at her throat (<Picture 2>, <Picture 3>); a black underbust corset with criss-cross lacing cinches her waist (<Picture 1>, <Picture 6>); the skirt is pleated dark red with a white ruffled hem (<Picture 5>, <Picture 6>); she is barefoot, with bare legs and bare feet (<Picture 1>, <Picture 5>). Her face, hair, outfit, and body proportions must match <Picture 1> through <Picture 6> exactly.
```

## Pemetaan ref

| Tag | File | Isi |
|---|---|---|
| `<Picture 1>` | `delia_ref_01_fullbody.png` | fullbody netral |
| `<Picture 2>` | `delia_ref_02_posed.png` | 3/4 posed (hand on hip) |
| `<Picture 3>` | `delia_ref_03_face.png` | face close-up |
| `<Picture 4>` | `delia_ref_04_eyes.png` | mata macro (pale-blue) |
| `<Picture 5>` | `delia_ref_05_back.png` | back view (rambut panjang) |
| `<Picture 6>` | `delia_ref_06_outfit.png` | outfit front detail |

## Dipakai di

- `library/ref2va/pov/delia_cook_15s/` (part 1)
- `library/ref2va/pov/delia_serve_15s/` (part 2, + `<Picture 7>` end-frame anchor)
