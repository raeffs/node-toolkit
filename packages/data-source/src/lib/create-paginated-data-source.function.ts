import { ConcretePaginatedDataSource } from './paginated-data-source.class';
import {
  PaginatedDataSource,
  PaginatedDataSourceOptions,
} from './paginated-data-source.interface';

/**
 * Creates a `PaginatedDataSource`.
 * @param options The options used to create the `PaginatedDataSource`.
 * @returns The created `PaginatedDataSource`.
 */
export function createPaginatedDataSource<T>(
  options: PaginatedDataSourceOptions<T>
): PaginatedDataSource<T> {
  return new ConcretePaginatedDataSource(options);
}
