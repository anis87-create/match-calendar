import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, updateMatch } from "../features/matches/matchesSlice";
import { clearEditing } from "../features/ui/uiSlice";
import { getTeam } from "../utils/teams";
import { leagueNames } from "../utils/leagues";

const today = new Date().toISOString().split("T")[0];

export default function AddMatchForm() {
  const dispatch = useDispatch();
  const editingId = useSelector((s) => s.ui.editingId);
  const matchToEdit = useSelector((s) => s.matches.items.find((m) => m.id === editingId));
  const favoriteTeams = useSelector((s) => s.profile.favoriteTeams);
  const favoriteLeagues = useSelector((s) => s.profile.favoriteLeagues);

  const defaultLeague = favoriteLeagues[0] || "other";
  const emptyForm = { teams: "", league: defaultLeague, date: today, time: "", type: favoriteTeams[0] || "important", channel: "" };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (matchToEdit) {
      setForm({
        teams: matchToEdit.teams,
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
    if (!form.teams.trim() || !form.date || !form.time) {
      alert("Veuillez remplir les équipes, la date et l'heure");
      return;
    }
    if (editingId !== null) {
      dispatch(updateMatch({ id: editingId, ...form }));
      dispatch(clearEditing());
    } else {
      dispatch(addMatch(form));
      setForm((prev) => ({ ...emptyForm, date: prev.date, type: prev.type }));
    }
  }

  function handleCancel() {
    dispatch(clearEditing());
    setForm(emptyForm);
  }

  const isEditing = editingId !== null;

  return (
    <div className="add-form">
      <div className="form-title">
        <span>{isEditing ? "Modifier le match" : "Ajouter un match"}</span>
        {isEditing && <span className="mode">{matchToEdit?.teams}</span>}
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Équipes</label>
          <input name="teams" value={form.teams} onChange={handleChange} placeholder="Ex : CAB vs EST" />
        </div>
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
      </div>

      <div className="form-grid-3">
        <div className="form-group">
          <label>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Heure</label>
          <input name="time" type="time" value={form.time} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Équipe concernée</label>
          <select name="type" value={form.type} onChange={handleChange}>
            {favoriteTeams.map((id) => {
              const team = getTeam(id);
              return <option key={id} value={id}>{team ? team.name : id}</option>;
            })}
            <option value="important">⭐ Grand match</option>
            <option value="other">Autre</option>
          </select>
        </div>
      </div>

      <div className="form-group" style={{ marginBottom: "8px" }}>
        <label>Chaîne (optionnel)</label>
        <input name="channel" value={form.channel} onChange={handleChange} placeholder="Ex : beIN Sports 1" />
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
