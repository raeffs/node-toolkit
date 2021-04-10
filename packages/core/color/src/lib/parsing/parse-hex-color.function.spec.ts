import { asHexString } from '@raeffs/common';
import { getRandomInteger } from '@raeffs/testing';
import { HexColor } from '../color.interface';
import { parseHexColor } from './parse-hex-color.function';

describe('parseHexColor', () => {
  it('should parse a valid HEX color', () => {
    const red = getRandomInteger(0, 255);
    const green = getRandomInteger(0, 255);
    const blue = getRandomInteger(0, 255);

    const actual = parseHexColor(`#${asHexString(red, 2)}${asHexString(green, 2)}${asHexString(blue, 2)}`);

    expect(actual).toEqual<HexColor>({
      red,
      green,
      blue,
      format: 'HEX',
    });
  });

  it('should return null if the value cannot be parsed', () => {
    const invalidValues = ['rgb(0,0,0)', 'rgba(0,0,0,0)', '#000', '000000', '#00000000'];

    for (const value of invalidValues) {
      const actual = parseHexColor(value);

      expect(actual).toBeNull();
    }
  });
});
