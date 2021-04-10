import { Sort } from './sort.interface';

/**
 * Represents a page of data returned from an endpoint.
 */
export interface Page<T> {
  /** The items of the page. */
  readonly items: T[];
  /** The total number of items. */
  readonly totalItems: number;
  /** The current page size. */
  readonly pageSize: number;
  /** The current page number. */
  readonly pageNumber: number;
  /** The current sort direction. */
  readonly sort: Sort<T>;
}
