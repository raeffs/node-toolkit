import { Observable } from 'rxjs';

/**
 * An interface for Angular CDK compatible data sources.
 */
export interface DataSource<T> {
  /**
   * Connects to the data source.
   * @returns An observable that emits new values when the data changes.
   */
  connect(): Observable<readonly T[]>;

  /**
   * Disconnects from the data source.
   */
  disconnect(): void;
}
