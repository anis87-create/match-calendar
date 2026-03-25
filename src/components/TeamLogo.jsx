import { useState } from "react";

export default function TeamLogo({ team, size = 24 }) {
  const [imgError, setImgError] = useState(false);

  if (!team) return null;

  if (team.logo && !imgError) {
    return (
      <img
        src={team.logo}
        alt={team.name}
        style={{
          width: Math.round(size * 1.5),
          height: size,
          objectFit: "cover",
          borderRadius: 3,
          flexShrink: 0,
          display: "inline-block",
          verticalAlign: "middle",
        }}
        onError={() => setImgError(true)}
      />
    );
  }

  // Fallback : cercle coloré avec initiale
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: team.color || "#888",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: Math.max(8, Math.floor(size * 0.42)),
        color: "#fff",
        fontWeight: 700,
        flexShrink: 0,
        lineHeight: 1,
      }}
    >
      {(team.name || "?")[0]}
    </span>
  );
}
