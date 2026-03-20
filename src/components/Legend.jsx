export default function Legend() {
  return (
    <div className="legend-box">
      <span style={{ fontSize: "12px", fontWeight: 600, color: "#555" }}>Priorité :</span>
      <div className="legend-item"><div className="legend-dot" style={{ background: "#003399" }}></div>Incontournable</div>
      <div className="legend-item"><div className="legend-dot" style={{ background: "#1e8449" }}></div>À regarder</div>
      <div className="legend-item"><div className="legend-dot" style={{ background: "#f57f17" }}></div>Si disponible</div>
    </div>
  );
}
