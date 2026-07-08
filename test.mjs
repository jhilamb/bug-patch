// Zero-dependency test runner so the Sandbox Test Runner's CI command is just
// `node test.mjs`. Exits non-zero on the first failed assertion.
import { parseAmount } from "./src/money.mjs";

let failures = 0;
function expect(actual, expected, label) {
  const ok = Object.is(actual, expected);
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}  (got ${actual})`);
  if (!ok) failures++;
}

expect(parseAmount("42"), 42, "plain integer");
expect(parseAmount("$9.99"), 9.99, "currency symbol");
expect(parseAmount("1,234.50"), 1234.5, "thousands separator");     // BUG-1042
expect(parseAmount("1,000,000"), 1000000, "millions separator");     // BUG-1042

if (failures > 0) {
  console.error(`\n${failures} test(s) failed`);
  process.exit(1);
}
console.log("\nall tests passed");
