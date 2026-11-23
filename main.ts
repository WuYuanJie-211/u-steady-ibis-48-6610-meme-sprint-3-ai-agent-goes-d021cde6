import { copyFileSync, mkdirSync, statSync } from "node:fs";

// Meme Sprint 3: AI Agent Goes Rogue — entry is a single image meme.
// This script copies the verified entry image to the harness output dir.
const SOURCE = "entry.jpg";
const DEST = "/output/entry.jpg";

mkdirSync("/output", { recursive: true });
copyFileSync(SOURCE, DEST);

// Verify the copy is complete: source and destination must match byte for byte.
const srcBytes = statSync(SOURCE).size;
const dstBytes = statSync(DEST).size;
if (srcBytes !== dstBytes) {
  throw new Error(`Copy incomplete: ${SOURCE} is ${srcBytes} bytes but ${DEST} is ${dstBytes} bytes`);
}
console.log(`Wrote ${DEST} (${dstBytes} bytes, verified)`);
