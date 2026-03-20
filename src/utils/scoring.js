export function getScore(match, profile = {}) {
  const { type, league } = match;
  const favoriteTeams = profile.favoriteTeams ?? [];
  const favoriteLeagues = profile.favoriteLeagues ?? [];

  // Incontournable : équipes favorites + matchs importants
  if (favoriteTeams.includes(type)) return 100;
  if (type === "important") return 95;
  // À regarder : compétitions favorites
  if (favoriteLeagues.includes(league)) return 60;
  // Si disponible : tout le reste
  return 30;
}

export function getPriority(score) {
  if (score >= 90) return 1;
  if (score >= 50) return 2;
  return 3;
}

export const prioText = { 1: "Incontournable", 2: "À regarder", 3: "Si disponible" };
export const prioClass = { 1: "p1", 2: "p2", 3: "p3" };
export const prioStripClass = { 1: "prio-1", 2: "prio-2", 3: "prio-3" };

function isWeekend(dateStr) {
  const day = new Date(dateStr + "T12:00:00").getDay();
  return day === 0 || day === 6;
}

export function getDayLimit(dateStr) {
  return isWeekend(dateStr) ? 3 : 2;
}

// Returns a Map<matchId, { watch, score, prio }>
export function buildPlan(matches, profile = {}) {
  const byDay = {};
  matches.forEach((m) => {
    if (!byDay[m.date]) byDay[m.date] = [];
    byDay[m.date].push(m);
  });

  const plan = new Map();
  Object.keys(byDay).forEach((date) => {
    const limit = getDayLimit(date);
    const sorted = [...byDay[date]].sort((a, b) => getScore(b, profile) - getScore(a, profile));
    sorted.forEach((m, i) => {
      const score = getScore(m, profile);
      plan.set(m.id, {
        watch: i < limit,
        score,
        prio: getPriority(score),
      });
    });
  });
  return plan;
}
