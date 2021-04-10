/**
 * Represents pagination information.
 */
export interface Pagination {
  /** The page size. */
  readonly pageSize: number;
  /** The total items. */
  readonly totalItems: number;
  /** The number of pages. */
  readonly numberOfPages: number;
  /** The current page number. */
  readonly currentPage: number;
  /** Whether there is a next page or not. */
  readonly hasNextPage: boolean;
  /** The next page number. */
  readonly nextPage: number;
  /** Whether there is a previous page or not. */
  readonly hasPreviousPage: boolean;
  /** The previous page number. */
  readonly previousPage: number;
}
