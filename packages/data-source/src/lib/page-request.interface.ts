import { Sort } from './sort.interface';

/**
 * Represents a request for a specific page.
 */
export interface PageRequest<T> {
  /** The requested page number. */
  readonly pageNumber: number;
  /** The requested page size. */
  readonly pageSize: number;
  /** The requested sort direction. */
  readonly sort: Sort<T>;
}
