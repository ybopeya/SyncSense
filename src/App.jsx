import { useState } from "react";
import BrandBar from "./components/BrandBar.jsx";
import Home from "./components/Home.jsx";
import Simulator from "./components/Simulator.jsx";

// Top-level navigation: home (scenario picker) <-> simulator.
export default function App() {
  const [view, setView] = useState("home");
  const [scenario, setScenario] = useState(null);

  function open(s) {
    setScenario(s);
    setView("sim");
  }

  return (
    <div className="app">
      <BrandBar onHome={() => setView("home")} />
      {view === "home" && <Home onOpen={open} />}
      {view === "sim" && scenario && (
        // key={scenario.id} -> Simulator state resets when the scenario changes.
        <Simulator key={scenario.id} scenario={scenario} onBack={() => setView("home")} />
      )}
    </div>
  );
}
