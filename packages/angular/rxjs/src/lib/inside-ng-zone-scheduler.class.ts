import { NgZone } from '@angular/core';
import { SchedulerAction, SchedulerLike, Subscription } from 'rxjs';

/**
 * A scheduler that schedules tasks within the Angular zone.
 */
export class InsideNgZoneScheduler implements SchedulerLike {
  constructor(private readonly ngZone: NgZone, private readonly scheduler: SchedulerLike) {}

  public now(): number {
    return this.scheduler.now();
  }

  public schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription {
    return this.ngZone.run(() => {
      return this.scheduler.schedule(work, delay, state);
    });
  }
}
