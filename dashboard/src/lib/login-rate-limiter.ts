const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const BLOCK_MS = 15 * 60 * 1000;

interface RateRecord {
  count: number;
  firstAttempt: number;
  blockedUntil?: number;
}

const store = new Map<string, RateRecord>();

export function checkLoginRateLimit(email: string): { allowed: boolean; retryAfterSecs?: number } {
  const key = email.toLowerCase();
  const now = Date.now();
  const record = store.get(key);

  if (record?.blockedUntil) {
    if (now < record.blockedUntil) {
      return { allowed: false, retryAfterSecs: Math.ceil((record.blockedUntil - now) / 1000) };
    }
    store.delete(key);
  }

  if (!record || now - record.firstAttempt > WINDOW_MS) {
    store.set(key, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  record.count++;

  if (record.count > MAX_ATTEMPTS) {
    record.blockedUntil = now + BLOCK_MS;
    return { allowed: false, retryAfterSecs: Math.ceil(BLOCK_MS / 1000) };
  }

  return { allowed: true };
}

export function clearLoginRateLimit(email: string) {
  store.delete(email.toLowerCase());
}
