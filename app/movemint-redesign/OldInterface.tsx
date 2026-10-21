"use client";
/* eslint-disable @next/next/no-img-element */
// "See the original" — a small button (bottom-left of the Final Design tab) that opens the current Movemint
// Insights page as one long screenshot. Three captures stitched in the browser: the first is the full page,
// the other two are content-column crops, so they're placed to line up with that column (sidebar line kept).
import { useEffect, useRef, useState } from "react";

// x-positions are % of the first capture's width (content column 20% → 97.7%, sidebar edge 17.3%)
const COL_LEFT = 20;
const COL_W = 77.8;
const CROPS = [
  { src: "/deck/mm-old-2.jpg", cardL: 3.6, cardW: 93.4 },
  { src: "/deck/mm-old-3.jpg", cardL: 3.3, cardW: 93.7 },
];

export function OldInterface() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] font-medium text-[oklch(0.2_0.015_285)] shadow-[0_0_0_1px_oklch(0.2_0.015_285/0.1),0_6px_20px_-8px_oklch(0.2_0.015_285/0.35)] transition-transform duration-150 ease-out active:scale-[0.97]"
      >
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /><path d="M12 7v5l3 2" />
        </svg>
        See the original
      </button>

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Original Movemint Insights page" className="fixed inset-0 z-50 flex flex-col bg-[oklch(0.2_0.015_285/0.6)] p-4 backdrop-blur-sm sm:p-8" onClick={() => setOpen(false)}>
          <div className="mx-auto flex min-h-0 w-full max-w-[1200px] flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex shrink-0 items-center justify-between border-b border-black/10 px-5 py-3">
              <p className="text-[13px] font-semibold text-[oklch(0.2_0.015_285)]">
                Original Insights page <span className="font-normal text-[oklch(0.5_0.015_285)]">· before the redesign</span>
              </p>
              <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close" className="flex size-9 items-center justify-center rounded-full text-[oklch(0.2_0.015_285)] hover:bg-black/5 focus-visible:outline-2 focus-visible:outline-offset-2">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
              <img src="/deck/mm-old-1.jpg" alt="Original Movemint Insights page: event header, tabs, status cards and the start of the event checklist" className="block w-full" />
              <div className="relative bg-white">
                {/* the sidebar's right edge, continued down the page */}
                <span aria-hidden="true" className="absolute inset-y-0 w-px bg-[#e5e5e5]" style={{ left: "17.3%" }} />
                {CROPS.map((c) => {
                  const w = COL_W / (c.cardW / 100);
                  return (
                    <img
                      key={c.src}
                      src={c.src}
                      alt="Original event checklist, continued"
                      className="relative block"
                      style={{ width: `${w}%`, marginLeft: `${COL_LEFT - (c.cardL / 100) * w}%` }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
