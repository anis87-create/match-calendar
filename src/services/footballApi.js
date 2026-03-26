const API_KEY = "c71bc7e05f7273f9b24a7a6ba9375716";
const BASE_URL = "https://v3.football.api-sports.io";

// api-sports.io team ID → app team ID
const TEAM_ID_MAP = {
  // Serie A
  505: "inter",
  496: "juventus",
  489: "milan",
  492: "napoli",
  497: "roma",
  487: "lazio",
  488: "atalanta",
  504: "fiorentina",
  500: "bologna",
  503: "torino",
  494: "udinese",
  495: "genoa",
  867: "monza",
  // Premier League
  42: "arsenal",
  40: "liverpool",
  50: "man_city",
  33: "man_utd",
  49: "chelsea",
  47: "spurs",
  34: "newcastle",
  66: "aston_villa",
  51: "brighton",
  48: "west_ham",
  55: "brentford",
  52: "crystal_palace",
  36: "fulham",
  39: "wolves",
  45: "everton",
  65: "nottm_forest",
  35: "bournemouth",
  // La Liga
  541: "real_madrid",
  529: "barcelona",
  530: "atletico",
  531: "athletic",
  533: "villarreal",
  548: "real_sociedad",
  543: "betis",
  536: "sevilla",
  538: "celta",
  727: "osasuna",
  547: "girona",
  728: "rayo",
  // Bundesliga
  157: "bmunich",
  168: "bayer_leverkusen",
  173: "rb_leipzig",
  165: "borussia_dortmund",
  169: "eintracht",
  172: "stuttgart",
  160: "freiburg",
  167: "hoffenheim",
  162: "werder",
  161: "wolfsburg",
  163: "monchengladbach",
  // Ligue 1 FR
  85: "paris_sg",
  91: "monaco",
  79: "lille",
  84: "nice",
  81: "marseille",
  80: "lyon",
  94: "rennes",
  116: "lens",
  // Tunisian teams
  576: "est",
  579: "ca",
  577: "ess",
  580: "css",
  578: "cab",
};

// api-sports.io league ID → app league code
const LEAGUE_ID_MAP = {
  2: "ucl",
  3: "uel",
  848: "uecl",
  135: "serie",
  39: "pl",
  140: "liga",
  78: "bundesliga",
  61: "ligue1fr",
  202: "ligue1",
  204: "cuptun",
  12: "caf",
  11: "cafc",
  1: "wc",
  29: "wcq_afr",
  6: "afcon",
  4: "euro",
  9: "copa_am",
  45: "facup",
  48: "carabaocup",
  556: "coppa",
  143: "coparey",
  65: "coupefr",
  81: "dfbpokal",
  32: "wcq_eur",
  17: "wcq_asi",
  31: "wcq_sam",
  10: "friendly",   // International friendlies (sélections nationales)
};

// Leagues to fetch (id + name for display fallback)
const LEAGUES_TO_FETCH = [
  { id: 2, name: "Ligue des Champions" },
  { id: 3, name: "Europa League" },
  { id: 135, name: "Serie A" },
  { id: 39, name: "Premier League" },
  { id: 140, name: "Liga" },
  { id: 78, name: "Bundesliga" },
  { id: 61, name: "Ligue 1 (FR)" },
  { id: 202, name: "Ligue 1 (TN)" },
  { id: 204, name: "Coupe de Tunisie" },
  { id: 12, name: "CAF Champions League" },
  { id: 11, name: "CAF Confederation Cup" },
  { id: 29, name: "Qualif. CDM Afrique" },
  { id: 6, name: "AFCON" },
  { id: 10, name: "Match amical" },
];

function getCurrentSeason() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed
  // European seasons start in July/August
  return month < 7 ? year - 1 : year;
}

function resolveTeamId(apiTeamId, teamName, countryCode) {
  const mapped = TEAM_ID_MAP[apiTeamId];
  if (mapped) return { id: mapped, name: null };
  // Custom team fallback with country flag
  const cc = (countryCode || "").slice(0, 2).toUpperCase();
  if (cc) return { id: `__${cc}|${teamName}`, name: teamName };
  return { id: `__${teamName}`, name: teamName };
}

async function fetchFixturesForLeague(date, leagueId, season) {
  const url = `${BASE_URL}/fixtures?date=${date}&league=${leagueId}&season=${season}`;
  const res = await fetch(url, {
    headers: {
      "x-apisports-key": API_KEY,
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return json.response ?? [];
}

function normalizeFixture(fixture, leagueFallbackName) {
  const { fixture: fix, league, teams } = fixture;

  const leagueCode = LEAGUE_ID_MAP[league.id] ?? "other";
  const leagueName = leagueFallbackName || league.name;

  const dateObj = new Date(fix.date);
  const date = dateObj.toISOString().split("T")[0];
  const time = fix.date
    ? dateObj.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Tunis",
      })
    : "00:00";

  const homeCountry = teams.home.country || "";
  const awayCountry = teams.away.country || "";

  const t1 = resolveTeamId(teams.home.id, teams.home.name, homeCountry);
  const t2 = resolveTeamId(teams.away.id, teams.away.name, awayCountry);

  return {
    apiFixtureId: fix.id,
    team1Id: t1.id,
    team2Id: t2.id,
    team1Name: t1.name ?? teams.home.name,
    team2Name: t2.name ?? teams.away.name,
    league: leagueCode,
    leagueName,
    date,
    time,
  };
}

export async function fetchAllFixtures(date) {
  const season = getCurrentSeason();

  const results = await Promise.allSettled(
    LEAGUES_TO_FETCH.map((l) => fetchFixturesForLeague(date, l.id, season))
  );

  const fixtures = [];
  const seen = new Set();

  results.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      const leagueName = LEAGUES_TO_FETCH[idx].name;
      result.value.forEach((f) => {
        const key = f.fixture.id;
        if (!seen.has(key)) {
          seen.add(key);
          try {
            fixtures.push(normalizeFixture(f, leagueName));
          } catch {
            // skip malformed fixture
          }
        }
      });
    }
  });

  return fixtures;
}
