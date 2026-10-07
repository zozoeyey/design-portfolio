# 001 — Canmarket card motion: smooth flip, no jank, add Campaign Overview

Stamped at commit `a3046d7`. Target file: `components/CanmarketCardMotion.tsx` (plus one line in `components/PlateCard.tsx`).
Covers audit findings #1, #2, #3, #4, #8 (they share one timeline, so they ship as one plan).

## Changes

1. **One continuous flip (findings #1, #2).** Merge "flip" and "grow" into a single transition on the flipper:
   `rotateY(-8deg) rotateX(4deg) scale(S0)` → `rotateY(180deg) scale(1)`, `transform 900ms cubic-bezier(0.32, 0.72, 0, 1)`.
   The press lasts 120ms (`transform 120ms cubic-bezier(0.23, 1, 0.32, 1)`, scale × 0.96) and the flip starts the moment it ends — no idle gap.
2. **No mid-animation re-raster (finding #3).** Rotation and scale run in that one compositor transition, so Chrome rasterizes at the animation's max scale once. Do **not** add `will-change: transform` (it would pin the raster to the small starting scale and leave the app blurry at full size).
3. **Cheap loop exit (finding #4).** Replace the stage's `filter: blur(6px)` with `opacity 0` + `scale(0.98)`, `400ms cubic-bezier(0.23, 1, 0.32, 1)`.
4. **Campaign Overview step (finding #8).** After the flip the app lands on "1. Campaign Overview": Campaign Description (Goals + six Strategy bullets), Campaign Period (January 4, 2026 – January 18, 2026, (2 weeks)), blue Next Steps card ("Upload SKU product assets and images, we will generate 7 batches of creative content calendar for you" + "Start Uploading SKU Assets"). Copy is verbatim from the product screenshot. The cursor presses the button → sidebar highlight moves to step 2 → SKU upload continues as before.
5. **Hover (finding #5, one line).** In `PlateCard.tsx`, the `motion` wrapper drops `group-hover:scale-[1.03]` and its transition.
6. **Resume, don't restart (finding #6).** Leaving the viewport pauses at the current phase; re-entering resumes from that phase.

## Timeline (ms)

| Phase | Start | What |
| --- | --- | --- |
| 0 | 0 | card, tilted |
| 1 | 350 | sheen sweep |
| 2 | 850 | cursor → card |
| 3 | 1350 | press (120ms) |
| 4 | 1470 | flip + grow (900ms) → Campaign Overview |
| 5 | 2500 | cursor → Start Uploading SKU Assets |
| 6 | 3050 | press button |
| 7 | 3250 | SKU Upload step |
| 8 | 3650 | cursor → upload slot |
| 9 | 4050 | image lands |
| 10 | 4450 | cursor → Generate Calendar |
| 11 | 4850 | press: Generating… |
| 12 | 5350 | Creative Calendar fills in |
| 13 | 6350 | cursor → New Year Teaser |
| 14 | 6750 | Content Preview opens |
| 15 | 8550 | fade out; loop at 9000 |

## Verify

- `npx tsc --noEmit`, `npx eslint components/CanmarketCardMotion.tsx components/PlateCard.tsx`.
- Feel-check: Chrome DevTools → Animations panel at 10% speed; the flip should accelerate immediately after the press and decelerate into full size with no stop between rotating and growing. Performance panel: no long "Rasterize" or "Paint" bars during the flip or the loop exit.
- Reduced motion: still frame = calendar + Content Preview open, no cursor.
