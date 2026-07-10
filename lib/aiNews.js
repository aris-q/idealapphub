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
        const videoId = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
        if (!title || !link || !published) return null;
        return {
          id: `allin-${i}`,
          title: decodeXml(title),
          link,
          source: "All-In Podcast",
          ts: Date.parse(published),
          thumbnail: videoId ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` : null,
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

// In-person hackathons in USA/Canada from the Devpost API, next 6 months.
// Devpost has no country field, so location is matched heuristically against
// US/Canada names, cities, and state/province codes.
const NA_NAMES = /\b(USA|United States|Canada|Ontario|Quebec|British Columbia|Alberta|Toronto|Vancouver|Montreal|Ottawa|Calgary|Waterloo|Edmonton|Winnipeg|Halifax|New York|NYC|San Francisco|Bay Area|Silicon Valley|Los Angeles|San Jose|San Diego|Boston|Cambridge|Seattle|Austin|Chicago|Atlanta|Miami|Dallas|Houston|Denver|Philadelphia|Phoenix|Portland|Pittsburgh|Detroit|Minneapolis|Washington)\b/i;
const NA_CODES = /,\s*(A[LKZR]|C[AOT]|D[EC]|FL|GA|HI|I[DLNA]|K[SY]|LA|M[EDAINSOT]|N[EVHJMYCD]|O[HKR]|PA|RI|S[CD]|T[NX]|UT|V[TA]|W[AVIY]|ON|QC|BC|AB|MB|SK|NS|NB|NL|PE)\b/;

function isUsOrCanada(location) {
  return NA_NAMES.test(location) || NA_CODES.test(location);
}

const MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

// Devpost date strings: "Jun 20 - Aug 20, 2026", "Jul 03 - 31, 2026",
// "Dec 20, 2026 - Jan 05, 2027".
function parsePeriod(s) {
  const parts = s.split(" - ");
  if (parts.length !== 2) return {};
  const [l, r] = parts;
  const lDate = l.match(/([A-Za-z]{3})[a-z]* (\d{1,2})/);
  if (!lDate) return {};
  const rDate = r.match(/([A-Za-z]{3})[a-z]* (\d{1,2})/);
  const rDay = r.match(/^(\d{1,2})\b/);
  const endYear = +(r.match(/(\d{4})/)?.[1] || new Date().getFullYear());
  const startMonth = MONTHS[lDate[1]];
  const endMonth = rDate ? MONTHS[rDate[1]] : startMonth;
  let startYear = +(l.match(/(\d{4})/)?.[1] || endYear);
  if (!l.match(/\d{4}/) && endMonth < startMonth) startYear = endYear - 1;
  const endDay = rDate ? +rDate[2] : rDay ? +rDay[1] : +lDate[2];
  return {
    start: Date.UTC(startYear, startMonth, +lDate[2]),
    end: Date.UTC(endYear, endMonth, endDay, 23, 59),
  };
}

export async function getHackathons() {
  try {
    const pages = [1, 2, 3, 4, 5];
    const results = await Promise.all(
      pages.map((p) =>
        fetch(
          `https://devpost.com/api/hackathons?challenge_type[]=in-person&status[]=upcoming&status[]=open&page=${p}`,
          { next: { revalidate: 21600 } }
        )
          .then((res) => (res.ok ? res.json() : { hackathons: [] }))
          .catch(() => ({ hackathons: [] }))
      )
    );
    const all = results.flatMap((r) => r.hackathons || []);
    const now = Date.now();
    const horizon = now + 183 * 24 * 60 * 60 * 1000;
    const events = all
      .filter((h) => isUsOrCanada(h.displayed_location?.location || ""))
      .map((h) => {
        const { start, end } = parsePeriod(h.submission_period_dates || "");
        let thumbnail = h.thumbnail_url || null;
        if (thumbnail && thumbnail.startsWith("//")) thumbnail = "https:" + thumbnail;
        return {
          id: `dp-${h.id}`,
          title: h.title,
          url: h.url,
          location: h.displayed_location?.location || "",
          dates: h.submission_period_dates || "",
          thumbnail,
          start: start || null,
          end: end || null,
        };
      })
      .filter((h) => h.start && h.start <= horizon && (h.end || h.start) >= now - 86400000)
      .sort((a, b) => a.start - b.start);
    console.log("[HACKATHONS] US/Canada events:", events.length, "of", all.length, "fetched");
    return events;
  } catch (err) {
    console.error("[HACKATHONS] Fetch error:", err.message);
    return [];
  }
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
