import type { TyreStatus } from '../types';

export const formatNumber = (value: number) => new Intl.NumberFormat('en-ZA').format(value);
export const formatKm = (value: number) => `${formatNumber(value)} km`;

export const statusClass: Record<TyreStatus, string> = {
  Good: 'bg-green-50 text-green-700 ring-green-600/20',
  Attention: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  Critical: 'bg-red-50 text-red-700 ring-red-600/20',
  Unknown: 'bg-zinc-100 text-zinc-600 ring-zinc-500/20',
};
