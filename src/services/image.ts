import { inject, Injectable } from '@angular/core';
import { ApiService } from '@services/api';

import { environment } from '@environments/environment.development';

const Endpoints = {
  Galleries: `${environment.apiUrl}/images/test`,
} as const;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiService = inject(ApiService);

  public GetGalleries() {
    return this.apiService.get(Endpoints.Galleries);
  }
}
