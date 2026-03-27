// football-data.org — free tier (12 competitions, 10 req/min)
// Register at https://www.football-data.org/client/register to get your free key
const API_KEY = "REMPLACE_PAR_TA_CLE_API";
const BASE_URL = "https://api.football-data.org/v4";

// football-data.org team ID → app team ID
const TEAM_ID_MAP = {
  // Serie A
  108: "inter",
  109: "juventus",
  98: "milan",
  113: "napoli",
  100: "roma",
  110: "lazio",
  102: "atalanta",
  99: "fiorentina",
  103: "bologna",
  586: "torino",
  115: "udinese",
  107: "genoa",
  // Premier League
  57: "arsenal",
  64: "liverpool",
  65: "man_city",
  66: "man_utd",
  61: "chelsea",
  73: "spurs",
  67: "newcastle",
  58: "aston_villa",
  397: "brighton",
  563: "west_ham",
  402: "brentford",
  354: "crystal_palace",
  63: "fulham",
  76: "wolves",
  62: "everton",
  68: "nottm_forest",
  1044: "bournemouth",
  // La Liga
  86: "real_madrid",
  81: "barcelona",
  78: "atletico",
  77: "athletic",
  94: "villarreal",
  92: "real_sociedad",
  90: "betis",
  559: "sevilla",
  82: "celta",
  298: "girona",
  87: "rayo",
  // Bundesliga
  5: "bmunich",
  4: "borussia_dortmund",
  3: "bayer_leverkusen",
  721: "rb_leipzig",
  9: "eintracht",
  10: "stuttgart",
  7: "freiburg",
  720: "hoffenheim",
  12: "werder",
  11: "wolfsburg",
  6: "monchengladbach",
  // Ligue 1 FR
  524: "paris_sg",
  548: "monaco",
  521: "lille",
  522: "nice",
  516: "marseille",
  518: "lyon",
  529: "rennes",
  546: "lens",
};

// football-data.org competition code → app league code
const COMPETITION_MAP = {
  CL: "ucl",
  PL: "pl",
  SA: "serie",
  PD: "liga",
  BL1: "bundesliga",
  FL1: "ligue1fr",
  WC: "wc",
  EC: "euro",
  DED: "other", // Eredivisie
  ELC: "other", // Championship
  PPL: "other", // Primeira Liga
  BSA: "other", // Brasileirao
};

function resolveTeamId(apiTeamId, teamName, areaName) {
  const mapped = TEAM_ID_MAP[apiTeamId];
  if (mapped) return { id: mapped, name: null };
  // Fallback: use first 2 chars of country area as flag hint
  const cc = (areaName || "").slice(0, 2).toUpperCase();
  if (cc) return { id: `__${cc}|${teamName}`, name: teamName };
  return { id: `__${teamName}`, name: teamName };
}

function normalizeMatch(match) {
  const { id, utcDate, competition, homeTeam, awayTeam } = match;

  const leagueCode = COMPETITION_MAP[competition.code] ?? "other";
  const leagueName = competition.name;

  const dateObj = new Date(utcDate);
  const date = dateObj.toISOString().split("T")[0];
  const time = dateObj.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Tunis",
  });

  const t1 = resolveTeamId(homeTeam.id, homeTeam.shortName || homeTeam.name, homeTeam.area?.name);
  const t2 = resolveTeamId(awayTeam.id, awayTeam.shortName || awayTeam.name, awayTeam.area?.name);

  return {
    apiFixtureId: id,
    team1Id: t1.id,
    team2Id: t2.id,
    team1Name: t1.name ?? (homeTeam.shortName || homeTeam.name),
    team2Name: t2.name ?? (awayTeam.shortName || awayTeam.name),
    league: leagueCode,
    leagueName,
    date,
    time,
  };
}

// ── Cache localStorage (6h par date) ──────────────────────────────────────────

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;

function getCacheKey(date) {
  return `mc_fixtures_${date}`;
}

function loadFromCache(date) {
  try {
    const raw = localStorage.getItem(getCacheKey(date));
    if (!raw) return null;
    const { ts, fixtures } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL_MS) return null;
    return fixtures;
  } catch {
    return null;
  }
}

function saveToCache(date, fixtures) {
  try {
    localStorage.setItem(getCacheKey(date), JSON.stringify({ ts: Date.now(), fixtures }));
  } catch {
    // ignore storage errors
  }
}

// ── Fetch principal ────────────────────────────────────────────────────────────

export async function fetchAllFixtures(date, { forceRefresh = false } = {}) {
  if (!forceRefresh) {
    const cached = loadFromCache(date);
    if (cached) {
      console.log(`[footballApi] Cache hit pour ${date} (${cached.length} matchs)`);
      return cached;
    }
  }

  console.log(`[footballApi] Fetch football-data.org pour ${date}…`);

  const url = `${BASE_URL}/matches?dateFrom=${date}&dateTo=${date}`;
  let res;
  try {
    res = await fetch(url, {
      headers: { "X-Auth-Token": API_KEY },
    });
  } catch (networkErr) {
    throw new Error(`Erreur réseau / CORS: ${networkErr.message}`);
  }

  if (res.status === 429) throw new Error("Quota API épuisé (429) — attends 1 minute");
  if (res.status === 403) throw new Error("Clé API invalide ou non autorisée (403)");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  const fixtures = [];
  const seen = new Set();

  (json.matches ?? []).forEach((m) => {
    if (seen.has(m.id)) return;
    seen.add(m.id);
    try {
      fixtures.push(normalizeMatch(m));
    } catch {
      // skip malformed match
    }
  });

  saveToCache(date, fixtures);
  console.log(`[footballApi] ${fixtures.length} matchs récupérés pour ${date}`);
  return fixtures;
}
