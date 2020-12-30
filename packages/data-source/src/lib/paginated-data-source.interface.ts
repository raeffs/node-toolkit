import { Observable } from 'rxjs';
import { DataSource } from './data-source.interface';
import { Page } from './page.interface';
import { Sort } from './sort.interface';

/**
 * A data source that supports pagination.
 */
export interface PaginatedDataSource<T> extends DataSource<T> {
  readonly data: Observable<Page<T>>;

  /**
   * Sorts the data by the specified property and direction.
   * @param sort The property and direction used to sort the data.
   */
  sortBy(sort: Sort<T>): void;

  /**
   * Changes the page size.
   * @param newPageSize The new page size.
   */
  changePageSize(newPageSize: number): void;

  /**
   * Changes the page number.
   * @param newPageNumber The new page number.
   */
  changePageNumber(newPageNumber: number): void;

  /**
   * Changes to the next page.
   */
  changeToNextPage(): void;

  /**
   * Changes to the previous page.
   */
  changeToPreviousPage(): void;

  /**
   * Triggers a reload of the current page.
   */
  reload(): void;
}
