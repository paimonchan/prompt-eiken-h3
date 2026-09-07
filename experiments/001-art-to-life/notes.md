# Experiment 001 — Art to Life

## Prompt
- Mode: I2VA (FL2VA node, 1 image first_frame)
- Style: 2D-animated, manhwa style, flat cel shading, clean linework
- Ratio: 9:16 vertical
- Duration: 6s
- Steps: 20 (base), for turbo test: 8
- Camera: Static shot — **no camera movement**
- Loop: Designed to loop (final ≈ opening pose)

## Key Design Decisions

### Kenapa static camera?
Karena character manhwa baru pertama di-test, static camera eliminates variable camera motion dari failure analysis. Kalo hasilnya jelek, kita tau itu karena identity drift atau motion issue, bukan karena camera.

### Kenapa 6 detik?
4s terlalu pendek buat weight shift + step, 8s terlalu panjang buat loop TikTok. 6s = sweet spot.

### Kenapa "one single continuous unbroken take"?
Ini anti-jitter resep dari eikei-plan. FL2VA/I2VA kalo pake multiple shots bisa trigger background change. Single shot = seamless.

### Loop mechanism
Step forward di akhir → weight returns to rest position ≈ opening pose. This is NOT a perfect loop (model gak bisa pixel-perfect), tapi cukup buat seamless replay.

## Variables to Test

| Varian | Changes |
|--------|---------|
| v1 (base) | 20 steps, static cam, lo-fi BGM |
| v2 (turbo) | 8 steps + TurboLoRA, compare quality |
| v3 (camera) | Repeat v1 tapi slow push-in instead of static |
| v4 (no music) | `non_diegetic_music: N/A` — cek audio quality comparison |

## Expected Outcomes

| Element | Expectation |
|---------|------------|
| Character identity | Harus match gambar ref — face, hair, outfit |
| Motion quality | Weight shift harus natural, bukan glitch |
| Loop seamlessness | Return pose ≈ opening, cukup seamless |
| Audio | Lo-fi should sound warm, no garbled artifacts |

## Notes

- Prompt jangan re-describe image — cukup "is the exact first frame"
- Anti-jitter clause: "One single continuous unbroken take — no cuts, no scene changes, no freeze frames, no lingering stillness"
- Loop instruction: "designed specifically to loop seamlessly back to the start"