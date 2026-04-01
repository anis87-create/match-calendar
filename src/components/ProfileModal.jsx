import { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile, resetProfile } from "../features/profile/profileSlice";
import { leagueNames } from "../utils/leagues";
import { TEAMS_BY_GROUP, ALL_TEAMS } from "../utils/teams";

const LEAGUE_GROUPS = [
  { group: "Coupes européennes", leagues: ["ucl", "uel", "uecl"] },
  { group: "Championnats", leagues: ["serie", "liga", "pl", "bundesliga", "ligue1fr", "spl", "ligue1", "ligue2"] },
  { group: "Coupes nationales", leagues: ["coppa", "coparey", "facup", "carabaocup", "dfbpokal", "coupefr", "cuptun"] },
  { group: "Afrique & Monde", leagues: ["caf", "wcq_afr", "wcq_eur", "wc", "friendly"] },
];

export default function ProfileModal({ onClose }) {
  const dispatch = useDispatch();
  const profile = useSelector((s) => s.profile);

  const [name, setName] = useState(profile.name);
  const [favoriteTeams, setFavoriteTeams] = useState(profile.favoriteTeams);
  const [favoriteLeagues, setFavoriteLeagues] = useState(profile.favoriteLeagues);
  const [teamSearch, setTeamSearch] = useState("");

  const filteredGroups = useMemo(() => {
    if (!teamSearch.trim()) return TEAMS_BY_GROUP;
    const q = teamSearch.toLowerCase();
    return TEAMS_BY_GROUP.map((g) => ({
      ...g,
      teams: g.teams.filter((t) => t.name.toLowerCase().includes(q)),
    })).filter((g) => g.teams.length > 0);
  }, [teamSearch]);

  function toggleTeam(id) {
    setFavoriteTeams((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  }

  function toggleLeague(id) {
    setFavoriteLeagues((prev) =>
      prev.includes(id) ? prev.filter((l) => l !== id) : [...prev, id]
    );
  }

  function handleSave() {
    dispatch(saveProfile({ name: name.trim() || "Utilisateur", favoriteTeams, favoriteLeagues }));
    onClose();
  }

  function handleReset() {
    if (confirm("Recommencer la configuration ?")) {
      dispatch(resetProfile());
      onClose();
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Mon profil</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="form-group" style={{ marginBottom: "14px" }}>
          <label>Prénom</label>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ton prénom..." />
        </div>

        {/* Teams */}
        <div style={{ marginBottom: "14px" }}>
          <div className="modal-section-title">
            Équipes favorites <span className="modal-section-hint">(Incontournable)</span>
          </div>
          <input
            className="setup-input setup-search"
            style={{ marginBottom: "8px", textAlign: "left" }}
            placeholder="Rechercher une équipe..."
            value={teamSearch}
            onChange={(e) => setTeamSearch(e.target.value)}
          />
          {favoriteTeams.length > 0 && (
            <div className="setup-selected-chips" style={{ marginBottom: "8px" }}>
              {favoriteTeams.map((id) => {
                const team = ALL_TEAMS.find((t) => t.id === id);
                return (
                  <span
                    key={id}
                    className="setup-chip"
                    style={{ background: team?.color + "22", borderColor: team?.color, color: team?.color }}
                    onClick={() => toggleTeam(id)}
                  >
                    {team?.name} ✕
                  </span>
                );
              })}
            </div>
          )}
          <div className="setup-leagues-scroll modal-leagues">
            {filteredGroups.map(({ group, teams }) => (
              <div key={group} className="setup-league-group">
                <div className="setup-league-group-title">{group}</div>
                <div className="setup-league-grid">
                  {teams.map((t) => (
                    <button
                      key={t.id}
                      className={`setup-league-btn${favoriteTeams.includes(t.id) ? " selected" : ""}`}
                      style={favoriteTeams.includes(t.id) ? { background: t.color, borderColor: t.color, color: "#fff" } : {}}
                      onClick={() => toggleTeam(t.id)}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leagues */}
        <div style={{ marginBottom: "16px" }}>
          <div className="modal-section-title">
            Compétitions favorites <span className="modal-section-hint">(À regarder)</span>
          </div>
          <div className="setup-leagues-scroll modal-leagues">
            {LEAGUE_GROUPS.map(({ group, leagues }) => (
              <div key={group} className="setup-league-group">
                <div className="setup-league-group-title">{group}</div>
                <div className="setup-league-grid">
                  {leagues.map((l) => (
                    <button
                      key={l}
                      className={`setup-league-btn${favoriteLeagues.includes(l) ? " selected" : ""}`}
                      onClick={() => toggleLeague(l)}
                    >
                      {favoriteLeagues.includes(l) && <span className="setup-check">✓ </span>}
                      {leagueNames[l]}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="setup-btn-ghost" style={{ fontSize: "12px", color: "#aaa" }} onClick={handleReset}>
            Reconfigurer
          </button>
          <button className="setup-btn" onClick={handleSave}>Enregistrer</button>
        </div>
      </div>
    </div>
  );
}
