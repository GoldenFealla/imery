import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

// Models
import { Auth, AuthState, LoginForm } from '@models/auth';

// Services
import { ApiBackendService } from '@services/api';

// Environment
import { environment } from '@environments/environment.development';
import { mapToResponse } from '@shared/rxjs/map-to-response.operator';

const Endpoints = {
  Check: `${environment.apiUrl}/auth/check`,
  Refresh: `${environment.apiUrl}/auth/refresh`,
  Login: `${environment.apiUrl}/auth/login`,
  Logout: `${environment.apiUrl}/auth/logout`,
} as const;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiService = inject(ApiBackendService);
  private authState = signal<AuthState>(Auth.Pending);

  private accessToken: string | null = null;
  private refreshing$: Observable<boolean> | null = null;

  public state = this.authState.asReadonly();
  public isLoggedIn = computed(() => this.authState() === Auth.Authenticated);

  public Token() {
    return this.accessToken;
  }

  // true: success, false: error
  public Refresh(): Observable<boolean> {
    if (this.refreshing$) return this.refreshing$;

    this.refreshing$ = this.apiService.post<{ access_token: string }>(Endpoints.Refresh).pipe(
      tap((res) => {
        this.accessToken = res.body?.access_token ?? null;
        this.authState.set(Auth.Authenticated);
      }),
      map(() => true),
      catchError(() => {
        this.authState.set(Auth.Unauthenticated);
        return of(false);
      }),
      tap(() => (this.refreshing$ = null)),
      shareReplay(1),
    );

    return this.refreshing$;
  }

  public Login(form: LoginForm) {
    return this.apiService.post<{ access_token: string }>(Endpoints.Login, form).pipe(
      mapToResponse(),
      tap((res) => {
        if (res.success) {
          this.accessToken = res.data?.access_token ?? null;
          this.authState.set(Auth.Authenticated);
        } else {
          this.authState.set(Auth.Unauthenticated);
        }
      }),
    );
  }

  public LoginWithGoogle() {
    window.location.href = 'http://localhost:8081/auth/google';
  }

  public Logout() {
    return this.apiService.post(Endpoints.Logout).pipe(
      tap(() => {
        this.accessToken = null;
        this.authState.set(Auth.Unauthenticated);
      }),
    );
  }
}
