import { inject, Injectable } from '@angular/core';
import { ApiService } from '@services/api';

import { environment } from '@environments/environment.development';

// Models
import { Image, TransformOptions } from '@models/image';

const Endpoints = {
  Upload: `${environment.apiUrl}/images/`,
  Galleries: `${environment.apiUrl}/images/`,
  Retrieve: (id: string) => `${environment.apiUrl}/images/${id}`,
  Transform: (id: string) => `${environment.apiUrl}/images/${id}/transform`,
  Save: (id: string) => `${environment.apiUrl}/images/${id}/save`,
} as const;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiService = inject(ApiService);

  public GetGalleries() {
    return this.apiService.get<Image[]>(Endpoints.Galleries);
  }

  public Retrieve(id: string) {
    return this.apiService.get<Image>(Endpoints.Retrieve(id));
  }

  public Transform(id: string, opts: TransformOptions) {
    return this.apiService.postBlob(Endpoints.Transform(id), opts);
  }

  public Save(id: string) {
    return this.apiService.put(Endpoints.Save(id));
  }

  public Upload(file: File) {
    const form = new FormData();
    form.append('image', file, file.name);
    return this.apiService.postForm<Image>(Endpoints.Upload, form);
  }
}
