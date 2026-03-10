const PREFIX = 'dda-tool-snapshot';

export interface ToolSnapshot<T = unknown> {
  id: string;
  tool: string;
  createdAt: string;
  payload: T;
}

export const saveSnapshot = <T,>(tool: string, payload: T) => {
  if (typeof window === 'undefined') return;
  const snapshot: ToolSnapshot<T> = {
    id: crypto.randomUUID(),
    tool,
    createdAt: new Date().toISOString(),
    payload,
  };
  const key = `${PREFIX}:${tool}`;
  const existing = JSON.parse(window.localStorage.getItem(key) ?? '[]') as ToolSnapshot<T>[];
  window.localStorage.setItem(key, JSON.stringify([snapshot, ...existing].slice(0, 20)));
};

export const getSnapshots = <T,>(tool: string): ToolSnapshot<T>[] => {
  if (typeof window === 'undefined') return [];
  const key = `${PREFIX}:${tool}`;
  return JSON.parse(window.localStorage.getItem(key) ?? '[]') as ToolSnapshot<T>[];
};
