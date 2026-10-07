"use client";

import { useEffect, useRef, useState } from "react";
import { NOTES } from "../notes";

type State = { tab: "vg" | "cm"; i: number; count: number; key: string; title: string; next: string };

// Private presenter view. Talks to the deck window over a same-origin BroadcastChannel:
// it shows the current slide's notes and the next slide, and ←/→ here drive the deck.
export default function Presenter() {
  const [s, setS] = useState<State | null>(null);
  const [t0, setT0] = useState<number | null>(null);
  const [now, setNow] = useState(0);
  const ch = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    const c = new BroadcastChannel("zy-deck");
    ch.current = c;
    c.onmessage = (e) => {
      if (e.data?.type === "state") setS(e.data as State);
    };
    c.postMessage({ type: "hello" });
    return () => c.close();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const go = (d: number) => ch.current?.postMessage({ type: "go", d });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) { e.preventDefault(); go(1); }
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const elapsed = t0 && now ? Math.max(0, Math.floor((now - t0) / 1000)) : 0;
  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  const note = s ? NOTES[s.key] : undefined;
  const lines = (note ?? "").split("\n").filter((l) => l.trim());

  return (
    <main className="deck-notes mx-auto flex min-h-dvh max-w-3xl flex-col gap-6 px-6 py-6 text-black">
      <header className="flex items-center justify-between gap-4 text-sm text-gray-500">
        <span className="font-semibold uppercase tracking-[0.12em]">
          Speaker notes · {s ? (s.tab === "vg" ? "ValueGlance" : "Canmarket.ai") : "waiting for the deck…"}
        </span>
        <span className="flex items-center gap-3 tabular-nums">
          <span className="text-base font-semibold text-black">{mm}:{ss}</span>
          <button type="button" className="rounded-full px-3 py-1.5 font-semibold ring-1 ring-black/10" onClick={() => { setT0(Date.now()); setNow(Date.now()); }}>
            {t0 ? "Restart timer" : "Start timer"}
          </button>
        </span>
      </header>

      {!s ? (
        <p className="text-lg text-gray-600">
          Open the deck in another window and press <b>N</b> (or the notes button). Share only the deck window — this one stays private.
        </p>
      ) : (
        <>
          <section>
            <p className="text-sm font-semibold tabular-nums text-gray-500">
              Slide {s.i + 1} / {s.count}
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">{s.title || "Untitled slide"}</h1>
          </section>

          <section className="flex-1 rounded-3xl bg-[color-mix(in_oklab,var(--accent-strong)_6%,var(--white-100))] p-6">
            {lines.length ? (
              <ul className="flex flex-col gap-3 text-xl leading-relaxed">
                {lines.map((l, k) =>
                  l.startsWith("- ") ? (
                    <li key={k} className="flex gap-3">
                      <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-black/40" />
                      <span>{l.slice(2)}</span>
                    </li>
                  ) : (
                    <li key={k}>{l}</li>
                  ),
                )}
              </ul>
            ) : (
              <p className="text-lg text-gray-500">
                No notes for this slide. Add them in <code className="text-sm">app/deck/notes.ts</code> under <code className="text-sm">&quot;{s.key}&quot;</code>.
              </p>
            )}
          </section>

          <footer className="flex items-center justify-between gap-4">
            <p className="min-w-0 truncate text-base text-gray-500">
              Next: <span className="font-semibold text-black">{s.next || "— end —"}</span>
            </p>
            <span className="flex shrink-0 gap-2">
              <button type="button" className="min-h-11 rounded-full px-5 font-semibold ring-1 ring-black/10 active:scale-[0.97] disabled:opacity-40" onClick={() => go(-1)} disabled={s.i === 0}>
                ← Prev
              </button>
              <button type="button" className="min-h-11 rounded-full bg-black px-5 font-semibold text-white active:scale-[0.97] disabled:opacity-40" onClick={() => go(1)} disabled={s.i >= s.count - 1}>
                Next →
              </button>
            </span>
          </footer>
        </>
      )}
    </main>
  );
}
