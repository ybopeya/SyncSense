import { GUESS_OPTIONS } from "../data/guesses.js";
import { money } from "../lib/format.js";

// Step 1: the user commits to a prediction before the reveal.
export default function PredictionGate({ scenario, min, guess, onGuess }) {
  return (
    <div className="predict">
      <div className="tag">Step 1 of 3</div>
      <p className="q">
        {scenario.person} pays only the minimum (~<strong>{money(min)}/mo</strong>). Does she beat
        the 0% deadline?
      </p>
      <div className="opts">
        {GUESS_OPTIONS.map((o) => (
          <button
            key={o.id}
            className={`opt ${guess === o.id ? "sel" : ""}`}
            onClick={() => onGuess(o.id)}
          >
            {o.label}
          </button>
        ))}
      </div>
      <p className="hint">Commit to a guess first — the reveal lands harder when you do.</p>
    </div>
  );
}
