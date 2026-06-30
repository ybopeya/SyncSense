// ───────────────────────────────────────────────────────────────────────────
// Credit-score layer. Deliberately rule-based and scoped to ONE factor
// (this card's utilization). The UI is explicit that real scores depend on
// much more. Repoint scoreFromUtilization() at a real score/limit when wired
// to a live account.
// ───────────────────────────────────────────────────────────────────────────

const BASELINE = 720; // hypothetical thin-file young-adult starting point

export function scoreFromUtilization(util) {
  const u = util * 100;
  let drag;
  if (u <= 9) drag = 0;
  else if (u <= 29) drag = 12;
  else if (u <= 49) drag = 27;
  else if (u <= 74) drag = 45;
  else if (u <= 89) drag = 68;
  else drag = 90;

  const score = BASELINE - drag;
  let band = "Good";
  if (score >= 800) band = "Exceptional";
  else if (score >= 740) band = "Very good";
  else if (score >= 670) band = "Good";
  else if (score >= 580) band = "Fair";
  else band = "Poor";

  return { drag, score, band };
}

// The five FICO factors. `touched` flags the two this purchase actually moves.
export const FICO_FACTORS = [
  { name: "Payment history", weight: 35, touched: true },
  { name: "Amounts owed (utilization)", weight: 30, touched: true },
  { name: "Length of credit history", weight: 15, touched: false },
  { name: "Credit mix", weight: 10, touched: false },
  { name: "New credit", weight: 10, touched: false },
];
