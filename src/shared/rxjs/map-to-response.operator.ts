import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Response } from '@models/response';

export function mapToResponse<T>() {
  return (source: Observable<HttpResponse<T>>): Observable<Response<T>> => {
    return source.pipe(
      map((data) => ({ success: true, data: data.body, error: null })),
      catchError((error: HttpErrorResponse) => of({ success: false, data: null, error: error.error })),
    );
  };
}
