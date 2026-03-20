import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { saveProfile } from "../features/profile/profileSlice";
import { leagueNames } from "../utils/leagues";
import { TEAMS_BY_GROUP, ALL_TEAMS } from "../utils/teams";

const LEAGUE_GROUPS = [
  { group: "Coupes européennes", leagues: ["ucl", "uel", "uecl"] },
  { group: "Championnats", leagues: ["serie", "liga", "pl", "bundesliga", "ligue1fr", "ligue1"] },
  { group: "Coupes nationales", leagues: ["coppa", "coparey", "facup", "carabaocup", "dfbpokal", "coupefr", "cuptun"] },
  { group: "Afrique & Monde", leagues: ["caf", "wcq_afr", "wcq_eur", "wc", "friendly"] },
];

export default function SetupWizard() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);
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

  function handleFinish() {
    dispatch(saveProfile({ name: name.trim() || "Utilisateur", favoriteTeams, favoriteLeagues }));
  }

  return (
    <div className="setup-overlay">
      <div className="setup-card">
        <div className="setup-steps">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`setup-step-dot${step >= s ? " active" : ""}`} />
          ))}
        </div>

        {/* Step 1 — Nom */}
        {step === 1 && (
          <div className="setup-body">
            <div className="setup-icon">👋</div>
            <h2 className="setup-title">Bienvenue !</h2>
            <p className="setup-sub">Comment on t'appelle ?</p>
            <input
              className="setup-input"
              placeholder="Ton prénom..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && setStep(2)}
              autoFocus
            />
            <button className="setup-btn" onClick={() => setStep(2)}>Continuer →</button>
          </div>
        )}

        {/* Step 2 — Équipes */}
        {step === 2 && (
          <div className="setup-body setup-body-wide">
            <div className="setup-icon">⚽</div>
            <h2 className="setup-title">Tes équipes favorites</h2>
            <p className="setup-sub">Leurs matchs seront toujours <strong>Incontournables</strong></p>
            <input
              className="setup-input setup-search"
              placeholder="Rechercher une équipe..."
              value={teamSearch}
              onChange={(e) => setTeamSearch(e.target.value)}
            />
            {favoriteTeams.length > 0 && (
              <div className="setup-selected-chips">
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
            <div className="setup-leagues-scroll">
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
              {filteredGroups.length === 0 && (
                <div className="empty">Aucune équipe trouvée</div>
              )}
            </div>
            <div className="setup-nav">
              <button className="setup-btn-ghost" onClick={() => setStep(1)}>← Retour</button>
              <button className="setup-btn" onClick={() => setStep(3)}>Continuer →</button>
            </div>
          </div>
        )}

        {/* Step 3 — Compétitions */}
        {step === 3 && (
          <div className="setup-body setup-body-wide">
            <div className="setup-icon">🏆</div>
            <h2 className="setup-title">Tes compétitions</h2>
            <p className="setup-sub">Les matchs de ces compétitions seront <strong>À regarder</strong></p>
            <div className="setup-leagues-scroll">
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
            <div className="setup-nav">
              <button className="setup-btn-ghost" onClick={() => setStep(2)}>← Retour</button>
              <button className="setup-btn" onClick={handleFinish}>C'est parti 🚀</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
