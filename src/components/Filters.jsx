import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../features/ui/uiSlice";

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "inter", label: "Inter" },
  { key: "cab", label: "CAB" },
  { key: "tunisie", label: "Tunisie" },
  { key: "important", label: "Importants" },
  { key: "upcoming", label: "À venir" },
  { key: "watched", label: "Regardés" },
  { key: "watch", label: "À regarder" },
];

export default function Filters() {
  const dispatch = useDispatch();
  const current = useSelector((s) => s.ui.currentFilter);

  return (
    <div className="filters">
      {FILTERS.map((f) => (
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
