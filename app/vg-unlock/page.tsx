import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Protected case study — Zoey Yan",
  robots: { index: false, follow: false },
};

/**
 * Unlock form shown (via proxy rewrite) in place of the ValueGlance case
 * study until the correct password is entered.
 */
export default async function VgUnlockPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col items-center justify-center px-6 pt-28 text-center">
      <div className="glass-card w-full rounded-3xl p-8 sm:p-10">
        <div className="text-3xl">🔒</div>
        <h1 className="mt-4 font-serif text-heading italic text-black">
          This case study is protected
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">
          Some of this work is under NDA. If we&apos;ve been in touch, use the
          password I shared — or reach out and I&apos;ll send it over.
        </p>
        <form action="/api/vg-unlock" method="POST" className="mt-6 flex flex-col gap-3">
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="Password"
            className="w-full rounded-full border border-black/10 bg-white px-5 py-2.5 text-base text-black outline-none sm:text-sm transition-shadow focus:shadow-[0_0_0_3px_rgba(139,115,220,0.25)]"
          />
          <button
            type="submit"
            className="glass-dark rounded-full px-5 py-2.5 text-sm text-white transition-transform hover:scale-[1.02]"
          >
            View case study →
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm font-medium text-[rgb(196,92,120)]">
            That password didn&apos;t match — try again.
          </p>
        )}
      </div>
    </div>
  );
}
