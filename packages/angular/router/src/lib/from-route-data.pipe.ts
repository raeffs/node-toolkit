import { Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'xFromRouteData',
})
export class FromRouteDataPipe implements PipeTransform {
  constructor(private readonly activatedRoute: ActivatedRoute) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public transform(value: string): Observable<any> {
    return this.activatedRoute.data.pipe(map(data => data[value]));
  }
}
