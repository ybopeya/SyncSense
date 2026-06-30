import CardIcon from "./CardIcon.jsx";

// The branded card label used on scenario cards and in the simulator header.
// size="sm" renders the compact version.
export default function CardChip({ scenario, size }) {
  return (
    <div className={`chip ${size === "sm" ? "sm" : ""}`} style={{ background: scenario.tone }}>
      <CardIcon type={scenario.icon} />
      <div className="chip-meta">
        <span>{scenario.issuer}</span>
        <strong>{scenario.card}</strong>
      </div>
    </div>
  );
}
