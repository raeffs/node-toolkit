import { RgbColor } from '../color.interface';

/**
 * Formats a color in RGB format.
 * @param color The RGB color to format.
 * @returns The CSS string representation of the RGB color.
 */
export function formatRgbColor(color: RgbColor): string {
  return `rgb(${color.red}, ${color.green}, ${color.blue}`;
}
