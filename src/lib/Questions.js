// ───────────────────────────────────────────────────────────────────────────
// Builds the 3-question intuition sequence shown BEFORE the chart.
// Answers are computed from simulate() so they stay correct if a scenario's
// numbers change. Assumes the minimum payment does NOT clear the promo in time
// (true for every shipped scenario); Q1's correct answer flips automatically if
// that ever changes, and Q2/Q3 are written for the "misses the deadline" case.
// ───────────────────────────────────────────────────────────────────────────
import { simulate, minimumPayment, payoffPayment } from "./simulate.js";
import { money } from "./format.js";

const roundTo = (n, step) => Math.round(n / step) * step;

export function buildQuestions(scenario) {
  const min = minimumPayment(scenario.principal);
  const payoff = payoffPayment(scenario.principal, scenario.promoMonths);
  const sim = simulate(scenario, min); // the minimum-payment trajectory
  const name = scenario.person;

  const interest = roundTo(sim.interestCharged, 25);
  const high = roundTo(sim.interestCharged * 1.8, 25); // tempting over-estimate
  const low = Math.max(25, roundTo(sim.interestCharged * 0.13, 25)); // "barely any"
  const remaining = roundTo(sim.remaining, 25);
  const owe = roundTo(sim.finalBalance, 25);
  const midPay = roundTo((min + payoff) / 2, 5);

  return [
    {
      id: "timing",
      prompt: `${name} pays only the minimum (about ${money(min)}/mo). Does she beat the 0% deadline?`,
      options: [
        { id: "spare", label: "Yes, with room to spare" },
        { id: "barely", label: "Just barely" },
        { id: "hit", label: "No — she gets hit" },
      ],
      correctIndex: sim.beatsDeadline ? 0 : 2,
      explain: `The minimum sits far below the ~${money(payoff)}/mo it takes to clear ${scenario.promoMonths} months. She reaches the deadline still owing about ${money(remaining)}.`,
    },
    {
      id: "magnitude",
      prompt: `She crosses the deadline with about ${money(remaining)} still owed. How much interest gets added?`,
      options: [
        { id: "high", label: `About ${money(high)}` },
        { id: "true", label: `About ${money(interest)}` },
        { id: "low", label: `About ${money(low)}` },
      ],
      correctIndex: 1,
      explain: `About ${money(interest)}. Deferred interest is charged on the entire ${money(scenario.principal)} from the purchase date — not just the ${money(remaining)} left over. That's how she ends up owing roughly ${money(owe)}.`,
    },
    {
      id: "fix",
      prompt: `What's roughly the smallest monthly payment that clears it in time?`,
      options: [
        { id: "mid", label: `About ${money(midPay)}/mo` },
        { id: "payoff", label: `About ${money(payoff)}/mo` },
        { id: "min", label: `${money(min)}/mo (the minimum)` },
      ],
      correctIndex: 1,
      explain: `About ${money(payoff)}/mo — basically the ${money(scenario.principal)} split evenly across ${scenario.promoMonths} months. Anything less leaves a balance when the clock runs out.`,
    },
  ];
}