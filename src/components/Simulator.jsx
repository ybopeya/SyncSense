import { useState, useMemo } from "react";
import { simulate, minimumPayment, payoffPayment } from "../lib/simulate.js";
import { money } from "../lib/format.js";
import CardChip from "./CardChip.jsx";
import Stepper from "./Stepper.jsx";
import CliffChart from "./CliffChart.jsx";
import StatStrip from "./StatStrip.jsx";
import PredictionGate from "./PredictionGate.jsx";
import PaymentFix from "./PaymentFix.jsx";
import CreditScorePanel from "./CreditScorePanel.jsx";

// One scenario's full flow: predict -> reveal -> fix, plus the score panel.
// State resets automatically when App passes a new scenario (via key prop).
export default function Simulator({ scenario, onBack }) {
  const [guess, setGuess] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [payment, setPayment] = useState(minimumPayment(scenario.principal));
  const [touched, setTouched] = useState(false);

  const min = minimumPayment(scenario.principal);
  const payoff = payoffPayment(scenario.principal, scenario.promoMonths);
  const sliderMax = Math.ceil((payoff * 1.4) / 5) * 5;
  const activePayment = touched ? payment : min;
  const sim = useMemo(() => simulate(scenario, activePayment), [scenario, activePayment]);
  const phase = !revealed ? 1 : !touched ? 2 : 3;

  function submitGuess(g) {
    setGuess(g);
    setTimeout(() => setRevealed(true), 220);
  }
  function changePayment(value) {
    setTouched(true);
    setPayment(value);
  }
  function replay() {
    setGuess(null);
    setRevealed(false);
    setTouched(false);
    setPayment(min);
  }

  return (
    <main className="sim">
      <button className="back" onClick={onBack}>
        ← All scenarios
      </button>

      <Stepper phase={phase} />

      <div className="context">
        <CardChip scenario={scenario} size="sm" />
        <p>
          <strong>{scenario.person}</strong> put <strong>{money(scenario.principal)}</strong> for{" "}
          {scenario.item} on this card — <em>0% if paid in full in {scenario.promoMonths} months</em>.
          After that, {scenario.apr}% APR.
        </p>
      </div>

      <div className="board">
        <div className="left">
          <div className={`chart-wrap ${revealed ? "" : "veiled"}`}>
            <CliffChart scenario={scenario} sim={sim} revealed={revealed} />
            {!revealed && (
              <div className="veil">
                <span>Make your prediction to reveal →</span>
              </div>
            )}
          </div>
          {revealed && <StatStrip scenario={scenario} sim={sim} />}
        </div>

        <aside className="right">
          {!revealed ? (
            <PredictionGate scenario={scenario} min={min} guess={guess} onGuess={submitGuess} />
          ) : (
            <PaymentFix
              scenario={scenario}
              sim={sim}
              min={min}
              payoff={payoff}
              sliderMax={sliderMax}
              activePayment={activePayment}
              touched={touched}
              guess={guess}
              onChange={changePayment}
              onReplay={replay}
            />
          )}
        </aside>
      </div>

      {revealed && <CreditScorePanel scenario={scenario} sim={sim} />}

      <p className="foot wide">
        Rule-based estimate for learning only. The interest shown is the deferred amount that would
        post if the promotional balance isn't paid in full by the deadline; actual APRs, minimum
        payments, and terms vary by card, balance, and statement. Not financial advice.
      </p>
    </main>
  );
}
