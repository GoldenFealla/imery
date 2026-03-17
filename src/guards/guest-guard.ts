import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';

// Models
import { Auth } from '@models/auth';

// Services
import { AuthService } from '@services/auth';
import { map } from 'rxjs';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.state() === Auth.Pending) {
    return authService
      .Refresh()
      .pipe(map((success) => (success ? router.createUrlTree(['/']) : true)));
  }

  return authService.isLoggedIn() ? router.createUrlTree(['/']) : true;
};
