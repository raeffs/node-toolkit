import { Color } from '../color.interface';
import { parseHexColor } from './parse-hex-color.function';
import { parseRgbColor } from './parse-rgb-color.function';
import { parseRgbaColor } from './parse-rgba-color.function';
import { parseShortHexColor } from './parse-short-hex-color.function';

const KnownParsers: ((value: string) => Color | null)[] = [
  parseShortHexColor,
  parseHexColor,
  parseRgbColor,
  parseRgbaColor,
];

/**
 * Parses the CSS string representation of a color.
 * @param value The value to parse.
 * @returns An object representing the color or null if it could not be parsed.
 */
export function parseColor(value: string): Color | null {
  for (const parser of KnownParsers) {
    const color = parser(value);

    if (color) {
      return color;
    }
  }

  return null;
}
