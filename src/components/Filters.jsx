import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/ui/uiSlice";
import { getTeam } from "../utils/teams";

const FIXED_FILTERS = [
  { key: "all", label: "Tous" },
  { key: "important", label: "⭐ Grands matchs" },
];

export default function Filters() {
  const dispatch = useDispatch();
  const current = useSelector((s) => s.ui.currentFilter);
  const favoriteTeams = useSelector((s) => s.profile.favoriteTeams);

  return (
    <div className="filters">
      {/* Dynamic team filters */}
      {favoriteTeams.map((id) => {
        const team = getTeam(id);
        const label = team ? team.name.split(" ").slice(-1)[0] : id; // short name
        return (
          <button
            key={id}
            className={`filter-btn${current === id ? " active" : ""}`}
            style={current === id && team ? { background: team.color, borderColor: team.color } : {}}
            onClick={() => dispatch(setFilter(id))}
          >
            {label}
          </button>
        );
      })}

      {/* Fixed filters */}
      {FIXED_FILTERS.map((f) => (
        <button
          key={f.key}
          className={`filter-btn${current === f.key ? " active" : ""}`}
          onClick={() => dispatch(setFilter(f.key))}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
