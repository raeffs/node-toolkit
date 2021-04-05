import { Color } from '../color.interface';

export function createColorParser<T extends Color>(
  pattern: RegExp,
  materialize: (match: RegExpMatchArray) => T
): (value: string) => T | null {
  return value => {
    if (!value) {
      return null;
    }

    value = value.trim();
    value = value.replace(/\s/g, '');

    const match = value.match(pattern);

    if (!match) {
      return null;
    }

    return materialize(match);
  };
}
