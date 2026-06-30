// Progress tracker: 1 Predict -> 2 See what happens -> 3 Find your payment.
const STEPS = ["Predict", "See what happens", "Find your payment"];

export default function Stepper({ phase }) {
  return (
    <div className="stepper">
      {STEPS.map((s, i) => (
        <div
          key={s}
          className={`step ${phase === i + 1 ? "active" : ""} ${phase > i + 1 ? "done" : ""}`}
        >
          <span>{phase > i + 1 ? "✓" : i + 1}</span>
          {s}
        </div>
      ))}
    </div>
  );
}
