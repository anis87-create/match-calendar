import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileModal from "./ProfileModal";

export default function Header() {
  const profile = useSelector((s) => s.profile);
  const [showModal, setShowModal] = useState(false);

  const teamColors = { inter: "#003399", cab: "#ccaa00", tunisie: "#cc0000" };

  return (
    <>
      <div className="header">
        {profile.favoriteTeams.length > 0 ? (
          profile.favoriteTeams.map((t) => (
            <div key={t} className={`club-badge badge-${t}`} style={{ borderColor: teamColors[t] }}>
              {t === "inter" ? "INTER" : t === "cab" ? "CAB" : "TUN"}
            </div>
          ))
        ) : (
          <>
            <div className="club-badge badge-inter">INTER</div>
            <div className="club-badge badge-cab">CAB</div>
            <div className="club-badge badge-tun">TUN</div>
          </>
        )}
        <div className="header-text" style={{ flex: 1 }}>
          <h2>
            {profile.name ? `Calendrier de ${profile.name}` : "Mon calendrier de matchs"}
          </h2>
          <p>
            {profile.favoriteTeams.length > 0
              ? profile.favoriteTeams.map((t) => t === "inter" ? "Inter" : t === "cab" ? "CAB" : "Tunisie").join(" · ") + " + matchs importants"
              : "Inter · CAB · Tunisie + matchs importants"}
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
