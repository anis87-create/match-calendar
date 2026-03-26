import { useState, useEffect, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch } from "../features/matches/matchesSlice";
import { fetchAllFixtures } from "../services/footballApi";
import { scoredAndSorted, markAlreadyAdded } from "../utils/suggestionPriority";
import { leagueNames } from "../utils/leagues";
import { resolveTeam } from "../utils/teams";

function getJ2Date() {
  const d = new Date();
  d.setDate(d.getDate() + 2);
  return d.toISOString().split("T")[0];
}

function formatDateLabel(dateStr) {
  const d = new Date(dateStr + "T12:00:00");
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const months = [
    "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
    "Juil", "Août", "Sep", "Oct", "Nov", "Déc",
  ];
  return `${days[d.getDay()]} ${d.getDate()} ${months[d.getMonth()]}`;
}

export default function SuggestionsModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const profile = useSelector((s) => s.profile);
  const existingMatches = useSelector((s) => s.matches.items);

  const [date, setDate] = useState(getJ2Date);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Raw scored fixtures — no "already added" mark here to avoid re-fetching on add
  const [rawSuggestions, setRawSuggestions] = useState([]);

  // Recompute "already added" marks whenever Redux state changes — no API call
  const suggestions = useMemo(
    () => markAlreadyAdded(rawSuggestions, existingMatches),
    [rawSuggestions, existingMatches]
  );

  const loadSuggestions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await fetchAllFixtures(date);
      setRawSuggestions(scoredAndSorted(raw, profile));
    } catch {
      setError("Impossible de charger les matchs. Vérifie ta connexion.");
    } finally {
      setLoading(false);
    }
  }, [date, profile]); // no existingMatches → no re-fetch on add

  useEffect(() => {
    if (isOpen) loadSuggestions();
  }, [isOpen, loadSuggestions]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  function handleAdd(s) {
    const favTeams = profile.favoriteTeams ?? [];
    let type = "important";
    if (favTeams.includes(s.team1Id)) type = s.team1Id;
    else if (favTeams.includes(s.team2Id)) type = s.team2Id;

    dispatch(
      addMatch({
        team1Id: s.team1Id,
        team2Id: s.team2Id,
        teams: `${s.team1Name} vs ${s.team2Name}`,
        league: s.league,
        date: s.date,
        time: s.time,
        type,
        channel: "",
      })
    );
    // alreadyAdded is recomputed automatically via useMemo when Redux state updates
  }

  if (!isOpen) return null;

  const prio1 = suggestions.filter((s) => s.score >= 90);
  const prio2 = suggestions.filter((s) => s.score >= 65 && s.score < 90);
  const prio3 = suggestions.filter((s) => s.score < 65);

  return (
    <div className="sug-overlay" onClick={onClose}>
      <div className="sug-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sug-header">
          <span className="sug-header-title">
            ✨ Suggestions — {formatDateLabel(date)}
          </span>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="sug-controls">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="sug-date-input"
          />
          <button
            className="sug-refresh-btn"
            onClick={loadSuggestions}
            disabled={loading}
          >
            {loading ? "..." : "↻ Actualiser"}
          </button>
        </div>

        <div className="sug-body">
          {loading && (
            <div className="sug-loading">
              <span className="sug-spinner" />
              Chargement des matchs…
            </div>
          )}

          {!loading && error && (
            <div className="sug-error">
              <span>{error}</span>
              <button className="sug-retry-btn" onClick={loadSuggestions}>
                Réessayer
              </button>
            </div>
          )}

          {!loading && !error && suggestions.length === 0 && (
            <div className="sug-empty">Aucun match trouvé pour cette date.</div>
          )}

          {!loading && !error && prio1.length > 0 && (
            <SugSection
              title="Priorité 1 — Incontournables"
              colorClass="sug-p1"
              items={prio1}
              onAdd={handleAdd}
            />
          )}
          {!loading && !error && prio2.length > 0 && (
            <SugSection
              title="Priorité 2 — Grands matchs"
              colorClass="sug-p2"
              items={prio2}
              onAdd={handleAdd}
            />
          )}
          {!loading && !error && prio3.length > 0 && (
            <SugSection
              title="Priorité 3 — Si disponible"
              colorClass="sug-p3"
              items={prio3}
              onAdd={handleAdd}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function SugSection({ title, colorClass, items, onAdd }) {
  return (
    <div className="sug-section">
      <div className={`sug-section-title ${colorClass}`}>{title}</div>
      {items.map((s) => (
        <SugCard key={s.apiFixtureId} s={s} onAdd={onAdd} />
      ))}
    </div>
  );
}

function SugCard({ s, onAdd }) {
  const t1 = resolveTeam(s.team1Id);
  const t2 = resolveTeam(s.team2Id);
  const t1Name = t1?.name ?? s.team1Name;
  const t2Name = t2?.name ?? s.team2Name;
  const lName = leagueNames[s.league] ?? s.leagueName;

  return (
    <div className={`sug-card${s.alreadyAdded ? " sug-card-added" : ""}`}>
      <div className="sug-score-badge">{s.score}</div>

      <div className="sug-card-info">
        <div className="sug-card-teams">
          <TeamDot color={t1?.color} logo={t1?.logo} name={t1Name} />
          <span className="sug-team-name">{t1Name}</span>
          <span className="sug-vs">vs</span>
          <TeamDot color={t2?.color} logo={t2?.logo} name={t2Name} />
          <span className="sug-team-name">{t2Name}</span>
        </div>
        <div className="sug-card-meta">
          <span className="sug-league">{lName}</span>
          <span className="sug-dot">·</span>
          <span className="sug-time">{s.time}</span>
        </div>
      </div>

      <div className="sug-card-action">
        {s.alreadyAdded ? (
          <span className="sug-added-badge">✓ Ajouté</span>
        ) : (
          <button className="sug-add-btn" onClick={() => onAdd(s)}>
            + Ajouter
          </button>
        )}
      </div>
    </div>
  );
}

function TeamDot({ color, logo, name }) {
  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className="sug-team-flag"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
    );
  }
  return (
    <span
      className="sug-team-dot"
      style={{ background: color ?? "#888" }}
    />
  );
}
