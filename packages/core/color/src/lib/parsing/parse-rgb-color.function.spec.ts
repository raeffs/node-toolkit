import { getRandomInteger } from '@raeffs/testing';
import { RgbColor } from '../color.interface';
import { parseRgbColor } from './parse-rgb-color.function';

describe('parseRgbColor', () => {
  it('should parse a valid RGB color', () => {
    const red = getRandomInteger(0, 255);
    const green = getRandomInteger(0, 255);
    const blue = getRandomInteger(0, 255);

    const actual = parseRgbColor(`rgb(${red},${green},${blue})`);

    expect(actual).toEqual<RgbColor>({
      red,
      green,
      blue,
      format: 'RGB',
    });
  });

  it('should ignore whitespace', () => {
    const red = getRandomInteger(0, 255);
    const green = getRandomInteger(0, 255);
    const blue = getRandomInteger(0, 255);

    const actual = parseRgbColor(`rgb( ${red} , ${green} , ${blue} )`);

    expect(actual).toEqual<RgbColor>({
      red,
      green,
      blue,
      format: 'RGB',
    });
  });

  it('should cut of values out of range', () => {
    const validColor = {
      red: getRandomInteger(0, 255),
      green: getRandomInteger(0, 255),
      blue: getRandomInteger(0, 255),
    };

    const colors = [
      { ...validColor, red: 256 },
      { ...validColor, green: 256 },
      { ...validColor, blue: 256 },
      { ...validColor, red: -1 },
      { ...validColor, green: -1 },
      { ...validColor, blue: -1 },
    ];

    for (const color of colors) {
      const actual = parseRgbColor(`rgb(${color.red},${color.green},${color.blue})`);

      expect(actual).toEqual<RgbColor>({
        red: Math.min(255, Math.max(0, color.red)),
        green: Math.min(255, Math.max(0, color.green)),
        blue: Math.min(255, Math.max(0, color.blue)),
        format: 'RGB',
      });
    }
  });

  it('should return null if the value cannot be parsed', () => {
    const invalidValues = ['rgb()', 'rgb(,,)', 'rgba(0,0,0,0)', '#000', '#000000', '#00000000'];

    for (const value of invalidValues) {
      const actual = parseRgbColor(value);

      expect(actual).toBeNull();
    }
  });
});
