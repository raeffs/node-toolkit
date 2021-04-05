import { RgbaColor } from '../color.interface';
import { createColorParser } from './create-color-parser.function';

const RgbaColorPattern = /rgba\((\d+),(\d+),(\d+),(\d+)\)/;

/**
 * Parses the CSS string representation of a color in HEX format.
 * @param value The value to parse.
 * @returns An object representing the RGBA color or null if it could not be parsed.
 */
export const parseRgbaColor = createColorParser<RgbaColor>(RgbaColorPattern, match => {
  return {
    format: 'RGBA',
    red: Number(match[1]),
    green: Number(match[2]),
    blue: Number(match[3]),
    alpha: Number(match[4]),
  };
});
