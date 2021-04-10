import { Page } from './page.interface';
import { Pagination } from './pagination.interface';

/**
 * Represents the information of a page required to create a pagination.
 */
export type PageInfo = Pick<Page<unknown>, 'pageNumber' | 'pageSize' | 'totalItems'>;

/**
 * Creates a pagination.
 * @param page The page information used to create the pagination.
 * @returns A pagination.
 */
export function createPagination(page: PageInfo): Pagination {
  const numberOfPages = Math.ceil(page.totalItems / page.pageSize);
  return {
    pageSize: page.pageSize,
    totalItems: page.totalItems,
    numberOfPages: numberOfPages,
    currentPage: page.pageNumber,
    hasNextPage: page.pageNumber < numberOfPages,
    nextPage: page.pageNumber + 1,
    hasPreviousPage: page.pageNumber > 1,
    previousPage: page.pageNumber - 1,
  };
}
