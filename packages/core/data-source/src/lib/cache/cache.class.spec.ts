import { getRandomCharacter } from '@raeffs/testing';
import { Cache, CachedLookup, CacheEntryState, IndexedCacheLookup } from './cache.class';

describe('Cache', () => {
  let sut: Cache<Model>;

  beforeEach(() => {
    sut = new Cache<Model>();
  });

  it('should return CacheEntryState.Missed if the model is not cached', () => {
    const id = getRandomCharacter();

    const actual = sut.get(id);

    expect(actual.state).toBe(CacheEntryState.Missing);
  });

  it('should return CacheEntryState.Indexed if the model is indexed', () => {
    const model = getRandomModel();

    sut.indexIfMissing(model);
    const actual = sut.get(model.id);

    expect(actual.state).toBe(CacheEntryState.Indexed);
  });

  it('should return the indexed data if the model is indexed', () => {
    const model = getRandomModel();

    sut.indexIfMissing(model);
    const actual = sut.get(model.id) as IndexedCacheLookup<Model>;

    expect(actual.data).toEqual(model);
  });

  it('should return CacheEntryState.Cached if a model is indexed that is already cached', () => {
    const model = getRandomModel();

    sut.addOrUpdate(model);
    sut.indexIfMissing(model);
    const actual = sut.get(model.id) as CachedLookup<Model>;

    expect(actual.state).toBe(CacheEntryState.Cached);
  });

  it('should return the cached data if a model is indexed that is already cached', () => {
    const model = getRandomModel();
    const indexed = { id: model.id, name: model.name };

    sut.addOrUpdate(model);
    sut.indexIfMissing(indexed);
    const actual = sut.get(indexed.id) as CachedLookup<Model>;

    expect(actual.data).toEqual(model);
  });

  it('should return CacheEntryState.Cached if the model is cached', () => {
    const model = getRandomModel();

    sut.addOrUpdate(model);
    const actual = sut.get(model.id);

    expect(actual.state).toBe(CacheEntryState.Cached);
  });

  it('should return the cached data if the model is cached', () => {
    const model = getRandomModel();

    sut.addOrUpdate(model);
    const actual = sut.get(model.id) as CachedLookup<Model>;

    expect(actual.data).toEqual(model);
  });

  it('should return the latest version of the model', () => {
    const initial = getRandomModel();
    const latest = { ...getRandomModel(), id: initial.id };

    sut.addOrUpdate(initial);
    sut.addOrUpdate(latest);
    const actual = sut.get(initial.id) as CachedLookup<Model>;

    expect(actual.data).toEqual(latest);
  });

  it('should return CacheEntryState.Stale if a cached model is invalidated', () => {
    const model = getRandomModel();

    sut.addOrUpdate(model);
    sut.invalidate(model.id);
    const actual = sut.get(model.id);

    expect(actual.state).toBe(CacheEntryState.Stale);
  });

  it('should return the cached data if a cached model is invalidated', () => {
    const model = getRandomModel();

    sut.addOrUpdate(model);
    sut.invalidate(model.id);
    const actual = sut.get(model.id) as CachedLookup<Model>;

    expect(actual.data).toEqual(model);
  });

  it('should return CacheEntryState.Missing if a model is invalidated that is not in the cache yet', () => {
    const id = getRandomCharacter();

    sut.invalidate(id);
    const actual = sut.get(id);

    expect(actual.state).toBe(CacheEntryState.Missing);
  });

  it('should return CacheEntryState.Missing if a cached model is removed', () => {
    const model = getRandomModel();

    sut.addOrUpdate(model);
    sut.remove(model.id);
    const actual = sut.get(model.id);

    expect(actual.state).toBe(CacheEntryState.Missing);
  });

  it('should return CacheEntryState.Missing if the cache is cleared', () => {
    const model = getRandomModel();

    sut.addOrUpdate(model);
    sut.clear();
    const actual = sut.get(model.id);

    expect(actual.state).toBe(CacheEntryState.Missing);
  });
});

function getRandomModel(): Model {
  return {
    id: getRandomCharacter(),
    name: getRandomCharacter(),
    property: getRandomCharacter(),
  };
}

interface Model {
  readonly id: string;
  readonly name: string;
  readonly property: string;
}
