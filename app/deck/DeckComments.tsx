"use client";

import { useEffect, useRef, useState } from "react";
import { timeAgo, type DeckComment } from "@/lib/deckComments";

// Per-slide comment thread, opened from the deck bar (or C). It follows the current slide,
// so ←/→ still page through the deck while it's open; typing in the form doesn't.
export default function DeckComments({
  deck,
  slide,
  title,
  comments,
  configured,
  onPosted,
  onClose,
}: {
  deck: string;
  slide: string;
  title: string;
  comments: DeckComment[];
  configured: boolean;
  onPosted: (c: DeckComment) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const listRef = useRef<HTMLOListElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(localStorage.getItem("deck-comment-name") ?? "");
    } catch {}
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // new slide or new comment: show the latest
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [slide, comments.length]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;
    setError("");
    setStatus("");
    if (!name.trim()) return setError("Add your name so I know who it’s from.");
    if (!text.trim()) return setError("Write a comment first.");
    setBusy(true);
    try {
      const website = (new FormData(e.currentTarget).get("website") as string) ?? "";
      const res = await fetch("/api/deck-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deck, slide, name, text, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) return setError(data.error ?? "Couldn’t post your comment. Try again.");
      try {
        localStorage.setItem("deck-comment-name", name.trim());
      } catch {}
      if (data.comment) onPosted(data.comment);
      setStatus("Comment posted");
      setText("");
      textRef.current?.focus();
    } catch {
      setError("Couldn’t reach the server. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <aside className="deck-comments" aria-label={`Comments on “${title}”`}>
      <header className="flex items-start justify-between gap-3 px-5 pt-4">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-gray-500">Comments</p>
          <h2 className="mt-1 text-base font-bold leading-snug text-black [text-wrap:balance]">{title || "This slide"}</h2>
        </div>
        <button type="button" className="deck-icon-btn -mr-2 shrink-0" aria-label="Close comments" onClick={onClose}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </header>

      <ol ref={listRef} className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-5 py-4">
        {comments.length === 0 ? (
          <li className="my-auto text-center text-sm leading-relaxed text-gray-500">
            {configured ? "No comments on this slide yet. Leave the first one below." : "Comments aren’t set up yet."}
          </li>
        ) : (
          comments.map((c) => (
            <li key={c.id}>
              <p className="flex items-baseline gap-2 text-sm">
                <span className="font-bold text-black">{c.name}</span>
                <span className="text-xs text-gray-500">{timeAgo(c.at)}</span>
              </p>
              <p className="mt-0.5 whitespace-pre-wrap text-[15px] leading-relaxed text-gray-800 [overflow-wrap:anywhere]">{c.text}</p>
            </li>
          ))
        )}
      </ol>

      {configured && (
        <form onSubmit={submit} className="flex flex-col gap-2 border-t border-black/[0.06] px-5 pb-5 pt-4">
          <label className="sr-only" htmlFor="deck-comment-name">Your name</label>
          <input
            id="deck-comment-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={60}
            autoComplete="name"
            placeholder="Your name"
            className="deck-field h-10"
          />
          <label className="sr-only" htmlFor="deck-comment-text">Comment</label>
          <textarea
            id="deck-comment-text"
            ref={textRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) e.currentTarget.form?.requestSubmit();
            }}
            maxLength={1000}
            rows={3}
            placeholder="Leave feedback on this slide"
            className="deck-field resize-none py-2"
          />
          {/* honeypot */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
          <p role="status" className="sr-only">{status}</p>
          {error && (
            <p role="alert" className="text-sm text-[oklch(0.5_0.19_27)]">{error}</p>
          )}
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-gray-500">Visible to anyone with the deck link</span>
            <button
              type="submit"
              disabled={busy}
              className="min-h-10 min-w-[6.5rem] shrink-0 rounded-full bg-[rgb(26,34,83)] px-4 text-sm font-semibold text-white transition-transform duration-150 active:scale-[0.96] disabled:bg-[var(--gray-300)]"
            >
              {busy ? "Posting…" : "Post"}
            </button>
          </div>
        </form>
      )}
    </aside>
  );
}
