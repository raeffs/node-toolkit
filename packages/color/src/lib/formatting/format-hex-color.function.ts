import { asHexString } from '@raeffs/common';
import { HexColor } from '../color.interface';

/**
 * Formats a color in HEX format.
 * @param color The HEX color to format.
 * @returns The CSS string representation of the HEX color.
 */
export function formatHexColor(color: HexColor): string {
  return `#${asHexString(color.red)}${asHexString(color.green)}${asHexString(color.blue)}`;
}
