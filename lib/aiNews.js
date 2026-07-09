// Server-side fetchers for external AI news sources.
// Results are cached by Next.js for 30 minutes (revalidate: 1800).

const REVALIDATE = { next: { revalidate: 1800 } };
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Hacker News stories mentioning AI with 50+ points, from the last 7 days.
export async function getHackerNewsAI() {
  try {
    const since = Math.floor((Date.now() - WEEK_MS) / 1000);
    const url =
      "https://hn.algolia.com/api/v1/search_by_date?tags=story&query=AI" +
      `&numericFilters=points%3E=50,created_at_i%3E=${since}&hitsPerPage=20`;
    const res = await fetch(url, REVALIDATE);
    if (!res.ok) throw new Error(`HN API ${res.status}`);
    const data = await res.json();
    return (data.hits || []).map((hit) => ({
      id: `hn-${hit.objectID}`,
      title: hit.title,
      link: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
      source: "Hacker News",
      ts: hit.created_at_i * 1000,
    }));
  } catch (err) {
    console.error("[AINEWS] HN fetch error:", err.message);
    return [];
  }
}

// Latest videos from the All-In Podcast YouTube channel (public RSS, no API key).
const ALLIN_CHANNEL_ID = "UCESLZhusAkFfsNsApnjF_Cg";

export async function getAllInVideos() {
  try {
    const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${ALLIN_CHANNEL_ID}`;
    const res = await fetch(url, REVALIDATE);
    if (!res.ok) throw new Error(`YouTube RSS ${res.status}`);
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    return entries
      .map((entry, i) => {
        const title = entry.match(/<title>([\s\S]*?)<\/title>/)?.[1];
        const link = entry.match(/<link rel="alternate" href="([^"]+)"/)?.[1];
        const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
        if (!title || !link || !published) return null;
        return {
          id: `allin-${i}`,
          title: decodeXml(title),
          link,
          source: "All-In Podcast",
          ts: Date.parse(published),
        };
      })
      .filter(Boolean);
  } catch (err) {
    console.error("[AINEWS] All-In fetch error:", err.message);
    return [];
  }
}

function decodeXml(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

// Split a normalized item list into Today / This Week buckets (UTC days).
export function bucketByDate(items) {
  const now = new Date();
  const todayStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const weekStart = todayStart - WEEK_MS;
  const byNewest = (a, b) => b.ts - a.ts;
  return {
    today: items.filter((i) => i.ts >= todayStart).sort(byNewest),
    week: items.filter((i) => i.ts >= weekStart && i.ts < todayStart).sort(byNewest),
  };
}
