import { coerceToNumberBetween } from '@raeffs/common';
import { RgbaColor } from '../color.interface';
import { createColorParser } from './create-color-parser.function';

const RgbaColorPattern = /rgba\((-?\d+),(-?\d+),(-?\d+),(-?[\d.]+)\)/;

/**
 * Parses the CSS string representation of a color in HEX format.
 * @param value The value to parse.
 * @returns An object representing the RGBA color or null if it could not be parsed.
 */
export const parseRgbaColor = createColorParser<RgbaColor>(RgbaColorPattern, match => {
  return {
    format: 'RGBA',
    red: coerceToNumberBetween(match[1], 0, 255),
    green: coerceToNumberBetween(match[2], 0, 255),
    blue: coerceToNumberBetween(match[3], 0, 255),
    alpha: coerceToNumberBetween(match[4], 0, 1),
  };
});
