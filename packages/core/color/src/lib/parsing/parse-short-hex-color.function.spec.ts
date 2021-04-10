import { asHexString } from '@raeffs/common';
import { getRandomInteger } from '@raeffs/testing';
import { HexColor } from '../color.interface';
import { parseShortHexColor } from './parse-short-hex-color.function';

describe('parseShortHexColor', () => {
  it('should parse a valid short HEX color', () => {
    const red = getRandomInteger(0, 15);
    const green = getRandomInteger(0, 15);
    const blue = getRandomInteger(0, 15);

    const actual = parseShortHexColor(`#${asHexString(red)}${asHexString(green)}${asHexString(blue)}`);

    expect(actual).toEqual<HexColor>({
      red: red + red * 16,
      green: green + green * 16,
      blue: blue + blue * 16,
      format: 'HEX',
    });
  });

  it('should return null if the value cannot be parsed', () => {
    const invalidValues = ['rgb(0,0,0)', 'rgba(0,0,0,0)', '000', '#000000', '#00000000'];

    for (const value of invalidValues) {
      const actual = parseShortHexColor(value);

      expect(actual).toBeNull();
    }
  });
});
