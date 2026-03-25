// Unique source de vérité pour les drapeaux (flagicons.lipis.dev - open-source, CORS libre)
const f = (cc) => `https://flagicons.lipis.dev/flags/1x1/${cc}.svg`;

// ── Clubs européens — drapeau = pays du club ────────────────────────────────

const SERIE_A = [
  { id: "inter",      name: "Inter Milan",      color: "#003399", logo: f("it") },
  { id: "juventus",   name: "Juventus",          color: "#000000", logo: f("it") },
  { id: "milan",      name: "AC Milan",          color: "#FB090B", logo: f("it") },
  { id: "napoli",     name: "Napoli",            color: "#12A0D7", logo: f("it") },
  { id: "atalanta",   name: "Atalanta",          color: "#1E4597", logo: f("it") },
  { id: "lazio",      name: "Lazio",             color: "#87CEEB", logo: f("it") },
  { id: "roma",       name: "AS Roma",           color: "#8B0000", logo: f("it") },
  { id: "fiorentina", name: "Fiorentina",        color: "#5D2D91", logo: f("it") },
  { id: "bologna",    name: "Bologna",           color: "#8B0000", logo: f("it") },
  { id: "torino",     name: "Torino FC",         color: "#8B2500", logo: f("it") },
  { id: "udinese",    name: "Udinese",           color: "#333333", logo: f("it") },
  { id: "genoa",      name: "Genoa CFC",         color: "#CC0000", logo: f("it") },
  { id: "monza",      name: "AC Monza",          color: "#CC0000", logo: f("it") },
  { id: "lecce",      name: "US Lecce",          color: "#FFD700", logo: f("it") },
  { id: "cagliari",   name: "Cagliari",          color: "#003399", logo: f("it") },
  { id: "hellas",     name: "Hellas Verona",     color: "#FFD700", logo: f("it") },
  { id: "empoli",     name: "Empoli",            color: "#0F7EC0", logo: f("it") },
  { id: "como",       name: "Como 1907",         color: "#003399", logo: f("it") },
  { id: "venezia",    name: "Venezia FC",        color: "#FF6600", logo: f("it") },
  { id: "parma",      name: "Parma Calcio",      color: "#FFC72C", logo: f("it") },
];

const PREMIER_LEAGUE = [
  { id: "arsenal",        name: "Arsenal",           color: "#EF0107", logo: f("gb-eng") },
  { id: "liverpool",      name: "Liverpool",          color: "#C8102E", logo: f("gb-eng") },
  { id: "man_city",       name: "Manchester City",    color: "#6CABDD", logo: f("gb-eng") },
  { id: "man_utd",        name: "Manchester United",  color: "#DA291C", logo: f("gb-eng") },
  { id: "chelsea",        name: "Chelsea",            color: "#034694", logo: f("gb-eng") },
  { id: "spurs",          name: "Tottenham Hotspur",  color: "#132257", logo: f("gb-eng") },
  { id: "newcastle",      name: "Newcastle United",   color: "#241F20", logo: f("gb-eng") },
  { id: "aston_villa",    name: "Aston Villa",        color: "#670E36", logo: f("gb-eng") },
  { id: "brighton",       name: "Brighton",           color: "#0057B8", logo: f("gb-eng") },
  { id: "west_ham",       name: "West Ham United",    color: "#7A263A", logo: f("gb-eng") },
  { id: "brentford",      name: "Brentford",          color: "#E30613", logo: f("gb-eng") },
  { id: "crystal_palace", name: "Crystal Palace",     color: "#1B458F", logo: f("gb-eng") },
  { id: "fulham",         name: "Fulham",             color: "#CC0000", logo: f("gb-eng") },
  { id: "wolves",         name: "Wolverhampton",      color: "#FDB913", logo: f("gb-eng") },
  { id: "everton",        name: "Everton",            color: "#003399", logo: f("gb-eng") },
  { id: "nottm_forest",   name: "Nottingham Forest",  color: "#DD0000", logo: f("gb-eng") },
  { id: "bournemouth",    name: "Bournemouth",        color: "#DA291C", logo: f("gb-eng") },
  { id: "leicester",      name: "Leicester City",     color: "#003090", logo: f("gb-eng") },
  { id: "southampton",    name: "Southampton",        color: "#D71920", logo: f("gb-eng") },
  { id: "ipswich",        name: "Ipswich Town",       color: "#003B80", logo: f("gb-eng") },
];

const LA_LIGA = [
  { id: "real_madrid",   name: "Real Madrid",       color: "#FEBE10", logo: f("es") },
  { id: "barcelona",     name: "FC Barcelona",      color: "#004D98", logo: f("es") },
  { id: "atletico",      name: "Atlético Madrid",   color: "#CC0000", logo: f("es") },
  { id: "athletic",      name: "Athletic Club",     color: "#EE2523", logo: f("es") },
  { id: "villarreal",    name: "Villarreal CF",     color: "#FFE000", logo: f("es") },
  { id: "real_sociedad", name: "Real Sociedad",     color: "#003E96", logo: f("es") },
  { id: "betis",         name: "Real Betis",        color: "#00954C", logo: f("es") },
  { id: "sevilla",       name: "Sevilla FC",        color: "#D71A21", logo: f("es") },
  { id: "celta",         name: "Celta Vigo",        color: "#8DB4E2", logo: f("es") },
  { id: "osasuna",       name: "Osasuna",           color: "#D2000F", logo: f("es") },
  { id: "girona",        name: "Girona FC",         color: "#CC0000", logo: f("es") },
  { id: "rayo",          name: "Rayo Vallecano",    color: "#CC0000", logo: f("es") },
  { id: "mallorca",      name: "Mallorca",          color: "#CC0000", logo: f("es") },
  { id: "getafe",        name: "Getafe CF",         color: "#005FA8", logo: f("es") },
  { id: "valencia",      name: "Valencia CF",       color: "#FF7F00", logo: f("es") },
  { id: "espanol",       name: "Espanyol",          color: "#005898", logo: f("es") },
  { id: "alaves",        name: "Deportivo Alavés",  color: "#1F549E", logo: f("es") },
  { id: "valladolid",    name: "Real Valladolid",   color: "#6A0DAD", logo: f("es") },
  { id: "laspalmas",     name: "Las Palmas",        color: "#FFDD00", logo: f("es") },
  { id: "leganes",       name: "Leganés",           color: "#003C96", logo: f("es") },
];

const BUNDESLIGA = [
  { id: "bmunich",           name: "Bayern Munich",       color: "#DC052D", logo: f("de") },
  { id: "bayer_leverkusen",  name: "Bayer Leverkusen",    color: "#E32221", logo: f("de") },
  { id: "rb_leipzig",        name: "RB Leipzig",          color: "#DD0741", logo: f("de") },
  { id: "borussia_dortmund", name: "Borussia Dortmund",   color: "#FDE100", logo: f("de") },
  { id: "eintracht",         name: "Eintracht Frankfurt", color: "#E1000F", logo: f("de") },
  { id: "stuttgart",         name: "VfB Stuttgart",       color: "#E32221", logo: f("de") },
  { id: "freiburg",          name: "SC Freiburg",         color: "#CC0000", logo: f("de") },
  { id: "hoffenheim",        name: "Hoffenheim",          color: "#1663A7", logo: f("de") },
  { id: "werder",            name: "Werder Bremen",       color: "#1D6F42", logo: f("de") },
  { id: "wolfsburg",         name: "VfL Wolfsburg",       color: "#65B32E", logo: f("de") },
  { id: "monchengladbach",   name: "Borussia M'gladbach", color: "#000000", logo: f("de") },
  { id: "augsburg",          name: "FC Augsburg",         color: "#BA3733", logo: f("de") },
  { id: "union_berlin",      name: "Union Berlin",        color: "#CC0000", logo: f("de") },
  { id: "mainz",             name: "Mainz 05",            color: "#CC0000", logo: f("de") },
  { id: "heidenheim",        name: "FC Heidenheim",       color: "#CC0000", logo: f("de") },
  { id: "bochum",            name: "VfL Bochum",          color: "#005CA9", logo: f("de") },
  { id: "holstein_kiel",     name: "Holstein Kiel",       color: "#CC0000", logo: f("de") },
  { id: "st_pauli",          name: "St. Pauli",           color: "#6F4F37", logo: f("de") },
];

const LIGUE1_FR = [
  { id: "paris_sg",      name: "Paris Saint-Germain",    color: "#003399", logo: f("fr") },
  { id: "monaco",        name: "AS Monaco",              color: "#CC0000", logo: f("fr") },
  { id: "lille",         name: "LOSC Lille",             color: "#CC0000", logo: f("fr") },
  { id: "nice",          name: "OGC Nice",               color: "#CC0000", logo: f("fr") },
  { id: "marseille",     name: "Olympique de Marseille", color: "#2FAEE0", logo: f("fr") },
  { id: "lyon",          name: "Olympique Lyonnais",     color: "#003399", logo: f("fr") },
  { id: "rennes",        name: "Stade Rennais",          color: "#CC0000", logo: f("fr") },
  { id: "lens",          name: "RC Lens",                color: "#FFCC00", logo: f("fr") },
  { id: "reims",         name: "Stade de Reims",         color: "#CC0000", logo: f("fr") },
  { id: "strasbourg",    name: "RC Strasbourg",          color: "#003399", logo: f("fr") },
  { id: "brest",         name: "Stade Brestois",         color: "#CC0000", logo: f("fr") },
  { id: "nantes",        name: "FC Nantes",              color: "#FFCC00", logo: f("fr") },
  { id: "toulouse",      name: "Toulouse FC",            color: "#6A0DAD", logo: f("fr") },
  { id: "montpellier",   name: "Montpellier HSC",        color: "#FF7C00", logo: f("fr") },
  { id: "auxerre",       name: "AJ Auxerre",             color: "#003399", logo: f("fr") },
  { id: "angers",        name: "Angers SCO",             color: "#000000", logo: f("fr") },
  { id: "saint_etienne", name: "AS Saint-Étienne",       color: "#006633", logo: f("fr") },
  { id: "havre",         name: "Le Havre AC",            color: "#003F91", logo: f("fr") },
];

// ── Clubs nord-africains — drapeau = pays du club ───────────────────────────

const LIGUE1_TUN = [
  { id: "est",           name: "Espérance Sportive de Tunis", color: "#CC0000", logo: f("tn") },
  { id: "ca",            name: "Club Africain",               color: "#E30613", logo: f("tn") },
  { id: "ess",           name: "Étoile Sportive du Sahel",    color: "#B71C1C", logo: f("tn") },
  { id: "css",           name: "Club Sportif Sfaxien",        color: "#1A1A1A", logo: f("tn") },
  { id: "cab",           name: "Club Athlétique Bizertin",    color: "#CCAA00", logo: f("tn") },
  { id: "usm_tun",       name: "US Monastir",                 color: "#003399", logo: f("tn") },
  { id: "st_tun",        name: "Stade Tunisien",              color: "#CC0000", logo: f("tn") },
  { id: "as_marsa",      name: "AS Marsa",                    color: "#006600", logo: f("tn") },
  { id: "cs_hammam",     name: "CS Hammam-Lif",               color: "#CC0000", logo: f("tn") },
  { id: "ol_beja",       name: "Olympique de Béja",           color: "#FF6600", logo: f("tn") },
  { id: "as_soliman",    name: "AS Soliman",                  color: "#003399", logo: f("tn") },
  { id: "us_tataouine",  name: "US Tataouine",                color: "#006600", logo: f("tn") },
  { id: "js_omrane",     name: "JS Omrane",                   color: "#CC0000", logo: f("tn") },
  { id: "us_bengardane", name: "US Ben Guerdane",             color: "#CC0000", logo: f("tn") },
];

const ALGERIE = [
  { id: "usma",           name: "USM Alger",          color: "#CC0000", logo: f("dz") },
  { id: "mca",            name: "MC Alger",           color: "#009A44", logo: f("dz") },
  { id: "crb",            name: "CR Belouizdad",      color: "#CC0000", logo: f("dz") },
  { id: "jsk",            name: "JS Kabylie",         color: "#FFCC00", logo: f("dz") },
  { id: "ess_setif",      name: "ES Sétif",           color: "#CC0000", logo: f("dz") },
  { id: "mco",            name: "MC Oran",            color: "#CC0000", logo: f("dz") },
  { id: "nahd",           name: "NA Hussein Dey",     color: "#CC0000", logo: f("dz") },
  { id: "cs_constantine", name: "CS Constantine",     color: "#E55C00", logo: f("dz") },
  { id: "usb_alg",        name: "US Biskra",          color: "#006600", logo: f("dz") },
  { id: "paradou",        name: "Paradou AC",         color: "#003399", logo: f("dz") },
  { id: "aso_chlef",      name: "ASO Chlef",          color: "#CC0000", logo: f("dz") },
  { id: "hb_chelghoum",   name: "HB Chelghoum Laïd", color: "#003399", logo: f("dz") },
  { id: "nc_magra",       name: "NC Magra",           color: "#003399", logo: f("dz") },
  { id: "usm_khenchela",  name: "USM Khenchela",      color: "#CC0000", logo: f("dz") },
  { id: "mc_eulma",       name: "MC El Eulma",        color: "#CC0000", logo: f("dz") },
  { id: "o_akbou",        name: "O Akbou",            color: "#CC0000", logo: f("dz") },
];

const MAROC = [
  { id: "wydad",             name: "Wydad AC",           color: "#CC0000", logo: f("ma") },
  { id: "raja",              name: "Raja CA",            color: "#006600", logo: f("ma") },
  { id: "rsb",               name: "RS Berkane",         color: "#FF8C00", logo: f("ma") },
  { id: "far_rabat",         name: "FAR Rabat",          color: "#006633", logo: f("ma") },
  { id: "fus_rabat",         name: "FUS Rabat",          color: "#003399", logo: f("ma") },
  { id: "hassania_agadir",   name: "Hassania US Agadir", color: "#003399", logo: f("ma") },
  { id: "ittihad_tanger",    name: "Ittihad Tanger",     color: "#CC0000", logo: f("ma") },
  { id: "moghreb",           name: "Moghreb Tétouan",    color: "#003399", logo: f("ma") },
  { id: "maghreb_fes",       name: "Maghreb de Fès",     color: "#FF6B00", logo: f("ma") },
  { id: "kawkab",            name: "Kawkab Marrakech",   color: "#CC0000", logo: f("ma") },
  { id: "as_far",            name: "AS FAR",             color: "#006633", logo: f("ma") },
  { id: "olympic_khouribga", name: "Olympic Khouribga",  color: "#003399", logo: f("ma") },
  { id: "chabab_moham",      name: "Chabab Mohammedia",  color: "#CC0000", logo: f("ma") },
  { id: "difaa_jadida",      name: "Difaâ El Jadida",    color: "#003399", logo: f("ma") },
];

const EGYPTE = [
  { id: "al_ahly",          name: "Al Ahly SC",            color: "#CC0000", logo: f("eg") },
  { id: "zamalek",          name: "Zamalek SC",            color: "#1A5276", logo: f("eg") },
  { id: "pyramids",         name: "Pyramids FC",           color: "#FFD700", logo: f("eg") },
  { id: "future_fc",        name: "Future FC",             color: "#003399", logo: f("eg") },
  { id: "ismaily",          name: "Ismaily SC",            color: "#FFCC00", logo: f("eg") },
  { id: "al_masry",         name: "Al Masry",              color: "#006600", logo: f("eg") },
  { id: "el_gaish",         name: "El Gaish SC",           color: "#CC0000", logo: f("eg") },
  { id: "arab_contractors", name: "Arab Contractors",      color: "#CC0000", logo: f("eg") },
  { id: "ceramica",         name: "Ceramica Cleopatra",    color: "#003399", logo: f("eg") },
  { id: "ghazl_mahalla",    name: "Ghazl El Mahalla",      color: "#CC0000", logo: f("eg") },
  { id: "el_ittihad_alex",  name: "El Ittihad Alexandria", color: "#003399", logo: f("eg") },
  { id: "al_mokawloon",     name: "Al Mokawloon",          color: "#CC0000", logo: f("eg") },
  { id: "national_bank",    name: "National Bank SC",      color: "#003399", logo: f("eg") },
  { id: "haras_hodood",     name: "Haras El Hodood",       color: "#CC0000", logo: f("eg") },
];

// ── Équipes nationales (drapeau = le pays lui-même) ─────────────────────────

const NAT_UEFA = [
  { id: "nat_france",      name: "France",           color: "#003399", logo: f("fr")     },
  { id: "nat_espagne",     name: "Espagne",          color: "#CC0000", logo: f("es")     },
  { id: "nat_allemagne",   name: "Allemagne",        color: "#333333", logo: f("de")     },
  { id: "nat_angleterre",  name: "Angleterre",       color: "#CC0000", logo: f("gb-eng") },
  { id: "nat_italie",      name: "Italie",           color: "#003399", logo: f("it")     },
  { id: "nat_portugal",    name: "Portugal",         color: "#006600", logo: f("pt")     },
  { id: "nat_pays_bas",    name: "Pays-Bas",         color: "#FF6200", logo: f("nl")     },
  { id: "nat_belgique",    name: "Belgique",         color: "#CC0000", logo: f("be")     },
  { id: "nat_croatie",     name: "Croatie",          color: "#CC0000", logo: f("hr")     },
  { id: "nat_danemark",    name: "Danemark",         color: "#CC0000", logo: f("dk")     },
  { id: "nat_autriche",    name: "Autriche",         color: "#CC0000", logo: f("at")     },
  { id: "nat_suisse",      name: "Suisse",           color: "#CC0000", logo: f("ch")     },
  { id: "nat_suede",       name: "Suède",            color: "#006AA7", logo: f("se")     },
  { id: "nat_norvege",     name: "Norvège",          color: "#CC0000", logo: f("no")     },
  { id: "nat_pologne",     name: "Pologne",          color: "#CC0000", logo: f("pl")     },
  { id: "nat_ukraine",     name: "Ukraine",          color: "#FFD700", logo: f("ua")     },
  { id: "nat_tcheque",     name: "Tchéquie",         color: "#003399", logo: f("cz")     },
  { id: "nat_serbie",      name: "Serbie",           color: "#CC0000", logo: f("rs")     },
  { id: "nat_ecosse",      name: "Écosse",           color: "#003399", logo: f("gb-sct") },
  { id: "nat_pays_galles", name: "Pays de Galles",   color: "#CC0000", logo: f("gb-wls") },
  { id: "nat_irlande",     name: "Irlande",          color: "#006600", logo: f("ie")     },
  { id: "nat_grece",       name: "Grèce",            color: "#003399", logo: f("gr")     },
  { id: "nat_turquie",     name: "Turquie",          color: "#CC0000", logo: f("tr")     },
  { id: "nat_roumanie",    name: "Roumanie",         color: "#FFD700", logo: f("ro")     },
  { id: "nat_hongrie",     name: "Hongrie",          color: "#CC0000", logo: f("hu")     },
  { id: "nat_slovaquie",   name: "Slovaquie",        color: "#003399", logo: f("sk")     },
  { id: "nat_slovenie",    name: "Slovénie",         color: "#003399", logo: f("si")     },
  { id: "nat_albanie",     name: "Albanie",          color: "#CC0000", logo: f("al")     },
  { id: "nat_macedoine",   name: "Macédoine du Nord",color: "#CC0000", logo: f("mk")     },
  { id: "nat_bosnie",      name: "Bosnie",           color: "#003399", logo: f("ba")     },
  { id: "nat_montenegro",  name: "Monténégro",       color: "#D4AF37", logo: f("me")     },
  { id: "nat_islande",     name: "Islande",          color: "#003399", logo: f("is")     },
  { id: "nat_finlande",    name: "Finlande",         color: "#003399", logo: f("fi")     },
  { id: "nat_georgie",     name: "Géorgie",          color: "#CC0000", logo: f("ge")     },
  { id: "nat_israel",      name: "Israël",           color: "#003399", logo: f("il")     },
  { id: "nat_kosove",      name: "Kosovo",           color: "#003399", logo: f("xk")     },
];

const NAT_CAF = [
  { id: "nat_tunisie",     name: "Tunisie",           color: "#CC0000", logo: f("tn") },
  { id: "nat_algerie",     name: "Algérie",           color: "#006233", logo: f("dz") },
  { id: "nat_maroc",       name: "Maroc",             color: "#C1272D", logo: f("ma") },
  { id: "nat_egypte",      name: "Égypte",            color: "#CC0001", logo: f("eg") },
  { id: "nat_senegal",     name: "Sénégal",           color: "#009A44", logo: f("sn") },
  { id: "nat_nigeria",     name: "Nigeria",           color: "#009A44", logo: f("ng") },
  { id: "nat_cameroun",    name: "Cameroun",          color: "#007A5E", logo: f("cm") },
  { id: "nat_ivory",       name: "Côte d'Ivoire",     color: "#FF8C00", logo: f("ci") },
  { id: "nat_ghana",       name: "Ghana",             color: "#FFD700", logo: f("gh") },
  { id: "nat_mali",        name: "Mali",              color: "#009A44", logo: f("ml") },
  { id: "nat_afr_sud",     name: "Afrique du Sud",    color: "#007A4D", logo: f("za") },
  { id: "nat_rdc",         name: "RD Congo",          color: "#007FFF", logo: f("cd") },
  { id: "nat_guinee",      name: "Guinée",            color: "#CC0000", logo: f("gn") },
  { id: "nat_zimbabwe",    name: "Zimbabwe",          color: "#006400", logo: f("zw") },
  { id: "nat_libye",       name: "Libye",             color: "#009A44", logo: f("ly") },
  { id: "nat_ethiopie",    name: "Éthiopie",          color: "#009A44", logo: f("et") },
  { id: "nat_kenya",       name: "Kenya",             color: "#006400", logo: f("ke") },
  { id: "nat_zambie",      name: "Zambie",            color: "#198A00", logo: f("zm") },
  { id: "nat_angola",      name: "Angola",            color: "#CC0000", logo: f("ao") },
  { id: "nat_burkina",     name: "Burkina Faso",      color: "#CC0000", logo: f("bf") },
  { id: "nat_cap_vert",    name: "Cap-Vert",          color: "#003399", logo: f("cv") },
  { id: "nat_gambie",      name: "Gambie",            color: "#CC0000", logo: f("gm") },
  { id: "nat_comores",     name: "Comores",           color: "#009A44", logo: f("km") },
  { id: "nat_equat_guin",  name: "Guinée Équatoriale",color: "#CC0000", logo: f("gq") },
  { id: "nat_soudan",      name: "Soudan",            color: "#CC0000", logo: f("sd") },
  { id: "nat_ouganda",     name: "Ouganda",           color: "#000000", logo: f("ug") },
  { id: "nat_mozambique",  name: "Mozambique",        color: "#009A44", logo: f("mz") },
  { id: "nat_benin",       name: "Bénin",             color: "#008751", logo: f("bj") },
  { id: "nat_gabon",       name: "Gabon",             color: "#009E60", logo: f("ga") },
  { id: "nat_tanzanie",    name: "Tanzanie",          color: "#1EB53A", logo: f("tz") },
  { id: "nat_mauritanie",  name: "Mauritanie",        color: "#006233", logo: f("mr") },
];

const NAT_AFC = [
  { id: "nat_japon",       name: "Japon",             color: "#CC0000", logo: f("jp") },
  { id: "nat_coree_sud",   name: "Corée du Sud",      color: "#CC0000", logo: f("kr") },
  { id: "nat_arabie_sao",  name: "Arabie Saoudite",   color: "#009A44", logo: f("sa") },
  { id: "nat_iran",        name: "Iran",              color: "#009A44", logo: f("ir") },
  { id: "nat_australie",   name: "Australie",         color: "#FFCC00", logo: f("au") },
  { id: "nat_qatar",       name: "Qatar",             color: "#8D153A", logo: f("qa") },
  { id: "nat_eau",         name: "Émirats Arabes Unis",color: "#009A44",logo: f("ae") },
  { id: "nat_chine",       name: "Chine",             color: "#CC0000", logo: f("cn") },
  { id: "nat_inde",        name: "Inde",              color: "#FF9933", logo: f("in") },
  { id: "nat_irak",        name: "Irak",              color: "#CC0000", logo: f("iq") },
  { id: "nat_jordanie",    name: "Jordanie",          color: "#007A3D", logo: f("jo") },
  { id: "nat_ouzbekistan", name: "Ouzbékistan",       color: "#003399", logo: f("uz") },
  { id: "nat_vietnam",     name: "Viêt Nam",          color: "#CC0000", logo: f("vn") },
  { id: "nat_thailand",    name: "Thaïlande",         color: "#003399", logo: f("th") },
  { id: "nat_indonesie",   name: "Indonésie",         color: "#CC0000", logo: f("id") },
  { id: "nat_bahrein",     name: "Bahreïn",           color: "#CC0000", logo: f("bh") },
  { id: "nat_koweit",      name: "Koweït",            color: "#007A3D", logo: f("kw") },
  { id: "nat_oman",        name: "Oman",              color: "#CC0000", logo: f("om") },
  { id: "nat_syrie",       name: "Syrie",             color: "#CC0000", logo: f("sy") },
  { id: "nat_liban",       name: "Liban",             color: "#CC0000", logo: f("lb") },
  { id: "nat_palestine",   name: "Palestine",         color: "#CC0000", logo: f("ps") },
  { id: "nat_coree_nord",  name: "Corée du Nord",     color: "#CC0000", logo: f("kp") },
];

const NAT_CONMEBOL = [
  { id: "nat_bresil",      name: "Brésil",            color: "#009C3B", logo: f("br") },
  { id: "nat_argentine",   name: "Argentine",         color: "#74ACDF", logo: f("ar") },
  { id: "nat_uruguay",     name: "Uruguay",           color: "#5AAADB", logo: f("uy") },
  { id: "nat_chili",       name: "Chili",             color: "#CC0000", logo: f("cl") },
  { id: "nat_colombie",    name: "Colombie",          color: "#FFD700", logo: f("co") },
  { id: "nat_perou",       name: "Pérou",             color: "#CC0000", logo: f("pe") },
  { id: "nat_equateur",    name: "Équateur",          color: "#FFD700", logo: f("ec") },
  { id: "nat_venezuela",   name: "Venezuela",         color: "#CC0000", logo: f("ve") },
  { id: "nat_paraguay",    name: "Paraguay",          color: "#CC0000", logo: f("py") },
  { id: "nat_bolivie",     name: "Bolivie",           color: "#009A44", logo: f("bo") },
];

const NAT_CONCACAF = [
  { id: "nat_usa",         name: "États-Unis",        color: "#CC0000", logo: f("us") },
  { id: "nat_mexique",     name: "Mexique",           color: "#009A44", logo: f("mx") },
  { id: "nat_canada",      name: "Canada",            color: "#CC0000", logo: f("ca") },
  { id: "nat_costa_rica",  name: "Costa Rica",        color: "#003399", logo: f("cr") },
  { id: "nat_panama",      name: "Panama",            color: "#CC0000", logo: f("pa") },
  { id: "nat_honduras",    name: "Honduras",          color: "#003399", logo: f("hn") },
  { id: "nat_el_salvador", name: "El Salvador",       color: "#003399", logo: f("sv") },
  { id: "nat_jamaique",    name: "Jamaïque",          color: "#FFD700", logo: f("jm") },
  { id: "nat_trinidad",    name: "Trinidad & Tobago", color: "#CC0000", logo: f("tt") },
  { id: "nat_cuba",        name: "Cuba",              color: "#CC0000", logo: f("cu") },
  { id: "nat_haiti",       name: "Haïti",             color: "#003399", logo: f("ht") },
  { id: "nat_curacao",     name: "Curaçao",           color: "#003399", logo: f("cw") },
];

export const TEAMS_BY_GROUP = [
  { group: "Serie A",                  leagueId: "serie",        teams: SERIE_A        },
  { group: "Premier League",           leagueId: "pl",           teams: PREMIER_LEAGUE },
  { group: "La Liga",                  leagueId: "liga",         teams: LA_LIGA        },
  { group: "Bundesliga",               leagueId: "bundesliga",   teams: BUNDESLIGA     },
  { group: "Ligue 1 (France)",         leagueId: "ligue1fr",    teams: LIGUE1_FR      },
  { group: "Tunisie",                  leagueId: "ligue1",       teams: LIGUE1_TUN     },
  { group: "Algérie",                  leagueId: "algerie",      teams: ALGERIE        },
  { group: "Maroc",                    leagueId: "maroc",        teams: MAROC          },
  { group: "Égypte",                   leagueId: "egypte",       teams: EGYPTE         },
  { group: "Nationales — Europe",      leagueId: "nat_europe",   teams: NAT_UEFA       },
  { group: "Nationales — Afrique",     leagueId: "nat_afrique",  teams: NAT_CAF        },
  { group: "Nationales — Asie",        leagueId: "nat_asie",     teams: NAT_AFC        },
  { group: "Nationales — Amériques",   leagueId: "nat_amerique", teams: [...NAT_CONMEBOL, ...NAT_CONCACAF] },
  { group: "Autre",                    leagueId: "autre",        teams: [{ id: "autre", name: "Autre", color: "#888888", logo: null }] },
];

export const ALL_TEAMS = TEAMS_BY_GROUP.flatMap((g) =>
  g.teams.map((t) => ({ ...t, group: g.group }))
);

export function getTeam(id) {
  return ALL_TEAMS.find((t) => t.id === id);
}

/**
 * Résout une équipe :
 * - ID connu ("est", "arsenal"…) → lookup dans ALL_TEAMS
 * - "__CC|Nom" → équipe custom avec drapeau pays (ex: "__dz|Belouizdad")
 * - "__Nom"    → équipe custom sans drapeau
 */
export function resolveTeam(idOrCustom) {
  if (!idOrCustom) return null;
  if (idOrCustom.startsWith("__")) {
    const rest = idOrCustom.slice(2);
    const pipe = rest.indexOf("|");
    if (pipe > -1) {
      const cc = rest.slice(0, pipe);
      const name = rest.slice(pipe + 1);
      return { id: idOrCustom, name, color: "#888888", logo: f(cc) };
    }
    return { id: idOrCustom, name: rest, color: "#888888", logo: null };
  }
  return getTeam(idOrCustom);
}
