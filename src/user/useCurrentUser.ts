import { useMemo } from 'react';
import { colorFromString } from '../collab/config';

const KEY = 'collabpad-user';

function randomName(): string {
  const adjectives = ['Swift', 'Bright', 'Silent', 'Cosmic', 'Neon', 'Lunar'];
  const nouns = ['Fox', 'Owl', 'Panda', 'Wolf', 'Hawk', 'Lynx'];
  const a = adjectives[Math.floor(Math.random() * adjectives.length)];
  const n = nouns[Math.floor(Math.random() * nouns.length)];
  return `${a} ${n}`;
}

export interface CurrentUser {
  id: string;
  name: string;
  color: string;
}

export function useCurrentUser(): CurrentUser {
  return useMemo(() => {
    const raw = sessionStorage.getItem(KEY);
    if (raw) {
      try {
        return JSON.parse(raw) as CurrentUser;
      } catch {
        // fallthrough
      }
    }
    const id = crypto.randomUUID();
    const name = randomName();
    const user: CurrentUser = { id, name, color: colorFromString(id) };
    sessionStorage.setItem(KEY, JSON.stringify(user));
    return user;
  }, []);
}