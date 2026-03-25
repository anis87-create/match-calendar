// TV channel mapping: keyword (lowercase) → { logo, bg, color, abbr }
// logo: URL of the channel logo image (or null for text badge fallback)
// bg/color: badge colors used when no logo
// abbr: short text shown in badge

const CHANNEL_MAP = [
  {
    keys: ["bein", "beinsports", "bein sports"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/BeIN_Sports_logo_%28horizontal_version%29.svg/250px-BeIN_Sports_logo_%28horizontal_version%29.svg.png",
    bg: "#910202",
    color: "#fff",
    abbr: "beIN",
  },
  {
    keys: ["wataniya", "وطنية", "الوطنية"],
    logo: null,
    bg: "#c8102e",
    color: "#fff",
    abbr: "WTN",
  },
  {
    keys: ["starz", "starzplay", "starz play"],
    logo: null,
    bg: "#1a1a1a",
    color: "#e9c800",
    abbr: "STARZ",
  },
  {
    keys: ["osn sports", "osn"],
    logo: null,
    bg: "#003087",
    color: "#fff",
    abbr: "OSN",
  },
  {
    keys: ["canal+", "canal plus", "canalplus", "canal sport"],
    logo: null,
    bg: "#000",
    color: "#fff",
    abbr: "C+",
  },
  {
    keys: ["dazn"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/DAZN_Logo_Master.svg/250px-DAZN_Logo_Master.svg.png",
    bg: "#0a0a0a",
    color: "#fff",
    abbr: "DAZN",
  },
  {
    keys: ["eurosport"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Eurosport_Logo_2015.svg/330px-Eurosport_Logo_2015.svg.png",
    bg: "#003399",
    color: "#fff",
    abbr: "EURO",
  },
  {
    keys: ["sky sports", "sky sport"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Sky_Sports_2025.svg/250px-Sky_Sports_2025.svg.png",
    bg: "#0072c6",
    color: "#fff",
    abbr: "SKY",
  },
  {
    keys: ["espn"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/ESPN_wordmark.svg/250px-ESPN_wordmark.svg.png",
    bg: "#cc0000",
    color: "#fff",
    abbr: "ESPN",
  },
  {
    keys: ["tf1"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Logo_TF1_2013.svg/250px-Logo_TF1_2013.svg.png",
    bg: "#1a4fab",
    color: "#fff",
    abbr: "TF1",
  },
  {
    keys: ["france 2", "france2"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/France_2_-_logo_2018.svg/250px-France_2_-_logo_2018.svg.png",
    bg: "#003399",
    color: "#fff",
    abbr: "F2",
  },
  {
    keys: ["france 3", "france3"],
    logo: null,
    bg: "#00843d",
    color: "#fff",
    abbr: "F3",
  },
  {
    keys: ["m6"],
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logo_M6_%282020%2C_fond_clair%29.svg/250px-Logo_M6_%282020%2C_fond_clair%29.svg.png",
    bg: "#f3821e",
    color: "#fff",
    abbr: "M6",
  },
  {
    keys: ["rmc sport", "rmcsport"],
    logo: null,
    bg: "#e30000",
    color: "#fff",
    abbr: "RMC",
  },
  {
    keys: ["amazon prime", "prime video", "amazon"],
    logo: null,
    bg: "#00a8e0",
    color: "#fff",
    abbr: "PRIME",
  },
  {
    keys: ["tnt sports", "tnt"],
    logo: null,
    bg: "#ff0000",
    color: "#fff",
    abbr: "TNT",
  },
  {
    keys: ["al kass", "alkass"],
    logo: null,
    bg: "#8b0000",
    color: "#fff",
    abbr: "KASS",
  },
  {
    keys: ["al aoula", "aoula"],
    logo: null,
    bg: "#006600",
    color: "#fff",
    abbr: "AOULA",
  },
  {
    keys: ["youtube"],
    logo: null,
    bg: "#ff0000",
    color: "#fff",
    abbr: "YT",
  },
];

/**
 * Returns channel display info for a given channel name string.
 * @param {string} channelName
 * @returns {{ logo: string|null, bg: string, color: string, abbr: string } | null}
 */
export function getChannelInfo(channelName) {
  if (!channelName || !channelName.trim()) return null;
  const lower = channelName.toLowerCase().trim();

  for (const entry of CHANNEL_MAP) {
    if (entry.keys.some((k) => lower.includes(k))) {
      return entry;
    }
  }

  // Fallback: generic badge with first 5 chars
  const abbr = channelName.trim().slice(0, 6).toUpperCase();
  return { logo: null, bg: "#555", color: "#fff", abbr };
}
