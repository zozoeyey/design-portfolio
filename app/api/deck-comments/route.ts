import { Redis } from "@upstash/redis";
import type { DeckComment } from "@/lib/deckComments";

// Deck comments, one Redis list per deck. Open to anyone with the deck link, so posts are
// validated, capped, and rate-limited per IP. Works with either env var naming the Vercel
// Upstash integration may create (UPSTASH_REDIS_REST_* or KV_REST_API_*).
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const DECKS = new Set(["vg", "cm", "redesign"]);
const MAX_PER_DECK = 500;
const listKey = (deck: string) => `deck-comments:${deck}`;

export async function GET(request: Request) {
  const deck = new URL(request.url).searchParams.get("deck") ?? "";
  if (!DECKS.has(deck)) return Response.json({ error: "Unknown deck" }, { status: 400 });
  if (!redis) return Response.json({ configured: false, comments: [] });
  const comments = await redis.lrange<DeckComment>(listKey(deck), 0, -1);
  return Response.json({ configured: true, comments });
}

export async function POST(request: Request) {
  if (!redis) return Response.json({ error: "Comments aren’t set up yet." }, { status: 503 });

  const body = await request.json().catch(() => null);
  const deck = String(body?.deck ?? "");
  const slide = String(body?.slide ?? "").slice(0, 200);
  const name = String(body?.name ?? "").trim().slice(0, 60);
  const text = String(body?.text ?? "").trim();
  // honeypot: a hidden field only bots fill in
  if (body?.website) return Response.json({ ok: true });
  if (!DECKS.has(deck) || !slide) return Response.json({ error: "Unknown slide." }, { status: 400 });
  if (!name) return Response.json({ error: "Add your name so I know who it’s from." }, { status: 400 });
  if (!text) return Response.json({ error: "Write a comment first." }, { status: 400 });
  if (text.length > 1000) return Response.json({ error: "Keep it under 1,000 characters." }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rl = `deck-comments:rl:${ip}`;
  const hits = await redis.incr(rl);
  if (hits === 1) await redis.expire(rl, 60);
  if (hits > 8) return Response.json({ error: "Too many comments at once. Try again in a minute." }, { status: 429 });

  const comment: DeckComment = { id: crypto.randomUUID(), slide, name, text, at: Date.now() };
  await redis.rpush(listKey(deck), comment);
  await redis.ltrim(listKey(deck), -MAX_PER_DECK, -1);
  return Response.json({ ok: true, comment });
}
