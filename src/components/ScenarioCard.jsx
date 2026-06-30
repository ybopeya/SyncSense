import CardChip from "./CardChip.jsx";
import { money } from "../lib/format.js";

// A single clickable scenario on the home page.
export default function ScenarioCard({ scenario, onOpen }) {
  return (
    <button className="scard" onClick={() => onOpen(scenario)}>
      {scenario.badge && <span className="badge">{scenario.badge}</span>}
      <CardChip scenario={scenario} />
      <div className="scard-body">
        <div className="scard-who">
          {scenario.person}, {scenario.age} · {scenario.context}
        </div>
        <div className="scard-buy">
          {money(scenario.principal)} for {scenario.item}
        </div>
        <dl className="terms">
          <div>
            <dt>Promo</dt>
            <dd>0% for {scenario.promoMonths} mo</dd>
          </div>
          <div>
            <dt>Then</dt>
            <dd>{scenario.apr}% APR</dd>
          </div>
          <div>
            <dt>Type</dt>
            <dd>Deferred interest</dd>
          </div>
        </dl>
      </div>
      <div className="scard-go">Run this scenario →</div>
    </button>
  );
}
