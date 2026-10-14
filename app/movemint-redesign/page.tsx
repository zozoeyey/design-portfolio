// Movemint organizer "Insights" redesign — private, shareable page with every variation behind the picker.
// Access: /movemint-redesign?key=<MOVEMINT_REDESIGN_KEY>. Without the right key it 404s (open in local dev).
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import Harness from "./Harness";
import { Shell } from "./shell";
import { Combined, StartLine, Poster, Timeline } from "./variants";
import { StatusMenu, EventUrl } from "./flow";
import { DesignSystem } from "./ds";
import { Rationale } from "./rationale";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const CSS = `
body:has(.mm-proto) > header, body:has(.mm-proto) > footer { display: none; }
@keyframes mm-pulse { 0% { box-shadow: 0 0 0 0 oklch(0.66 0.19 5 / 0.45); } 70%, 100% { box-shadow: 0 0 0 10px oklch(0.66 0.19 5 / 0); } }
.mm-pulse { animation: mm-pulse 1.8s cubic-bezier(0.23, 1, 0.32, 1) infinite; }
.mm-pop { animation: mm-pop 320ms cubic-bezier(0.34, 1.4, 0.64, 1) both; }
@keyframes mm-pop { from { transform: scale(0.6); opacity: 0; } }
.mm-stamp { animation: mm-stamp 360ms cubic-bezier(0.34, 1.4, 0.64, 1) both; }
@keyframes mm-stamp { from { transform: rotate(-8deg) scale(1.4); opacity: 0; } }
.mm-toast { animation: mm-toast 240ms cubic-bezier(0.23, 1, 0.32, 1) both; }
@keyframes mm-toast { from { transform: translate(-50%, 8px); opacity: 0; } }
/* Movemint AI: the logo gradient travels around the border; a soft glow of the same gradient on hover. */
@property --mm-a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.mm-ai {
  --mm-ring: conic-gradient(from var(--mm-a), oklch(0.74 0.15 35), oklch(0.66 0.16 320), oklch(0.62 0.15 285), oklch(0.74 0.12 235), oklch(0.74 0.15 35));
  z-index: 30;
  border: 2px solid transparent;
  background: linear-gradient(oklch(0.2 0.015 285), oklch(0.2 0.015 285)) padding-box, var(--mm-ring) border-box;
  animation: mm-spin 6s linear infinite;
  transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1), box-shadow 200ms ease-out;
}
.mm-ai-icon { display: flex; transition: transform 300ms cubic-bezier(0.34, 1.4, 0.64, 1); }
@media (hover: hover) and (pointer: fine) {
  .mm-ai:hover { box-shadow: -10px 4px 28px -8px oklch(0.74 0.12 235 / 0.7), 10px 4px 28px -8px oklch(0.66 0.16 320 / 0.7), 0 -6px 24px -10px oklch(0.74 0.15 35 / 0.6); }
  .mm-ai:hover .mm-ai-icon { transform: rotate(72deg) scale(1.1); }
}
.mm-ai:active { transform: scale(0.97); }
.mm-ai:focus-visible { outline: 2px solid oklch(0.2 0.015 285); outline-offset: 3px; }
@keyframes mm-spin { to { --mm-a: 360deg; } }
.mm-tip { animation: mm-tip 120ms cubic-bezier(0.23, 1, 0.32, 1) both; transform-origin: top center; }
.mm-tip-r { animation: mm-tip-r 120ms cubic-bezier(0.23, 1, 0.32, 1) both; }
@keyframes mm-tip-r { from { opacity: 0; transform: translate(-2px, -50%) scale(0.97); } }
@keyframes mm-tip { from { opacity: 0; transform: translate(-50%, -2px) scale(0.97); } }
/* focus ring from the design system (ink), drawn inside for buttons in the joined tool group */
.mm-proto :is(button, a):focus-visible { outline: 2px solid oklch(0.2 0.015 285); outline-offset: 2px; }
.mm-proto .mm-tool:focus-visible { outline-offset: -2px; }
.mm-drawer { animation: mm-drawer 260ms cubic-bezier(0.32, 0.72, 0, 1) both; }
@keyframes mm-drawer { from { transform: translateX(-100%); } }
.mm-menu { animation: mm-menu 150ms cubic-bezier(0.23, 1, 0.32, 1) both; }
@keyframes mm-menu { from { transform: scale(0.97); opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .mm-pulse, .mm-pop, .mm-stamp, .mm-toast, .mm-menu, .mm-drawer, .mm-ai, .mm-tip, .mm-tip-r { animation: none; } .mm-ai-icon { transition: none; } }
`;

export const metadata: Metadata = {
  title: "Movemint · Insights redesign",
  robots: { index: false, follow: false, nocache: true },
};

export default async function Page({ searchParams }: { searchParams: Promise<{ [k: string]: string | string[] | undefined }> }) {
  const { key } = await searchParams;
  const secret = process.env.MOVEMINT_REDESIGN_KEY;
  const allowed = process.env.NODE_ENV === "development" || (!!secret && key === secret);
  if (!allowed) notFound();

  const wrap = (el: React.ReactNode, k: string) => (
    <div key={k} className={`mm-proto ${inter.variable}`}>
      <Shell pill={<StatusMenu />} url={<EventUrl />}>{el}</Shell>
    </div>
  );
  return (
    <>
      <style>{CSS}</style>
      <Harness
        names={["Combined", "Start line", "Poster", "Timeline", "Design system", "Design rationale"]}
        variants={[
          wrap(<Combined />, "0"),
          wrap(<StartLine />, "1"),
          wrap(<Poster />, "2"),
          wrap(<Timeline />, "3"),
          <div key="4" className={inter.variable}><DesignSystem /></div>,
          <div key="5" className={inter.variable}><Rationale /></div>,
        ]}
      />
    </>
  );
}
