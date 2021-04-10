import { HexColor } from '../color.interface';
import { createColorParser } from './create-color-parser.function';

const HexColorPattern = /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/;

/**
 * Parses the CSS string representation of a color in HEX format.
 * @param value The value to parse.
 * @returns An object representing the HEX color or null if it could not be parsed.
 */
export const parseHexColor = createColorParser<HexColor>(HexColorPattern, match => {
  return {
    format: 'HEX',
    red: Number(`0x${match[1]}`),
    green: Number(`0x${match[2]}`),
    blue: Number(`0x${match[3]}`),
  };
});
