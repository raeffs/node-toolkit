import { noop } from '@raeffs/common';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { Page } from './page.interface';
import { PaginatedDataSource } from './paginated-data-source.interface';
import { PaginatedEndpoint } from './paginated-endpoint.interface';
import { Sort } from './sort.interface';

export class ConcretePaginatedDataSource<T> implements PaginatedDataSource<T> {
  private readonly sort: BehaviorSubject<Sort<T>>;
  private readonly pageSize: BehaviorSubject<number>;
  private readonly pageNumber: BehaviorSubject<number>;

  public readonly data: Observable<Page<T>>;

  constructor(
    endpoint: PaginatedEndpoint<T>,
    initialSort: Sort<T>,
    initialPageSize: number,
    initialPageNumber: number
  ) {
    this.sort = new BehaviorSubject<Sort<T>>(initialSort);
    this.pageSize = new BehaviorSubject<number>(initialPageSize);
    this.pageNumber = new BehaviorSubject<number>(initialPageNumber);

    const params = combineLatest([
      this.sort,
      this.pageSize.pipe(distinctUntilChanged()),
      this.pageNumber.pipe(distinctUntilChanged()),
    ]);

    this.data = params.pipe(
      switchMap(([sort, pageSize, pageNumber]) =>
        endpoint({ sort, pageSize, pageNumber })
      ),
      shareReplay(1)
    );
  }

  public sortBy(sort: Sort<T>): void {
    this.sort.next(sort);
  }

  public changePageSize(newPageSize: number): void {
    this.pageSize.next(newPageSize);
  }

  public changePageNumber(newPageNumber: number): void {
    this.pageNumber.next(newPageNumber);
  }

  public changeToNextPage(): void {
    this.changePageNumber(this.pageNumber.value + 1);
  }

  public changeToPreviousPage(): void {
    this.changePageNumber(this.pageNumber.value - 1);
  }

  public connect(): Observable<T[]> {
    return this.data.pipe(map(x => x.items));
  }

  public disconnect(): void {
    noop();
  }
}
