"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./proto.css";

export default function Harness({ names, variants, visible = names.length }: { names: string[]; variants: React.ReactNode[]; visible?: number }) {
  const [current, setCurrent] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const [run, setRun] = useState(0);
  // ?bare=1: just the variant, no picker (used inside the Scenarios preview iframe)
  const [bare, setBare] = useState(false);
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const hl = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const v = parseInt(q.get("v") ?? "", 10) || 1;
    /* eslint-disable react-hooks/set-state-in-effect */
    setBare(q.get("bare") === "1");
    setCurrent(Math.min(Math.max(v - 1, 0), variants.length - 1));
    /* eslint-enable react-hooks/set-state-in-effect */
    requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)));
  }, [variants.length]);
  useLayoutEffect(() => {
    if (current === null) return;
    const el = itemsRef.current[current];
    if (el && hl.current) {
      hl.current.style.width = el.offsetWidth + "px";
      hl.current.style.transform = `translateX(${el.offsetLeft}px)`;
    }
    if (new URLSearchParams(location.search).get("bare") === "1") return;
    const url = new URL(location.href);
    url.searchParams.set("v", String(current + 1));
    history.replaceState(null, "", url);
  }, [current]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= visible) setCurrent(n - 1);
      else if (e.key === "ArrowRight") setCurrent((c) => ((c ?? 0) + 1) % visible);
      else if (e.key === "ArrowLeft") setCurrent((c) => ((c ?? 0) - 1 + visible) % visible);
      else if (e.key === "r" || e.key === "R") setRun((r) => r + 1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [variants.length, visible]);
  const shown = names.map((n, i) => [n, i] as const).filter(([, i]) => i < visible || i === current);
  return (
    <>
      {current !== null && <div key={`${current}-${run}`} className={bare ? "" : "pb-[72px]"}>{variants[current]}</div>}
      {!bare && <nav className="proto-picker" aria-label="Prototype variants" data-ready={ready ? "" : undefined}>
        <span ref={hl} className="proto-picker-highlight" aria-hidden="true" />
        {shown.map(([n, i]) => (
          <button key={n} ref={(el) => { itemsRef.current[i] = el; }} className="proto-picker-item" data-active={current === i ? "" : undefined} aria-current={current === i ? "true" : undefined} onClick={() => setCurrent(i)}>
            {i >= visible ? `Iteration · ${n}` : n}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button className="proto-picker-item proto-picker-replay" aria-label="Replay (R)" onClick={() => setRun((r) => r + 1)}>↻</button>
      </nav>}
    </>
  );
}
