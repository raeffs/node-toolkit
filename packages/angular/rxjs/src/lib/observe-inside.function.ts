import { NgZone } from '@angular/core';
import { asyncScheduler, MonoTypeOperatorFunction, SchedulerLike } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { InsideNgZoneScheduler } from './inside-ng-zone-scheduler.class';

/**
 * Re-emits all notifications from the source observable within the Angular zone and with the specified scheduler.
 * @param ngZone The Angular zone.
 * @param scheduler The scheduler used to reschedule the notifications from the source observable.
 * @returns An observable that emits the same notifications as the source observable but within the Angular zone.
 */
export function observeInside<T>(
  ngZone: NgZone,
  scheduler: SchedulerLike = asyncScheduler
): MonoTypeOperatorFunction<T> {
  return observable => observable.pipe(observeOn(new InsideNgZoneScheduler(ngZone, scheduler)));
}
