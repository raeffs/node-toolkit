import { coerceToNumberBetween } from '@raeffs/common';
import { RgbColor } from '../color.interface';
import { createColorParser } from './create-color-parser.function';

const RgbColorPattern = /rgb\((-?\d+),(-?\d+),(-?\d+)\)/;

/**
 * Parses the CSS string representation of a color in RGB format.
 * @param value The value to parse.
 * @returns An object representing the RGB color or null if it could not be parsed.
 */
export const parseRgbColor = createColorParser<RgbColor>(RgbColorPattern, match => {
  return {
    format: 'RGB',
    red: coerceToNumberBetween(match[1], 0, 255),
    green: coerceToNumberBetween(match[2], 0, 255),
    blue: coerceToNumberBetween(match[3], 0, 255),
  };
});
