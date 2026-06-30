import { money } from "../lib/format.js";

// The signature element: a self-labelling balance timeline that snaps upward
// at the deadline when retroactive interest hits (or lands on $0 if cleared).
export default function CliffChart({ scenario, sim, revealed }) {
  const W = 660, H = 340;
  const L = 16, R = 152, T = 30, B = 52;
  const yMax = Math.max(scenario.principal, sim.finalBalance) * 1.12;
  const x = (m) => L + (m / scenario.promoMonths) * (W - L - R);
  const y = (b) => T + (1 - b / yMax) * (H - T - B);

  const linePath = sim.points
    .map((p, i) => `${i ? "L" : "M"} ${x(p.month).toFixed(1)} ${y(p.balance).toFixed(1)}`)
    .join(" ");
  const areaPath =
    `M ${x(0)} ${y(0)} ` +
    sim.points.map((p) => `L ${x(p.month).toFixed(1)} ${y(p.balance).toFixed(1)}`).join(" ") +
    ` L ${x(scenario.promoMonths)} ${y(0)} Z`;

  const dx = x(scenario.promoMonths);
  const remY = y(sim.remaining);
  const finalY = y(sim.finalBalance);
  const safe = sim.beatsDeadline;
  const accent = safe ? "var(--green)" : "var(--red)";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="chart"
      role="img"
      aria-label="Balance through the promo period and what happens at the deadline"
    >
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} className="grid" x1={L} x2={W - R + 44} y1={T + t * (H - T - B)} y2={T + t * (H - T - B)} />
      ))}

      {/* paid-off baseline */}
      <line className="zero" x1={L} x2={W - R + 44} y1={y(0)} y2={y(0)} />
      <text className="lbl-zero" x={L} y={y(0) + 17}>$0 · paid off, no interest</text>

      {/* deadline */}
      <line className="deadline" x1={dx} x2={dx} y1={T - 8} y2={y(0)} />
      <text className="lbl-deadline" x={dx} y={T - 14} textAnchor="middle">
        DEADLINE — month {scenario.promoMonths}
      </text>

      {revealed && (
        <>
          <path className="area" d={areaPath} />
          <path className="line" d={linePath} style={{ stroke: accent }} />

          {/* the cliff */}
          {!safe && (
            <>
              <line className="cliff" x1={dx} x2={dx} y1={remY} y2={finalY} />
              <polygon
                points={`${dx},${finalY} ${dx - 6},${finalY + 11} ${dx + 6},${finalY + 11}`}
                fill="var(--red)"
              />
              <foreignObject x={dx - 168} y={(remY + finalY) / 2 - 22} width={150} height={46}>
                <div className="cliff-note">
                  +{money(sim.interestCharged)} interest
                  <br />
                  <span>added back to day one</span>
                </div>
              </foreignObject>
            </>
          )}

          {/* start + landing markers */}
          <circle className="dot" cx={x(0)} cy={y(scenario.principal)} r={4.5} />
          <text className="lbl-start" x={x(0) + 8} y={y(scenario.principal) - 9}>
            {money(scenario.principal)} charged
          </text>
          <circle cx={dx} cy={finalY} r={6.5} fill={accent} stroke="#fff" strokeWidth="2" />
          <foreignObject x={dx + 12} y={finalY - 24} width={R - 8} height={50}>
            <div className="land" style={{ color: accent }}>
              <span>{safe ? "Cleared in time" : "You now owe"}</span>
              <strong>{money(sim.finalBalance)}</strong>
            </div>
          </foreignObject>
        </>
      )}
    </svg>
  );
}
