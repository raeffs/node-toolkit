import { getRandomInteger } from '../numbers/get-random-integer.function';

export function getRandomCharacter(
  characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
): string {
  return characters.substr(getRandomInteger(0, characters.length - 1), 1);
}
