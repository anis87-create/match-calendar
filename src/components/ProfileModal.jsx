import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveProfile, resetProfile } from "../features/profile/profileSlice";
import { leagueNames } from "../utils/leagues";

const TEAMS = [
  { value: "inter", label: "Inter Milan", color: "#003399" },
  { value: "cab", label: "CAB", color: "#ccaa00" },
  { value: "tunisie", label: "Équipe de Tunisie", color: "#cc0000" },
];

const LEAGUE_GROUPS = [
  { group: "Coupes européennes", leagues: ["ucl", "uel", "uecl"] },
  { group: "Championnats", leagues: ["serie", "liga", "pl", "bundesliga", "ligue1fr", "ligue1"] },
  { group: "Coupes nationales", leagues: ["coppa", "coparey", "facup", "carabaocup", "dfbpokal", "coupefr", "cuptun"] },
  { group: "Afrique & Monde", leagues: ["caf", "wcq_afr", "wcq_eur", "wc", "friendly"] },
];

export default function ProfileModal({ onClose }) {
  const dispatch = useDispatch();
  const profile = useSelector((s) => s.profile);

  const [name, setName] = useState(profile.name);
  const [favoriteTeams, setFavoriteTeams] = useState(profile.favoriteTeams);
  const [favoriteLeagues, setFavoriteLeagues] = useState(profile.favoriteLeagues);

  function toggleTeam(value) {
    setFavoriteTeams((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    );
  }

  function toggleLeague(value) {
    setFavoriteLeagues((prev) =>
      prev.includes(value) ? prev.filter((l) => l !== value) : [...prev, value]
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

        <div style={{ marginBottom: "12px" }}>
          <div className="modal-section-title">Équipes favorites <span className="modal-section-hint">(Incontournable)</span></div>
          <div className="setup-team-grid">
            {TEAMS.map((t) => (
              <button
                key={t.value}
                className={`setup-team-btn${favoriteTeams.includes(t.value) ? " selected" : ""}`}
                style={favoriteTeams.includes(t.value) ? { borderColor: t.color, background: t.color + "18" } : {}}
                onClick={() => toggleTeam(t.value)}
              >
                <span className="setup-team-check">{favoriteTeams.includes(t.value) ? "✓" : ""}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <div className="modal-section-title">Compétitions favorites <span className="modal-section-hint">(À regarder)</span></div>
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
