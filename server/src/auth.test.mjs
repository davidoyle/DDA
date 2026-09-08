import { describe, expect, it, beforeAll } from 'vitest';

beforeAll(() => {
  process.env.MAGIC_LINK_SECRET = 'x'.repeat(32);
  process.env.SESSION_SECRET = 'y'.repeat(32);
});

describe('magic link token encode/decode', () => {
  it('round-trips fields whose values contain colons (e.g. ISO timestamps)', async () => {
    const { encodeMagicLinkToken, decodeMagicLinkToken } = await import('./auth.mjs');

    const fields = {
      tokenId: 'abc-123',
      email: 'test@example.com',
      planTier: 'pro',
      expiresAt: new Date('2026-09-15T12:34:56.789Z').toISOString(),
    };

    const { token, signature } = encodeMagicLinkToken(fields);
    const decoded = decodeMagicLinkToken(token);

    expect(decoded).not.toBeNull();
    expect(decoded.fields).toEqual(fields);
    expect(decoded.signature).toBe(signature);
  });

  it('rejects a tampered token', async () => {
    const { encodeMagicLinkToken, decodeMagicLinkToken } = await import('./auth.mjs');

    const { token } = encodeMagicLinkToken({
      tokenId: 'abc-123',
      email: 'test@example.com',
      planTier: 'pro',
      expiresAt: new Date().toISOString(),
    });

    expect(decodeMagicLinkToken(`${token}x`)).toBeNull();
    expect(decodeMagicLinkToken('not-a-token')).toBeNull();
    expect(decodeMagicLinkToken('')).toBeNull();
  });
});
