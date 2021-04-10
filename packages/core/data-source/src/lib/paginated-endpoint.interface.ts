import { Observable } from 'rxjs';
import { PageRequest } from './page-request.interface';
import { Page } from './page.interface';

/**
 * A callback used to get paginated data.
 */
export type PaginatedEndpoint<T> = (req: PageRequest<T>) => Observable<Page<T>>;
