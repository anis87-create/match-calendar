import { useDispatch, useSelector } from "react-redux";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { deleteMatch } from "../features/matches/matchesSlice";
import { setEditingId } from "../features/ui/uiSlice";
import { leagueNames } from "../utils/leagues";
import { prioText, prioClass } from "../utils/scoring";
import { getTeam, resolveTeam } from "../utils/teams";

const SKIP = new Set(["de", "du", "d", "el", "al", "le", "la", "les", "the", "of", "et", "des"]);

function norm(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[''']/g, "");
}

function shortName(name) {
  if (!name || name.length <= 13) return name || "";
  const parts = name.split(/[\s\-\/]+/);
  if (parts.length <= 1) return name;
  const abbr = parts
    .filter(w => !SKIP.has(norm(w)))
    .map(w => w[0].toUpperCase())
    .join("");
  return abbr || name.slice(0, 5);
}
import { months } from "../utils/leagues";
import TeamLogo from "./TeamLogo";

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
  const prio = plan?.prio ?? 3;
  const watch = plan?.watch ?? false;

  // Resolve team info (type = favorite team)
  const team = getTeam(match.type);
  const isImportant = match.type === "important";
  const teamColor = team ? team.color : isImportant ? "#e24b4a" : "#999";
  const teamName = team ? team.name : isImportant ? "Grand match" : "Autre";

  // Team 1 & 2 logos (supports custom teams with "__" prefix)
  const team1 = match.team1Id ? resolveTeam(match.team1Id) : null;
  const team2 = match.team2Id ? resolveTeam(match.team2Id) : null;

  const pillStyle = { background: teamColor + "18", color: teamColor, border: `1px solid ${teamColor}33` };
  const cardBorderStyle = isEditing ? {} : { borderLeft: `3px solid ${teamColor}` };

  function handleEdit() {
    dispatch(setEditingId(match.id));
    document.querySelector(".add-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      ref={setNodeRef}
      style={{ ...style, ...cardBorderStyle }}
      className={`match-card${isEditing ? " editing" : ""}`}
    >
      <span className="drag-handle" {...attributes} {...listeners}>⠿⠿</span>

      <div className="match-date">
        <div className="day">{day}</div>
        <div className="month">{month}</div>
      </div>

      <div className="match-info">
        {team1 && team2 ? (
          <div className="match-teams-logos">
            {team1.id?.startsWith("nat_") && <TeamLogo team={team1} size={18} />}
            <span className="match-team-name">{shortName(team1.name)}</span>
            <span className="match-vs">vs</span>
            <span className="match-team-name">{shortName(team2.name)}</span>
            {team2.id?.startsWith("nat_") && <TeamLogo team={team2} size={18} />}
          </div>
        ) : (
          <div className="match-teams">{match.teams}</div>
        )}
        <div className="match-meta">
          {leagueNames[match.league] ?? match.league}{match.channel ? ` · ${match.channel}` : ""}
        </div>
        <div className={`prio-label ${prioClass[prio]}`}>
          {watch ? "✔ " : "✖ "}{prioText[prio]}
        </div>
      </div>

      <div className="match-right">
        <div className="match-time">{match.time}</div>
        <span className="pill" style={pillStyle}>{teamName}</span>
        <span className="pill" style={{ fontSize: "10px", background: "#f0f0f0", color: "#666" }}>
          {leagueNames[match.league] ?? match.league}
        </span>
      </div>

      <div className="action-btns">
        <button className="edit-btn" onClick={handleEdit}>Modifier</button>
        <button className="delete-btn" onClick={() => dispatch(deleteMatch(match.id))}>✕</button>
      </div>

      {/* Priority strip */}
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: "4px",
        borderRadius: "0 12px 12px 0",
        background: prio === 1 ? "#003399" : prio === 2 ? "#1e8449" : "#f57f17"
      }} />
    </div>
  );
}
