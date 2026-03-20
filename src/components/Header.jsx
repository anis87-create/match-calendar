import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";
import { getTeam } from "../utils/teams";
import { badgeBg, badgeText, badgeBorder } from "../utils/colors";

export default function Header() {
  const profile = useSelector((s) => s.profile);
  const [showModal, setShowModal] = useState(false);

  const teams = profile.favoriteTeams.map((id) => getTeam(id)).filter(Boolean);

  // Short label for badge: up to 4 chars from first word
  function badgeLabel(name) {
    return name.split(" ")[0].slice(0, 4).toUpperCase();
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
              {badgeLabel(team.name)}
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
