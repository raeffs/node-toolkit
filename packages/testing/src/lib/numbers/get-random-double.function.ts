import { getRandom } from './get-random.function';

export function getRandomDouble(min: number = -1000, max: number = 1000): number {
  return min + (max - min) * getRandom();
}
