export const WS_URL = import.meta.env.VITE_WS_URL ?? 'ws://localhost:1234';
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? 'CollabPad';

export const CURSOR_COLORS = [
  '#F87171',
  '#FB923C',
  '#FACC15',
  '#4ADE80',
  '#22D3EE',
  '#60A5FA',
  '#A78BFA',
  '#F472B6',
] as const;

export function colorFromString(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0;
  }
  return CURSOR_COLORS[Math.abs(hash) % CURSOR_COLORS.length];
}