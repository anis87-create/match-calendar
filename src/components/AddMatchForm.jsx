import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMatch, updateMatch } from "../features/matches/matchesSlice";
import { clearEditing } from "../features/ui/uiSlice";

const today = new Date().toISOString().split("T")[0];

const emptyForm = { teams: "", league: "ucl", date: today, time: "", type: "inter", channel: "" };

export default function AddMatchForm() {
  const dispatch = useDispatch();
  const editingId = useSelector((s) => s.ui.editingId);
  const matchToEdit = useSelector((s) => s.matches.items.find((m) => m.id === editingId));

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
      setForm(emptyForm);
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
      setForm({ ...emptyForm, date: form.date });
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
            <optgroup label="Coupes européennes">
              <option value="ucl">Ligue des Champions UEFA</option>
              <option value="uel">Europa League</option>
              <option value="uecl">Conference League</option>
            </optgroup>
            <optgroup label="Championnats">
              <option value="serie">Serie A (Italie)</option>
              <option value="liga">Liga (Espagne)</option>
              <option value="pl">Premier League (Angleterre)</option>
              <option value="bundesliga">Bundesliga (Allemagne)</option>
              <option value="ligue1fr">Ligue 1 (France)</option>
              <option value="ligue1">Ligue 1 (Tunisie)</option>
            </optgroup>
            <optgroup label="Coupes nationales">
              <option value="coppa">Coupe d'Italie</option>
              <option value="coparey">Coupe du Roi (Espagne)</option>
              <option value="facup">FA Cup (Angleterre)</option>
              <option value="carabaocup">Carabao Cup (Angleterre)</option>
              <option value="dfbpokal">Coupe d'Allemagne (DFB Pokal)</option>
              <option value="coupefr">Coupe de France</option>
              <option value="cuptun">Coupe de Tunisie</option>
            </optgroup>
            <optgroup label="Afrique &amp; Monde">
              <option value="caf">Ligue des Champions CAF</option>
              <option value="wcq_afr">Qualifications CDM — Afrique</option>
              <option value="wcq_eur">Qualifications CDM — Europe</option>
              <option value="wcq_asi">Qualifications CDM — Asie</option>
              <option value="wcq_sam">Qualifications CDM — Amérique du Sud</option>
              <option value="wc">Coupe du Monde</option>
              <option value="friendly">Match amical</option>
              <option value="other">Autre</option>
            </optgroup>
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
          <label>Équipe favorite</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="inter">Inter Milan</option>
            <option value="cab">CAB</option>
            <option value="tunisie">Équipe de Tunisie</option>
            <option value="important">Match important</option>
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
