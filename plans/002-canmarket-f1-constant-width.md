# 002 — Canmarket Feature 1 video: constant window width across cuts

Stamped at `a3046d7`. Asset: `public/media/zx73D9l4IsZyHitMvZZHkhTOcs.mp4` (source backup: the original 1920×1080 export).

## Problem
Segments from Brand Analysis on are a narrower recording pillarboxed inside the same window (content x 250–1674, and 270–1653 on Assessment Complete; window x 183–1737, y 58–1021). At each cut the app content visibly jumps narrower/wider.

## Change
For each narrow segment: crop its content (x 250–1674 / 270–1653, y 58–1021), scale it uniformly to the window width (1554 px; ×1.091 / ×1.123), crop the extra height (keep the top, drop the bottom: final 1554×963), mask to the window's ~22 px corner radius, and overlay at (183, 58). Wide segments are untouched. Cuts stay 150 ms fades; loop stays white fade.

## Verify
Step through each cut: window edges and sidebar left edge stay put; no black pillarbox; corners round.
