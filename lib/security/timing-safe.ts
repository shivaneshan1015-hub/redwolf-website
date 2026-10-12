import crypto from "crypto";

/**
 * Compares two strings using constant-time cryptographic buffer comparison.
 *
 * Both strings are hashed with SHA-256 before comparison to produce fixed-length
 * 32-byte digests. This ensures that crypto.timingSafeEqual is always called with
 * identical buffer lengths (preventing RangeError exceptions on length mismatch)
 * and eliminates length-dependent timing leakage.
 */
export function timingSafeCompare(a: string | undefined | null, b: string | undefined | null): boolean {
  if (typeof a !== "string" || typeof b !== "string") {
    return false;
  }
  if (a.length === 0 || b.length === 0) {
    return false;
  }
  const hashA = crypto.createHash("sha256").update(a, "utf8").digest();
  const hashB = crypto.createHash("sha256").update(b, "utf8").digest();
  return crypto.timingSafeEqual(hashA, hashB);
}
