import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit, resetRateLimiter } from "../lib/security/rate-limiter";

describe("Rate Limiter Layer", () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  test("allows requests within configured limit", () => {
    const testIp = "192.168.1.100";
    const limit = 3;

    const r1 = checkRateLimit(testIp, limit, 60000);
    assert.equal(r1.allowed, true);
    assert.equal(r1.remaining, 2);

    const r2 = checkRateLimit(testIp, limit, 60000);
    assert.equal(r2.allowed, true);
    assert.equal(r2.remaining, 1);

    const r3 = checkRateLimit(testIp, limit, 60000);
    assert.equal(r3.allowed, true);
    assert.equal(r3.remaining, 0);

    // 4th request exceeds limit
    const r4 = checkRateLimit(testIp, limit, 60000);
    assert.equal(r4.allowed, false);
    assert.equal(r4.remaining, 0);
  });

  test("tracks different IPs independently", () => {
    const ip1 = "10.0.0.1";
    const ip2 = "10.0.0.2";
    const limit = 2;

    checkRateLimit(ip1, limit, 60000);
    checkRateLimit(ip1, limit, 60000);
    const ip1Blocked = checkRateLimit(ip1, limit, 60000);
    assert.equal(ip1Blocked.allowed, false);

    // ip2 should still be allowed
    const ip2First = checkRateLimit(ip2, limit, 60000);
    assert.equal(ip2First.allowed, true);
  });
});
