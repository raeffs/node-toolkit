/**
 * Represents a model that can be cached.
 */
export interface CachableModel {
  /** The unique identifier of the model. */
  readonly id: string;
  /** The name of the model. */
  readonly name: string;
}

/**
 * Represents a model that is partially cached.
 */
export type PartialModel<T> = CachableModel & Partial<T>;
