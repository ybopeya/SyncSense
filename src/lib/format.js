// Display helpers shared across the app.

export const money = (n) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

export const pct = (n) => `${Math.round(n * 100)}%`;
