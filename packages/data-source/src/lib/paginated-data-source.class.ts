import { noop } from '@raeffs/common';
import { asObservable, onlyPositive } from '@raeffs/rxjs';
import {
  BehaviorSubject,
  combineLatest,
  merge,
  Observable,
  Subject,
} from 'rxjs';
import {
  distinctUntilChanged,
  map,
  shareReplay,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { Page } from './page.interface';
import {
  PaginatedDataSource,
  PaginatedDataSourceOptions,
} from './paginated-data-source.interface';
import { Sort } from './sort.interface';

export class ConcretePaginatedDataSource<T> implements PaginatedDataSource<T> {
  private readonly sort: BehaviorSubject<Sort<T>>;
  private readonly pageSize: BehaviorSubject<number>;
  private readonly pageNumber: BehaviorSubject<number>;
  private readonly reloadTrigger = new Subject<void>();

  public readonly data: Observable<Page<T>>;

  constructor(options: PaginatedDataSourceOptions<T>) {
    this.sort = new BehaviorSubject<Sort<T>>(options.initialSort);
    this.pageSize = new BehaviorSubject<number>(options.initialPageSize);
    this.pageNumber = new BehaviorSubject<number>(
      options.initialPageNumber ?? 1
    );

    const allPageNumberChanges = merge(
      this.pageNumber,
      asObservable(options.pageNumberChanges)
    );

    const params = combineLatest([
      this.sort,
      this.pageSize.pipe(distinctUntilChanged()),
      allPageNumberChanges.pipe(
        startWith(1),
        onlyPositive(),
        distinctUntilChanged()
      ),
      this.reloadTrigger.pipe(startWith(null)),
    ]);

    this.data = params.pipe(
      switchMap(([sort, pageSize, pageNumber]) =>
        options.endpoint({ sort, pageSize, pageNumber })
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

  public reload(): void {
    this.reloadTrigger.next();
  }

  public connect(): Observable<T[]> {
    return this.data.pipe(map(x => x.items));
  }

  public disconnect(): void {
    noop();
  }
}
