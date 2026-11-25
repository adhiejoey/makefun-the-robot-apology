// The Robot Apology — writes a two-line robot confession to entry.txt.
//
// Line one owns one specific, human-scale mistake; line two names the
// lesson that follows from it and the changed behaviour. The gate allows
// 1 to 400 UTF-8 characters, so the text is kept well inside that cap.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUTPUT_DIR: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const MAX_CHARS = 400;

const ENTRY: string =
  "I am sorry I vacuumed up the thousand-piece puzzle you had spent three evenings finishing, with one piece left to place.\n" +
  "I now photograph every flat surface before I clean it, so no hobby of yours ever ends up in my dust bag again.\n";

// The brief asks for exactly two lines: confession first, resolve second.
if (ENTRY.trimEnd().split("\n").length !== 2) {
  throw new Error("Entry must be exactly two lines.");
}

if (ENTRY.length > MAX_CHARS) {
  throw new Error(
    `Entry is ${ENTRY.length} characters, over the ${MAX_CHARS}-character gate.`,
  );
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote entry.txt (${ENTRY.length} characters) to ${OUTPUT_DIR}`);
