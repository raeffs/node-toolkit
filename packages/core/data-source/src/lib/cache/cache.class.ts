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

type CacheEntry<T> = IndexedCacheLookup<T> | CachedLookup<T>;

/**
 * Used to cache entries of a given type.
 */
export class Cache<T extends CachableModel> {
  private readonly entries: Map<string, CacheEntry<T>> = new Map<string, CacheEntry<T>>();

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
  }

  /**
   * Clears the cache.
   */
  public clear(): void {
    this.entries.clear();
  }
}
