import { useState, useEffect } from "react";
import { getChannelInfo } from "../utils/channels";

const CACHE_KEY = "channel_logo_cache_v1";
const CACHE_TTL = 7 * 24 * 60 * 60 * 1000; // 7 jours

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeCache(cache) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch {}
}

async function fetchFromWikipedia(channelName) {
  const lang = ["en", "ar", "fr"];

  for (const l of lang) {
    const base = `https://${l}.wikipedia.org/w/api.php`;

    // 1. Essai avec le titre exact
    try {
      const url = `${base}?action=query&prop=pageimages&titles=${encodeURIComponent(channelName)}&pithumbsize=200&format=json&origin=*`;
      const data = await fetch(url).then((r) => r.json());
      const pages = data.query?.pages || {};
      const page = Object.values(pages)[0];
      if (page && page.thumbnail?.source && !page.missing) {
        return page.thumbnail.source;
      }
    } catch {}

    // 2. Recherche si pas de résultat direct
    try {
      const searchUrl = `${base}?action=query&list=search&srsearch=${encodeURIComponent(channelName + " TV channel")}&srlimit=1&format=json&origin=*`;
      const searchData = await fetch(searchUrl).then((r) => r.json());
      const firstTitle = searchData.query?.search?.[0]?.title;
      if (firstTitle) {
        const imgUrl = `${base}?action=query&prop=pageimages&titles=${encodeURIComponent(firstTitle)}&pithumbsize=200&format=json&origin=*`;
        const imgData = await fetch(imgUrl).then((r) => r.json());
        const pages = imgData.query?.pages || {};
        const page = Object.values(pages)[0];
        if (page?.thumbnail?.source) {
          return page.thumbnail.source;
        }
      }
    } catch {}
  }

  return null; // rien trouvé
}

/**
 * Hook qui retourne le logo d'une chaîne TV.
 * - Vérifie d'abord la liste statique (channels.js)
 * - Puis le cache localStorage
 * - Puis fetch Wikipedia (en / ar / fr)
 */
export function useChannelLogo(channelName) {
  const staticInfo = getChannelInfo(channelName);

  const [logo, setLogo] = useState(() => staticInfo?.logo || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!channelName?.trim()) return;

    // La liste statique a déjà un logo → pas besoin de fetch
    if (staticInfo?.logo) {
      setLogo(staticInfo.logo);
      return;
    }

    const cacheKey = channelName.toLowerCase().trim();
    const cache = readCache();
    const entry = cache[cacheKey];

    // Cache encore valide
    if (entry && Date.now() - entry.ts < CACHE_TTL) {
      setLogo(entry.url);
      return;
    }

    // Fetch Wikipedia
    setLoading(true);
    setLogo(null);

    fetchFromWikipedia(channelName).then((url) => {
      const fresh = readCache();
      fresh[cacheKey] = { url, ts: Date.now() };
      writeCache(fresh);
      setLogo(url);
      setLoading(false);
    });
  }, [channelName]);

  return { logo, loading, info: staticInfo };
}
