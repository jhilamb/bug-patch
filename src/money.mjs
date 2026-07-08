// Buggy on purpose: parseAmount strips a leading currency symbol but not the
// thousands separators, so "1,234.50" becomes NaN. This is BUG-1042.
export function parseAmount(input) {
  const stripped = String(input).replace(/^[$€£]/, "");
  const value = Number(stripped);
  if (Number.isNaN(value)) {
    throw new Error(`invalid amount: ${input}`);
  }
  return value;
}
