# Movemint organizer — design system (Insights redesign)

Calm, cool-neutral product UI that borrows two things from the Movemint brand: the logo gradient and the serif wordmark. Color is scarce on purpose, so the one accent always means "do this next". Tokens live in `shell.tsx` as `B`; nothing else may define a color.

## Color

Components use `B.*` only. Never a raw hex, `rgb()`, or Tailwind palette class (`text-red-500`, `bg-gray-100`) — a raw value can't follow a token change and is how the old page ended up with red in six places.

| Token | Value | Role |
| --- | --- | --- |
| `ink` | `oklch(0.2 0.015 285)` | Primary text, dark buttons, tooltips, focus ring |
| `muted` | `oklch(0.5 0.015 285)` | Secondary text, labels, inactive icons |
| `faint` | `oklch(0.7 0.01 285)` | Disabled text, chevrons, placeholders |
| `surface` | `oklch(0.975 0.004 285)` | Subtle fills: segmented control track, hover rows, stat cards |
| `line` | `oklch(0.2 0.015 285 / 0.09)` | Every border and divider (alpha, so it recedes on any surface) |
| `accent` | `oklch(0.66 0.19 5)` = `#ec5482` (light raspberry) | Shapes without text: current-step ring, pulse, progress fill, dots. 3.43:1 vs white (shapes need 3:1) |
| `accentStrong` | `oklch(0.54 0.18 5)` = `#bd3061` (raspberry) | Anything carrying text: filled buttons with white text (5.59:1) and red-role text — active nav, "Up next", Create Event, field errors (5.59:1 on white, 5.00:1 on `accentTint`) |
| `accentTint` | `oklch(0.965 0.02 5)` = `#ffeef1` | Background of the active nav item and the pending checklist row. Same hue as raspberry so text and fill agree |
| `success` / `successBg` | `oklch(0.52 0.12 155)` / `oklch(0.95 0.04 155)` | **Live only** (status menu, Live label, LIVE stamp). Never for "done" |
| `gradient` / `gradientDiag` | logo gradient, 90° / 135° | Brand moments only, see rule below |

Neutrals carry hue 285 (the gradient's violet) so greys agree with the brand instead of reading as placeholder grey.

### Accent — raspberry, two weights (decided)

One hue (5°), two lightnesses, each with one job:

- **`accent` = light raspberry `#ec5482`** — shapes with no text: current-step ring, pulse, progress fill. 3.43:1 vs white (shapes need 3:1). Never text, never behind text.
- **`accentStrong` = raspberry `#bd3061`** — everything carrying text: filled buttons (white text 5.59:1) and red-role text.

Both derive from Movemint's red `#FF4A5D` (`oklch(0.673 0.216 19.6)`), shifted pinker so one hue can serve both weights. The original red is not used: as text or behind white text it is 3.29:1, and keeping it for shapes next to raspberry text gave the page two different reds.

Rejected:
- Original red #FF4A5D + white text (Movemint today) — 3.29:1, fails AA.
- Crimson `#c82d3e` (Movemint red darkened, same hue) — passes, but reads blood-red, off-brand.
- Ink `#262626` (Movemint's own `brand-primary`) buttons — cleanest, but buttons lose the brand color.
- Rose `#c33d59`, plum `#84377f` — rose flatter than raspberry; plum too far from Movemint red.
- Burnt coral, logo-gradient coral — change the brand color.

Errors share the brand's red hue, so an error is never color alone: always red border + alert icon + message text (`accentStrong`). The primary action is never styled as an error and vice versa.

### Which color do I use?

```
Is it the one action that moves this screen forward (Publish, Set up)?
 ├── Yes → bg accentStrong, text white
 └── No
      ├── Is the event live? → success on successBg
      ├── Is a step / task done? → grey filled checkbox, muted struck-through title (done recedes, never green)
      ├── Is it a brand moment (event card, AI button border)? → gradient
      ├── Is it text? → ink (primary) · muted (secondary) · faint (disabled)
      └── Everything else (borders, fills) → line / surface
```

Gradient rule: at most two gradient elements on screen. It marks brand moments; on a button or text it becomes noise.

## Typography

Inter for everything, including the page title. Instrument Serif appears in one place only — the event name on the event card — so the brand moment stays special and the working UI stays uniform. Never serif below 26px, never for labels, buttons, body or data.

| Role | Size / weight | Use |
| --- | --- | --- |
| `page-title` | Inter 30 / 700, −0.015em (24 on phones) | Event name at the top of the page |
| `display-event` | Instrument Serif 30 / 1.02, two lines max | Event name on the event card only |
| `stat` | Inter 28 / 600, tabular, −0.015em | Overview figures (Participants, Required setup, Registration). One voice for numbers and words like "Closed" |
| `countdown` | Inter 13 / 600 in a `white/20` chip | "23 days to go" on the event card — emphasis by weight and fill, not size |
| `title` | 18 / 600 | Section headings |
| `body` | 14 / 400–500 | Default UI text, rows, buttons |
| `small` | 13 / 400–500 | Descriptions, meta, URL |
| `label` | 12 / 500, uppercase, +0.08em tracking | Section labels, tooltips |
| `input` | 16 | Form inputs (stops iOS zoom) |

Weights: 400, 500, 600, 700 (700 for the page title only). Numbers that change use `tabular-nums`.

**Wordmark:** Movemint's original logo image (`/deck/movemint-logo.png`, from their site) — never retyped in a font. It lives in the header only; the event card doesn't repeat it (or the status), so the card has room to breathe.

## Shape, spacing, elevation

- Radius: `lg` (8px) for controls, `xl` (12px) for lists and cards, `2xl` (16px) for page-level cards, `full` for avatars and status dots. Inner radius = outer − padding.
- Control heights: 36px desktop / 40px touch. Primary hero action 44px.
- White canvas; components separate with `line` hairlines. Borders over shadows. Shadows only on things that float: menus, toasts, the mobile nav drawer, the sticky context bar.
- Overview: event card + three facts side by side when the content area is ≥ 1024px (a container query, so it holds inside narrow frames too); stacked below that.

## Components

**Primary button (accent)** — the single action that advances the screen. One per view: two accent buttons means no hierarchy. Disabled while blocked, with a tooltip saying why.
**Secondary button** (`line` border, ink text) — default for everything else: Preview, Cancel, inline Save. There is no dark "confirm" button: three button types only — primary, secondary, disabled.

```tsx
// Correct — one accent action on the page, the rest secondary
<PublishButton flow={flow} />   <button style={{ boxShadow: `inset 0 0 0 1px ${B.line}` }}>Preview</button>
// Incorrect — a second filled button competes with Publish (the removed "Edit event")
<button style={{ backgroundColor: B.ink }}>Edit event</button>
```

**Status menu** — the event's state next to the title. Use it, not a colored pill: status is a control here, not a badge. Options are Movemint's five, nothing else: Live (`checkCircle`), Draft (`circleDashed`), Unlisted (`eyeOff`), Landing Page (`mail`), Past Event (`trophy`). Live is disabled until required setup is done. The pencil icon means "edit" and is never a status.

**Tooltip (`Tip`)** — labels icon-only buttons. Never the native `title` attribute. 400ms delay for the first, instant for neighbours within 300ms. Plain text only; anything clickable goes in a menu.

**Inline editing, no modals** — edit where the thing lives. In this mockup "Set up" completes its step directly; a real build would expand the form inside the checklist row (never a modal). "Edit URL" turns the URL line under the title into an input (Enter saves, Esc cancels, live format check). No dialogs or side sheets: they hide the page the user is deciding about. Menus, tooltips and toasts are allowed.

**Overview** — one row: the event card, then Participants · Required setup · Registration in one white card with hairline dividers. Each fact is label (12 uppercase) → value (`stat`) → one supporting line; Required setup puts its 4px `accent` bar between value and line. The event card is a button that opens Preview (it's what attendees see): event name in `display-event`, date and place in 13px, the countdown chip. No wordmark or status on it.

**Timeline** — the checklist as stages on a rail: solid up to Publish (required), dashed after (optional, any order). Dates sit in a 112px right-aligned gutter on wide screens. Markers are one family, 28px, 1.5px stroke, only the color changes: done = solid grey with a white check · now = `accent` ring with the pulse · gate (Publish, locked) = `ink` outline with a lock · optional = `faint` outline. Stage tags are quiet text after the title ("· Required", "· Optional, any order").

**Checklist rows** — the pending required row leads: `accentTint` background, `accent` ring, `accentStrong` "Set up" button. Done rows (required and ticked optional) use Movemint's own completed style: grey filled checkbox with a grey check, muted struck-through title, description kept. Once every required step is done they collapse behind one summary row: open while finishing, auto-closed after Publish. Optional tasks are white hairline-divided lists (title, one-line description, chevron) with a 16px checkbox in front; ticking one moves it to the end of its list. No status text — "Not applicable" is banned.

**Sticky context bar** — appears once the overview scrolls away: gradient dot · event name (truncates) · status chip · date · "23 days to go". It shows the next action (Set up / Publish / Copy link) only while that task's own line is off screen — a persistent action earns its place only when the real one can't be seen.

**Toast** — confirms a change the user just made ("Your event is live"). Not for errors that need action.

## Motion

Enter `cubic-bezier(0.23, 1, 0.32, 1)`; mobile nav drawer `cubic-bezier(0.32, 0.72, 0, 1)`. Menus/tooltips 120–150ms, inline editors 200ms, drawer 260ms. Overshoot (`0.34, 1.4, 0.64, 1`) only for celebrations: a step completing, the LIVE stamp. Ambient loops (AI border, current-step pulse) stay slow (≥1.8s). Ticked tasks glide to the end of their list (FLIP, 260ms, enter curve); the sticky bar fades and drops 6px in 200ms; checks pop in with the celebrate curve. Every animation has a `prefers-reduced-motion` off switch (the bar only fades).

## Accessibility floors

Text ≥ 4.5:1, no exceptions — red text and red buttons use `accentStrong`. Focus ring: 2px `ink`, offset 2px (−2px inside joined groups). Touch targets ≥ 40px. Icon buttons have `aria-label`; tooltips are wired with `aria-describedby`.
