import { EMPTY, from, isObservable, Observable, of } from 'rxjs';

/**
 * Type representing a value that may be an observable or a value that can be converted to an observable.
 */
export type MayBeObservable<T> = T | Promise<T> | Observable<T>;

/**
 * Converts the value to an observable.
 * If the value already is an observable the value itself is returned.
 * @param value The value to convert to an observable.
 * @returns The value as observable.
 */
export function asObservable<T>(value: MayBeObservable<T> | null | undefined): Observable<T> {
  if (!value) {
    return EMPTY;
  }

  if (isObservable(value)) {
    return value;
  }

  if (value instanceof Promise) {
    return from(value);
  }

  return of(value);
}
