/**
 * Represents a model that can be cached.
 */
export interface CachableModel {
  /** The unique identifier of the model. */
  readonly id: string;
  readonly name: string;
}

export type PartialModel<T> = CachableModel & Partial<T>;
