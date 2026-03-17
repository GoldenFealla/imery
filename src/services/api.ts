import { HttpBackend, HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiBackendService {
  private backend = inject(HttpBackend);
  private client = new HttpClient(this.backend);

  private options = { withCredentials: true, observe: 'response' } as const;

  get<T>(url: string) {
    return this.client.get<T>(url, this.options);
  }

  post<T>(url: string, body: unknown = {}) {
    return this.client.post<T>(url, body, this.options);
  }
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private client = inject(HttpClient);

  private options = { withCredentials: true, observe: 'response' } as const;

  get<T>(url: string) {
    return this.client.get<T>(url, this.options);
  }

  post<T>(url: string, body: unknown = {}) {
    return this.client.post<T>(url, body, this.options);
  }

  postForm<T>(url: string, body: FormData) {
    return this.client.post<T>(url, body, { withCredentials: true, observe: 'response' });
  }
}
