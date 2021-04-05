import { RgbaColor } from '../color.interface';

/**
 * Formats a color in RGBA format.
 * @param color The RGBA color to format.
 * @returns The CSS string representation of the RGBA color.
 */
export function formatRgbaColor(color: RgbaColor): string {
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
}
