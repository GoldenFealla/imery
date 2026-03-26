import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

// Components
import { ImageCard } from './components/image-card/image-card';

// Services
import { ImageService } from '@services/image';

// Models
import { Image } from '@models/image';

// Spartan
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmButtonImports } from '@spartan-ng/helm/button';

// Icon
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideImage, lucidePlus } from '@ng-icons/lucide';

@Component({
  selector: 'app-galleries',
  imports: [NgIcon, ImageCard, HlmButtonImports, HlmEmptyImports],
  providers: [provideIcons({ lucideImage, lucidePlus })],
  templateUrl: './galleries.html',
  styleUrl: './galleries.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Galleries {
  private imageService = inject(ImageService);
  private router = inject(Router);

  images = signal<Image[] | null>(null);

  ngOnInit() {
    this.galleries();
  }

  galleries() {
    return this.imageService
      .GetGalleries()
      .pipe(map((res) => res.data))
      .subscribe((data) => this.images.set(data));
  }

  onUpload() {
    this.router.navigateByUrl('/upload');
  }

  onEdit(id: string) {
    console.log(`Edit: ${id} called`);
    this.router.navigateByUrl(`/edit/${id}`);
  }

  onDelete(id: string) {
    this.imageService.Delete(id).subscribe(() => this.galleries());
  }
}
