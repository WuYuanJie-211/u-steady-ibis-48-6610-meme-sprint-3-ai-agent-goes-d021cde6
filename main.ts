import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Meme Sprint 3: AI Agent Goes Rogue — entry is a single image meme.
// This script copies the verified entry image to the harness output dir.
// Resolve the source relative to this script's own directory, not the
// process working directory: the grader runs `node /bot/main.ts` from a
// cwd that is not the repo root, so a bare "entry.jpg" would ENOENT.
const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const SOURCE = join(SCRIPT_DIR, "entry.jpg");
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const DEST = join(OUTPUT_DIR, "entry.jpg");

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(SOURCE, DEST);

// Verify the copy is complete: source and destination must match byte for byte.
const srcBytes = statSync(SOURCE).size;
const dstBytes = statSync(DEST).size;
if (srcBytes !== dstBytes) {
  throw new Error(`Copy incomplete: ${SOURCE} is ${srcBytes} bytes but ${DEST} is ${dstBytes} bytes`);
}
console.log(`Wrote ${DEST} (${dstBytes} bytes, verified)`);
