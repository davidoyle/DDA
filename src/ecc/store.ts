import { useEffect, useReducer } from 'react';
import type { DBState } from './types';

export const STORAGE_KEY = 'dda_db';
export const AUTH_KEY = 'dda_auth';
export const EMPTY_STATE: DBState = { engagements: [], flags: [], deliverables: [], evidence: [], events: [], finance: [], contracts: [], stakeholders: [] };

type Action = { type: 'SET'; payload: DBState } | { type: 'PATCH'; payload: Partial<DBState> };
function reducer(state: DBState, action: Action): DBState { return action.type === 'SET' ? action.payload : { ...state, ...action.payload }; }

export function useStore() {
  const [state, dispatch] = useReducer(reducer, EMPTY_STATE);
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try { dispatch({ type: 'SET', payload: { ...EMPTY_STATE, ...(JSON.parse(raw) as Partial<DBState>) } }); } catch { dispatch({ type: 'SET', payload: EMPTY_STATE }); }
  }, []);
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }, [state]);
  return { state, dispatch };
}
