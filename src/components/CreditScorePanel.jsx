import { scoreFromUtilization, FICO_FACTORS } from "../lib/creditScore.js";
import { money, pct } from "../lib/format.js";

// The "understanding" layer: ties the purchase to credit score, scoped
// honestly to the one factor it actually models (this card's utilization).
export default function CreditScorePanel({ scenario, sim }) {
  const planUtil = sim.endUtil;
  const here = scoreFromUtilization(planUtil);
  const cleared = scoreFromUtilization(0.05); // utilization after paying it off
  const delta = cleared.score - here.score;

  const barColor = planUtil > 0.5 ? "var(--red)" : planUtil > 0.3 ? "var(--gold-deep)" : "var(--green)";

  return (
    <section className="score">
      <div className="score-head">
        <h3>What this does to your credit score</h3>
        <span className="est-pill">Estimate</span>
      </div>

      <div className="score-grid">
        <div className="score-card">
          <div className="score-card-lbl">This card's utilization, on the current plan</div>
          <div className="util-bar">
            <span style={{ width: pct(Math.min(1, planUtil)), background: barColor }} />
          </div>
          <div className="util-row">
            <span>
              {money(sim.finalBalance)} of {money(scenario.creditLimit)} limit
            </span>
            <strong>{pct(planUtil)} used</strong>
          </div>
          <p className="score-card-note">
            Lenders like to see this under 30%. Paying only the minimum keeps it high all year — and
            the interest cliff pushes it higher.
          </p>
        </div>

        <div className="score-card">
          <div className="score-card-lbl">Estimated score effect from this one card</div>
          <div className="score-num" style={{ color: here.drag >= 25 ? "var(--red)" : "var(--ink)" }}>
            ≈ {here.score}
            <span className="band">{here.band}</span>
          </div>
          <p className="score-card-note">
            {delta > 0 ? (
              <>
                Clearing the balance could lift this estimate back up by roughly{" "}
                <strong>{delta} points</strong> as utilization drops.
              </>
            ) : (
              <>Keeping utilization low keeps this estimate healthy.</>
            )}
          </p>
        </div>
      </div>

      <div className="factors">
        <div className="factors-lbl">
          Your real FICO® score is built from five things. This purchase only moves two of them:
        </div>
        <div className="factor-list">
          {FICO_FACTORS.map((f) => (
            <div key={f.name} className={`factor ${f.touched ? "on" : ""}`}>
              <div className="factor-top">
                <span>{f.name}</span>
                <span className="factor-w">{f.weight}%</span>
              </div>
              <div className="factor-bar">
                <span style={{ width: `${f.weight * 2.4}%` }} />
              </div>
              <div className="factor-tag">
                {f.touched ? "affected by this purchase" : "not touched here"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="score-disclaimer">
        This is a simplified, rule-based estimate that models only how <strong>this card's balance</strong>{" "}
        affects the utilization part of your score. Your actual score also depends on payment history,
        how long you've had credit, your credit mix, and recent applications — so your real change may
        be larger or smaller. It is not a credit decision or a guarantee.
      </p>
    </section>
  );
}
