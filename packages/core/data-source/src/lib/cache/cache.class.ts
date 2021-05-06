import { Observable, Subject } from 'rxjs';
import { CachableModel, PartialModel } from './cachable-model.interface';

/**
 * Represents the state of a cache entry.
 */
export enum CacheEntryState {
  /** Indicates that the entry is not in the cache. */
  Missing,
  /** Indicates that the entry is indexed, but not all data is available yet. */
  Indexed,
  /** Indicates that the entry is cached, but its data is outdated. */
  Stale,
  /** Indicates that the entry is cached. */
  Cached,
}

/**
 * Represents the result of a cache lookup.
 */
export type CacheLookup<T> = MissedCacheLookup | IndexedCacheLookup<T> | CachedLookup<T>;

/**
 * Represents the result of a cache lookup for an entry that is not in the cache.
 */
export interface MissedCacheLookup {
  readonly state: CacheEntryState.Missing;
}

/**
 * Represents the result of a cache lookup for an entry that is indexed, but whose data is not available yet.
 */
export interface IndexedCacheLookup<T> {
  readonly state: CacheEntryState.Indexed;
  readonly data: PartialModel<T>;
}

/**
 * Represents the result of a cache lookup for an entry that is cached.
 */
export interface CachedLookup<T> {
  readonly state: CacheEntryState.Stale | CacheEntryState.Cached;
  readonly data: T;
}

/**
 * Represents the result of a cache lookup for multiple entries.
 */
export interface CombinedCacheLookup<T> {
  readonly cachedIds: string[];
  readonly staleIds: string[];
  readonly indexedIds: string[];
  readonly missingIds: string[];
  readonly data: T[];
}

type CacheEntry<T> = IndexedCacheLookup<T> | CachedLookup<T>;

/**
 * Used to cache entries of a given type.
 */
export class Cache<T extends CachableModel> {
  private readonly entries: Map<string, CacheEntry<T>> = new Map<string, CacheEntry<T>>();
  private readonly changeFeed: Subject<void> = new Subject<void>();

  public readonly changes: Observable<void> = this.changeFeed.asObservable();

  /**
   * Adds or updates one or more entries.
   * @param models The entries to add or update.
   */
  public addOrUpdate(...models: T[]): void {
    for (const model of models) {
      this.entries.set(model.id, {
        data: model,
        state: CacheEntryState.Cached,
      });
    }
    this.changeFeed.next();
  }

  /**
   * Adds one or more entries to the index if they are not already in the cache.
   * @param models The entries to index.
   */
  public indexIfMissing(...models: PartialModel<T>[]): void {
    for (const model of models) {
      const cached = this.get(model.id);

      if (cached.state !== CacheEntryState.Missing) {
        continue;
      }

      this.entries.set(model.id, {
        data: model,
        state: CacheEntryState.Indexed,
      });
    }
    this.changeFeed.next();
  }

  /**
   * Gets an entry from the cache.
   * @param id The identifier of the entry to return.
   * @returns The result of the cache lookup.
   */
  public get(id: string): CacheLookup<T> {
    const cached = this.entries.get(id);

    if (!cached) {
      return {
        state: CacheEntryState.Missing,
      };
    }

    return {
      ...cached,
    };
  }

  /**
   * Gets multiple entries from the cache.
   * @param ids The identifiers of the entries to return.
   * @returns The result of the cache lookup.
   */
  public getMultiple(...ids: string[]): CombinedCacheLookup<T> {
    const cachedIds: string[] = [];
    const staleIds: string[] = [];
    const indexedIds: string[] = [];
    const missingIds: string[] = [];
    const data: T[] = [];

    for (const id of ids) {
      const cached = this.get(id);
      switch (cached.state) {
        case CacheEntryState.Cached:
          cachedIds.push(id);
          data.push(cached.data);
          break;
        case CacheEntryState.Stale:
          staleIds.push(id);
          data.push(cached.data);
          break;
        case CacheEntryState.Indexed:
          indexedIds.push(id);
          break;
        case CacheEntryState.Missing:
          missingIds.push(id);
          break;
      }
    }

    return {
      cachedIds,
      staleIds,
      indexedIds,
      missingIds,
      data,
    };
  }

  /**
   * Gets all entries from the cache.
   * @returns All entries from the cache.
   */
  public getAll(): PartialModel<T>[] {
    return [...this.entries.values()].map(x => x.data);
  }

  /**
   * Invalidates an entry in the cache.
   * @param id The identifier of the entry to invalidate.
   */
  public invalidate(id: string): void {
    const cached = this.get(id);

    if (cached.state === CacheEntryState.Missing || cached.state === CacheEntryState.Indexed) {
      return;
    }

    this.entries.set(id, {
      data: cached.data,
      state: CacheEntryState.Stale,
    });

    this.changeFeed.next();
  }

  /**
   * Removes an entry from the cache.
   * @param id The identifier of the entry to remove.
   */
  public remove(id: string): void {
    this.entries.delete(id);
    this.changeFeed.next();
  }

  /**
   * Clears the cache.
   */
  public clear(): void {
    this.entries.clear();
    this.changeFeed.next();
  }
}
