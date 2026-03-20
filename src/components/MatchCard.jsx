import { useDispatch, useSelector } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteMatch, toggleWatched } from "../features/matches/matchesSlice";
import { setEditingId } from "../features/ui/uiSlice";
import { leagueNames, leaguePillClass, typePillClass, typeLabel, months } from "../utils/leagues";
import { prioText, prioClass, prioStripClass } from "../utils/scoring";

export default function MatchCard({ match, plan }) {
  const dispatch = useDispatch();
  const editingId = useSelector((s) => s.ui.editingId);
  const isEditing = editingId === match.id;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: match.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : match.watched && !isEditing ? 0.5 : 1,
  };

  const [, mo, day] = match.date.split("-");
  const month = months[parseInt(mo) - 1];
  const prio = plan?.prio ?? 0;
  const watch = plan?.watch ?? false;

  function handleEdit() {
    dispatch(setEditingId(match.id));
    document.querySelector(".add-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`match-card ${match.type}${isEditing ? " editing" : ""}`}
    >
      <span className="drag-handle" {...attributes} {...listeners}>⠿⠿</span>

      <div className="match-date">
        <div className="day">{day}</div>
        <div className="month">{month}</div>
      </div>

      <div className="match-info">
        <div className="match-teams">{match.teams}</div>
        <div className="match-meta">
          {leagueNames[match.league]}{match.channel ? ` · ${match.channel}` : ""}
        </div>
        <div className={`prio-label ${prioClass[prio]}`}>
          {watch ? "✔ " : "✖ "}{prioText[prio]}
        </div>
      </div>

      <div className="match-right">
        <div className="match-time">{match.time}</div>
        <span className={`pill ${typePillClass[match.type]}`}>{typeLabel[match.type]}</span>
        <span className={`pill ${leaguePillClass[match.league]}`} style={{ fontSize: "10px" }}>
          {leagueNames[match.league]}
        </span>
        <button
          className={`watched-btn${match.watched ? " done" : ""}`}
          onClick={() => dispatch(toggleWatched(match.id))}
        >
          {match.watched ? "Regardé" : "À regarder"}
        </button>
      </div>

      <div className="action-btns">
        <button className="edit-btn" onClick={handleEdit}>Modifier</button>
        <button className="delete-btn" onClick={() => dispatch(deleteMatch(match.id))}>✕</button>
      </div>

      <div className={`prio-strip ${prioStripClass[prio]}`}></div>
    </div>
  );
}
