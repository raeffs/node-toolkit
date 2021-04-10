import { HexColor } from '../color.interface';
import { createColorParser } from './create-color-parser.function';

const ShortHexColorPattern = /^#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/;

/**
 * Parses the CSS string representation of a color in short HEX format.
 * @param value The value to parse.
 * @returns An object representing the HEX color or null if it could not be parsed.
 */
export const parseShortHexColor = createColorParser<HexColor>(ShortHexColorPattern, match => {
  return {
    format: 'HEX',
    red: Number(`0x${match[1]}${match[1]}`),
    green: Number(`0x${match[2]}${match[2]}`),
    blue: Number(`0x${match[3]}${match[3]}`),
  };
});
