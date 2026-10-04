"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data";

// Icon-only copy button: two stacked sheets → a check for 1.5s.
export default function CopyEmailButton({ className = "" }: { className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <button
      type="button"
      aria-label={copied ? "Email copied" : "Copy email address"}
      title={copied ? "Copied" : "Copy email"}
      onClick={async () => {
        await navigator.clipboard.writeText(site.email);
        setCopied(true);
        if (timer.current) clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), 1500);
      }}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full transition-[transform,background-color,color] duration-150 active:scale-[0.94] ${className}`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {copied ? (
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        ) : (
          <>
            <rect x="8.5" y="8.5" width="12" height="12" rx="2.5" />
            <path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5" />
          </>
        )}
      </svg>
      <span className="sr-only" aria-live="polite">
        {copied ? "Email copied" : ""}
      </span>
    </button>
  );
}
