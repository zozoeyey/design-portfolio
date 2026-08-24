/*
  Localize remote assets.

  Right now the site references images/videos from Framer's CDN
  (framerusercontent.com) so it works out of the box. When you want to fully
  own the assets, run this once from the project root:

      node scripts/localize-assets.mjs

  It downloads every framerusercontent.com URL found in lib/data.ts into
  public/media/, then rewrites lib/data.ts to point at the local copies
  (/media/<filename>). Run it from a network that can reach framerusercontent.com
  (your normal machine will be fine).
*/

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import path from "node:path";

const DATA = path.resolve("lib/data.ts");
const OUT = path.resolve("public/media");

const src = await readFile(DATA, "utf8");
const urls = [...new Set(src.match(/https:\/\/framerusercontent\.com\/[^"']+/g) || [])];

if (urls.length === 0) {
  console.log("No framerusercontent.com URLs found — nothing to do.");
  process.exit(0);
}

await mkdir(OUT, { recursive: true });
console.log(`Found ${urls.length} assets. Downloading to public/media/ …`);

let rewritten = src;
for (const url of urls) {
  const filename = url.split("/").pop().split("?")[0];
  const dest = path.join(OUT, filename);
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36",
        Referer: "https://zoeyyan.framer.website/",
      },
    });
    if (!res.ok) {
      console.warn(`  ✗ ${res.status} ${filename} — skipped`);
      continue;
    }
    await pipeline(res.body, createWriteStream(dest));
    rewritten = rewritten.split(url).join(`/media/${filename}`);
    console.log(`  ✓ ${filename}`);
  } catch (err) {
    console.warn(`  ✗ ${filename} — ${err.message}`);
  }
}

await writeFile(DATA, rewritten, "utf8");
console.log("\nDone. lib/data.ts now points at /media/. Review the diff and commit.");
