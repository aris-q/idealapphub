// Live stock quotes via Yahoo Finance's public chart endpoint (free, no key).
// Yahoo's older v7/finance/quote batch endpoint now requires a session
// crumb, so quotes are fetched one symbol at a time from v8/finance/chart.

const REVALIDATE = { next: { revalidate: 300 } };

export const DEFAULT_TICKERS = ["NVDA", "MSFT", "GOOGL", "AMZN", "META", "TSLA", "AAPL", "AMD"];

async function getQuote(symbol) {
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
    const res = await fetch(url, { ...REVALIDATE, headers: { "User-Agent": "Mozilla/5.0" } });
    if (!res.ok) throw new Error(`Yahoo chart ${res.status}`);
    const data = await res.json();
    const meta = data?.chart?.result?.[0]?.meta;
    if (!meta || meta.regularMarketPrice == null) throw new Error("No price data");
    const price = meta.regularMarketPrice;
    const prevClose = meta.previousClose ?? meta.chartPreviousClose ?? price;
    const change = price - prevClose;
    const changePercent = prevClose ? (change / prevClose) * 100 : 0;
    return {
      symbol,
      name: meta.shortName || meta.longName || symbol,
      price,
      change,
      changePercent,
      volume: meta.regularMarketVolume ?? null,
      dayHigh: meta.regularMarketDayHigh ?? null,
      dayLow: meta.regularMarketDayLow ?? null,
      error: false,
    };
  } catch (err) {
    console.error(`[STOCKS] ${symbol} fetch error:`, err.message);
    return { symbol, name: symbol, price: null, change: null, changePercent: null, volume: null, dayHigh: null, dayLow: null, error: true };
  }
}

export async function getStockQuotes(symbols) {
  const unique = [...new Set(symbols.map((s) => s.toUpperCase().trim()).filter(Boolean))];
  return Promise.all(unique.map(getQuote));
}
