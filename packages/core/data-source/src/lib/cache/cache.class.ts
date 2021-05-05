import { CachableModel, PartialModel } from './cachable-model.interface';

export class Cache<T extends CachableModel> {
  private readonly entries: Map<string, T> = new Map<string, T>();

  public addOrUpdate(...models: T[]): void {
    for (const model of models) {
      this.entries.set(model.id, model);
    }
  }

  public addOrPatch(...models: PartialModel<T>[]): void {
    for (const model of models) {
      const cached = this.get(model.id);
      this.entries.set(model.id, {
        ...(cached ?? {}),
        ...(model as T),
      });
    }
  }

  public get(id: string): T | null {
    return this.entries.get(id) ?? null;
  }

  public invalidate(id: string): void {
    this.entries.delete(id);
  }

  public invalidateAll(): void {
    this.entries.clear();
  }
}
