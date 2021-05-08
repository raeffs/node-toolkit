import { concat, Observable, of, Subject } from 'rxjs';
import { bufferTime, filter, first, map, mergeMap, share, switchMap, tap } from 'rxjs/operators';
import { CachableModel, PartialModel } from './cachable-model.interface';
import { Cache } from './cache.class';

export interface FindQueryParameters {
  readonly searchTerm: string;
  readonly maxNumberOfItems: number;
}

interface RequestMetadata<T> {
  readonly ids: string[];
  readonly value: Observable<T[]>;
}

export abstract class CachingApiClient<T extends CachableModel> {
  private readonly cache: Cache<T> = new Cache<T>();
  private readonly requestedIds: Subject<string[]> = new Subject<string[]>();
  private readonly requests: Observable<RequestMetadata<T>>;

  constructor() {
    const requestBufferTimeInMilliseconds = 50;

    this.requests = this.requestedIds.pipe(
      bufferTime(requestBufferTimeInMilliseconds),
      mergeMap(ids => ids),
      filter(ids => !!ids && ids.length > 0),
      map(ids => ids.filter((value, index, all) => all.indexOf(value) === index)),
      map(ids => ({ ids, value: this.sharedGetMany(ids) })),
      share()
    );
  }

  public find(query: FindQueryParameters): Observable<PartialModel<T>[]> {
    const initiallyCached = this.findInCache(query);
    const updated = this.executeFind(query).pipe(tap(models => this.cache.indexIfMissing(...models)));
    const changes = this.cache.changes.pipe(switchMap(() => this.findInCache(query)));
    return concat(initiallyCached, updated, changes);
  }

  public get(id: string): Observable<T> {
    return this.getMany([id]).pipe(
      map(models => {
        const model = models.find(x => x.id === id);
        if (!model) {
          throw new Error(`Entry with id ${id} does not exist!`);
        }
        return model;
      })
    );
  }

  public getMany(ids: string[]): Observable<T[]> {
    const lookup = this.cache.getMultiple(...ids);
    const idsToUpdate = [...lookup.missingIds, ...lookup.indexedIds, ...lookup.staleIds];

    if (idsToUpdate.length === 0) {
      return of(lookup.data);
    }

    const observable = new Observable<RequestMetadata<T>>(observer => {
      this.requests.subscribe(observer);
      this.requestedIds.next(idsToUpdate);
    });

    const initiallyCached = of(lookup.data);

    const updated = observable.pipe(
      first(request => !idsToUpdate.some(id => !request.ids.includes(id))),
      switchMap(request => request.value),
      map(models => models.filter(model => ids.includes(model.id)))
    );

    return lookup.data.length > 0 ? concat(initiallyCached, updated) : updated;
  }

  public create(model: Omit<T, 'id'>): Observable<T> {
    return this.executeCreate(model).pipe(tap(created => this.cache.addOrUpdate(created)));
  }

  public update(id: string, model: T): Observable<T> {
    return this.executeUpdate(id, model).pipe(tap(updated => this.cache.addOrUpdate(updated)));
  }

  public delete(id: string): Observable<void> {
    return this.executeDelete(id).pipe(tap(() => this.cache.remove(id)));
  }

  protected abstract executeFind(query: FindQueryParameters): Observable<PartialModel<T>[]>;

  protected abstract executeGetMany(...ids: string[]): Observable<T[]>;

  protected abstract executeCreate(model: Omit<T, 'id'>): Observable<T>;

  protected abstract executeUpdate(id: string, model: T): Observable<T>;

  protected abstract executeDelete(id: string): Observable<void>;

  private findInCache(query: FindQueryParameters): Observable<PartialModel<T>[]> {
    const searchTerm = query.searchTerm.toUpperCase();
    const entries: PartialModel<T>[] = [];
    for (const entry of this.cache.getAll()) {
      if (entry.name.toUpperCase().includes(searchTerm)) {
        entries.push(entry);
      }
    }
    return of(entries);
  }

  private sharedGetMany(ids: string[]): Observable<T[]> {
    return this.executeGetMany(...ids).pipe(
      tap(models => this.cache.addOrUpdate(...models)),
      share()
    );
  }
}
