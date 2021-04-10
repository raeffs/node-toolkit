/**
 * Represents a color.
 */
export type Color = RgbColor | RgbaColor | HexColor;

/**
 * Represents an rgb color.
 */
export interface RgbColor {
  readonly format: 'RGB';
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}

/**
 * Represents an rgb color with transparency.
 */
export interface RgbaColor {
  readonly format: 'RGBA';
  readonly red: number;
  readonly green: number;
  readonly blue: number;
  readonly alpha: number;
}

/**
 * Represents an hex color.
 */
export interface HexColor {
  readonly format: 'HEX';
  readonly red: number;
  readonly green: number;
  readonly blue: number;
}
