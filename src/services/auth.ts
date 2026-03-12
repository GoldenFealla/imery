import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, of, tap } from 'rxjs';

import { LoginForm } from '@models/auth';
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

  private accessToken: string | null = '';

  public Token() {
    return this.accessToken;
  }

  // true: success, false: error
  public Refresh(): Observable<boolean> {
    return this.apiService.post<{ access_token: string }>(Endpoints.Refresh).pipe(
      tap((res) => (this.accessToken = res.body?.access_token ?? null)),
      map(() => true),
      catchError(() => of(false)),
    );
  }

  public Login(login: LoginForm) {}

  public Logout() {
    this.accessToken = null;
    this.apiService.post(Endpoints.Logout).subscribe();
    // this.router.navigate(['/login']);
  }
}
