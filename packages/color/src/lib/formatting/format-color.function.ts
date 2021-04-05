import { Color } from '../color.interface';
import { formatHexColor } from './format-hex-color.function';
import { formatRgbColor } from './format-rgb-color.function';
import { formatRgbaColor } from './format-rgba-color.function';

/**
 * Formats a color to its CSS string representation.
 * @param color The color to format.
 * @returns The CSS string representation of the color.
 */
export function formatColor(color: Color): string {
  switch (color.format) {
    case 'RGB':
      return formatRgbColor(color);
    case 'RGBA':
      return formatRgbaColor(color);
    case 'HEX':
      return formatHexColor(color);
  }
}
