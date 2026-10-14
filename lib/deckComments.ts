// Shared shape of a deck comment (API route, deck panel, presenter window).
export type DeckComment = { id: string; slide: string; name: string; text: string; at: number };

export async function loadComments(deck: string): Promise<{ configured: boolean; comments: DeckComment[] }> {
  const res = await fetch(`/api/deck-comments?deck=${deck}`, { cache: "no-store" });
  if (!res.ok) return { configured: false, comments: [] };
  return res.json();
}

export function timeAgo(at: number, now = Date.now()) {
  const s = Math.max(0, Math.round((now - at) / 1000));
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}d ago`;
  return new Date(at).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
