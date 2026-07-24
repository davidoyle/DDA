const emailParts = {
  primary: ['david.doyle', 'ddanalytics.ca'],
  legacy: ['david.doyle', 'ddanalysis.ca'],
  support: ['hello', 'dda.ca'],
} as const;

export type EmailKey = keyof typeof emailParts;

export const getEmailAddress = (key: EmailKey) => emailParts[key].join('@');

export const getMailtoHref = (key: EmailKey, query = '') => {
  const suffix = query ? `?${query}` : '';
  return `mailto:${getEmailAddress(key)}${suffix}`;
};
