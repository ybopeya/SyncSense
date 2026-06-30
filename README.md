# Beat the Deadline — Synchrony Deadline Coach

An interactive coach that shows first-time credit users the **deferred-interest trap**
on real Synchrony retail cards (CareCredit, MyLowe's, Ashley Advantage): "0% if paid
in full" purchases where missing the deadline posts *all* the interest retroactively
from day one.

Flow: **predict** the outcome → **see** the deadline play out → **find** the payment
that clears it in time. Includes a credit-score impact layer scoped honestly to the
one factor it actually models (this card's utilization).

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Requires Node 18+.

## Project structure

```
src/
├── main.jsx                  # entry point, mounts <App>
├── App.jsx                   # top-level nav: home <-> simulator
├── index.css                 # design tokens + all component styles
│
├── lib/                      # pure logic — no UI, easy to test or repoint
│   ├── simulate.js           # the deferred-interest engine (the core math)
│   ├── creditScore.js        # rule-based utilization -> score estimate
│   └── format.js             # money() / pct() helpers
│
├── data/                     # content you'll edit most
│   ├── scenarios.js          # the cards/purchases (add one = new scenario)
│   └── guesses.js            # prediction options
│
└── components/               # one component per file
    ├── BrandBar.jsx
    ├── Home.jsx              # hero + how-it-works + scenario picker
    ├── ScenarioCard.jsx
    ├── CardChip.jsx          # branded card label (shared)
    ├── CardIcon.jsx
    ├── Stepper.jsx           # 1 Predict / 2 See / 3 Find
    ├── Simulator.jsx         # composes one scenario's full flow
    ├── CliffChart.jsx        # the signature deadline-cliff SVG
    ├── StatStrip.jsx         # four-number outcome readout
    ├── PredictionGate.jsx    # step 1
    ├── PaymentFix.jsx        # steps 2 + 3 (verdict + slider)
    └── CreditScorePanel.jsx  # the "understanding" layer
```

## Where to extend

- **Add a scenario** → push an object to `src/data/scenarios.js`. Each needs
  `principal`, `promoMonths`, `apr`, `creditLimit`, plus display fields. It then
  appears on the home page and runs through the whole flow automatically.
- **Change the math** → `src/lib/simulate.js` is a pure function. Swap the mock
  numbers for live MySynchrony account values (balance, limit, APR, promo length)
  and it just works.
- **Tune the score model** → `src/lib/creditScore.js`. Repoint `scoreFromUtilization()`
  at a real score baseline when wired to an account.
- **Restyle** → all classes and design tokens live in `src/index.css`.

## Card terms

Representative new-account terms, current mid-2026 (APRs vary by creditworthiness):
Ashley Advantage™ 29.99% · MyLowe's Rewards 31.99% · CareCredit 32.99%. All issued
by Synchrony Bank.

## Disclaimer

A rule-based learning tool. Estimates only; not a credit decision, not financial advice.
