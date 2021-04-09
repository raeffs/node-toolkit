const MIN = -2147483648;
const MAX = 2147483647;
let seed = MIN + Math.floor((MAX - MIN) * Math.random()) || 1;
let next = seed;

export function getSeed(): number {
  return seed;
}

export function setSeed(value: number): void {
  seed = value || 1;
  next = seed;
}

export function getRandom(): number {
  randomize();
  return (next - MIN) / (MAX - MIN);
}

function randomize(): void {
  // https://en.wikipedia.org/wiki/Xorshift
  next ^= next << 13;
  next ^= next >> 17;
  next ^= next << 5;
}
