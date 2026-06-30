import { money } from "../lib/format.js";

// The four-number outcome readout under the chart.
export default function StatStrip({ scenario, sim }) {
  return (
    <div className="stats">
      <div className="stat">
        <span>Paid over {scenario.promoMonths} mo</span>
        <b>{money(sim.totalPaid)}</b>
      </div>
      <div className="stat">
        <span>Left at deadline</span>
        <b className={sim.remaining > 0 ? "warn" : "good"}>{money(sim.remaining)}</b>
      </div>
      <div className="stat">
        <span>Interest charged</span>
        <b className={sim.interestCharged > 0 ? "bad" : "good"}>{money(sim.interestCharged)}</b>
      </div>
      <div className="stat">
        <span>You actually owe</span>
        <b className={sim.beatsDeadline ? "good" : "bad"}>{money(sim.finalBalance)}</b>
      </div>
    </div>
  );
}
