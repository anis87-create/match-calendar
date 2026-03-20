import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { getTeam } from "../utils/teams";
import { badgeBg, badgeText, badgeBorder } from "../utils/colors";

export default function Header() {
  const profile = useSelector((s) => s.profile);
  const [showModal, setShowModal] = useState(false);

  const teams = profile.favoriteTeams.map((id) => getTeam(id)).filter(Boolean);

  // North African clubs → acronym (CAB, EST, CSS…)
  const ACRONYM_GROUPS = ["Tunisie", "Algérie", "Maroc", "Égypte"];
  // National teams → first 3 letters of country name (TUN, ALG, MAR…)
  const NATIONAL_GROUP = "Équipes nationales";
  // Prefixes to skip for European teams
  const SKIP_PREFIXES = ["FC", "AC", "AS", "SC", "RC", "SS", "US", "OGC", "AJ", "VfB", "VfL"];

  function badgeLabel(team) {
    if (team.group === NATIONAL_GROUP) {
      // "Équipe de Tunisie" → last significant word → first 3 letters → TUN
      const words = team.name.split(" ").filter((w) => w.length >= 3);
      const last = words[words.length - 1] || team.name;
      return last.slice(0, 3).toUpperCase();
    }
    if (ACRONYM_GROUPS.includes(team.group)) {
      // First letter of each significant word (skip "de", "du", "el"…)
      return team.name
        .split(" ")
        .filter((w) => w.length >= 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 4);
    }
    // European clubs: first 3 letters, skip common prefixes
    const words = team.name.split(" ");
    const significant = SKIP_PREFIXES.includes(words[0]) && words.length > 1
      ? words.slice(1).join(" ")
      : team.name;
    return significant.slice(0, 3).toUpperCase();
  }

  return (
    <>
      <div className="header">
        {teams.length > 0 ? (
          teams.slice(0, 4).map((team) => (
            <div
              key={team.id}
              className="club-badge"
              style={{
                background: badgeBg(team.color),
                color: badgeText(team.color),
                border: `2px solid ${badgeBorder(team.color)}`,
              }}
              title={team.name}
            >
              {badgeLabel(team)}
            </div>
          ))
        ) : (
          <div className="club-badge" style={{ background: "#1a1a1a", color: "#aaa", border: "2px solid #333" }}>
            ?
          </div>
        )}

        <div className="header-text" style={{ flex: 1 }}>
          <h2>
            {profile.name ? `Calendrier de ${profile.name}` : "Mon calendrier de matchs"}
          </h2>
          <p>
            {teams.length > 0
              ? teams.map((t) => t.name).join(" · ") + " · grands matchs"
              : "Choisis tes équipes dans le profil"}
          </p>
        </div>

        <button className="profile-btn" onClick={() => setShowModal(true)}>
          ⚙ Profil
        </button>
      </div>

      {showModal && <ProfileModal onClose={() => setShowModal(false)} />}
    </>
  );
}
