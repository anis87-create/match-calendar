const BIG_CLUBS = new Set([
  "inter", "juventus", "milan", "napoli", "roma", "lazio", "atalanta",
  "arsenal", "liverpool", "man_city", "man_utd", "chelsea", "spurs",
  "real_madrid", "barcelona", "atletico",
  "bmunich", "borussia_dortmund", "bayer_leverkusen",
  "paris_sg", "monaco",
]);

const TUNISIAN_CLUBS = new Set([
  "est", "ca", "ess", "css", "cab", "usm_tun", "st_tun",
]);

const TUNISIAN_NATIONAL = new Set(["nat_tun"]);

// Pairs of team IDs that form classics/derbies (order-independent)
const CLASSICS = [
  ["real_madrid", "barcelona"],
  ["real_madrid", "atletico"],
  ["arsenal", "spurs"],
  ["man_city", "man_utd"],
  ["liverpool", "man_utd"],
  ["arsenal", "liverpool"],
  ["milan", "inter"],
  ["juventus", "inter"],
  ["juventus", "milan"],
  ["napoli", "juventus"],
  ["bmunich", "borussia_dortmund"],
  ["paris_sg", "marseille"],
  ["est", "ca"],
  ["est", "ess"],
  ["ca", "ess"],
  ["css", "est"],
  ["css", "ca"],
];

export function isBigClub(teamId) {
  return BIG_CLUBS.has(teamId);
}

export function isTunisian(teamId) {
  return TUNISIAN_CLUBS.has(teamId) || TUNISIAN_NATIONAL.has(teamId);
}

export function isClassicMatch(t1, t2) {
  return CLASSICS.some(
    ([a, b]) => (a === t1 && b === t2) || (a === t2 && b === t1)
  );
}

export function computeSuggestionScore(match, profile = {}) {
  const { team1Id, team2Id, league } = match;
  const favTeams = profile.favoriteTeams ?? [];

  // Tier 0 — Équipes favorites → priorité absolue
  if (favTeams.includes(team1Id) || favTeams.includes(team2Id)) return 120;

  let score = 0;
  const t1Big = isBigClub(team1Id);
  const t2Big = isBigClub(team2Id);
  const t1Tun = isTunisian(team1Id);
  const t2Tun = isTunisian(team2Id);
  const hasTunisian = t1Tun || t2Tun;

  // Tier 1 — Compétitions tunisiennes
  if (league === "ligue1" || league === "cuptun") {
    score = 92;
  }
  // Tier 2 — Coupe du Monde
  else if (league === "wc") {
    score = 90;
  }
  // Tier 3 — Qualif CDM Afrique / AFCON
  else if (league === "wcq_afr" || league === "afcon") {
    score = 88;
  }
  // Tier 3b — CAF avec équipe tunisienne
  else if ((league === "caf" || league === "cafc") && hasTunisian) {
    score = 88;
  }
  // Tier 4 — UCL
  else if (league === "ucl") {
    score = t1Big || t2Big ? 85 : 75;
  }
  // Tier 5 — Euro / Copa America
  else if (league === "euro" || league === "copa_am") {
    score = 82;
  }
  // Tier 5b — Qualif CDM Europe/Asie/Amériques
  else if (league === "wcq_eur" || league === "wcq_asi" || league === "wcq_sam") {
    score = 78;
  }
  // Tier 6 — Serie A
  else if (league === "serie") {
    if (t1Big && t2Big) score = 82;
    else if (t1Big || t2Big) score = 72;
    else score = 45;
  }
  // Tier 7 — PL / La Liga
  else if (league === "pl" || league === "liga") {
    if (t1Big && t2Big) score = 80;
    else if (t1Big || t2Big) score = 70;
    else score = 42;
  }
  // Tier 8 — CAF sans Tunisien
  else if (league === "caf" || league === "cafc") {
    score = 72;
  }
  // Tier 9 — UEL
  else if (league === "uel") {
    score = t1Big || t2Big ? 68 : 58;
  }
  // Tier 10 — Bundesliga / Ligue 1 FR
  else if (league === "bundesliga" || league === "ligue1fr") {
    if (t1Big || t2Big) score = 65;
    else score = 38;
  }
  // Tier 11 — Coupes nationales
  else if (
    ["coppa", "facup", "coparey", "carabaocup", "dfbpokal", "coupefr"].includes(league)
  ) {
    score = t1Big || t2Big ? 58 : 42;
  }
  // Tier 12 — UECL
  else if (league === "uecl") {
    score = 48;
  }
  // Reste
  else {
    score = 25;
  }

  // Bonus classic/derby
  if (isClassicMatch(team1Id, team2Id)) score += 15;

  return Math.min(score, 115);
}

export function markAlreadyAdded(suggestions, existingMatches) {
  return suggestions.map((s) => {
    const isDuplicate = existingMatches.some((m) => {
      if (m.date !== s.date) return false;
      const mT1 = m.team1Id ?? "";
      const mT2 = m.team2Id ?? "";
      return (
        (mT1 === s.team1Id && mT2 === s.team2Id) ||
        (mT1 === s.team2Id && mT2 === s.team1Id)
      );
    });
    return { ...s, alreadyAdded: isDuplicate };
  });
}

export function scoredAndSorted(suggestions, profile) {
  return suggestions
    .map((s) => ({ ...s, score: computeSuggestionScore(s, profile) }))
    .sort((a, b) => b.score - a.score);
}
