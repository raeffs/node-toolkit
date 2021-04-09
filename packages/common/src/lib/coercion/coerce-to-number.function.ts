export function coerceToNumber(value: unknown, defaultValue: number = 0): number {
  // https://github.com/angular/components/blob/master/src/cdk/coercion/number-property.ts
  return isNaN(parseFloat(value as string)) || isNaN(Number(value)) ? defaultValue : Number(value);
}
