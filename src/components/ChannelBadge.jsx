import { useState } from "react";
import { useChannelLogo } from "../hooks/useChannelLogo";

export default function ChannelBadge({ channelName }) {
  const { logo, loading, info } = useChannelLogo(channelName);
  const [imgFailed, setImgFailed] = useState(false);

  if (!channelName?.trim()) return null;

  const abbr = info?.abbr || channelName.trim().slice(0, 6).toUpperCase();
  const bg = info?.bg || "#555";
  const color = info?.color || "#fff";

  // En cours de fetch → petit loader
  if (loading) {
    return (
      <span className="channel-badge">
        <span className="channel-pill channel-loading" style={{ background: "#ddd", color: "#999" }}>
          ···
        </span>
      </span>
    );
  }

  // Logo disponible et image non cassée → afficher l'image
  if (logo && !imgFailed) {
    return (
      <span className="channel-badge">
        <img
          src={logo}
          alt={channelName}
          className="channel-logo"
          onError={() => setImgFailed(true)}
        />
      </span>
    );
  }

  // Fallback texte
  return (
    <span className="channel-badge">
      <span className="channel-pill" style={{ background: bg, color }}>
        {abbr}
      </span>
    </span>
  );
}
