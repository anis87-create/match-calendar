import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, updateMatch } from "../features/matches/matchesSlice";
import { clearEditing } from "../features/ui/uiSlice";
import { resolveTeam, TEAMS_BY_GROUP } from "../utils/teams";
import { leagueNames } from "../utils/leagues";
import TeamLogo from "./TeamLogo";

const today = new Date().toISOString().split("T")[0];

// Pays les plus courants pour les clubs inconnus
const POPULAR_COUNTRIES = [
  { cc: "tn", name: "Tunisie" }, { cc: "dz", name: "Algérie" },
  { cc: "ma", name: "Maroc" },   { cc: "eg", name: "Égypte" },
  { cc: "sn", name: "Sénégal" }, { cc: "ng", name: "Nigeria" },
  { cc: "cm", name: "Cameroun" },{ cc: "gh", name: "Ghana" },
  { cc: "sa", name: "Arabie S." },{ cc: "qa", name: "Qatar" },
  { cc: "ae", name: "EAU" },     { cc: "iq", name: "Irak" },
  { cc: "lb", name: "Liban" },   { cc: "ps", name: "Palestine" },
  { cc: "sy", name: "Syrie" },   { cc: "jo", name: "Jordanie" },
  { cc: "fr", name: "France" },  { cc: "es", name: "Espagne" },
  { cc: "de", name: "Allemagne" },{ cc: "gb-eng", name: "Angleterre" },
  { cc: "it", name: "Italie" },  { cc: "pt", name: "Portugal" },
  { cc: "nl", name: "Pays-Bas" },{ cc: "be", name: "Belgique" },
  { cc: "br", name: "Brésil" },  { cc: "ar", name: "Argentine" },
  { cc: "us", name: "USA" },     { cc: "mx", name: "Mexique" },
  { cc: "jp", name: "Japon" },   { cc: "kr", name: "Corée S." },
  { cc: "za", name: "Afr. Sud" },{ cc: "ci", name: "Côte d'Iv." },
];

const FLAG_BASE = "https://flagicons.lipis.dev/flags/1x1/";

// Décode un ID custom : "__CC|Nom" ou "__Nom"
function parseCustomId(id) {
  if (!id?.startsWith("__")) return null;
  const rest = id.slice(2);
  const pipe = rest.indexOf("|");
  if (pipe > -1) return { cc: rest.slice(0, pipe), name: rest.slice(pipe + 1) };
  return { cc: null, name: rest };
}

function TeamSelect({ value, onChange, placeholder }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [pendingCustom, setPendingCustom] = useState(null); // {name, cc}
  const ref = useRef(null);

  const selected = resolveTeam(value);
  const custom = parseCustomId(value);

  const filtered = TEAMS_BY_GROUP.map((g) => ({
    ...g,
    teams: g.teams.filter((t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      g.group.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((g) => g.teams.length > 0);

  useEffect(() => {
    function handleOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
        setPendingCustom(null);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  function startCustom() {
    if (!query.trim()) return;
    setPendingCustom({ name: query.trim(), cc: null });
    setQuery("");
  }

  function confirmCustom(cc) {
    const name = pendingCustom.name;
    onChange(cc ? `__${cc}|${name}` : `__${name}`);
    setOpen(false);
    setPendingCustom(null);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !pendingCustom) startCustom();
    if (e.key === "Escape") { setOpen(false); setPendingCustom(null); }
  }

  return (
    <div className="team-select" ref={ref}>
      <div
        className={`team-select-trigger${open ? " open" : ""}`}
        onClick={() => { setOpen((o) => !o); setPendingCustom(null); }}
      >
        {selected ? (
          <>
            <TeamLogo team={selected} size={20} />
            <span className="team-select-name">
              {selected.name}
              {custom && !custom.cc && <span className="team-custom-badge">✏️</span>}
            </span>
          </>
        ) : (
          <span className="team-select-placeholder">{placeholder}</span>
        )}
        <span className="team-select-arrow">{open ? "▴" : "▾"}</span>
      </div>

      {open && (
        <div className="team-select-dropdown">

          {/* Étape 2 : choisir le pays pour une équipe inconnue */}
          {pendingCustom ? (
            <div className="custom-country-picker">
              <div className="custom-country-title">
                <strong>"{pendingCustom.name}"</strong> — choisir le pays&nbsp;:
              </div>
              <div className="custom-country-grid">
                {POPULAR_COUNTRIES.map(({ cc, name }) => (
                  <button
                    key={cc}
                    className="custom-country-btn"
                    title={name}
                    onClick={() => confirmCustom(cc)}
                  >
                    <img
                      src={`${FLAG_BASE}${cc}.svg`}
                      alt={name}
                      width={28}
                      height={19}
                      style={{ objectFit: "cover", borderRadius: 2 }}
                    />
                  </button>
                ))}
              </div>
              <button className="custom-country-skip" onClick={() => confirmCustom(null)}>
                Sans drapeau
              </button>
            </div>
          ) : (
            <>
              {/* Étape 1 : recherche + saisie libre */}
              <input
                className="team-select-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher ou saisir un nom..."
                autoFocus
                onClick={(e) => e.stopPropagation()}
              />

              <div className="team-select-list">
                {query.trim() && (
                  <div className="team-option team-option-custom" onClick={startCustom}>
                    <span className="team-custom-icon">✏️</span>
                    <span>Utiliser <strong>"{query.trim()}"</strong></span>
                    <span className="team-option-hint">→ choisir pays</span>
                  </div>
                )}

                {filtered.map((g) => (
                  <div key={g.group}>
                    <div className="team-group-header">{g.group}</div>
                    {g.teams.map((t) => (
                      <div
                        key={t.id}
                        className={`team-option${value === t.id ? " selected" : ""}`}
                        onClick={() => {
                          onChange(t.id);
                          setOpen(false);
                          setQuery("");
                        }}
                      >
                        <TeamLogo team={t} size={18} />
                        <span>{t.name}</span>
                        {value === t.id && <span className="team-option-check">✓</span>}
                      </div>
                    ))}
                  </div>
                ))}

                {!filtered.length && !query.trim() && (
                  <div className="team-select-empty">Saisir un nom pour rechercher</div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function AddMatchForm() {
  const dispatch = useDispatch();
  const editingId = useSelector((s) => s.ui.editingId);
  const matchToEdit = useSelector((s) => s.matches.items.find((m) => m.id === editingId));
  const favoriteTeams = useSelector((s) => s.profile.favoriteTeams);
  const favoriteLeagues = useSelector((s) => s.profile.favoriteLeagues);

  const defaultLeague = favoriteLeagues[0] || "other";
  const emptyForm = {
    team1Id: "",
    team2Id: "",
    league: defaultLeague,
    date: today,
    time: "",
    type: favoriteTeams[0] || "important",
    channel: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (matchToEdit) {
      setForm({
        team1Id: matchToEdit.team1Id || "",
        team2Id: matchToEdit.team2Id || "",
        league: matchToEdit.league,
        date: matchToEdit.date,
        time: matchToEdit.time,
        type: matchToEdit.type,
        channel: matchToEdit.channel || "",
      });
    } else {
      setForm((prev) => ({ ...emptyForm, date: prev.date }));
    }
  }, [matchToEdit]);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit() {
    if (!form.team1Id || !form.team2Id) {
      alert("Veuillez choisir l'Équipe 1 et l'Équipe 2");
      return;
    }
    if (!form.date || !form.time) {
      alert("Veuillez remplir la date et l'heure");
      return;
    }
    const t1 = resolveTeam(form.team1Id);
    const t2 = resolveTeam(form.team2Id);
    const teamsStr = `${t1.name} vs ${t2.name}`;
    const payload = { ...form, teams: teamsStr };

    if (editingId !== null) {
      dispatch(updateMatch({ id: editingId, ...payload }));
      dispatch(clearEditing());
    } else {
      dispatch(addMatch(payload));
      setForm((prev) => ({ ...emptyForm, date: prev.date, type: prev.type }));
    }
  }

  function handleCancel() {
    dispatch(clearEditing());
    setForm(emptyForm);
  }

  const isEditing = editingId !== null;
  const t1 = resolveTeam(form.team1Id);
  const t2 = resolveTeam(form.team2Id);

  return (
    <div className="add-form">
      <div className="form-title">
        <span>{isEditing ? "Modifier le match" : "Ajouter un match"}</span>
        {isEditing && t1 && t2 && (
          <span className="mode">{t1.name} vs {t2.name}</span>
        )}
      </div>

      <div className="form-teams-row">
        <div className="form-group">
          <label>Équipe 1</label>
          <TeamSelect
            value={form.team1Id}
            onChange={(id) => setForm((p) => ({ ...p, team1Id: id }))}
            placeholder="Choisir l'équipe 1"
          />
        </div>

        <div className="form-vs-separator">
          {t1 && t2 ? (
            <div className="form-vs-preview">
              <TeamLogo team={t1} size={24} />
              <span>vs</span>
              <TeamLogo team={t2} size={24} />
            </div>
          ) : (
            <span className="form-vs-label">vs</span>
          )}
        </div>

        <div className="form-group">
          <label>Équipe 2</label>
          <TeamSelect
            value={form.team2Id}
            onChange={(id) => setForm((p) => ({ ...p, team2Id: id }))}
            placeholder="Choisir l'équipe 2"
          />
        </div>
      </div>

      <div className="form-grid" style={{ marginTop: 8 }}>
        <div className="form-group">
          <label>Compétition</label>
          <select name="league" value={form.league} onChange={handleChange}>
            {favoriteLeagues.length > 0 && (
              <optgroup label="Mes compétitions">
                {favoriteLeagues.map((l) => (
                  <option key={l} value={l}>{leagueNames[l] ?? l}</option>
                ))}
              </optgroup>
            )}
            <option value="other">Autre compétition</option>
          </select>
        </div>
        <div className="form-group">
          <label>Équipe concernée</label>
          <select name="type" value={form.type} onChange={handleChange}>
            {favoriteTeams.map((id) => {
              const team = resolveTeam(id);
              return <option key={id} value={id}>{team ? team.name : id}</option>;
            })}
            <option value="important">⭐ Grand match</option>
          </select>
        </div>
      </div>

      <div className="form-grid-3" style={{ marginTop: 8 }}>
        <div className="form-group">
          <label>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Heure</label>
          <input name="time" type="time" value={form.time} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Chaîne (optionnel)</label>
          <input name="channel" value={form.channel} onChange={handleChange} placeholder="beIN Sports 1" />
        </div>
      </div>

      <div className="btn-row">
        <button className="add-btn" onClick={handleSubmit}>
          {isEditing ? "Enregistrer" : "Ajouter le match"}
        </button>
        {isEditing && (
          <button className="cancel-btn" onClick={handleCancel}>Annuler</button>
        )}
      </div>
    </div>
  );
}
