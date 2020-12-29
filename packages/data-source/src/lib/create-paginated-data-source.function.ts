import { PageRequest } from './page-request.interface';
import { ConcretePaginatedDataSource } from './paginated-data-source.class';
import { PaginatedDataSource } from './paginated-data-source.interface';
import { PaginatedEndpoint } from './paginated-endpoint.interface';

/**
 * Creates a `PaginatedDataSource`.
 * @param options The options used to create the `PaginatedDataSource`.
 * @returns The created `PaginatedDataSource`.
 */
export function createPaginatedDataSource<T>(
  options: PageRequest<T> & { endpoint: PaginatedEndpoint<T> }
): PaginatedDataSource<T> {
  return new ConcretePaginatedDataSource(
    options.endpoint,
    options.sort,
    options.pageSize,
    options.pageNumber
  );
}
