import { inject, Injectable } from '@angular/core';
import { ApiService } from '@services/api';

import { environment } from '@environments/environment.development';

// Models
import { Image } from '@models/image';

const Endpoints = {
  Upload: `${environment.apiUrl}/images/`,
  Galleries: `${environment.apiUrl}/images/`,
} as const;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiService = inject(ApiService);

  public GetGalleries() {
    return this.apiService.get(Endpoints.Galleries);
  }

  public Upload(file: File) {
    const form = new FormData();
    form.append('image', file, file.name);
    return this.apiService.postForm<Image>(Endpoints.Upload, form);
  }
}
