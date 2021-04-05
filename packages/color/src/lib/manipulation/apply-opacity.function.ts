import { Color } from '../color.interface';

/**
 * Applies an opacity to a color.
 * @param opacity The opacity that should be applied as value between 0 and 1.
 * @returns A new color with the applied opacity.
 */
export function applyOpacity(alpha: number, color: Color): Color {
  return {
    ...color,
    format: 'RGBA',
    alpha: Math.min(1, Math.max(0, alpha)),
  };
}
