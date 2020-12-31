/**
 * Represents a sort direction.
 */
export interface Sort<T> {
  /** The property to sort. */
  readonly property: keyof T | string;
  /** The sort direction. */
  readonly order: 'Ascending' | 'Descending';
}
