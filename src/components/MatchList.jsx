import { useSelector, useDispatch } from "react-redux";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { reorderMatches } from "../features/matches/matchesSlice";
import { buildPlan, getDayLimit } from "../utils/scoring";
import { months } from "../utils/leagues";
import MatchCard from "./MatchCard";

export default function MatchList() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.matches.items);
  const currentFilter = useSelector((s) => s.ui.currentFilter);
  const profile = useSelector((s) => s.profile);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const plan = buildPlan(items, profile);
  const today = new Date().toISOString().split("T")[0];
  const todayObj = new Date(today + "T12:00:00");
  const yd = new Date(todayObj); yd.setDate(todayObj.getDate() - 1);
  const tm = new Date(todayObj); tm.setDate(todayObj.getDate() + 1);
  const yesterday = yd.toISOString().split("T")[0];
  const tomorrow = tm.toISOString().split("T")[0];

  const predefined = ["all", "important", "upcoming", "watched", "watch"];
  const filtered = items.filter((m) => {
    if (currentFilter === "important") return m.type === "important";
    if (currentFilter === "upcoming") return m.date >= today && !m.watched;
    if (currentFilter === "watched") return m.watched;
    if (currentFilter === "watch") return plan.get(m.id)?.watch && !m.watched && m.date >= today;
    if (!predefined.includes(currentFilter)) return m.type === currentFilter; // team filter
    return true;
  });

  if (!filtered.length) {
    return <div className="empty">Aucun match dans cette catégorie</div>;
  }

  // Group by day, preserving order from `filtered`
  const grouped = {};
  filtered.forEach((m) => {
    if (!grouped[m.date]) grouped[m.date] = [];
    grouped[m.date].push(m);
  });
  const sortedDays = Object.keys(grouped).sort();

  function handleDragEnd(event) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      dispatch(reorderMatches({ activeId: active.id, overId: over.id }));
    }
  }

  return (
    <>
      {filtered.length > 1 && (
        <p className="hint">Glisse les matchs pour les réordonner</p>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filtered.map((m) => m.id)} strategy={verticalListSortingStrategy}>
          <div className="match-list">
            {sortedDays.map((date) => {
              const [, mo, day] = date.split("-");
              const month = months[parseInt(mo) - 1];
              const dateObj = new Date(date + "T12:00:00");
              let dayLabel;
              if (date === today) dayLabel = "Aujourd'hui";
              else if (date === yesterday) dayLabel = "Hier";
              else if (date === tomorrow) dayLabel = "Demain";
              else {
                const dayName = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"][dateObj.getDay()];
                dayLabel = `${dayName} ${day} ${month}`;
              }
              const limit = getDayLimit(date);
              const totalDay = items.filter((m) => m.date === date).length;
              const watchDay = items.filter((m) => m.date === date && plan.get(m.id)?.watch).length;

              let limitClass = "limit-ok";
              if (totalDay > limit) limitClass = "limit-warn";

              return (
                <div key={date} className="day-group">
                  <div className="day-group-title">
                    {dayLabel}
                    <span className={`day-limit-badge ${limitClass}`}>
                      {watchDay} / {limit} match{limit > 1 ? "s" : ""} recommandé{limit > 1 ? "s" : ""}
                    </span>
                  </div>
                  {grouped[date].map((m) => (
                    <MatchCard key={m.id} match={m} plan={plan.get(m.id)} />
                  ))}
                </div>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
