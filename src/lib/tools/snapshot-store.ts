const PREFIX = 'dda-tool-snapshot';

export interface StandardToolSnapshot<TInputs = Record<string, unknown>, TResult = Record<string, unknown>> {
  id: string;
  tool: string;
  createdAt: string;
  payload: {
    inputs: TInputs;
    results: TResult;
    meta?: Record<string, string | number | boolean | null>;
  };
}

export const saveSnapshot = <TInputs, TResult>(
  tool: string,
  payload: StandardToolSnapshot<TInputs, TResult>['payload'],
) => {
  if (typeof window === 'undefined') return;
  const snapshot: StandardToolSnapshot<TInputs, TResult> = {
    id: crypto.randomUUID(),
    tool,
    createdAt: new Date().toISOString(),
    payload,
  };
  const key = `${PREFIX}:${tool}`;
  const existing = JSON.parse(window.localStorage.getItem(key) ?? '[]') as StandardToolSnapshot<TInputs, TResult>[];
  window.localStorage.setItem(key, JSON.stringify([snapshot, ...existing].slice(0, 20)));
};

export const getSnapshots = <TInputs, TResult>(tool: string): StandardToolSnapshot<TInputs, TResult>[] => {
  if (typeof window === 'undefined') return [];
  const key = `${PREFIX}:${tool}`;
  return JSON.parse(window.localStorage.getItem(key) ?? '[]') as StandardToolSnapshot<TInputs, TResult>[];
};
