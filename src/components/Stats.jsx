import { useSelector } from "react-redux";

export default function Stats() {
  const items = useSelector((s) => s.matches.items);

  const total = items.length;
  const inter = items.filter((m) => m.type === "inter").length;
  const fav = items.filter((m) => m.type === "cab" || m.type === "tunisie").length;
  const watched = items.filter((m) => m.watched).length;

  return (
    <div className="stats">
      <div className="stat-card">
        <div className="stat-num">{total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{inter}</div>
        <div className="stat-label">Inter</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{fav}</div>
        <div className="stat-label">CAB / Tunisie</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{watched}</div>
        <div className="stat-label">Regardés</div>
      </div>
    </div>
  );
}
