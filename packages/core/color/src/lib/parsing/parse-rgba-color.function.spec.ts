import { getRandomDouble, getRandomInteger } from '@raeffs/testing';
import { RgbaColor } from '../color.interface';
import { parseRgbaColor } from './parse-rgba-color.function';

describe('parseRgbaColor', () => {
  it('should parse a valid RGBA color', () => {
    const red = getRandomInteger(0, 255);
    const green = getRandomInteger(0, 255);
    const blue = getRandomInteger(0, 255);
    const alpha = getRandomDouble(0, 1);

    const actual = parseRgbaColor(`rgba(${red},${green},${blue},${alpha})`);

    expect(actual).toEqual<RgbaColor>({
      red,
      green,
      blue,
      alpha,
      format: 'RGBA',
    });
  });

  it('should ignore whitespace', () => {
    const red = getRandomInteger(0, 255);
    const green = getRandomInteger(0, 255);
    const blue = getRandomInteger(0, 255);
    const alpha = getRandomDouble(0, 1);

    const actual = parseRgbaColor(`rgba( ${red} , ${green} , ${blue} , ${alpha} )`);

    expect(actual).toEqual<RgbaColor>({
      red,
      green,
      blue,
      alpha,
      format: 'RGBA',
    });
  });

  it('should cut of values out of range', () => {
    const validColor = {
      red: getRandomInteger(0, 255),
      green: getRandomInteger(0, 255),
      blue: getRandomInteger(0, 255),
      alpha: getRandomDouble(0, 1),
    };

    const colors = [
      { ...validColor, red: 256 },
      { ...validColor, green: 256 },
      { ...validColor, blue: 256 },
      { ...validColor, alpha: 2 },
      { ...validColor, red: -1 },
      { ...validColor, green: -1 },
      { ...validColor, blue: -1 },
      { ...validColor, alpha: -1 },
    ];

    for (const color of colors) {
      const actual = parseRgbaColor(`rgba(${color.red},${color.green},${color.blue},${color.alpha})`);

      expect(actual).toEqual<RgbaColor>({
        red: Math.min(255, Math.max(0, color.red)),
        green: Math.min(255, Math.max(0, color.green)),
        blue: Math.min(255, Math.max(0, color.blue)),
        alpha: Math.min(1, Math.max(0, color.alpha)),
        format: 'RGBA',
      });
    }
  });

  it('should return null if the value cannot be parsed', () => {
    const invalidValues = ['rgba()', 'rgba(,,,)', 'rgb(0,0,0)', '#000', '#000000', '#00000000'];

    for (const value of invalidValues) {
      const actual = parseRgbaColor(value);

      expect(actual).toBeNull();
    }
  });
});
