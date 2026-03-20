import { useSelector } from "react-redux";

export default function Stats() {
  const items = useSelector((s) => s.matches.items);
  const favoriteTeams = useSelector((s) => s.profile.favoriteTeams);

  const total = items.length;
  const favorites = items.filter((m) => favoriteTeams.includes(m.type)).length;
  const important = items.filter((m) => m.type === "important").length;
  const watched = items.filter((m) => m.watched).length;

  return (
    <div className="stats">
      <div className="stat-card">
        <div className="stat-num">{total}</div>
        <div className="stat-label">Total</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{favorites}</div>
        <div className="stat-label">Mes équipes</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{important}</div>
        <div className="stat-label">Grands matchs</div>
      </div>
      <div className="stat-card">
        <div className="stat-num">{watched}</div>
        <div className="stat-label">Regardés</div>
      </div>
    </div>
  );
}
