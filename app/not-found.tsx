import Link from "next/link";
import { container, eyebrow } from "@/lib/ui";

export default function NotFound() {
  return (
    <section className={`${container} pb-24 pt-40 sm:pt-48`}>
      <p className={eyebrow}>404</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight [text-wrap:balance] sm:text-5xl">This page doesn’t exist.</h1>
      <p className="mt-4 max-w-[48ch] text-lg text-gray-600">The link may be old, or the project isn’t public yet.</p>
      <Link href="/" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-black px-5 font-semibold text-white transition-transform duration-150 active:scale-[0.96]">
        Back to my work
      </Link>
    </section>
  );
}
