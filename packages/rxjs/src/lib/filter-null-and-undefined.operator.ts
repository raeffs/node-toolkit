import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';

/**
 * Filters the values of an observable stream to exclude null and undefined.
 * @returns An operator that can be passed to the observables `pipe` method.
 */
export function filterNullAndUndefined<T>(): OperatorFunction<
  T | null | undefined,
  T
> {
  return observable => observable.pipe(filter(notNullOrUndefined));
}

function notNullOrUndefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
