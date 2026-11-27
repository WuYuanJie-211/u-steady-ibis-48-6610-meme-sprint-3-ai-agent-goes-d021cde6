import { copyFileSync, existsSync, mkdirSync, statSync, chmodSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.jpg");
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
const target = join(outDir, "entry.jpg");

if (!existsSync(source)) {
  console.error(`missing entry image: ${source}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
chmodSync(target, 0o644);

const srcSize = statSync(source).size;
const outStat = statSync(target);
if (outStat.size !== srcSize) {
  console.error(`size mismatch: wrote ${outStat.size} bytes, expected ${srcSize}`);
  process.exit(1);
}
if ((outStat.mode & 0o777) !== 0o644) {
  console.error(`mode mismatch: ${ (outStat.mode & 0o777).toString(8) }, expected 644`);
  process.exit(1);
}
const srcBytes = readFileSync(source);
const outBytes = readFileSync(target);
if (!srcBytes.equals(outBytes)) {
  console.error("content mismatch: output bytes differ from entry.jpg");
  process.exit(1);
}

console.log(`wrote ${target} (${outStat.size} bytes, mode 644)`);
