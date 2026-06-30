import { useMemo, useState } from "react";
import { buildQuestions } from "../lib/Questions.js";

// Steps 1: a short sequence of predictions, each with an immediate "why",
// that builds intuition before the chart is revealed. Calls onComplete with
// the first answer's id (used for the verdict recap) once all are answered.
export default function PredictionGate({ scenario, onComplete }) {
  const questions = useMemo(() => buildQuestions(scenario), [scenario]);
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState(null); // index picked for current step
  const [firstGuess, setFirstGuess] = useState(null); // id of the Q1 answer

  const q = questions[step];
  const answered = chosen !== null;
  const isLast = step === questions.length - 1;
  const isRight = answered && chosen === q.correctIndex;

  function choose(i) {
    if (answered) return;
    setChosen(i);
    if (step === 0) setFirstGuess(q.options[i].id);
  }
  function next() {
    if (isLast) {
      onComplete(firstGuess);
    } else {
      setStep(step + 1);
      setChosen(null);
    }
  }

  return (
    <div className="predict">
      <div className="qcount">Step 1 of 3 · Build your intuition</div>
      <div className="qdots">
        {questions.map((_, i) => (
          <span key={i} className={`qdot ${i < step ? "done" : ""} ${i === step ? "on" : ""}`} />
        ))}
      </div>

      <p className="q">{q.prompt}</p>

      <div className="opts">
        {q.options.map((o, i) => {
          let cls = "opt";
          if (answered && i === q.correctIndex) cls += " correct";
          else if (answered && i === chosen) cls += " wrong";
          return (
            <button key={o.id} className={cls} disabled={answered} onClick={() => choose(i)}>
              {o.label}
            </button>
          );
        })}
      </div>

      {answered ? (
        <>
          <div className="explain">
            <b className={isRight ? "right" : "wrong"}>{isRight ? "Right." : "Not quite."}</b>
            {q.explain}
          </div>
          <button className="qnext" onClick={next}>
            {isLast ? "See what happens →" : "Next question →"}
          </button>
        </>
      ) : (
        <p className="hint">
          Question {step + 1} of {questions.length} — take your best guess. It makes the reveal stick.
        </p>
      )}
    </div>
  );
}