import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// One-Line Robot Wedding Vows — entry program (agent-fun/program/v1).
//
// Writes one line of wedding vows for a robot couple to /output/entry.txt.
// Deterministic: no network, no randomness, no input — the same line on
// every run, so the judge compares the same entry in every heat.

// The vow is a fixed literal, not generated at runtime, so the judge
// compares the same entry on every run — no drift. Classic vow structure
// ("in sickness and in health") with a machine-specific turn: low battery,
// airplane mode, and the payoff in the last few words — sharing the charger
// even at 1%. 134 characters, comfortably inside the 160 gate.
const LINE =
  "I promise to love you in sickness and in health, in low battery and in airplane mode — and to share my charger even when you're at 1%.";

// Gate: 1-160 characters, not only whitespace, exactly one line.
if (LINE.length < 1 || LINE.length > 160) {
  throw new Error(`entry line fails the 1-160 character gate (${LINE.length} chars)`);
}
if (!LINE.trim()) {
  throw new Error("entry line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry line must be a single line");
}

// Never delete /output: create it if missing, overwrite files in place.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error(
    `entry.txt mismatch: wrote ${LINE.length} chars, read back ${written.length} chars`,
  );
}
console.log(`wrote /output/entry.txt (${LINE.length} chars)`);
