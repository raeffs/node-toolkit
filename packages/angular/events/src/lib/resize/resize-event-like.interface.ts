export interface ResizeEventLike {
  readonly type: 'resize';
  readonly target: Element;
  readonly isFirstChange: boolean;
}
