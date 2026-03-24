import { map, Observable, switchMap, timer } from 'rxjs';

export function minDelayResult<T>(minMs: number) {
  return (source: Observable<T>): Observable<T> => {
    const start = Date.now();

    return source.pipe(
      switchMap((res) => {
        const elapsed = Date.now() - start;
        const remaining = Math.max(0, minMs - elapsed);
        return timer(remaining).pipe(map(() => res));
      }),
    );
  };
}
