import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

// Components
import { Dragzone } from './components/dragzone/dragzone';

// Services
import { ImageService } from '@services/image';
import { combineLatest, tap, timer } from 'rxjs';

@Component({
  selector: 'app-upload',
  imports: [Dragzone],
  templateUrl: './upload.html',
  styleUrl: './upload.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Upload {
  // Service
  private imageService = inject(ImageService);

  // State
  isLoading = signal<boolean>(false);

  OnFile(files: File[]) {
    this.isLoading.set(true);

    combineLatest([this.imageService.Upload(files[0]), timer(1500)]).subscribe({
      next: ([res]) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }
}
