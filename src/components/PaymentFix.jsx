import { GUESS_OPTIONS, CORRECT_GUESS } from "../data/guesses.js";
import { money } from "../lib/format.js";

// Steps 2 + 3: the verdict, then the payment slider that lets the user fix it.
// Custom runs (scenario.you) phrase everything as "you" and have no guess recap.
export default function PaymentFix({
  scenario,
  sim,
  min,
  payoff,
  sliderMax,
  activePayment,
  touched,
  guess,
  onChange,
  onReplay,
}) {
  const you = !!scenario.you;
  const subject = you ? "You" : scenario.person;
  const guessLabel = GUESS_OPTIONS.find((o) => o.id === guess)?.label;

  return (
    <div className="fix">
      <div className={`verdict ${sim.beatsDeadline ? "good" : "bad"}`}>
        {!touched && guess && (
          <div className="vguess">
            You guessed “{guessLabel}.” {guess === CORRECT_GUESS ? "Correct." : "Here's what really happens:"}
          </div>
        )}
        <div className="vline">
          {sim.beatsDeadline ? (
            <>
              {subject} {you ? "clear" : "clears"} it with <strong>{money(0)}</strong> interest. ✅
            </>
          ) : (
            <>
              {subject} {you ? "would pay" : "pays"} <strong>{money(sim.totalPaid)}</strong>{" "}
              {you ? `over the ${scenario.promoMonths} months` : "all year"} and{" "}
              <em>
                {you ? "would still owe" : "still owes"} {money(sim.finalBalance)}
              </em>{" "}
              — because {money(sim.interestCharged)} of interest posts retroactively at the deadline.
            </>
          )}
        </div>
      </div>

      <div className="slider">
        <div className="tag">{scenario.custom ? "Try a payment" : "Step 3 of 3 · Try a payment"}</div>
        <div className="srow">
          <span>Monthly payment</span>
          <b>{money(activePayment)}/mo</b>
        </div>
        <input
          type="range"
          min={min}
          max={sliderMax}
          step={5}
          value={activePayment}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{ "--fill": `${((activePayment - min) / (sliderMax - min)) * 100}%` }}
        />
        <div className="sticks">
          <span>min {money(min)}</span>
          <span>{money(sliderMax)}</span>
        </div>
        <div className={`payoff ${sim.beatsDeadline ? "good" : ""}`}>
          {sim.beatsDeadline ? (
            <>
              ✓ This clears the balance in time — <strong>{money(0)}</strong> interest.
            </>
          ) : (
            <>
              Drag toward <strong>{money(payoff)}/mo</strong> to beat the deadline.
            </>
          )}
        </div>
      </div>

      <button className="replay" onClick={onReplay}>
        ↺ {scenario.custom ? "Reset payment" : "Replay this scenario"}
      </button>
    </div>
  );
}
