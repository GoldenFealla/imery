import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';

// Interceptor
import { authInterceptor } from '../interceptors/auth-interceptor';

// Services
import { AuthService } from '@services/auth';
import { ThemeService } from '@services/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAppInitializer(() => {
      const themeService = inject(ThemeService);
      themeService.init();

      const authService = inject(AuthService);
      return firstValueFrom(authService.Refresh());
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
