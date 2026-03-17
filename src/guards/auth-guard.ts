import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Auth } from '@models/auth';

import { AuthService } from '@services/auth';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('authGuard state:', authService.state());
  console.log('authGuard isLoggedIn:', authService.isLoggedIn());

  if (authService.state() === Auth.Pending) {
    return authService
      .Refresh()
      .pipe(map((success) => (success ? true : router.createUrlTree(['/login']))));
  }

  return authService.isLoggedIn() ? true : router.createUrlTree(['/login']);
};
