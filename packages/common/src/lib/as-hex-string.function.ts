/**
 * Returns the hexadecimal representation of a number.
 * @param value The number to format.
 * @param minLength The minimal length of the returned string.
 * @returns The hexadecimal representation of the number.
 */
export function asHexString(value: number, minLength: number = 0): string {
  return value.toString(16).padStart(minLength, '0');
}
