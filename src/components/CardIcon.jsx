// Tiny inline icons for the branded card chips.
export default function CardIcon({ type }) {
  const common = {
    width: 22,
    height: 22,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (type === "sofa")
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3" />
        <path d="M3 11a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2" />
        <path d="M5 19v1M19 19v1" />
      </svg>
    );

  if (type === "fridge")
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <rect x="6" y="3" width="12" height="18" rx="2" />
        <path d="M6 10h12M9 6v1.5M9 13v2.5" />
      </svg>
    );

  if (type === "home")
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M4 11l8-6 8 6" />
        <path d="M6 10v9h12v-9" />
        <path d="M10 19v-5h4v5" />
      </svg>
    );
    if (type === "car")
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M3 13l1.6-4.6A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.4L21 13v3H3v-3Z" />
          <path d="M3 13h18M7 16h.01M17 16h.01M5 16v1.5M19 16v1.5" />
        </svg>
      );
  // tooth
  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M12 5c-1.5-1.2-3.5-1.6-5-1-2 .8-2.5 3-1.8 6 .4 1.7.3 3 .9 5 .4 1.4 1.6 1.6 2.2.3.5-1 .8-2.6 1.7-2.6s1.2 1.6 1.7 2.6c.6 1.3 1.8 1.1 2.2-.3.6-2 .5-3.3.9-5 .7-3 .2-5.2-1.8-6-1.5-.6-3.5-.2-5 1Z" />
    </svg>
  );
}
