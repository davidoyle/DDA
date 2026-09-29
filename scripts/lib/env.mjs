// Production builds are strict. Preview and local builds warn about TODO.
// Vercel sets VERCEL_ENV to production, preview or development. DDA_STRICT=1 forces strict mode anywhere.
export const isProduction = () => process.env.VERCEL_ENV === 'production' || process.env.DDA_STRICT === '1';
export const banner = (lines) => {
  const bar = '!'.repeat(72);
  console.warn(`\n${bar}\n${lines.map((l) => `!! ${l}`).join('\n')}\n${bar}\n`);
};
