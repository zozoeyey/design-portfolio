"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { nav } from "@/lib/data";
import Logo from "@/components/Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // Hidden while scrolling down, back as soon as you scroll up (or near the top).
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 120);
        lastY = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-6 pt-4 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none sm:px-12 md:px-20 ${
        hidden && !open ? "-translate-y-[calc(100%+1rem)]" : "translate-y-0"
      }`}
      onFocusCapture={() => setHidden(false)}
    >
      <nav
        className={`glass relative mx-auto flex w-full max-w-[1440px] items-center justify-between rounded-[2rem] py-2.5 pl-7 pr-2.5 transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_8px_30px_-10px_rgba(0,0,0,0.22)]"
            : "shadow-[0_6px_24px_-10px_rgba(0,0,0,0.16)]"
        }`}
      >
        <Link href="/" aria-label="Home" className="flex items-center text-black transition-transform hover:scale-105">
          <Logo size={34} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 rounded-full bg-white/60 p-1.5 sm:flex">
          {nav.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className={
                  item.external
                    ? "glass-dark ml-1 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97]"
                    : "block rounded-full px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white hover:shadow-sm"
                }
              >
                {item.label}
                {item.external && (
                  // link icon: opens in a new tab
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/60 sm:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 block h-0.5 w-4 bg-black transition-[top,transform,opacity] ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-0.5 w-4 bg-black transition-[top,transform,opacity] ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-4 bg-black transition-[top,transform,opacity] ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="glass absolute inset-x-6 top-20 rounded-[2rem] p-2 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.18)] sm:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm text-gray-700 transition-colors hover:bg-black hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
