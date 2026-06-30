// ───────────────────────────────────────────────────────────────────────────
// The deferred-interest engine. Pure functions, no UI — easy to unit-test and
// to repoint at a live MySynchrony account later (just feed real values in).
// ───────────────────────────────────────────────────────────────────────────

// Promo-balance minimums are a small % of the balance — far below what it takes
// to clear the promo in time. That gap is the whole trap.
export function minimumPayment(principal) {
  return Math.max(35, Math.round(principal * 0.025));
}

// Roughly what it takes to clear the principal evenly before the deadline.
export function payoffPayment(principal, promoMonths) {
  return Math.ceil(principal / promoMonths);
}

/**
 * Model a deferred-interest promo.
 * @param {object} scenario - needs { principal, promoMonths, apr, creditLimit }
 * @param {number} monthlyPayment
 * @returns full month-by-month trace + summary numbers
 */
export function simulate(scenario, monthlyPayment) {
  const { principal, promoMonths, apr, creditLimit } = scenario;
  const monthlyRate = apr / 100 / 12;

  let balance = principal;
  let accrued = 0; // deferred interest building quietly behind the 0%
  let totalPaid = 0;
  const points = [{ month: 0, balance: principal }];

  for (let m = 1; m <= promoMonths; m++) {
    accrued += balance * monthlyRate; // accrues on the running balance
    const pay = Math.min(monthlyPayment, balance);
    totalPaid += pay;
    balance = +(balance - pay).toFixed(2);
    points.push({ month: m, balance });
  }

  const remaining = balance;
  const beatsDeadline = remaining <= 0.01;
  const interestCharged = beatsDeadline ? 0 : +accrued.toFixed(2);
  const finalBalance = +(remaining + interestCharged).toFixed(2);

  return {
    points,
    monthlyPayment,
    totalPaid: +totalPaid.toFixed(2),
    remaining: +remaining.toFixed(2),
    interestCharged,
    finalBalance,
    beatsDeadline,
    startUtil: principal / creditLimit,
    endUtil: finalBalance / creditLimit,
  };
}
