import { SCENARIOS } from "../data/scenarios.js";
import ScenarioCard from "./ScenarioCard.jsx";

export default function Home({ onOpen }) {
  return (
    <main className="home">
      <div className="hero">
        <p className="eyebrow">For 0% promotional financing</p>
        <h1>Will you actually beat the deadline?</h1>
        <p className="lede">
          Cards like CareCredit, MyLowe's, and Ashley Advantage offer “no interest if paid in
          full.” Miss the date and <strong>all</strong> the interest comes back — from day one.
          Pick a real purchase and see how it plays out before it happens to you.
        </p>
      </div>

      <ol className="steps">
        <li>
          <span>1</span>
          <div>
            <b>Predict</b>the outcome of a real purchase
          </div>
        </li>
        <li>
          <span>2</span>
          <div>
            <b>See</b>the deadline play out, month by month
          </div>
        </li>
        <li>
          <span>3</span>
          <div>
            <b>Find</b>the payment that clears it in time
          </div>
        </li>
      </ol>

      <h2 className="choose">Choose a purchase to simulate</h2>
      <div className="cards">
        {SCENARIOS.map((s) => (
          <ScenarioCard key={s.id} scenario={s} onOpen={onOpen} />
        ))}
      </div>

      <p className="foot">
        Representative new-account terms for real Synchrony cards. Figures are for learning, not a
        credit decision.
      </p>
    </main>
  );
}
