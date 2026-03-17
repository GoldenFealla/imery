import { computed, inject, Injectable, signal } from '@angular/core';

import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';

import { Auth, AuthState, LoginForm } from '@models/auth';
import { ApiBackendService } from '@services/api';
import { environment } from '@environments/environment.development';

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
    return this.apiService
      .post<{ access_token: string }>(Endpoints.Login, form)
      .pipe(tap((res) => (this.accessToken = res.body?.access_token ?? null)));
  }

  public Logout(): Observable<void> {
    this.accessToken = null;
    this.authState.set(Auth.Unauthenticated);

    return this.apiService.post(Endpoints.Logout).pipe(
      catchError(() => of(null)),
      map(() => void 0),
    );
  }
}
