import { coerceToNumber } from './coerce-to-number.function';

export function coerceToNumberBetween(value: unknown, min: number, max: number): number {
  return Math.min(max, Math.max(min, coerceToNumber(value)));
}
