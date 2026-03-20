import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveProfile } from "../features/profile/profileSlice";
import { leagueNames } from "../utils/leagues";

const TEAMS = [
  { value: "inter", label: "Inter Milan", color: "#003399" },
  { value: "cab", label: "CAB", color: "#ccaa00" },
  { value: "tunisie", label: "Équipe de Tunisie", color: "#cc0000" },
];

const LEAGUE_GROUPS = [
  {
    group: "Coupes européennes",
    leagues: ["ucl", "uel", "uecl"],
  },
  {
    group: "Championnats",
    leagues: ["serie", "liga", "pl", "bundesliga", "ligue1fr", "ligue1"],
  },
  {
    group: "Coupes nationales",
    leagues: ["coppa", "coparey", "facup", "carabaocup", "dfbpokal", "coupefr", "cuptun"],
  },
  {
    group: "Afrique & Monde",
    leagues: ["caf", "wcq_afr", "wcq_eur", "wc", "friendly"],
  },
];

export default function SetupWizard() {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [favoriteTeams, setFavoriteTeams] = useState([]);
  const [favoriteLeagues, setFavoriteLeagues] = useState([]);

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

  function handleFinish() {
    dispatch(saveProfile({ name: name.trim() || "Utilisateur", favoriteTeams, favoriteLeagues }));
  }

  return (
    <div className="setup-overlay">
      <div className="setup-card">

        {/* Step indicator */}
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
            <button className="setup-btn" onClick={() => setStep(2)}>
              Continuer →
            </button>
          </div>
        )}

        {/* Step 2 — Équipes */}
        {step === 2 && (
          <div className="setup-body">
            <div className="setup-icon">⚽</div>
            <h2 className="setup-title">Tes équipes favorites</h2>
            <p className="setup-sub">Leurs matchs seront toujours <strong>Incontournables</strong></p>
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
            <div className="setup-nav">
              <button className="setup-btn-ghost" onClick={() => setStep(1)}>← Retour</button>
              <button className="setup-btn" onClick={() => setStep(3)}>Continuer →</button>
            </div>
          </div>
        )}

        {/* Step 3 — Compétitions */}
        {step === 3 && (
          <div className="setup-body">
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
