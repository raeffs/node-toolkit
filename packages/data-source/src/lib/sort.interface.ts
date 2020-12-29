/**
 * Represents a sort direction.
 */
export interface Sort<T> {
  /** The property to sort. */
  readonly property: keyof T;
  /** The sort direction. */
  readonly order: 'asc' | 'desc';
}
