/**
 * Take-home pay and housing affordability, 2025 rules, married filing jointly.
 * Approximate by design — no itemizing, no credits beyond the standard ones,
 * no 401(k). The point is the DIFFERENCE between places at the same income,
 * which these rules capture well: federal and FICA are identical everywhere,
 * so only the state and city lines move.
 */
const FED = { std: 31500, brackets: [[23850, 0.1], [96950, 0.12], [206700, 0.22], [394600, 0.24], [501050, 0.32], [751600, 0.35], [Infinity, 0.37]] };
const FICA = { ss: 0.062, ssCap: 176100, medicare: 0.0145 };
const CA = { std: 11412, brackets: [[22157, 0.01], [52528, 0.02], [82904, 0.04], [115084, 0.06], [145448, 0.08], [742958, 0.093], [891541, 0.103], [1485907, 0.113], [Infinity, 0.123]], exemptionCredit: 314 * 2, sdi: 0.012 }; // 2025 FTB: $11,412 std deduction, $314 exemption credit, 6% bracket $82,904–$115,084
const MI = { rate: 0.0425, exemption: 5800 * 2 };

function bracketTax(taxable, brackets) {
  let tax = 0;
  let prev = 0;
  for (const [cap, rate] of brackets) {
    if (taxable <= prev) break;
    tax += (Math.min(taxable, cap) - prev) * rate;
    prev = cap;
  }
  return tax;
}

export function federalTax(gross) {
  return bracketTax(Math.max(0, gross - FED.std), FED.brackets);
}

export function ficaTax(inc1, inc2) {
  const one = (i) => Math.min(i, FICA.ssCap) * FICA.ss + i * FICA.medicare;
  return one(inc1) + one(inc2);
}

export function californiaTax(gross) {
  const t = bracketTax(Math.max(0, gross - CA.std), CA.brackets);
  return Math.max(0, t - CA.exemptionCredit) + gross * CA.sdi; // SDI has no wage cap since 2024
}

export function michiganTax(gross, cityRate = 0) {
  return Math.max(0, gross - MI.exemption) * MI.rate + gross * cityRate; // city tax on gross, resident rate
}

/** state: "CA" | "MI" | null (Ontario is a different system — we do not pretend). */
export function takeHome(inc1, inc2, state, cityRate = 0) {
  const gross = inc1 + inc2;
  const federal = federalTax(gross);
  const fica = ficaTax(inc1, inc2);
  const stateTax = state === "CA" ? californiaTax(gross) : state === "MI" ? michiganTax(gross, cityRate) : null;
  const net = stateTax === null ? null : gross - federal - fica - stateTax;
  return { gross, federal, fica, state: stateTax, net };
}

export const MORTGAGE_RATE = 0.0666; // Freddie Mac PMMS, late Aug 2026
export function mortgagePI(price, rate = MORTGAGE_RATE, down = 0.2, years = 30) {
  const L = price * (1 - down);
  const r = rate / 12;
  const n = years * 12;
  return (L * r * (1 + r) ** n) / ((1 + r) ** n - 1);
}

/** Monthly cost of owning the median: P&I + year-one (uncapped) property tax + insurance. */
export function ownMonthly(price, effTax, insurance = 187) {
  return mortgagePI(price) + (price * effTax) / 12 + insurance;
}

/** Share of take-home that housing eats, and what we call it. */
export function verdictFor(share) {
  if (share == null) return { label: "—", tone: "ghost" };
  if (share <= 0.3) return { label: "Comfortable", tone: "ok" };
  if (share <= 0.4) return { label: "A stretch", tone: "warn" };
  return { label: "Out of reach", tone: "stop" };
}

export const money = (n) => (n == null ? "—" : `$${Math.round(n).toLocaleString()}`);
