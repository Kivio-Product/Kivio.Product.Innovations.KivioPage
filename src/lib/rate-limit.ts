const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 5;
const MAX_KEYS = 10_000;

const buckets = new Map<string, number[]>();

export function rateLimit(key: string) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (hits.length >= MAX_HITS) {
    buckets.set(key, hits);
    const retryAfter = Math.max(1, Math.ceil((WINDOW_MS - (now - hits[0])) / 1000));
    return { ok: false as const, retryAfter };
  }

  hits.push(now);
  buckets.set(key, hits);

  if (buckets.size > MAX_KEYS) {
    for (const [k, v] of buckets) {
      if (!v.some((t) => now - t < WINDOW_MS)) buckets.delete(k);
      if (buckets.size <= MAX_KEYS / 2) break;
    }
  }

  return { ok: true as const, retryAfter: 0 };
}
