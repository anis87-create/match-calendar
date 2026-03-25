import { useState } from "react";

export default function TeamLogo({ team, size = 24 }) {
  const [imgError, setImgError] = useState(false);

  if (!team) return null;

  if (team.logo && !imgError) {
    return (
      <img
        src={team.logo}
        alt={team.name}
        width={size}
        height={size}
        style={{ objectFit: "contain", flexShrink: 0, borderRadius: 2, display: "block" }}
        onError={() => setImgError(true)}
      />
    );
  }

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
