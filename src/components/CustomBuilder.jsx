import { useState } from "react";
import { CARDS } from "../data/cards.js";
import { money } from "../lib/format.js";
import CardChip from "./CardChip.jsx";

// "Try your own simulation" — pick a real Synchrony card (which fixes the APR
// and the promo lengths it actually offers), set the purchase and credit limit,
// then run it through the same Simulator the presets use.
export default function CustomBuilder({ initial, onRun, onBack }) {
  const startCard =
    (initial && CARDS.find((c) => c.name === initial.card)) || CARDS[0];

  const [cardId, setCardId] = useState(startCard.id);
  const [purchase, setPurchase] = useState(initial?.principal ?? startCard.defaultPurchase);
  const [limit, setLimit] = useState(initial?.creditLimit ?? startCard.defaultLimit);
  const [promo, setPromo] = useState(initial?.promoMonths ?? startCard.defaultPromo);

  const card = CARDS.find((c) => c.id === cardId);
  const preview = { tone: card.tone, icon: card.icon, issuer: "Synchrony Bank", card: card.name };

  // When the card changes, snap the other fields to that card's sensible
  // defaults so the APR and terms always stay coherent.
  function pickCard(id) {
    const c = CARDS.find((x) => x.id === id);
    setCardId(id);
    setPurchase(c.defaultPurchase);
    setLimit(c.defaultLimit);
    setPromo(c.defaultPromo);
  }

  const p = Number(purchase) || 0;
  const l = Number(limit) || 0;
  const overLimit = p > l && l > 0;
  const belowMin = p > 0 && p < card.minPurchase;
  const valid = p > 0 && l > 0;

  function run() {
    if (!valid) return;
    onRun({
      id: "custom-" + Date.now(), // unique so the Simulator remounts fresh each run
      custom: true,
      you: true,
      card: card.name,
      issuer: "Synchrony Bank",
      tone: card.tone,
      icon: card.icon,
      person: "You",
      item: card.item,
      principal: p,
      promoMonths: Number(promo),
      apr: card.apr,
      creditLimit: l,
    });
  }

  return (
    <main className="build">
      <button className="back" onClick={onBack}>
        ← All scenarios
      </button>

      <h1 className="build-title">Try your own simulation</h1>
      <p className="build-sub">
        Pick a real Synchrony card, plug in your numbers, and see how the deadline plays out. The APR
        and promo lengths come from the card you choose.
      </p>

      <div className="builder">
        <div className="builder-preview">
          <CardChip scenario={preview} />
          <div className="preview-terms">
            <span>{card.apr}% APR after the promo</span>
            <span>Deferred interest · min. purchase {money(card.minPurchase)}</span>
          </div>
        </div>

        <label className="field">
          <span className="field-lbl">Card</span>
          <select value={cardId} onChange={(e) => pickCard(e.target.value)}>
            {CARDS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} — {c.apr}% APR
              </option>
            ))}
          </select>
        </label>

        <div className="field-row">
          <label className="field">
            <span className="field-lbl">Purchase amount</span>
            <div className="money-input">
              <span>$</span>
              <input
                type="number"
                min="0"
                step="50"
                value={purchase}
                onChange={(e) => setPurchase(e.target.value)}
              />
            </div>
            {belowMin && (
              <span className="field-hint warn">
                Deferred-interest promos on this card usually need a purchase of at least{" "}
                {money(card.minPurchase)}.
              </span>
            )}
          </label>

          <label className="field">
            <span className="field-lbl">Credit limit</span>
            <div className="money-input">
              <span>$</span>
              <input
                type="number"
                min="0"
                step="100"
                value={limit}
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
            {overLimit && (
              <span className="field-hint warn">
                That's above your limit — utilization would be over 100%.
              </span>
            )}
          </label>
        </div>

        <label className="field">
          <span className="field-lbl">Promo length (0% if paid in full)</span>
          <select value={promo} onChange={(e) => setPromo(e.target.value)}>
            {card.promos.map((m) => (
              <option key={m} value={m}>
                {m} months
              </option>
            ))}
          </select>
        </label>

        <button className="run" disabled={!valid} onClick={run}>
          Run my simulation →
        </button>
        <p className="build-foot">
          You'll set the monthly payment on the next screen. Estimate for learning only — not a credit
          decision.
        </p>
      </div>
    </main>
  );
}
