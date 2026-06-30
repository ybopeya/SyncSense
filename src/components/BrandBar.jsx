// Synchrony-flavored top bar. Clicking the wordmark returns home.
export default function BrandBar({ onHome }) {
  return (
    <header className="bar">
      <button className="wordmark" onClick={onHome}>
        <span className="mark" /> synchrony
      </button>
      <span className="feature">SyncSense</span>
      <span className="demo">Demo</span>
    </header>
  );
}
