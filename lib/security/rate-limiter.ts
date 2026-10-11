/**
 * In-memory sliding window rate limiter for enquiry submissions.
 * Prevents automated endpoint abuse while allowing normal user interactions.
 */

interface RateLimitRecord {
  count: number;
  firstRequestTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes window
const MAX_REQUESTS = 5; // Maximum 5 submissions per 10 minutes per IP

/**
 * Checks whether an IP address is within the rate limit.
 */
export function checkRateLimit(
  ip: string,
  limit = MAX_REQUESTS,
  windowMs = WINDOW_MS
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Periodic cleanup of stale records if store grows large
  if (rateLimitStore.size > 1000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (now - val.firstRequestTime > windowMs) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record) {
    rateLimitStore.set(ip, {
      count: 1,
      firstRequestTime: now,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
    };
  }

  // If window has elapsed, reset window
  if (now - record.firstRequestTime > windowMs) {
    record.count = 1;
    record.firstRequestTime = now;
    return {
      allowed: true,
      remaining: limit - 1,
      resetTime: now + windowMs,
    };
  }

  // If within window
  record.count += 1;
  const remaining = Math.max(0, limit - record.count);
  const resetTime = record.firstRequestTime + windowMs;

  return {
    allowed: record.count <= limit,
    remaining,
    resetTime,
  };
}

/**
 * Resets the rate limiter store (primarily for automated testing).
 */
export function resetRateLimiter(): void {
  rateLimitStore.clear();
}
