export function getScore(match) {
  const { type, league } = match;
  if (type === "inter" || type === "cab" || type === "tunisie") return 100;
  if (type === "important" && ["ucl", "uel"].includes(league)) return 95;
  if (type === "important") return 90;
  if (["ucl", "uel", "uecl"].includes(league)) return 75;
  if (["ligue1", "cuptun"].includes(league)) return 70;
  if (league === "caf") return 68;
  if (league === "serie") return 65;
  if (league === "pl" || league === "liga") return 60;
  if (["bundesliga", "ligue1fr"].includes(league)) return 50;
  if (["wcq_afr", "wcq_eur", "wcq_asi", "wcq_sam"].includes(league)) return 55;
  if (["coppa", "coparey", "facup", "dfbpokal", "coupefr", "carabaocup"].includes(league)) return 35;
  if (league === "friendly") return 15;
  return 20;
}

export function getPriority(score) {
  if (score >= 90) return 1;
  if (score >= 50) return 2;
  if (score >= 30) return 3;
  return 0;
}

export const prioText = { 1: "Incontournable", 2: "À regarder", 3: "Si disponible", 0: "À sauter" };
export const prioClass = { 1: "p1", 2: "p2", 3: "p3", 0: "ps" };
export const prioStripClass = { 1: "prio-1", 2: "prio-2", 3: "prio-3", 0: "prio-skip" };

function isWeekend(dateStr) {
  const day = new Date(dateStr + "T12:00:00").getDay();
  return day === 0 || day === 6;
}

export function getDayLimit(dateStr) {
  return isWeekend(dateStr) ? 3 : 2;
}

// Returns a Map<matchId, { watch, score, prio }>
export function buildPlan(matches) {
  const byDay = {};
  matches.forEach((m) => {
    if (!byDay[m.date]) byDay[m.date] = [];
    byDay[m.date].push(m);
  });

  const plan = new Map();
  Object.keys(byDay).forEach((date) => {
    const limit = getDayLimit(date);
    const sorted = [...byDay[date]].sort((a, b) => getScore(b) - getScore(a));
    sorted.forEach((m, i) => {
      const score = getScore(m);
      plan.set(m.id, {
        watch: i < limit,
        score,
        prio: getPriority(score),
      });
    });
  });
  return plan;
}
