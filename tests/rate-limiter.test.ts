import { test, describe, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { checkRateLimit, resetRateLimiter, extractClientIp } from "../lib/security/rate-limiter";

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

  test("extractClientIp: prioritizes trusted x-real-ip over forged x-forwarded-for", () => {
    // Simulated attacker attempting to spoof IP via X-Forwarded-For while platform sets x-real-ip
    const reqWithBoth = new Request("http://localhost:3000/api/enquiries", {
      headers: {
        "x-real-ip": "203.0.113.50",
        "x-forwarded-for": "198.51.100.99, 10.0.0.1",
      },
    });

    const resolvedIp = extractClientIp(reqWithBoth);
    assert.equal(resolvedIp, "203.0.113.50", "Must prioritize authoritative x-real-ip over client-supplied x-forwarded-for");
  });

  test("extractClientIp: falls back to x-forwarded-for when x-real-ip is absent", () => {
    const reqForwarded = new Request("http://localhost:3000/api/enquiries", {
      headers: {
        "x-forwarded-for": "198.51.100.22, 10.0.0.1",
      },
    });

    const resolvedIp = extractClientIp(reqForwarded);
    assert.equal(resolvedIp, "198.51.100.22", "Falls back to first hop in x-forwarded-for when x-real-ip is omitted");
  });

  test("extractClientIp: defaults safely to 127.0.0.1 when no headers are present", () => {
    const emptyReq = new Request("http://localhost:3000/api/enquiries");
    assert.equal(extractClientIp(emptyReq), "127.0.0.1");
  });
});
