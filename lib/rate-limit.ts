type Bucket = {
  count: number;
  resetAt: number;
};

const store = globalThis as typeof globalThis & {
  himsagorRateBuckets?: Map<string, Bucket>;
};

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MS || 60_000);
const maxRequests = Number(process.env.RATE_LIMIT_MAX || 8);

export function rateLimit(request: Request, scope: string) {
  store.himsagorRateBuckets ||= new Map();

  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip =
    forwardedFor ||
    request.headers.get("x-real-ip") ||
    request.headers.get("cf-connecting-ip") ||
    "local";
  const key = `${scope}:${ip}`;
  const now = Date.now();
  const bucket = store.himsagorRateBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    store.himsagorRateBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (bucket.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  return {
    allowed: true,
    remaining: Math.max(maxRequests - bucket.count, 0),
    resetAt: bucket.resetAt
  };
}
