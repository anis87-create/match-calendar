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

// IDs des sélections nationales tunisiennes (app IDs)
const TUNISIAN_NATIONAL = new Set(["nat_tunisie"]);

// Grandes nations africaines (noms tels que renvoyés par l'API en anglais)
const BIG_AFRICAN_NATIONS = new Set([
  "Tunisia", "Algeria", "Morocco", "Egypt", "Senegal", "Nigeria",
  "Cameroon", "Ivory Coast", "Côte d'Ivoire", "Ghana", "Mali",
  "South Africa", "Congo DR", "Congo", "Guinea", "Cape Verde",
]);

// Grandes nations européennes / mondiales (noms API anglais)
const BIG_EUROPEAN_NATIONS = new Set([
  "France", "Spain", "Germany", "England", "Portugal", "Italy",
  "Netherlands", "Belgium", "Croatia", "Denmark", "Serbia",
  "Ukraine", "Turkey", "Poland", "Scotland",
]);

const BIG_WORLD_NATIONS = new Set([
  ...BIG_AFRICAN_NATIONS,
  ...BIG_EUROPEAN_NATIONS,
  "Brazil", "Argentina", "Uruguay", "Colombia", "Mexico",
  "USA", "Japan", "South Korea", "Saudi Arabia", "Australia",
]);

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

// Vérifie si c'est une équipe tunisienne (club ou sélection)
// Accepte l'app ID ou le nom de l'API
export function isTunisian(teamId, teamName) {
  if (TUNISIAN_CLUBS.has(teamId) || TUNISIAN_NATIONAL.has(teamId)) return true;
  // Fallback sur le nom (API retourne "Tunisia" pour la sélection)
  return teamName === "Tunisia";
}

// Vérifie si c'est une grande nation africaine (par nom API)
function isBigAfrican(teamId, teamName) {
  return isTunisian(teamId, teamName) || BIG_AFRICAN_NATIONS.has(teamName);
}

// Vérifie si c'est une grande nation mondiale (par nom API)
function isBigWorld(teamId, teamName) {
  return BIG_WORLD_NATIONS.has(teamName) || isTunisian(teamId, teamName);
}

export function isClassicMatch(t1, t2) {
  return CLASSICS.some(
    ([a, b]) => (a === t1 && b === t2) || (a === t2 && b === t1)
  );
}

export function computeSuggestionScore(match, profile = {}) {
  const { team1Id, team2Id, team1Name = "", team2Name = "", league } = match;
  const favTeams = profile.favoriteTeams ?? [];

  // Tier 0 — Équipes favorites → priorité absolue
  if (favTeams.includes(team1Id) || favTeams.includes(team2Id)) return 120;

  // Tunisie (sélection) → même priorité que les équipes favorites de club
  const hasTunisianNat = isTunisian(team1Id, team1Name) || isTunisian(team2Id, team2Name);
  if (hasTunisianNat && !TUNISIAN_CLUBS.has(team1Id) && !TUNISIAN_CLUBS.has(team2Id)) {
    // C'est la sélection nationale tunisienne → quasi-favori
    return 118;
  }

  let score = 0;
  const t1Big = isBigClub(team1Id);
  const t2Big = isBigClub(team2Id);
  const hasTunisianClub = TUNISIAN_CLUBS.has(team1Id) || TUNISIAN_CLUBS.has(team2Id);

  const t1BigAfr = isBigAfrican(team1Id, team1Name);
  const t2BigAfr = isBigAfrican(team2Id, team2Name);
  const t1BigWorld = isBigWorld(team1Id, team1Name);
  const t2BigWorld = isBigWorld(team2Id, team2Name);

  // Tier 1 — Compétitions tunisiennes (clubs)
  if (league === "ligue1" || league === "cuptun") {
    score = 92;
  }
  // Tier 2 — Coupe du Monde
  else if (league === "wc") {
    score = 90;
  }
  // Tier 3 — Qualif CDM Afrique / AFCON
  // → differentiée selon l'importance des équipes
  else if (league === "wcq_afr" || league === "afcon") {
    if (t1BigAfr && t2BigAfr) score = 92; // deux grandes nations africaines
    else if (t1BigAfr || t2BigAfr) score = 85;
    else score = 72;
  }
  // Tier 3b — CAF CL/Conf avec club tunisien
  else if ((league === "caf" || league === "cafc") && hasTunisianClub) {
    score = 88;
  }
  // Tier 4 — UCL
  else if (league === "ucl") {
    score = t1Big || t2Big ? 85 : 75;
  }
  // Tier 5 — Euro
  else if (league === "euro") {
    if (t1BigWorld && t2BigWorld) score = 85;
    else if (t1BigWorld || t2BigWorld) score = 80;
    else score = 72;
  }
  // Tier 5b — Copa America
  else if (league === "copa_am") {
    if (t1BigWorld && t2BigWorld) score = 83;
    else if (t1BigWorld || t2BigWorld) score = 78;
    else score = 70;
  }
  // Tier 5c — Qualif CDM Europe → grandes affiches seulement
  else if (league === "wcq_eur") {
    if (t1BigWorld && t2BigWorld) score = 82;
    else if (t1BigWorld || t2BigWorld) score = 74;
    else score = 58;
  }
  // Tier 5d — Qualif CDM Asie / Amériques
  else if (league === "wcq_asi" || league === "wcq_sam") {
    if (t1BigWorld && t2BigWorld) score = 78;
    else if (t1BigWorld || t2BigWorld) score = 70;
    else score = 52;
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
  // Tier 8 — CAF sans club tunisien
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
  // Tier 11 — Coupes nationales de clubs
  else if (
    ["coppa", "facup", "coparey", "carabaocup", "dfbpokal", "coupefr"].includes(league)
  ) {
    score = t1Big || t2Big ? 58 : 42;
  }
  // Tier 12 — UECL
  else if (league === "uecl") {
    score = 48;
  }
  // Tier 13 — Matchs amicaux : Tunisie prioritaire, puis grandes affiches
  else if (league === "friendly") {
    // Tunisie (sélection) en amical → traité plus haut (score 118)
    // Grandes nations mondiales qui s'affrontent
    if (t1BigWorld && t2BigWorld) score = 65;
    else if (t1BigAfr && t2BigAfr) score = 60;
    else if (t1BigWorld || t2BigWorld) score = 48;
    else score = 20;
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
