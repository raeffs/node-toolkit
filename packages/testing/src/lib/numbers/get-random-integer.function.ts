import { getRandomDouble } from './get-random-double.function';

export function getRandomInteger(min: number = -1000, max: number = 1000): number {
  return Math.round(getRandomDouble(min, max));
}
