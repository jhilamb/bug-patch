// parseAmount strips a leading currency symbol and thousands separators, then
// converts the remaining string to a Number.
export function parseAmount(input) {
  const stripped = String(input)
    .replace(/^[$€£]/, "")
    .replace(/,/g, "");
  const value = Number(stripped);
  if (Number.isNaN(value)) {
    throw new Error(`invalid amount: ${input}`);
  }
  return value;
}
