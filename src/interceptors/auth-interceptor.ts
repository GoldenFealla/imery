import { inject } from '@angular/core';
import type {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { AuthService } from '@services/auth';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('auth interceptor');

  const authService = inject(AuthService);
  const router = inject(Router);

  const handleAfterRefresh = (success: boolean) => {
    if (success) {
      return next(addToken(req, authService.Token()));
    }

    authService.Logout();
    router.navigate(['/login']);
    return EMPTY;
  };

  const handleUnauthorized = (error: HttpErrorResponse) => {
    if (error.status === 401) {
      return authService.Refresh().pipe(switchMap(handleAfterRefresh));
    }

    return EMPTY;
  };

  return next(addToken(req, authService.Token())).pipe(catchError(handleUnauthorized));
};

const addToken = (req: HttpRequest<any>, token: string | null) => {
  if (!token) return req;
  return req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });
};
