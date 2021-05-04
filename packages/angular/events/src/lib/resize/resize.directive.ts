import { Directive, ElementRef, NgZone, OnDestroy, Output } from '@angular/core';
import { observeInside } from '@raeffs/angular-rxjs';
import { Disposable } from '@raeffs/common';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ResizeEventLike } from './resize-event-like.interface';

@Directive({
  selector: '[xResize]',
})
export class ResizeDirective implements OnDestroy {
  private readonly trigger: Subject<void> = new Subject<void>();
  private readonly dispose: Disposable;

  @Output('xResize')
  public readonly resize: Observable<ResizeEventLike> = this.trigger.pipe(
    map(() => this.createEvent()),
    startWith(this.createEvent(true)),
    // the resize observer callback is not executed within the Angular zone
    // so we need to enter the Angular zone to trigger change detection
    observeInside(this.ngZone)
  );

  constructor(private readonly elementRef: ElementRef, private readonly ngZone: NgZone) {
    // the resize observer api seems not yet available
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const observer = new ResizeObserver(() => this.trigger.next());
    observer.observe(this.elementRef.nativeElement);
    this.dispose = () => observer.unobserve(this.elementRef.nativeElement);
  }

  public ngOnDestroy(): void {
    this.dispose();
  }

  private createEvent(isFirstChange: boolean = false): ResizeEventLike {
    return {
      type: 'resize',
      target: this.elementRef.nativeElement,
      isFirstChange,
    };
  }
}
