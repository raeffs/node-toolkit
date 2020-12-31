import { OperatorFunction } from 'rxjs';
import { filter } from 'rxjs/operators';
import { filterNullAndUndefined } from './filter-null-and-undefined.operator';

/**
 * Filters an observable stream to only pass through positive numbers.
 * @param includeZero Whether to include zero or not.
 * @returns An operator that can be passed to the observables `pipe` method.
 */
export function onlyPositive(
  includeZero: boolean = false
): OperatorFunction<number | null | undefined, number> {
  return observable =>
    observable.pipe(
      filterNullAndUndefined(),
      filter(value => value > 0 || (includeZero && value === 0))
    );
}
