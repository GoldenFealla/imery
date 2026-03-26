import { inject, Injectable } from '@angular/core';
import { ApiService } from '@services/api';

import { environment } from '@environments/environment';

// Models
import { Image, TransformOptions } from '@models/image';
import { mapToResponse } from '@shared/rxjs/map-to-response.operator';

const Endpoints = {
  Upload: `${environment.apiUrl}/images/`,
  Galleries: `${environment.apiUrl}/images/`,
  Retrieve: (id: string) => `${environment.apiUrl}/images/${id}`,
  Transform: (id: string) => `${environment.apiUrl}/images/${id}/transform`,
  Save: (id: string) => `${environment.apiUrl}/images/${id}/save`,
  Delete: (id: string) => `${environment.apiUrl}/images/${id}`,
} as const;

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private apiService = inject(ApiService);

  public GetGalleries() {
    return this.apiService.get<Image[]>(Endpoints.Galleries).pipe(mapToResponse());
  }

  public Retrieve(id: string) {
    return this.apiService.get<Image>(Endpoints.Retrieve(id));
  }

  public Transform(id: string, opts: TransformOptions) {
    return this.apiService.postBlob(Endpoints.Transform(id), opts);
  }

  public Save(id: string, opts: TransformOptions) {
    return this.apiService.put(Endpoints.Save(id), opts);
  }

  public Upload(file: File) {
    const form = new FormData();
    form.append('image', file, file.name);
    return this.apiService.postForm<Image>(Endpoints.Upload, form);
  }

  public Delete(id: string) {
    return this.apiService.delete<void>(Endpoints.Delete(id));
  }
}
